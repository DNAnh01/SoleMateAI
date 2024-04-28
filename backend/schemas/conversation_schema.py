from backend.schemas._base_schema import BaseSchema
import uuid
from typing import Optional
from datetime import datetime
import pydantic


class ConversationCreateSchema(pydantic.BaseModel):
    chatbot_id: uuid.UUID
    user_id: uuid.UUID
    started_at: datetime
    # ended_at: Optional[datetime]
    # rating_score: Optional[float]


class ConversationUpdateSchema(BaseSchema):
    chatbot_id: Optional[uuid.UUID]
    user_id: Optional[uuid.UUID]
    started_at: Optional[datetime]
    ended_at: Optional[datetime]
    rating_score: Optional[float]


class ConversationInDBSchema(BaseSchema):
    id: uuid.UUID
    chatbot_id: uuid.UUID
    user_id: uuid.UUID
    started_at: datetime
    ended_at: Optional[datetime]
    rating_score: Optional[float]

    class Config:
        orm_mode = True
