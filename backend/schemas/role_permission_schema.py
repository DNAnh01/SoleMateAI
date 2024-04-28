from backend.schemas._base_schema import BaseSchema
import uuid
import pydantic
from typing import Optional


class RolePermissionCreateSchema(pydantic.BaseModel):
    permission_id: uuid.UUID
    role_id: uuid.UUID


class RolePermissionUpdateSchema(BaseSchema):
    permission_id: Optional[uuid.UUID]
    role_id: Optional[uuid.UUID]


class RolePermissionInDBSchema(BaseSchema):
    permission_id: uuid.UUID
    role_id: uuid.UUID

    class Config:
        orm_mode = True
