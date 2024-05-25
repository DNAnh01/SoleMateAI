import uuid
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema


class AddAddressSchema(pydantic.BaseModel):
    street: str
    city: str


class AddressOutSchema(pydantic.BaseModel):
    street: str
    city: str


class AddressCreateSchema(pydantic.BaseModel):
    street: str
    city: str


class AddressUpdateSchema(pydantic.BaseModel):
    street: Optional[str] = None
    city: Optional[str] = None


class AddressInDBSchema(BaseSchema):
    id: uuid.UUID
    user_id: uuid.UUID
    street: str
    city: str

    class Config:
        orm_mode = True
