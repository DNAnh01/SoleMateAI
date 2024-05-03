import uuid
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema


class ChatbotCreateSchema(pydantic.BaseModel):
    # user_id: uuid.UUID
    chatbot_name: str
    model: str
    is_public: Optional[bool] = None
    description: Optional[str] = None
    temperature: Optional[float] = None
    max_token: Optional[int] = None
    is_default: Optional[bool] = None
    prompt: Optional[str] = None


class ChatbotUpdateSchema(BaseSchema):
    chatbot_name: Optional[str] = None
    model: Optional[str] = None
    is_public: Optional[bool] = None
    description: Optional[str] = None
    temperature: Optional[float] = None
    max_token: Optional[int] = None
    is_default: Optional[bool] = None
    prompt: Optional[str] = None


class ChatbotInDBSchema(BaseSchema):
    id: uuid.UUID
    user_id: uuid.UUID
    
    chatbot_name: str
    model: str
    is_public: Optional[bool]
    description: Optional[str]
    temperature: Optional[float]
    max_token: Optional[int]
    is_default: Optional[bool]
    prompt: Optional[str]
    
    

    class Config:
        orm_mode = True
