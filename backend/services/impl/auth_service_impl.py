import asyncio
import uuid
from datetime import datetime
from typing import Optional

from fastapi.responses import JSONResponse, RedirectResponse
from sqlalchemy.orm import Session
from starlette.requests import Request

from backend.common import generate, send_email, utils
from backend.common.logger import setup_logger
from backend.core import google_auth, oauth2
from backend.core.config import settings
from backend.crud.crud_cart import crud_cart
from backend.crud.crud_role import crud_role
from backend.crud.crud_user import crud_user
from backend.crud.crud_user_session import crud_user_session
from backend.models.user import User
from backend.schemas.auth_schema import (
    ChangePasswordSchema,
    EmailSchema,
    TokenSchema,
    UserSignInSchema,
    UserSignUpSchema,
)
from backend.schemas.cart_schema import CartCreateSchema
from backend.schemas.user_schema import UserInDBSchema, UserOutSchema
from backend.schemas.user_session_schema import (
    UserSessionCreateSchema,
    UserSessionUpdateSchema,
)
from backend.services.abc.auth_service import AuthService

logger = setup_logger()


class AuthServiceImpl(AuthService):
    def __init__(self):
        self.__crud_user = crud_user
        self.__crud_role = crud_role
        self.__crud_user_session = crud_user_session
        self.__crud_cart = crud_cart

    async def sign_up(
        self, db: Session, user: UserSignUpSchema
    ) -> Optional[UserInDBSchema]:
        hashed_password = utils.hash(user.password)
        display_name = (
            f"{user.email.split('@')[0]}-{generate.generate_random_string(5)}"
        )
        """Check if user already exists, then raise an exception. Otherwise, create a new user."""
        user_found = self.__crud_user.get_one_by(db=db, filter={"email": user.email})
        if user_found:
            logger.error(
                f"Error in {__name__}.{self.__class__.__name__}.sign_up: User already exists"
            )
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "User already exists"},
            )
        """Check email verification is sent successfully. If so, create a new user."""
        is_sended = await send_email.send_verification_email(
            user_info={"name": display_name, "email": user.email},
            redirect_url=f"{settings.REDIRECT_FRONTEND_URL}/",
            mode=1,
        )
        if is_sended:
            try:
                """Get user role."""
                user_role_found = self.__crud_role.get_one_by(
                    db=db, filter={"role_name": "user"}
                )
                """Create a new user."""
                created_user = self.__crud_user.create_user(
                    db=db,
                    user_create=UserInDBSchema(
                        id=uuid.uuid4(),
                        role_id=user_role_found.id,
                        email=user.email,
                        phone_number="",
                        password_hash=hashed_password,
                        display_name=display_name,
                        avatar_url="https://avatars.githubusercontent.com/u/96216102?s=400&u=e68b3692ae68ed13fee08b23330cb1bbf4d264bd&v=4P",
                        payment_information="",
                        is_verified=False,
                        is_active=True,
                        created_at=datetime.now(),
                        updated_at=datetime.now(),
                        deleted_at=None,
                    ),
                )
                """create cart"""
                cart_found = self.__crud_cart.get_one_by(
                    db=db, filter={"user_id": created_user.id}
                )
                if cart_found is None:
                    cart_created = self.__crud_cart.create(
                        db=db,
                        obj_in=CartCreateSchema(
                            user_id=created_user.id,
                            total_item=0,
                            total_display_price=0,
                            total_warehouse_price=0,
                            total_discounted_price=0,
                        ),
                    )
                user_out = UserInDBSchema(
                    id=created_user.id,
                    role_id=created_user.role_id,
                    email=created_user.email,
                    phone_number=created_user.phone_number,
                    password_hash=created_user.password_hash,
                    display_name=created_user.display_name,
                    avatar_url=created_user.avatar_url,
                    payment_information=created_user.payment_information,
                    is_verified=created_user.is_verified,
                    is_active=created_user.is_active,
                    created_at=created_user.created_at,
                    updated_at=created_user.updated_at,
                    deleted_at=created_user.deleted_at,
                )
            except:
                logger.exception(
                    f"Exception in {__name__}.{self.__class__.__name__}.sign_up: Cannot create a new user"
                )
                return JSONResponse(
                    status_code=500,
                    content={"status": 500, "message": "Cannot create a new user"},
                )
        else:
            """Raise an exception if email verification is not sent."""
            logger.error(
                f"Error in {__name__}.{self.__class__.__name__}.sign_up: Email verification is not sent"
            )
            return JSONResponse(
                status_code=500,
                content={"status": 500, "message": "Email verification is not sent"},
            )
        return user_out

    def sign_in(self, db: Session, user_credentials: UserSignInSchema) -> TokenSchema:
        """Get user by email."""
        user_found = self.__crud_user.get_one_by(
            db=db, filter={"email": user_credentials.email}
        )
        """Check if user exists"""
        if user_found is None:
            logger.error(
                f"Error in {__name__}.{self.__class__.__name__}.sign_in: User not found"
            )
            return JSONResponse(
                status_code=404, content={"status": 404, "message": "User not found"}
            )
        """Check if password is correct"""
        if not utils.verify(user_credentials.password, user_found.password_hash):
            logger.error(
                f"Error in {__name__}.{self.__class__.__name__}.sign_in: Password is incorrect"
            )
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Password is incorrect"},
            )
        """Generate access token"""
        access_token: str = oauth2.create_access_token(
            data={"user_id": str(user_found.id)}
        )
        """Create a new user session."""
        user_session_created = self.__crud_user_session.create(
            db=db,
            obj_in=UserSessionCreateSchema(
                token=access_token,
                user_id=user_found.id,
                expires_at=utils.get_expires_at(),
            ),
        )
        role_found = self.__crud_role.get(db=db, id=user_found.role_id)
        if role_found is None:
            logger.error(
                f"Error in {__name__}.{self.__class__.__name__}.sign_in: Role not found"
            )
            return JSONResponse(
                status_code=404, content={"status": 404, "message": "Role not found"}
            )
            
        user_out = UserOutSchema(
            id=user_found.id,
            role_name=role_found.role_name,
            email=user_found.email,
            phone_number=user_found.phone_number,
            display_name=user_found.display_name,
            avatar_url=user_found.avatar_url,
            payment_information=user_found.payment_information,
            is_verified=user_found.is_verified,
            is_active=user_found.is_active,
            created_at=user_found.created_at,
            updated_at=user_found.updated_at,
            deleted_at=user_found.deleted_at,
        )

        return TokenSchema(
            access_token=user_session_created.token, token_type="bearer", user=user_out
        )

    def verify_user(self, db: Session, token: str):
        """Get current user."""
        current_user = oauth2.get_current_user(db=db, token=token)
        """Update is_verified field of the user."""
        self.__crud_user.update_one_by(
            db=db, filter={"id": current_user.id}, obj_in={"is_verified": True}
        )
        """Update user session."""
        user_session_updated = self.__crud_user_session.update_one_by(
            db=db,
            filter={"token": token},
            obj_in=UserSessionUpdateSchema(
                token=token,
                expires_at=utils.get_expires_at(),
                updated_at=datetime.now(),
            ),
        )
        """Redirect to the frontend home page."""
        return RedirectResponse(
            url=f"{settings.REDIRECT_FRONTEND_URL}/home?token={user_session_updated.token}"
        )

    async def handle_google_callback(self, request: Request, db: Session):
        """Handle Google OAuth2.0 callback."""
        token = None
        while not token:
            try:
                token = await google_auth.authorize_access_token(request)
            except Exception as e:
                logger.error(
                    f"Error in {__name__}.{__class__.__name__}.handle_google_callback: {e}"
                )
                await asyncio.sleep(1)  # wait for 1 second before trying again
        """Get user info from Google OAuth2.0."""
        try:
            user_info = token.get("userinfo")
            logger.info(f"User info: {user_info}")
        except Exception as e:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.handle_google_callback: {e}"
            )
            return JSONResponse(
                status_code=500,
                content={
                    "status": 500,
                    "message": "Cannot get user info from Google OAuth2.0",
                },
            )
        """Handle logic create user"""
        if user_info:
            request.session["user"] = dict(user_info)
            user_found = self.__crud_user.get_one_by(
                db=db, filter={"email": user_info["email"]}
            )
            if user_found is not None:
                user_session_created = (
                    self.__crud_user_session.create_user_session_with_user_id(
                        db=db, user_id=user_found.id
                    )
                )
                if not user_found.is_verified:
                    is_sended = await send_email.send_verification_email(
                        user_info=user_info,
                        redirect_url=f"{settings.REDIRECT_BACKEND_URL}/api/v1/auth/verification?token={user_session_created.token}",
                        mode=1,
                    )
                    if is_sended:
                        return RedirectResponse(
                            url=f"{settings.REDIRECT_FRONTEND_URL}/success"
                        )
                    return RedirectResponse(
                        url=f"{settings.REDIRECT_FRONTEND_URL}/failed"
                    )
                return RedirectResponse(
                    url=f"{settings.REDIRECT_FRONTEND_URL}/home?token={user_session_created.token}"
                )
            else:
                """Get user role."""
                user_role_found = self.__crud_role.get_one_by(
                    db=db, filter={"role_name": "user"}
                )
                """Create a new user."""
                created_user = self.__crud_user.create_user(
                    db=db,
                    user_create=UserInDBSchema(
                        id=uuid.uuid4(),
                        role_id=user_role_found.id,
                        email=user_info["email"],
                        phone_number="",
                        password_hash=user_info["at_hash"],
                        display_name=user_info["name"],
                        avatar_url=user_info["picture"],
                        payment_information="",
                        is_verified=False,
                        is_active=True,
                        created_at=datetime.now(),
                        updated_at=datetime.now(),
                        deleted_at=None,
                    ),
                )

                """Create a new user session."""
                user_session_created = (
                    self.__crud_user_session.create_user_session_with_user_id(
                        db=db, user_id=created_user.id
                    )
                )
                """Check cart"""
                cart_found = self.__crud_cart.get_one_by(
                    db=db, filter={"user_id": created_user.id}
                )
                """Create cart"""
                if cart_found is None:
                    cart_created = self.__crud_cart.create(
                        db=db,
                        obj_in=CartCreateSchema(
                            user_id=created_user.id,
                            total_item=0,
                            total_display_price=0,
                            total_warehouse_price=0,
                            total_discounted_price=0,
                        ),
                    )

                is_sended = await send_email.send_verification_email(
                    user_info=user_info,
                    redirect_url=f"{settings.REDIRECT_BACKEND_URL}/api/v1/auth/verification?token={user_session_created.token}",
                    mode=1,
                )
                if is_sended:
                    return RedirectResponse(
                        url=f"{settings.REDIRECT_FRONTEND_URL}/success"
                    )
                return RedirectResponse(url=f"{settings.REDIRECT_FRONTEND_URL}/failed")

    def sign_out(self, db: Session, current_user: User):
        user_session_found = self.__crud_user_session.get_one_by(
            db=db, filter={"user_id": current_user.id}
        )
        if user_session_found is not None:
            self.__crud_user_session.remove(db=db, id=user_session_found.id)
            return JSONResponse(
                status_code=200,
                content={"status": 200, "message": "Sign out successful"},
            )
        return JSONResponse(
            status_code=404,
            content={"status": 404, "message": "User session not found"},
        )

    async def forgot_password(self, db: Session, email: EmailSchema):
        user_found = self.__crud_user.get_one_by(db=db, filter={"email": email.email})

        if user_found is None:
            logger.error(
                f"Error in {__name__}.{self.__class__.__name__}.forgot_password: User not found"
            )
            return JSONResponse(
                status_code=404, content={"status": 404, "message": "User not found"}
            )
        password_reset = generate.generate_random_string(8)
        user_updated = self.__crud_user.update_one_by(
            db=db,
            filter={"id": user_found.id},
            obj_in={"password_hash": utils.hash(password_reset)},
        )
        if user_updated is None:
            logger.error(
                f"Error in {__name__}.{self.__class__.__name__}.forgot_password: Password reset failed"
            )
            return JSONResponse(
                status_code=500,
                content={"status": 500, "message": "Update password failed"},
            )
        is_sended = await send_email.send_reset_password_email(
            email=user_found.email,
            display_name=user_found.display_name,
            password_reset=password_reset,
        )
        if is_sended:
            return JSONResponse(
                status_code=200,
                content={"status": 200, "message": "Reset password successful"},
            )
        return JSONResponse(
            status_code=500, content={"status": 500, "message": "Reset password failed"}
        )

    async def change_password(
        self, db: Session, current_user: User, password: ChangePasswordSchema
    ):
        user_found = self.__crud_user.get_one_by(db=db, filter={"id": current_user.id})
        if user_found is None:
            logger.error(
                f"Error in {__name__}.{self.__class__.__name__}.change_password: User not found"
            )
            return JSONResponse(
                status_code=404, content={"status": 404, "message": "User not found"}
            )
        if not utils.verify(password.password_old, user_found.password_hash):
            logger.error(
                f"Error in {__name__}.{self.__class__.__name__}.change_password: Old password is incorrect"
            )
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Old password is incorrect"},
            )
        user_updated = self.__crud_user.update_one_by(
            db=db,
            filter={"id": current_user.id},
            obj_in={"password_hash": utils.hash(password.password_new)},
        )
        if user_updated is None:
            logger.error(
                f"Error in {__name__}.{self.__class__.__name__}.change_password: Change password failed"
            )
            return JSONResponse(
                status_code=500,
                content={"status": 500, "message": "Change password failed"},
            )
        return JSONResponse(
            status_code=200,
            content={"status": 200, "message": "Change password successful"},
        )
