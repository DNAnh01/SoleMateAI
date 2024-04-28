from backend.schemas._base_schema import BaseSchema
import uuid
import pydantic
from typing import Optional


"""Request"""

"""Response"""

"""Base"""


class ShoeColorCreateSchema(pydantic.BaseModel):
    shoe_id: uuid.UUID
    color_id: uuid.UUID
    # sort_order: Optional[int]
    image_url: str


class ShoeColorUpdateSchema(BaseSchema):
    shoe_id: Optional[uuid.UUID]
    color_id: Optional[uuid.UUID]
    # sort_order: Optional[int]
    image_url: Optional[str]


class ShoeColorInDBSchema(BaseSchema):
    id: uuid.UUID
    shoe_id: uuid.UUID
    color_id: uuid.UUID
    sort_order: int
    image_url: str

    class Config:
        orm_mode = True
