import uuid
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema


class ShoePromotionCreateSchema(pydantic.BaseModel):
    shoe_id: uuid.UUID
    promotion_id: uuid.UUID


class ShoePromotionUpdateSchema(BaseSchema):
    shoe_id: Optional[uuid.UUID] = None
    promotion_id: Optional[uuid.UUID] = None


class ShoePromotionInDBSchema(BaseSchema):
    id: uuid.UUID
    shoe_id: uuid.UUID
    promotion_id: uuid.UUID

    class Config:
        orm_mode = True
