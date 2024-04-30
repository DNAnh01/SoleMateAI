from datetime import datetime
from typing import Optional

import pydantic


class BaseSchema(pydantic.BaseModel):
    is_active: Optional[bool]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
    deleted_at: Optional[datetime]
