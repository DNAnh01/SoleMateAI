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
    address_id: Optional[uuid.UUID] = None
    user_id: Optional[uuid.UUID] = None
    order_date: Optional[datetime] = None
    delivery_date: Optional[datetime] = None
    status: Optional[str] = None
    total_item: Optional[int] = None
    total_display_price: Optional[float] = None
    total_warehouse_price: Optional[float] = None
    total_discounted_price: Optional[float] = None


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
