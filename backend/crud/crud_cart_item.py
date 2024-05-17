import uuid
from typing import Optional

from sqlalchemy import text
from sqlalchemy.orm import Session

from backend.common.logger import setup_logger
from backend.crud.base import CRUDBase
from backend.models.cart_item import CartItem
from backend.schemas.cart_item_schema import (
    CartItemCreateSchema,
    CartItemInDBSchema,
    CartItemUpdateSchema,
)

logger = setup_logger()

GET_CART_ITEM_BY_CART_ID_AND_SHOE_ID = \
    f"""
    SELECT 
        ci.id AS {CartItemInDBSchema.ID}, 
        ci.cart_id AS {CartItemInDBSchema.CART_ID}, 
        ci.shoe_id AS {CartItemInDBSchema.SHOE_ID}, 
        ci.quantity AS {CartItemInDBSchema.QUANTITY}, 
        ci.display_price AS {CartItemInDBSchema.DISPLAY_PRICE}, 
        ci.warehouse_price AS {CartItemInDBSchema.WAREHOUSE_PRICE}, 
        ci.discounted_price AS {CartItemInDBSchema.DISCOUNTED_PRICE}, 
        ci.is_active AS {CartItemInDBSchema.IS_ACTIVE}, 
        ci.created_at AS {CartItemInDBSchema.CREATED_AT}, 
        ci.updated_at AS {CartItemInDBSchema.UPDATED_AT}, 
        ci.deleted_at AS {CartItemInDBSchema.DELETED_AT} 
    FROM cart_items AS ci 
    WHERE ci.cart_id = :cart_id 
    AND ci.shoe_id = :shoe_id 
    AND ci.deleted_at IS NULL;
    """


class CRUDCartItem(CRUDBase[CartItem, CartItemCreateSchema, CartItemUpdateSchema]):
    def is_cart_item_exists(
        self, db: Session, cart_id: uuid.UUID, shoe_id: uuid.UUID
    ) -> Optional[CartItemInDBSchema]:
        result_proxy = db.execute(
            text(GET_CART_ITEM_BY_CART_ID_AND_SHOE_ID),
            {"cart_id": cart_id, "shoe_id": shoe_id},
        )
        column_names = result_proxy.keys()
        result = result_proxy.fetchone()
        if result:
            result_dict = dict(zip(column_names, result))
            logger.info(f"result_dict: {result_dict}")
            return CartItemInDBSchema(**result_dict)
        return None


crud_cart_item = CRUDCartItem(CartItem)
