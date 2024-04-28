from backend.crud.base import CRUDBase
from backend.models.cart_item import CartItem
from backend.schemas.cart_item_schema import CartItemCreateSchema, CartItemUpdateSchema


class CRUDCartItem(CRUDBase[CartItem, CartItemCreateSchema, CartItemUpdateSchema]):
    pass


crud_cart_item = CRUDCartItem(CartItem)
