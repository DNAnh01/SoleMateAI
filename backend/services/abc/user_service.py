import uuid
from abc import ABC, abstractmethod
from typing import List, Optional

from sqlalchemy.orm import Session

from backend.schemas.user_role_permission_schema import \
    UserRolePermissionSchema
from backend.schemas.user_schema import UserOutSchema, UserUpdateSchema


class UserService(ABC):
    """ADMIN"""

    @abstractmethod
    def get_all_users(
        self,
        db: Session,
        common_filters: dict,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[List[UserOutSchema]]:
        pass

    @abstractmethod
    def get_user_by_id(
        self,
        db: Session,
        user_id: uuid.UUID,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[UserOutSchema]:
        pass

    @abstractmethod
    def delete_user(
        self,
        db: Session,
        user_id: uuid.UUID,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[UserOutSchema]:
        pass

    """USER"""

    @abstractmethod
    def update_user(
        self,
        db: Session,
        user: UserUpdateSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[UserOutSchema]:
        pass

    @abstractmethod
    def get_current_user_by_access_token(
        self, db: Session, current_user_role_permission: UserRolePermissionSchema
    ) -> Optional[UserOutSchema]:
        pass
