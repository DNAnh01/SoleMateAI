import uuid
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema


class UserCreateSchema(pydantic.BaseModel):
    email: pydantic.EmailStr
    password_hash: str


class UserUpdateSchema(BaseSchema):
    role_id: Optional[uuid.UUID]
    email: Optional[pydantic.EmailStr]
    password_hash: Optional[str]
    display_name: Optional[str]
    avatar_url: Optional[str]
    payment_information: Optional[str]
    is_verified: Optional[bool]


class UserInDBSchema(BaseSchema):
    id: uuid.UUID
    role_id: uuid.UUID
    email: pydantic.EmailStr
    password_hash: str
    display_name: str
    avatar_url: str
    payment_information: str
    is_verified: bool

    class Config:
        orm_mode = True
