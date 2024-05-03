import uuid
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema


class ColorSizeCreateSchema(pydantic.BaseModel):
    shoe_color_id: uuid.UUID
    size_id: uuid.UUID
    quantity_in_stock: int
    # reorder: Optional[int]


class ColorSizeUpdateSchema(BaseSchema):
    shoe_color_id: Optional[uuid.UUID] = None
    size_id: Optional[uuid.UUID] = None
    quantity_in_stock: Optional[int] = None
    # reorder: Optional[int]


class ColorSizeInDBSchema(BaseSchema):
    id: uuid.UUID
    shoe_color_id: uuid.UUID
    size_id: uuid.UUID
    quantity_in_stock: int
    reorder: int

    class Config:
        orm_mode = True
