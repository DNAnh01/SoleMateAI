import uuid
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema


class CartItemCreateSchema(pydantic.BaseModel):
    cart_id: uuid.UUID
    shoe_id: uuid.UUID
    quantity: int
    display_price: float
    warehouse_price: float
    discounted_price: float


class CartItemUpdateSchema(BaseSchema):
    cart_id: Optional[uuid.UUID] = None
    shoe_id: Optional[uuid.UUID] = None
    quantity: Optional[int] = None
    display_price: Optional[float] = None
    warehouse_price: Optional[float] = None
    discounted_price: Optional[float] = None


class CartItemInDBSchema(BaseSchema):
    id: uuid.UUID
    cart_id: uuid.UUID
    shoe_id: uuid.UUID
    quantity: int
    display_price: float
    warehouse_price: float
    discounted_price: float

    class Config:
        orm_mode = True
