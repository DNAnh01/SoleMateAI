from backend.schemas._base_schema import BaseSchema
import uuid
import pydantic
from typing import Optional


class PermissionCreateSchema(pydantic.BaseModel):
    permission_name: str


class PermissionUpdateSchema(BaseSchema):
    permission_name: Optional[str]


class PermissionInDBSchema(BaseSchema):
    id: uuid.UUID
    permission_name: str

    class Config:
        orm_mode = True
