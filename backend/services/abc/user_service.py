from abc import ABC, abstractmethod
from sqlalchemy.orm import Session

import uuid
from typing import Optional, List
from backend.schemas.user_schema import UserCreateSchema, UserInDBSchema, UserUpdateSchema, UserOutSchema

from backend.schemas.user_role_permission_schema import UserRolePermissionSchema


class UserService(ABC):
        
        @abstractmethod
        def get_user_by_id(self, db: Session, user_id: uuid.UUID, current_user_role_permission: UserRolePermissionSchema) -> Optional[UserOutSchema]:
            pass
        
        @abstractmethod
        def get_current_user_by_access_token(self, db: Session, current_user_role_permission: UserRolePermissionSchema) -> Optional[UserOutSchema]:
            pass
        
        @abstractmethod
        def get_all_users(self, db: Session, common_filters: dict, current_user_role_permission: UserRolePermissionSchema) -> Optional[List[UserOutSchema]]:
            pass
        
        @abstractmethod
        def update_user(self, db: Session, user: UserUpdateSchema, current_user_role_permission: UserRolePermissionSchema) -> Optional[UserOutSchema]:
            pass
        
        # @abstractmethod
        # def delete_user(self, db: Session, user_id: uuid.UUID, current_user_role_permission: UserRolePermissionSchema) -> Optional[UserOutSchema]:
        #     pass