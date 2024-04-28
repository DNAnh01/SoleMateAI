from backend.schemas._base_schema import BaseSchema

import uuid

from typing import Optional
import pydantic


class ColorCreateSchema(pydantic.BaseModel):
    color_name: str
    hex_value: str
    # sort_order: Optional[int]


class ColorUpdateSchema(BaseSchema):
    color_name: Optional[str]
    hex_value: Optional[str]
    # sort_order: Optional[int]


class ColorInDBSchema(BaseSchema):
    id: uuid.UUID
    color_name: str
    hex_value: str
    # sort_order: Optional[int]

    class Config:
        orm_mode = True
