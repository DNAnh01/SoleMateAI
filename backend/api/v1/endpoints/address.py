from typing import Optional

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from backend.api import deps
from backend.common.logger import setup_logger
from backend.core import oauth2
from backend.schemas.address_schema import AddAddressSchema, AddressInDBSchema
from backend.schemas.user_role_permission_schema import \
    UserRolePermissionSchema
from backend.services.abc.address_service import AddressService
from backend.services.impl.address_service_impl import AddressServiceImpl

logger = setup_logger()

address_service: AddressService = AddressServiceImpl()


router = APIRouter()


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=AddressInDBSchema)
def add_or_check_address(
    add_address_req: AddAddressSchema,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> AddressInDBSchema:
    return address_service.add_or_check_address(
        db=db,
        add_address_req=add_address_req,
        current_user_role_permission=current_user_role_permission,
    )


@router.get(
    "/", status_code=status.HTTP_200_OK, response_model=Optional[AddressInDBSchema]
)
def get_current_shipping_address(
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> Optional[AddressInDBSchema]:
    return address_service.get_current_shipping_address(
        db=db, current_user_role_permission=current_user_role_permission
    )
