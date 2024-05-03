import uuid
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema


class RoleCreateSchema(pydantic.BaseModel):
    role_name: str


class RoleUpdateSchema(BaseSchema):
    role_name: Optional[str] = None


class RoleInDBSchema(BaseSchema):
    id: uuid.UUID
    role_name: str

    class Config:
        orm_mode = True
