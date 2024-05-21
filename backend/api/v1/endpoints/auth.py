from typing import Optional

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from starlette.requests import Request

from backend.api import deps
from backend.core import oauth2
from backend.core.google_auth import oauth
from backend.schemas.auth_schema import (
    ChangePasswordSchema,
    EmailSchema,
    UserSignInSchema,
    UserSignUpSchema,
)
from backend.schemas.user_schema import UserInDBSchema
from backend.services.abc.auth_service import AuthService
from backend.services.impl.auth_service_impl import AuthServiceImpl

router = APIRouter()
auth_service: AuthService = AuthServiceImpl()


@router.post(
    "/sign-up",
    status_code=status.HTTP_201_CREATED,
    response_model=Optional[UserInDBSchema],
)
async def sign_up(
    user: UserSignUpSchema, db: Session = Depends(deps.get_db)
) -> Optional[UserInDBSchema]:
    return await auth_service.sign_up(db=db, user=user)


@router.post("/sign-in", status_code=status.HTTP_200_OK)
def sign_in(user_credentials: UserSignInSchema, db: Session = Depends(deps.get_db)):
    return auth_service.sign_in(db=db, user_credentials=user_credentials)


@router.get("/sign-in-with-google")
async def sign_in_with_google(request: Request):
    redirect_uri = request.url_for("callback")
    return await oauth.google.authorize_redirect(request, redirect_uri)


@router.get("/callback")
async def callback(
    request: Request,
    db: Session = Depends(deps.get_db),
):
    return await auth_service.handle_google_callback(request, db)


@router.get("/verification")
def verification(
    token: str,
    db: Session = Depends(deps.get_db),
):
    return auth_service.verify_user(db=db, token=token)


@router.get("/sign-out", status_code=status.HTTP_200_OK)
def sign_out(
    current_user=Depends(oauth2.get_current_user),
    db: Session = Depends(deps.get_db),
):
    return auth_service.sign_out(db=db, current_user=current_user)


@router.post("/forgot-password", status_code=status.HTTP_200_OK)
async def forgot_password(
    email: EmailSchema,
    db: Session = Depends(deps.get_db),
):
    return await auth_service.forgot_password(db=db, email=email)


@router.post("/change-password")
async def change_password(
    change_password: ChangePasswordSchema,
    current_user=Depends(oauth2.get_current_user),
    db: Session = Depends(deps.get_db),
):
    return await auth_service.change_password(
        db=db, current_user=current_user, password=change_password
    )
