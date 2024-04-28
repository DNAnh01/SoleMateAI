from backend.crud.base import CRUDBase
from backend.models.cart import Cart
from backend.schemas.cart_schema import CartCreateSchema, CartUpdateSchema


class CRUDCart(CRUDBase[Cart, CartCreateSchema, CartUpdateSchema]):
    pass


crud_cart = CRUDCart(Cart)
