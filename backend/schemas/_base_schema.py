import pydantic
from typing import Optional
from datetime import datetime


class BaseSchema(pydantic.BaseModel):
    is_active: Optional[bool]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
    deleted_at: Optional[datetime]
