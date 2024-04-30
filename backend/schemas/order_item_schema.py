import uuid
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema

"""Request"""

"""Response"""

"""Base"""


class OrderItemCreateSchema(pydantic.BaseModel):
    order_id: uuid.UUID
    shoe_id: uuid.UUID
    quantity: int
    display_price: float
    warehouse_price: float
    discounted_price: float


class OrderItemUpdateSchema(BaseSchema):
    order_id: Optional[uuid.UUID]
    shoe_id: Optional[uuid.UUID]
    quantity: Optional[int]
    display_price: Optional[float]
    warehouse_price: Optional[float]
    discounted_price: Optional[float]


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
