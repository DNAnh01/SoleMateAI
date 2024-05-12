import uuid
from datetime import datetime
from typing import List, Optional

import pydantic

from backend.schemas._base_schema import BaseSchema
from backend.schemas.cart_item_schema import CartItemOutSchema


class CartCreateSchema(pydantic.BaseModel):
    user_id: uuid.UUID
    total_item: int
    total_display_price: float
    total_warehouse_price: float
    total_discounted_price: float


class CartUpdateSchema(pydantic.BaseModel):
    user_id: Optional[uuid.UUID] = None
    total_item: Optional[int] = None
    total_display_price: Optional[float] = None
    total_warehouse_price: Optional[float] = None
    total_discounted_price: Optional[float] = None
    updated_at: Optional[datetime] = None


class CartOutSchema(pydantic.BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    total_item: int
    total_display_price: float
    total_warehouse_price: float
    total_discounted_price: float

    cart_items: Optional[List[CartItemOutSchema]] = None


class CartInDBSchema(BaseSchema):
    id: uuid.UUID
    user_id: uuid.UUID
    total_item: int
    total_display_price: float
    total_warehouse_price: float
    total_discounted_price: float

    class Config:
        orm_mode = True
