import uuid
from datetime import datetime
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema


class UserSessionCreateSchema(pydantic.BaseModel):
    user_id: uuid.UUID
    token: str
    expires_at: datetime


class UserSessionUpdateSchema(BaseSchema):
    user_id: Optional[uuid.UUID]
    token: Optional[str]
    expires_at: Optional[datetime]


class UserSessionInDBSchema(BaseSchema):
    id: uuid.UUID
    user_id: uuid.UUID
    token: str
    expires_at: datetime

    class Config:
        orm_mode = True
