from abc import ABC, abstractmethod
from sqlalchemy.orm import Session

from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.schemas.message_schema import MessageInDBSchema
import uuid


class MessageService(ABC):

    @abstractmethod
    def create(self, message: str, conversation_id: uuid.UUID, client_ip: str, db: Session,current_user_role_permission: UserRolePermissionSchema) -> MessageInDBSchema:
        pass
    
    
    
    