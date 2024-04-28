from backend.schemas._base_schema import BaseSchema

from typing import Optional
import uuid
import pydantic

"""Request"""

"""Response"""

"""Base"""


class CartCreateSchema(pydantic.BaseModel):
    user_id: uuid.UUID
    total_item: int
    total_display_price: float
    total_warehouse_price: float
    total_discounted_price: float


class CartUpdateSchema(BaseSchema):
    user_id: Optional[uuid.UUID]
    total_item: Optional[int]
    total_display_price: Optional[float]
    total_warehouse_price: Optional[float]
    total_discounted_price: Optional[float]


class CartInDBSchema(BaseSchema):
    id: uuid.UUID
    user_id: uuid.UUID
    total_item: int
    total_display_price: float
    total_warehouse_price: float
    total_discounted_price: float

    class Config:
        orm_mode = True
