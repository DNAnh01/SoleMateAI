from datetime import datetime
from typing import Optional

import pydantic


class BaseSchema(pydantic.BaseModel):
    is_active: Optional[bool] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    deleted_at: Optional[datetime] = None
