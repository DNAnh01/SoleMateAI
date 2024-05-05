import uuid
from datetime import datetime
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema


class ConversationCreateSchema(pydantic.BaseModel):
    chatbot_id: Optional[uuid.UUID] = None
    user_id: uuid.UUID
    conversation_name: Optional[str] = None
    started_at: Optional[datetime] = None
    # ended_at: Optional[datetime]
    # rating_score: Optional[float]


class ConversationUpdateSchema(BaseSchema):
    chatbot_id: Optional[uuid.UUID] = None
    user_id: Optional[uuid.UUID] = None
    conversation_name: Optional[str] = None
    started_at: Optional[datetime] = None
    ended_at: Optional[datetime] = None
    rating_score: Optional[float] = None


class ConversationInDBSchema(BaseSchema):
    id: uuid.UUID
    chatbot_id: uuid.UUID
    user_id: uuid.UUID
    conversation_name: str
    started_at: datetime
    ended_at: Optional[datetime]
    rating_score: Optional[float]

    class Config:
        orm_mode = True
