from backend.schemas._base_schema import BaseSchema

from datetime import datetime
import uuid
from typing import Optional
import pydantic


class PromotionCreateSchema(pydantic.BaseModel):
    promotion_name: str
    start_date: datetime
    end_date: datetime
    discount_percent: int


class PromotionUpdateSchema(BaseSchema):
    promotion_name: Optional[str]
    start_date: Optional[datetime]
    end_date: Optional[datetime]
    discount_percent: Optional[int]


class PromotionInDBSchema(BaseSchema):
    id: uuid.UUID
    promotion_name: str
    start_date: datetime
    end_date: datetime
    discount_percent: int

    class Config:
        orm_mode = True
