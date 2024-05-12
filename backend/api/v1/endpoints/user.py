from typing import List, Optional

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from backend.api import deps
from backend.common import parameters
from backend.common.logger import setup_logger
from backend.core import oauth2
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.schemas.user_schema import UserOutSchema, UserUpdateSchema
from backend.services.abc.user_service import UserService
from backend.services.impl.user_service_impl import UserServiceImpl

logger = setup_logger()

user_service: UserService = UserServiceImpl()


router = APIRouter()



"""ADMIN"""
@router.get(
    "/get-all",
    status_code=status.HTTP_200_OK,
    response_model=Optional[List[UserOutSchema]],
)
def get_all_users(
    common_filter_parameters: dict = Depends(parameters.common_filter_parameters),
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> Optional[List[UserOutSchema]]:
    users = user_service.get_all_users(
        db=db,
        common_filters=common_filter_parameters,
        current_user_role_permission=current_user_role_permission,
    )
    return users


@router.get(
    "/user-id={user_id}",
    status_code=status.HTTP_200_OK,
    response_model=Optional[UserOutSchema],
)
def get_user_by_id(
    user_id: str,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> Optional[UserOutSchema]:
    user = user_service.get_user_by_id(
        db=db,
        user_id=user_id,
        current_user_role_permission=current_user_role_permission,
    )
    return user

@router.delete(
    "/user-id={user_id}",
    status_code=status.HTTP_200_OK,
    response_model=Optional[UserOutSchema],
)
def delete_user(
    user_id: str,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> Optional[UserOutSchema]:
    user = user_service.delete_user(
        db=db,
        user_id=user_id,
        current_user_role_permission=current_user_role_permission,
    )
    return user


"""USER"""
@router.patch(
    "/profile", status_code=status.HTTP_200_OK, response_model=Optional[UserOutSchema]
)
def update_user(
    user_data: UserUpdateSchema,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> Optional[UserOutSchema]:
    user = user_service.update_user(
        db=db,
        user=user_data,
        current_user_role_permission=current_user_role_permission,
    )
    return user


@router.get(
    "/profile", status_code=status.HTTP_200_OK, response_model=Optional[UserOutSchema]
)
def get_current_user_by_access_token(
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> Optional[UserOutSchema]:
    user = user_service.get_current_user_by_access_token(
        db=db,
        current_user_role_permission=current_user_role_permission,
    )
    return user