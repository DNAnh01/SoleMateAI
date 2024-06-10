import uuid
from datetime import datetime
from typing import List, Optional

from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.common.logger import setup_logger
from backend.crud.crud_role import crud_role
from backend.crud.crud_user import crud_user
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.schemas.user_schema import UserOutSchema, UserUpdateSchema
from backend.services.abc.user_service import UserService

logger = setup_logger()


class UserServiceImpl(UserService):

    def __init__(self):
        self.__crud_user = crud_user
        self.__crud_role = crud_role

    """ADMIN"""

    def get_all_users(
        self,
        db: Session,
        common_filters: dict,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[List[UserOutSchema]]:
        if "read_user" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.read_user: User does not have permission"
            )
            return JSONResponse(
                status_code=403,
                content={"status": 403, "message": "User does not have permission"},
            )

        try:
            users = self.__crud_user.get_multi(db=db, filter_param=common_filters)
            if users is None:
                return JSONResponse(
                    status_code=404,
                    content={"status": 404, "message": "User not found"},
                )
            user_out = []
            for user in users:
                role_found = self.__crud_role.get(db=db, id=user.role_id)
                if role_found is None:
                    return JSONResponse(
                        status_code=404,
                        content={"status": 404, "message": "Role not found"},
                    )
                user_out.append(
                    UserOutSchema(
                        id=user.id,
                        role_name=role_found.role_name,
                        email=user.email,
                        phone_number=user.phone_number,
                        display_name=user.display_name,
                        avatar_url=user.avatar_url,
                        payment_information=user.payment_information,
                        is_verified=user.is_verified,
                        is_active=user.is_active,
                        created_at=user.created_at,
                        updated_at=user.updated_at,
                        deleted_at=user.deleted_at,
                    )
                )
        except:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.get_all_users"
            )
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Get all users failed"},
            )
        return user_out

    def get_user_by_id(
        self,
        db: Session,
        user_id: uuid.UUID,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[UserOutSchema]:
        if "read_user" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.read_user: User does not have permission"
            )
            return JSONResponse(
                status_code=403,
                content={"status": 403, "message": "User does not have permission"},
            )
        try:
            user_found = self.__crud_user.get(db=db, id=user_id)
            if user_found is None:
                return JSONResponse(
                    status_code=404,
                    content={"status": 404, "message": "User not found"},
                )
            role_found = self.__crud_role.get(db=db, id=user_found.role_id)
            if role_found is None:
                return JSONResponse(
                    status_code=404,
                    content={"status": 404, "message": "Role not found"},
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
        except:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.get_user_by_id"
            )
            return JSONResponse(
                status_code=400, content={"status": 400, "message": "Get user failed"}
            )
        return user_out

    def disable_user(
        self,
        db: Session,
        user_id: uuid.UUID,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[UserOutSchema]:
        if "delete_user" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.delete_user: User does not have permission"
            )
            return JSONResponse(
                status_code=403,
                content={"status": 403, "message": "User does not have permission"},
            )
        try:
            user_found = self.__crud_user.get(db=db, id=user_id)
            if user_found is None:
                return JSONResponse(
                    status_code=404,
                    content={"status": 404, "message": "User not found"},
                )
            user_found.is_active = False
            user_found.deleted_at = datetime.now()
            db.commit()
            return JSONResponse(
                status_code=200,
                content={"status": 200, "message": "Delete user successfully"},
            )
        except:
            db.rollback()
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.delete_user"
            )
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Delete user failed"},
            )

    """USER"""

    def update_user(
        self,
        db: Session,
        user: UserUpdateSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[UserOutSchema]:
        if "update_user" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.update_user: User does not have permission"
            )
            return JSONResponse(
                status_code=403,
                content={"status": 403, "message": "User does not have permission"},
            )

        try:
            user_found = self.__crud_user.get(
                db=db, id=current_user_role_permission.u_id
            )
            if user_found is None:
                return JSONResponse(
                    status_code=404,
                    content={"status": 404, "message": "User not found"},
                )
            role_found = self.__crud_role.get(db=db, id=user_found.role_id)
            if user.email is not None:
                user_found.email = user.email
            if user.phone_number is not None:
                user_found.phone_number = user.phone_number
            if user.display_name is not None:
                user_found.display_name = user.display_name
            if user.avatar_url is not None:
                user_found.avatar_url = user.avatar_url
            if user.payment_information is not None:
                user_found.payment_information = user.payment_information
            if user.is_verified is not None:
                user_found.is_verified = user.is_verified
            user_found.updated_at = datetime.now()
            db.commit()
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
        except:
            db.rollback()
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.update_user"
            )
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Update user failed"},
            )
        return user_out

    def get_current_user_by_access_token(
        self, db: Session, current_user_role_permission: UserRolePermissionSchema
    ) -> Optional[UserOutSchema]:
        if "read_user" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.read_user: User does not have permission"
            )
            return JSONResponse(
                status_code=403,
                content={"status": 403, "message": "User does not have permission"},
            )

        try:
            user_found = self.__crud_user.get(
                db=db, id=current_user_role_permission.u_id
            )
            if user_found is None:
                return JSONResponse(
                    status_code=404,
                    content={"status": 404, "message": "User not found"},
                )
            role_found = self.__crud_role.get(db=db, id=user_found.role_id)
            if role_found is None:
                return JSONResponse(
                    status_code=404,
                    content={"status": 404, "message": "Role not found"},
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
        except:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.get_current_user"
            )
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Get current user failed"},
            )
        return user_out
