import uuid
from typing import ClassVar, Optional

import pydantic

from backend.schemas._base_schema import BaseSchema
from backend.schemas.user_schema import UserOutInProductDetailPageSchema

class ReviewCreateSchema(pydantic.BaseModel):
    user_id: uuid.UUID
    shoe_id: uuid.UUID
    rating: Optional[int] = None
    comment: Optional[str] = None
    heart_count: Optional[int] = None


class ReviewUpdateSchema(BaseSchema):
    user_id: Optional[uuid.UUID] = None
    shoe_id: Optional[uuid.UUID] = None
    rating: Optional[int] = None
    comment: Optional[str] = None
    heart_count: Optional[int] = None


class ReviewOutInProductDetailPageSchema(pydantic.BaseModel):
    user: UserOutInProductDetailPageSchema
    rating: int
    comment: str
    heart_count: int

class ReviewInDBSchema(BaseSchema):
    ID: ClassVar[str] = "id"
    USER_ID: ClassVar[str] = "user_id"
    SHOE_ID: ClassVar[str] = "shoe_id"
    RATING: ClassVar[str] = "rating"
    COMMENT: ClassVar[str] = "comment"
    HEART_COUNT: ClassVar[str] = "heart_count"
    
    
    id: uuid.UUID
    user_id: uuid.UUID
    shoe_id: uuid.UUID
    rating: int
    comment: str
    heart_count: int

    class Config:
        orm_mode = True
