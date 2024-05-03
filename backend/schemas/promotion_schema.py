import uuid
from datetime import datetime
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema


class PromotionCreateSchema(pydantic.BaseModel):
    promotion_name: str
    start_date: datetime
    end_date: datetime
    discount_percent: int


class PromotionUpdateSchema(BaseSchema):
    promotion_name: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    discount_percent: Optional[int] = None


class PromotionInDBSchema(BaseSchema):
    id: uuid.UUID
    promotion_name: str
    start_date: datetime
    end_date: datetime
    discount_percent: int

    class Config:
        orm_mode = True
