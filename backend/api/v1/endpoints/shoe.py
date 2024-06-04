from typing import List, Optional

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from backend.api import deps
from backend.common import parameters
from backend.common.logger import setup_logger
from backend.core import oauth2
from backend.schemas.shoe_schema import (
    AdminUpdateShoeSchema,
    ShoeCreateSchema,
    ShoeOutInHomePageSchema,
    ShoeOutInProductDetailPageSchema,
    ShoeOutSchema,
)
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.services.abc.shoe_service import ShoeService
from backend.services.impl.shoe_service_impl import ShoeServiceImpl

logger = setup_logger()

shoe_service: ShoeService = ShoeServiceImpl()


router = APIRouter()


@router.post("/", status_code=status.HTTP_200_OK, response_model=ShoeOutSchema)
def create_shoe(
    shoe_data: ShoeCreateSchema,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> ShoeOutSchema:
    shoe_created = shoe_service.create_shoe(
        db=db,
        shoe=shoe_data,
        current_user_role_permission=current_user_role_permission,
    )
    return shoe_created


@router.post(
    "/create-multi", status_code=status.HTTP_200_OK, response_model=List[ShoeOutSchema]
)
def create_multi_shoes(
    shoes_data: List[ShoeCreateSchema],
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> List[ShoeOutSchema]:
    shoes_created = shoe_service.create_multi_shoes(
        db=db,
        shoes=shoes_data,
        current_user_role_permission=current_user_role_permission,
    )

    return shoes_created


@router.get(
    "/shoe-id={shoe_id}",
    status_code=status.HTTP_200_OK,
    response_model=Optional[ShoeOutInProductDetailPageSchema],
)
def get_shoe_by_id(
    shoe_id: str,
    db: Session = Depends(deps.get_db),
) -> Optional[ShoeOutInProductDetailPageSchema]:
    shoe = shoe_service.get_shoe_by_id(
        db=db,
        shoe_id=shoe_id,
    )
    return shoe


@router.get(
    "/get-all",
    status_code=status.HTTP_200_OK,
    response_model=Optional[List[ShoeOutInHomePageSchema]],
)
def get_all_shoes(
    common_filter_parameters: dict = Depends(parameters.common_filter_parameters),
    db: Session = Depends(deps.get_db),
) -> Optional[List[ShoeOutInHomePageSchema]]:
    shoes = shoe_service.get_all_shoes(
        db=db,
        common_filters=common_filter_parameters,
    )
    return shoes


@router.patch(
    "/shoe-id={shoe_id}",
    status_code=status.HTTP_200_OK,
    response_model=Optional[ShoeOutSchema],
)
def update_shoe(
    shoe_id: str,
    shoe_data: AdminUpdateShoeSchema,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> Optional[ShoeOutSchema]:
    shoe = shoe_service.update_shoe(
        db=db,
        shoe_id=shoe_id,
        shoe=shoe_data,
        current_user_role_permission=current_user_role_permission,
    )
    return shoe


@router.delete(
    "/shoe-id={shoe_id}",
    status_code=status.HTTP_200_OK,
    response_model=Optional[ShoeOutSchema],
)
def delete_shoe(
    shoe_id: str,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> Optional[ShoeOutSchema]:
    shoe = shoe_service.delete_shoe(
        db=db,
        shoe_id=shoe_id,
        current_user_role_permission=current_user_role_permission,
    )
    return shoe
