import uuid
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema


class UserCreateSchema(pydantic.BaseModel):
    email: pydantic.EmailStr
    password_hash: str


class UserUpdateSchema(BaseSchema):
    # role_id: Optional[uuid.UUID] = None
    email: Optional[pydantic.EmailStr] = None
    # password_hash: Optional[str] = None
    display_name: Optional[str] = None
    avatar_url: Optional[str] = None
    payment_information: Optional[str] = None
    is_verified: Optional[bool] = None


class UserOutSchema(BaseSchema):
    id: uuid.UUID
    role_name: str
    email: pydantic.EmailStr
    display_name: str
    avatar_url: str
    payment_information: str
    is_verified: bool

    class Config:
        orm_mode = True


class UserOutInProductDetailPageSchema(pydantic.BaseModel):
    email: pydantic.EmailStr
    display_name: str
    avatar_url: str


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
