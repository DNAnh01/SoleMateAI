import uuid
from datetime import datetime
from typing import Optional

from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.common.logger import setup_logger
from backend.crud.crud_cart import crud_cart
from backend.crud.crud_cart_item import crud_cart_item
from backend.crud.crud_shoe import crud_shoe
from backend.schemas.cart_item_schema import (
    CartItemCreateSchema,
    CartItemInDBSchema,
    CartItemRemoveSchema,
    CartItemUpdateSchema,
)
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.services.abc.cart_item_service import CartItemService

logger = setup_logger()


class CartItemServiceImpl(CartItemService):
    def __init__(self):
        self.__crud_cart_item = crud_cart_item
        self.__crud_shoe = crud_shoe
        self.__crud_cart = crud_cart

    def create_cart_item(
        self,
        db: Session,
        cart_item_create: CartItemCreateSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> CartItemInDBSchema:
        if (
            "create_cart_item"
            not in current_user_role_permission.u_list_permission_name
        ):
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.create_cart_item: User does not have permission to create cart item"
            )
            return JSONResponse(
                status_code=400,
                content="Create Cart Item failed: User does not have permission to create cart item",
            )
        try:
            shoe_found = self.__crud_shoe.get(db=db, id=cart_item_create.shoe_id)

            if shoe_found is None:
                logger.exception(
                    f"Exception in {__name__}.{self.__class__.__name__}.create_cart_item: Shoe not found"
                )
                return JSONResponse(
                    status_code=400, content="Create Cart Item failed: Shoe not found"
                )

            cart_found = self.__crud_cart.get_one_by(
                db=db, filter={"user_id": current_user_role_permission.u_id}
            )

            if cart_found is None:
                logger.exception(
                    f"Exception in {__name__}.{self.__class__.__name__}.create_cart_item: Cart not found"
                )
                return JSONResponse(
                    status_code=400, content="Create Cart Item failed: Cart not found"
                )
            """
            class CartItemCreateSchema(pydantic.BaseModel):
            shoe_id: uuid.UUID
            quantity: int
            """

            cart_item_created = self.__crud_cart_item.create(
                db=db,
                obj_in=CartItemInDBSchema(
                    id=uuid.uuid4(),
                    cart_id=cart_found.id,
                    shoe_id=shoe_found.id,
                    quantity=cart_item_create.quantity,
                    display_price=cart_item_create.quantity * shoe_found.display_price,
                    warehouse_price=cart_item_create.quantity
                    * shoe_found.warehouse_price,
                    discounted_price=cart_item_create.quantity
                    * shoe_found.discounted_price,
                    is_active=True,
                    created_at=datetime.now(),
                    updated_at=datetime.now(),
                    deleted_at=None,
                ),
            )

        except:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.create_cart_item"
            )
            return JSONResponse(status_code=400, content="Create Cart Item failed")
        return cart_item_created

    def is_cart_item_exists(
        self, db: Session, cart_id: uuid.UUID, shoe_id: uuid.UUID
    ) -> Optional[CartItemInDBSchema]:
        return self.__crud_cart_item.is_cart_item_exists(
            db=db, cart_id=cart_id, shoe_id=shoe_id
        )

    def update_cart_item(
        self,
        db: Session,
        cart_item_update: CartItemUpdateSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> CartItemInDBSchema:
        if (
            "update_cart_item"
            not in current_user_role_permission.u_list_permission_name
        ):
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.update_cart_item: User does not have permission to update cart item"
            )
            return JSONResponse(
                status_code=400,
                content="Update Cart Item failed: User does not have permission to update cart item",
            )
        """
        class CartItemUpdateSchema(BaseSchema):
        shoe_id: Optional[uuid.UUID] = None
        quantity: Optional[int] = None
        """
        try:
            shoe_found = self.__crud_shoe.get(db=db, id=cart_item_update.shoe_id)
            if shoe_found is None:
                logger.exception(
                    f"Exception in {__name__}.{self.__class__.__name__}.update_cart_item: Shoe not found"
                )
                return JSONResponse(
                    status_code=400, content="Update Cart Item failed: Shoe not found"
                )

            cart_found = self.__crud_cart.get_one_by(
                db=db, filter={"user_id": current_user_role_permission.u_id}
            )
            if cart_found is None:
                logger.exception(
                    f"Exception in {__name__}.{self.__class__.__name__}.update_cart_item: Cart not found"
                )
                return JSONResponse(
                    status_code=400, content="Update Cart Item failed: Cart not found"
                )

            cart_item_found = self.__crud_cart_item.get_one_by(
                db=db,
                filter={"cart_id": cart_found.id, "shoe_id": cart_item_update.shoe_id},
            )

            if cart_item_found is None:
                logger.exception(
                    f"Exception in {__name__}.{self.__class__.__name__}.update_cart_item: Cart Item not found"
                )
                return JSONResponse(
                    status_code=400,
                    content="Update Cart Item failed: Cart Item not found",
                )

            cart_item_found.quantity = cart_item_update.quantity
            cart_item_found.display_price = (
                cart_item_update.quantity * shoe_found.display_price
            )
            cart_item_found.warehouse_price = (
                cart_item_update.quantity * shoe_found.warehouse_price
            )
            cart_item_found.discounted_price = (
                cart_item_update.quantity * shoe_found.discounted_price
            )
            cart_item_found.updated_at = datetime.now()

            db.commit()

            cart_item_out = CartItemInDBSchema(
                id=cart_item_found.id,
                cart_id=cart_item_found.cart_id,
                shoe_id=cart_item_found.shoe_id,
                quantity=cart_item_found.quantity,
                display_price=cart_item_found.display_price,
                warehouse_price=cart_item_found.warehouse_price,
                discounted_price=cart_item_found.discounted_price,
                is_active=cart_item_found.is_active,
                created_at=cart_item_found.created_at,
                updated_at=cart_item_found.updated_at,
                deleted_at=cart_item_found.deleted_at,
            )

        except:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.update_cart_item"
            )
            return JSONResponse(status_code=400, content="Update Cart Item failed")
        return cart_item_out

    def remove_cart_item(
        self,
        db: Session,
        cart_item_remove: CartItemRemoveSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> JSONResponse:
        if (
            "delete_cart_item"
            not in current_user_role_permission.u_list_permission_name
        ):
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.remove_cart_item: User does not have permission to remove cart item"
            )
            return JSONResponse(
                status_code=400,
                content="Remove Cart Item failed: User does not have permission to remove cart item",
            )
        try:
            """
            class CartItemRemoveSchema(BaseSchema):
            # cart_id: uuid.UUID
            shoe_id: uuid.UUID
            """
            cart_found = self.__crud_cart.get_one_by(
                db=db, filter={"user_id": current_user_role_permission.u_id}
            )
            if cart_found is None:
                logger.exception(
                    f"Exception in {__name__}.{self.__class__.__name__}.remove_cart_item: Cart not found"
                )
                return JSONResponse(
                    status_code=400, content="Remove Cart Item failed: Cart not found"
                )

            cart_item_found = self.__crud_cart_item.get_one_by(
                db=db,
                filter={"cart_id": cart_found.id, "shoe_id": cart_item_remove.shoe_id},
            )

            if cart_item_found is None:
                logger.exception(
                    f"Exception in {__name__}.{self.__class__.__name__}.remove_cart_item: Cart Item not found"
                )
                return JSONResponse(
                    status_code=400,
                    content="Remove Cart Item failed: Cart Item not found",
                )

            cart_item_found.is_active = False
            cart_item_found.deleted_at = datetime.now()

            db.commit()

            return JSONResponse(status_code=200, content="Remove Cart Item successful")
        except:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.remove_cart_item"
            )
            return JSONResponse(status_code=400, content="Remove Cart Item failed")
