import uuid
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema


class RolePermissionCreateSchema(pydantic.BaseModel):
    permission_id: uuid.UUID
    role_id: uuid.UUID


class RolePermissionUpdateSchema(BaseSchema):
    permission_id: Optional[uuid.UUID] = None
    role_id: Optional[uuid.UUID] = None


class RolePermissionInDBSchema(BaseSchema):
    permission_id: uuid.UUID
    role_id: uuid.UUID

    class Config:
        orm_mode = True
