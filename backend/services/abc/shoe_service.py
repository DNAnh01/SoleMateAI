import uuid
from abc import ABC, abstractmethod
from typing import List, Optional

from sqlalchemy.orm import Session

from backend.schemas.shoe_schema import (
    ShoeCreateSchema,
    ShoeOutInHomePageSchema,
    ShoeOutInProductDetailPageSchema,
    ShoeOutSchema,
    ShoeUpdateSchema,
    AdminUpdateShoeSchema
)
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema


class ShoeService(ABC):

    @abstractmethod
    def create_shoe(
        self,
        db: Session,
        shoe: ShoeCreateSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> ShoeOutSchema:
        pass

    @abstractmethod
    def create_multi_shoes(
        self,
        db: Session,
        shoes: List[ShoeCreateSchema],
        current_user_role_permission: UserRolePermissionSchema,
    ) -> List[ShoeOutSchema]:
        pass

    @abstractmethod
    def get_shoe_by_id(
        self,
        db: Session,
        shoe_id: uuid.UUID,
    ) -> Optional[ShoeOutInProductDetailPageSchema]:
        pass

    @abstractmethod
    def get_all_shoes(
        self,
        db: Session,
        common_filters: dict,
    ) -> Optional[List[ShoeOutInHomePageSchema]]:
        pass

    @abstractmethod
    def update_shoe(
        self,
        db: Session,
        shoe_id: uuid.UUID,
        shoe: AdminUpdateShoeSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[ShoeOutSchema]:
        pass

    @abstractmethod
    def delete_shoe(
        self,
        db: Session,
        shoe_id: uuid.UUID,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[ShoeOutSchema]:
        pass
