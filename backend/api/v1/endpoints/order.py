from typing import Optional, List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from backend.common import parameters
from backend.api import deps
from backend.common.logger import setup_logger
from backend.core import oauth2
from backend.schemas.address_schema import AddAddressSchema
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.schemas.order_schema import OrderOutSchema
from fastapi.responses import JSONResponse

from backend.services.abc.order_service import OrderService
from backend.services.impl.order_service_impl import OrderServiceImpl

logger = setup_logger()

order_service: OrderService = OrderServiceImpl()


router = APIRouter()

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=Optional[OrderOutSchema])
def create_order(
    shipping_address: AddAddressSchema,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> Optional[OrderOutSchema]:
    return order_service.create_order(
        db=db,
        shipping_address=shipping_address,
        current_user_role_permission=current_user_role_permission,
)
    
@router.get("/get-all", status_code=status.HTTP_200_OK, response_model=Optional[List[OrderOutSchema]])
def get_history_order(
    common_filter_parameters: dict = Depends(parameters.common_filter_parameters),
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> Optional[List[OrderOutSchema]]:
    return order_service.get_history_order(
        db=db,
        common_filters=common_filter_parameters,
        current_user_role_permission=current_user_role_permission,
    )
    
@router.get("/order-id={order_id}", status_code=status.HTTP_200_OK, response_model=Optional[OrderOutSchema])
def get_order_by_id(
    order_id: str,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> Optional[OrderOutSchema]:
    return order_service.get_order_by_id(
        db=db,
        order_id=order_id,
        current_user_role_permission=current_user_role_permission,
    )

@router.patch("/cancel/order-id={order_id}", status_code=status.HTTP_200_OK)
def cancel_order(
    order_id: str,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> JSONResponse:
    return order_service.cancel_order(
        db=db,
        order_id=order_id,
        current_user_role_permission=current_user_role_permission,
    )