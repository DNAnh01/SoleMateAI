from backend.schemas.review_schema import ReviewInDBSchema, ReviewCreateSchema
from abc import ABC, abstractmethod
from typing import List, Optional
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

class ReviewService(ABC):
    
    @abstractmethod
    def create_review(
        self,
        db: Session,
        review: ReviewCreateSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> JSONResponse:
        pass

    @abstractmethod
    def like_review(
        self,
        db: Session,
        review_id: str,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> JSONResponse:
        pass