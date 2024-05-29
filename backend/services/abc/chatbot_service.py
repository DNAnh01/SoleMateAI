from abc import ABC, abstractmethod
from typing import List, Optional

from sqlalchemy.orm import Session

from backend.schemas.chatbot_schema import (ChatbotCreateSchema,
                                            ChatbotInDBSchema,
                                            ChatbotUpdateSchema)
from backend.schemas.user_role_permission_schema import \
    UserRolePermissionSchema


class ChatbotService(ABC):

    @abstractmethod
    def create(
        self,
        db: Session,
        chatbot_create: ChatbotCreateSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> ChatbotInDBSchema:
        pass

    @abstractmethod
    def get_all(
        self, db: Session, current_user_role_permission: UserRolePermissionSchema
    ) -> Optional[List[ChatbotInDBSchema]]:
        pass

    @abstractmethod
    def get_one(
        self,
        db: Session,
        chatbot_id: str,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[ChatbotInDBSchema]:
        pass

    @abstractmethod
    def update(
        self,
        db: Session,
        chatbot_id: str,
        chatbot_update: ChatbotUpdateSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[ChatbotInDBSchema]:
        pass

    @abstractmethod
    def delete(
        self,
        db: Session,
        chatbot_id: str,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[ChatbotInDBSchema]:
        pass
