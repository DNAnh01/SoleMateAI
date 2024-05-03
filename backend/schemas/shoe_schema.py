import uuid
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema


class ShoeCreateSchema(pydantic.BaseModel):
    brand_id: uuid.UUID
    shoe_name: str
    description: str
    display_price: float
    warehouse_price: float
    discounted_price: float


class ShoeUpdateSchema(BaseSchema):
    brand_id: Optional[uuid.UUID] = None
    shoe_name: Optional[str] = None
    description: Optional[str] = None
    display_price: Optional[float] = None
    warehouse_price: Optional[float] = None
    discounted_price: Optional[float] = None


class ShoeInDBSchema(BaseSchema):
    id: uuid.UUID
    brand_id: uuid.UUID
    shoe_name: str
    description: str
    display_price: float
    warehouse_price: float
    discounted_price: float

    class Config:
        orm_mode = True
