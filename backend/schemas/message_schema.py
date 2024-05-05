import uuid
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema


class MessageCreateSchema(pydantic.BaseModel):
    conversation_id: uuid.UUID = None
    sender_id: str = None
    sender_type: str = None
    message_text: str


class MessageUpdateSchema(BaseSchema):
    conversation_id: Optional[uuid.UUID] = None
    sender_id: Optional[str] = None
    sender_type: Optional[str] = None
    message_text: Optional[str] = None


class MessageInDBSchema(BaseSchema):
    id: uuid.UUID
    conversation_id: uuid.UUID
    sender_id: str
    sender_type: str
    message_text: str

    class Config:
        orm_mode = True
