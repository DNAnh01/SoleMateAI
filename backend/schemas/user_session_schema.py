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
    user_id: Optional[uuid.UUID] = None
    token: Optional[str] = None
    expires_at: Optional[datetime] = None


class UserSessionInDBSchema(BaseSchema):
    id: uuid.UUID
    user_id: uuid.UUID
    token: str
    expires_at: datetime

    class Config:
        orm_mode = True
