from backend.schemas._base_schema import BaseSchema

import uuid
from typing import Optional
import pydantic


class ShoePromotionCreateSchema(pydantic.BaseModel):
    shoe_id: uuid.UUID
    promotion_id: uuid.UUID


class ShoePromotionUpdateSchema(BaseSchema):
    shoe_id: Optional[uuid.UUID]
    promotion_id: Optional[uuid.UUID]


class ShoePromotionInDBSchema(BaseSchema):
    shoe_id: uuid.UUID
    promotion_id: uuid.UUID

    class Config:
        orm_mode = True
