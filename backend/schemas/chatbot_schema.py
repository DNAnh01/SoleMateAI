import uuid
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema


class ChatbotCreateSchema(pydantic.BaseModel):
    user_id: uuid.UUID
    chatbot_name: str
    model: str
    description: Optional[str]
    temperature: Optional[float]
    max_token: Optional[int]
    is_default: Optional[bool]
    prompt: Optional[str]


class ChatbotUpdateSchema(BaseSchema):
    chatbot_name: Optional[str]
    model: Optional[str]
    description: Optional[str]
    temperature: Optional[float]
    max_token: Optional[int]
    is_default: Optional[bool]
    prompt: Optional[str]


class ChatbotInDBSchema(BaseSchema):
    id: uuid.UUID
    user_id: uuid.UUID
    chatbot_name: str
    model: str
    description: Optional[str]
    temperature: Optional[float]
    max_token: Optional[int]
    is_default: Optional[bool]
    prompt: Optional[str]

    class Config:
        orm_mode = True
