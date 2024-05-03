import uuid
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema


class PermissionCreateSchema(pydantic.BaseModel):
    permission_name: str


class PermissionUpdateSchema(BaseSchema):
    permission_name: Optional[str] = None


class PermissionInDBSchema(BaseSchema):
    id: uuid.UUID
    permission_name: str

    class Config:
        orm_mode = True
