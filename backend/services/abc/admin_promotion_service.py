from abc import ABC, abstractmethod
from typing import List, Optional

from backend.schemas.promotion_schema import (
    PromotionCreateSchema,
    PromotionInDBSchema,
    PromotionUpdateSchema,
    PromotionOutSchema,
)
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema


import uuid

class AdminPromotionService(ABC):
    
    @abstractmethod
    def create_promotion(
        self,
        db: Session,
        promotion: PromotionCreateSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> PromotionOutSchema:
        pass
    
    @abstractmethod
    def get_all_promotion(
        self,
        db: Session,
        common_filters: dict,
    ) -> Optional[List[PromotionOutSchema]]:
        pass
    
    @abstractmethod
    def get_promotion_by_id(
        self,
        db: Session,
        promotion_id: uuid.UUID,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[PromotionOutSchema]:
        pass
    
    @abstractmethod
    def update_promotion(
        self,
        db: Session,
        promotion_id: uuid.UUID,
        promotion: PromotionUpdateSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> PromotionOutSchema:
        pass
    
    @abstractmethod
    def delete_promotion(
        self,
        db: Session,
        promotion_id: uuid.UUID,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> JSONResponse:
        pass