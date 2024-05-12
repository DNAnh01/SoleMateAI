import uuid
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema
from backend.schemas.shoe_schema import ShoeOutSchema


class OrderItemCreateSchema(pydantic.BaseModel):
    order_id: uuid.UUID
    shoe_id: uuid.UUID
    quantity: int
    display_price: float
    warehouse_price: float
    discounted_price: float


class OrderItemUpdateSchema(BaseSchema):
    order_id: Optional[uuid.UUID] = None
    shoe_id: Optional[uuid.UUID] = None
    quantity: Optional[int] = None
    display_price: Optional[float] = None
    warehouse_price: Optional[float] = None
    discounted_price: Optional[float] = None


class OrderItemOutSchema(pydantic.BaseModel):
    id: uuid.UUID
    order_id: uuid.UUID
    shoe_id: uuid.UUID
    shoe: ShoeOutSchema
    quantity: int
    display_price: float
    warehouse_price: float
    discounted_price: float

class OrderItemInDBSchema(BaseSchema):
    id: uuid.UUID
    order_id: uuid.UUID
    shoe_id: uuid.UUID
    quantity: int
    display_price: float
    warehouse_price: float
    discounted_price: float

    class Config:
        orm_mode = True
