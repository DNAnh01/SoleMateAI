import uuid
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema


class ShoeColorCreateSchema(pydantic.BaseModel):
    shoe_id: uuid.UUID
    color_id: uuid.UUID
    # sort_order: Optional[int]
    image_url: str


class ShoeColorUpdateSchema(BaseSchema):
    shoe_id: Optional[uuid.UUID] = None
    color_id: Optional[uuid.UUID] = None
    # sort_order: Optional[int] = None
    image_url: Optional[str] = None


class ShoeColorInDBSchema(BaseSchema):
    id: uuid.UUID
    shoe_id: uuid.UUID
    color_id: uuid.UUID
    sort_order: int
    image_url: str

    class Config:
        orm_mode = True
