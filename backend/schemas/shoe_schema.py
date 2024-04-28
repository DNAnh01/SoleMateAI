from backend.schemas._base_schema import BaseSchema
import uuid
from typing import Optional
import pydantic

"""Request"""


"""Response"""


"""Base"""


class ShoeCreateSchema(pydantic.BaseModel):
    brand_id: uuid.UUID
    shoe_name: str
    description: str
    display_price: float
    warehouse_price: float
    discounted_price: float


class ShoeUpdateSchema(BaseSchema):
    brand_id: Optional[uuid.UUID]
    shoe_name: Optional[str]
    description: Optional[str]
    display_price: Optional[float]
    warehouse_price: Optional[float]
    discounted_price: Optional[float]


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
