import uuid
from typing import ClassVar, Optional

import pydantic

from backend.schemas._base_schema import BaseSchema
from backend.schemas.shoe_schema import ShoeOutSchema


class AddCartItemSchema(pydantic.BaseModel):
    shoe_id: uuid.UUID
    quantity: int


class CartItemCreateSchema(pydantic.BaseModel):
    shoe_id: uuid.UUID
    quantity: int


class CartItemUpdateSchema(pydantic.BaseModel):
    shoe_id: Optional[uuid.UUID] = None
    quantity: Optional[int] = None


class CartItemRemoveSchema(pydantic.BaseModel):
    shoe_id: uuid.UUID


class CartItemOutSchema(pydantic.BaseModel):

    id: uuid.UUID
    cart_id: uuid.UUID
    shoe_id: uuid.UUID
    shoe: ShoeOutSchema
    quantity: int
    display_price: float
    warehouse_price: float
    discounted_price: float


class CartItemInDBSchema(BaseSchema):
    ID: ClassVar[str] = "id"
    CART_ID: ClassVar[str] = "cart_id"
    SHOE_ID: ClassVar[str] = "shoe_id"
    QUANTITY: ClassVar[str] = "quantity"
    DISPLAY_PRICE: ClassVar[str] = "display_price"
    WAREHOUSE_PRICE: ClassVar[str] = "warehouse_price"
    DISCOUNTED_PRICE: ClassVar[str] = "discounted_price"

    id: uuid.UUID
    cart_id: uuid.UUID
    shoe_id: uuid.UUID
    quantity: int
    display_price: float
    warehouse_price: float
    discounted_price: float

    class Config:
        orm_mode = True
