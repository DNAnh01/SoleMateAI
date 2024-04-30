import uuid
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema


class MessageCreateSchema(pydantic.BaseModel):
    conversation_id: uuid.UUID
    sender_type: str
    message_text: str


class MessageUpdateSchema(BaseSchema):
    conversation_id: Optional[uuid.UUID]
    sender_type: Optional[str]
    message_text: Optional[str]


class MessageInDBSchema(BaseSchema):
    id: uuid.UUID
    conversation_id: uuid.UUID
    sender_type: str
    message_text: str

    class Config:
        orm_mode = True
