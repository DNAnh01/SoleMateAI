from backend.schemas._base_schema import BaseSchema
import uuid
import pydantic
from typing import Optional


class RoleCreateSchema(pydantic.BaseModel):
    role_name: str


class RoleUpdateSchema(BaseSchema):
    role_name: Optional[str]


class RoleInDBSchema(BaseSchema):
    id: uuid.UUID
    role_name: str

    class Config:
        orm_mode = True
