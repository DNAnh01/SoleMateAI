import uuid
from datetime import datetime
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema


class OrderCreateSchema(pydantic.BaseModel):
    address_id: uuid.UUID
    user_id: uuid.UUID
    order_date: datetime
    delivery_date: datetime
    status: str
    total_item: int
    total_display_price: float
    total_warehouse_price: float
    total_discounted_price: float


class OrderUpdateSchema(BaseSchema):
    address_id: Optional[uuid.UUID]
    user_id: Optional[uuid.UUID]
    order_date: Optional[datetime]
    delivery_date: Optional[datetime]
    status: Optional[str]
    total_item: Optional[int]
    total_display_price: Optional[float]
    total_warehouse_price: Optional[float]
    total_discounted_price: Optional[float]


class OrderInDBSchema(BaseSchema):
    id: uuid.UUID
    address_id: uuid.UUID
    user_id: uuid.UUID
    order_date: datetime
    delivery_date: datetime
    status: str
    total_item: int
    total_display_price: float
    total_warehouse_price: float
    total_discounted_price: float

    class Config:
        orm_mode = True
