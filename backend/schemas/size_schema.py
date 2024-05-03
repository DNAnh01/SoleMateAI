import uuid
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema


class SizeCreateSchema(pydantic.BaseModel):
    size_number: int
    # sort_order: Optional[int]


class SizeUpdateSchema(BaseSchema):
    size_number: Optional[int] = None
    # sort_order: Optional[int]


class SizeInDBSchema(BaseSchema):
    id: uuid.UUID
    size_number: int
    sort_order: int

    class Config:
        orm_mode = True
