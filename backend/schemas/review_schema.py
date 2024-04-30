import uuid
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema


class ReviewCreateSchema(pydantic.BaseModel):
    user_id: uuid.UUID
    shoe_id: uuid.UUID
    rating: Optional[int] = None
    comment: Optional[str] = None
    heart_count: Optional[int] = None


class ReviewUpdateSchema(BaseSchema):
    user_id: Optional[uuid.UUID]
    shoe_id: Optional[uuid.UUID]
    rating: Optional[int]
    comment: Optional[str]
    heart_count: Optional[int]


class ReviewInDBSchema(BaseSchema):
    id: uuid.UUID
    user_id: uuid.UUID
    shoe_id: uuid.UUID
    rating: int
    comment: str
    heart_count: int

    class Config:
        orm_mode = True
