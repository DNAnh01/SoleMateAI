from typing import List, Optional

from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.api import deps
from backend.common import parameters
from backend.common.logger import setup_logger
from backend.core import oauth2
from backend.schemas.order_schema import OrderOutSchema
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.services.abc.admin_order_service import AdminOrderService
from backend.services.impl.admin_order_service_impl import AdminOrderServiceImpl

logger = setup_logger()

admin_order_service: AdminOrderService = AdminOrderServiceImpl()


router = APIRouter()


@router.get(
    "/get-all",
    status_code=status.HTTP_200_OK,
    response_model=Optional[List[OrderOutSchema]],
)
def get_all_order(
    common_filter_parameters: dict = Depends(parameters.common_filter_parameters),
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> Optional[List[OrderOutSchema]]:
    return admin_order_service.get_all_order(
        db=db,
        common_filters=common_filter_parameters,
        current_user_role_permission=current_user_role_permission,
    )


@router.get(
    "/order-id={order_id}",
    status_code=status.HTTP_200_OK,
    response_model=Optional[OrderOutSchema],
)
def get_order_by_id(
    order_id: str,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> Optional[OrderOutSchema]:
    return admin_order_service.get_order_by_id(
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
    return admin_order_service.cancel_order(
        db=db,
        order_id=order_id,
        current_user_role_permission=current_user_role_permission,
    )

@router.patch("/shipping/order-id={order_id}", status_code=status.HTTP_200_OK)
def shipping_order(
    order_id: str,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> JSONResponse:
    return admin_order_service.shipping_order(
        db=db,
        order_id=order_id,
        current_user_role_permission=current_user_role_permission,
    )

@router.patch("/deliver/order-id={order_id}", status_code=status.HTTP_200_OK)
def deliver_order(
    order_id: str,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> JSONResponse:
    return admin_order_service.deliver_order(
        db=db,
        order_id=order_id,
        current_user_role_permission=current_user_role_permission,
    )
