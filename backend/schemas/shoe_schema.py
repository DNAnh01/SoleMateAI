import uuid
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema
from backend.schemas.brand_schema import BrandCreateSchema
from backend.schemas.color_schema import ColorCreateSchema
from backend.schemas.size_schema import SizeCreateSchema

class ShoeCreateSchema(pydantic.BaseModel):
    # brand_id: uuid.UUID
    brand: BrandCreateSchema
    size: SizeCreateSchema
    color: ColorCreateSchema
    image_url: str
    shoe_name: str
    description: str
    quantity_in_stock: int
    display_price: float
    warehouse_price: float
    discounted_price: Optional[float] = None
    
class ShoeUpdateSchema(BaseSchema):
    brand: Optional[BrandCreateSchema] = None
    size: Optional[SizeCreateSchema] = None
    color: Optional[ColorCreateSchema] = None
    image_url: Optional[str] = None
    shoe_name: Optional[str] = None
    description: Optional[str] = None
    quantity_in_stock: Optional[int] = None
    display_price: Optional[float] = None
    warehouse_price: Optional[float] = None
    discounted_price: Optional[float] = None

class ShoeOutSchema(BaseSchema):
    id: uuid.UUID
    brand: BrandCreateSchema
    size: SizeCreateSchema
    color: ColorCreateSchema
    image_url: str
    shoe_name: str
    description: str
    quantity_in_stock: int
    display_price: float
    warehouse_price: float
    discounted_price: float


class ShoeInDBSchema(BaseSchema):
    id: uuid.UUID
    brand_id: uuid.UUID
    size_id: uuid.UUID
    color_id: uuid.UUID
    image_url: str
    shoe_name: str
    description: str
    quantity_in_stock: int
    display_price: float
    warehouse_price: float
    discounted_price: float

    class Config:
        orm_mode = True
