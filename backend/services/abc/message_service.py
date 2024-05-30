import uuid
from abc import ABC, abstractmethod
from typing import List

from sqlalchemy.orm import Session

from backend.schemas.message_schema import MessageInDBSchema
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema


class MessageService(ABC):

    @abstractmethod
    def create_message_with_auth(
        self,
        message: str,
        conversation_id: uuid.UUID,
        current_user_role_permission: UserRolePermissionSchema,
        db: Session,
    ) -> MessageInDBSchema:
        pass

    @abstractmethod
    def create_message_without_auth(
        self,
        message: str,
        conversation_id: uuid.UUID,
        client_ip: str,
        db: Session,
    ) -> MessageInDBSchema:
        pass

    @abstractmethod
    def get_all_by_conversation_id(
        self,
        conversation_id: uuid.UUID,
        db: Session,
    ) -> List[MessageInDBSchema]:
        pass
