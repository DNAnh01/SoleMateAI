from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.api import deps
from backend.common.logger import setup_logger
from backend.core import oauth2
from backend.schemas.cart_item_schema import (
    AddCartItemSchema,
    CartItemRemoveMultipleSchema,
    CartItemRemoveSchema,
)
from backend.schemas.cart_schema import CartOutSchema
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.services.abc.cart_item_service import CartItemService
from backend.services.abc.cart_service import CartService
from backend.services.impl.cart_item_service_impl import CartItemServiceImpl
from backend.services.impl.cart_service_impl import CartServiceImpl

logger = setup_logger()

cart_service: CartService = CartServiceImpl()
cart_item_service: CartItemService = CartItemServiceImpl()

router = APIRouter()


@router.post("/add-cart-item", status_code=status.HTTP_200_OK)
def add_cart_item(
    add_cart_item_req: AddCartItemSchema,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> JSONResponse:
    response = cart_service.add_cart_item(
        db=db,
        add_cart_item_req=add_cart_item_req,
        current_user_role_permission=current_user_role_permission,
    )
    return response


@router.delete("/remove-cart-item", status_code=status.HTTP_200_OK)
def remove_cart_item(
    remove_cart_item_req: CartItemRemoveSchema,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> JSONResponse:
    response = cart_item_service.remove_cart_item(
        db=db,
        cart_item_remove=remove_cart_item_req,
        current_user_role_permission=current_user_role_permission,
    )
    return response


@router.post("/remove-multiple-cart-items", status_code=status.HTTP_200_OK)
def remove_multiple_cart_items(
    remove_multiple_cart_items_req: CartItemRemoveMultipleSchema,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> JSONResponse:
    response = cart_item_service.remove_multiple_cart_items(
        db=db,
        cart_item_remove_multiple=remove_multiple_cart_items_req,
        current_user_role_permission=current_user_role_permission,
    )
    return response


@router.get("/get-all", status_code=status.HTTP_200_OK)
def get_cart(
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> CartOutSchema:
    return cart_service.get_cart(
        db=db, current_user_role_permission=current_user_role_permission
    )
