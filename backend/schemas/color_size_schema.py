from backend.schemas._base_schema import BaseSchema

import uuid
import pydantic
from typing import Optional


"""Request"""

"""Response"""

"""Base"""


class ColorSizeCreateSchema(pydantic.BaseModel):
    shoe_color_id: uuid.UUID
    size_id: uuid.UUID
    quantity_in_stock: int
    # reorder: Optional[int]


class ColorSizeUpdateSchema(BaseSchema):
    shoe_color_id: Optional[uuid.UUID]
    size_id: Optional[uuid.UUID]
    quantity_in_stock: Optional[int]
    # reorder: Optional[int]


class ColorSizeInDBSchema(BaseSchema):
    id: uuid.UUID
    shoe_color_id: uuid.UUID
    size_id: uuid.UUID
    quantity_in_stock: int
    reorder: int

    class Config:
        orm_mode = True
