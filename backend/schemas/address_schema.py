import uuid
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema


class AddAddressSchema(pydantic.BaseModel):
    province: str
    district: str
    ward: str


class AddressOutSchema(pydantic.BaseModel):
    province: str
    district: str
    ward: str


class AddressCreateSchema(pydantic.BaseModel):
    province: str
    district: str
    ward: str


class AddressUpdateSchema(pydantic.BaseModel):
    province: Optional[str] = None
    district: Optional[str] = None
    ward: Optional[str] = None


class AddressInDBSchema(BaseSchema):
    id: uuid.UUID
    user_id: uuid.UUID
    province: str
    district: str
    ward: str

    class Config:
        orm_mode = True
