from abc import ABC, abstractmethod
from typing import List, Optional

from sqlalchemy.orm import Session

from backend.schemas.knowledge_base_schema import (
    KnowledgeBaseCreateSchema,
    KnowledgeBaseInDBSchema,
)
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema


class KnowledgeBaseService(ABC):

    @abstractmethod
    def create(
        self,
        db: Session,
        chatbot_id: str,
        knowledge_base_create: KnowledgeBaseCreateSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ):
        pass

    @abstractmethod
    def get_all(
        self,
        db: Session,
        chatbot_id: str,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[List[KnowledgeBaseInDBSchema]]:
        pass

    @abstractmethod
    def delete(
        self,
        db: Session,
        chatbot_id: str,
        knowledge_base_id: str,
        current_user_role_permission: UserRolePermissionSchema,
    ):
        pass
