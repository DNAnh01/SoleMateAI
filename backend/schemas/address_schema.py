import uuid
from typing import Optional

import pydantic

from backend.schemas._base_schema import BaseSchema


class AddressCreateSchema(pydantic.BaseModel):
    user_id: uuid.UUID
    street: str
    city: str
    state: str


class AddressUpdateSchema(BaseSchema):
    user_id: Optional[uuid.UUID] = None
    street: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None


class AddressInDBSchema(BaseSchema):
    id: uuid.UUID
    user_id: uuid.UUID
    street: str
    city: str
    state: str

    class Config:
        orm_mode = True
