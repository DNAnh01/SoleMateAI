import uuid
from abc import ABC, abstractmethod

from sqlalchemy.orm import Session

from backend.schemas.message_schema import MessageInDBSchema
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema


class MessageService(ABC):

    @abstractmethod
    def create(
        self,
        message: str,
        conversation_id: uuid.UUID,
        client_ip: str,
        db: Session,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> MessageInDBSchema:
        pass
