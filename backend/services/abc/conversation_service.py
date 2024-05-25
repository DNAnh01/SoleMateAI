from abc import ABC, abstractmethod

from sqlalchemy.orm import Session

from backend.schemas.conversation_schema import ConversationInDBSchema
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema


class ConversationService(ABC):

    @abstractmethod
    def create_conversation_with_auth(
        self,
        db: Session,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> ConversationInDBSchema:
        pass

    @abstractmethod
    def create_conversation_without_auth(
        self,
        db: Session,
        client_ip: str,
    ) -> ConversationInDBSchema:
        pass
