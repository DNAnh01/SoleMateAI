import uuid
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema


class BrandCreateSchema(pydantic.BaseModel):
    brand_name: Optional[str] = None
    brand_logo: Optional[str] = None
    # sort_order: Optional[int]


class BrandUpdateSchema(BaseSchema):
    brand_name: Optional[str] = None
    brand_logo: Optional[str] = None
    # sort_order: Optional[int]


class BrandInDBSchema(BaseSchema):
    id: uuid.UUID
    brand_name: str
    brand_logo: str
    # sort_order: Optional[int]

    class Config:
        orm_mode = True
