from abc import ABC, abstractmethod
from typing import List, Optional

from sqlalchemy.orm import Session

from backend.schemas.conversation_schema import (
    ConversationCreateSchema,
    ConversationInDBSchema,
    ConversationUpdateSchema,
)

from backend.schemas.user_role_permission_schema import UserRolePermissionSchema

class ConversationService(ABC):

    @abstractmethod
    def create(
        self,
        db: Session,
        client_ip: str,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> ConversationInDBSchema:
        pass