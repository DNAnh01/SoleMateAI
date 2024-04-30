import uuid
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema


class KnowledgeBaseCreateSchema(pydantic.BaseModel):
    chatbot_id: uuid.UUID
    knowledge_base_name: str
    content_type: str
    file_path: str
    character_count: int
    file_size: float


class KnowledgeBaseUpdateSchema(BaseSchema):
    chatbot_id: Optional[uuid.UUID]
    knowledge_base_name: Optional[str]
    content_type: Optional[str]
    file_path: Optional[str]
    character_count: Optional[int]
    file_size: Optional[float]


class KnowledgeBaseInDBSchema(BaseSchema):
    id: uuid.UUID
    chatbot_id: uuid.UUID
    knowledge_base_name: str
    content_type: str
    file_path: str
    character_count: int
    file_size: float

    class Config:
        orm_mode = True
