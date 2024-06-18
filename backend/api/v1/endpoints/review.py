from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.schemas.review_schema import ReviewCreateSchema, ReviewUpdateSchema
from backend.api import deps
from backend.core import oauth2
from backend.common.logger import setup_logger
from backend.services.abc.review_service import ReviewService
from backend.services.impl.review_service_impl import ReviewServiceImpl

logger= setup_logger()
review_service: ReviewService = ReviewServiceImpl()
router = APIRouter()

@router.post("/create-review", status_code=status.HTTP_201_CREATED)
def create_review(
    review: ReviewCreateSchema,
    current_user_role_permission: UserRolePermissionSchema = Depends(oauth2.get_current_user_role_permission),
    db: Session = Depends(deps.get_db),
) -> JSONResponse:
    response = review_service.create_review(
        db=db,
        review=review,
        current_user_role_permission=current_user_role_permission,
    )
    return response

@router.patch("/like-review/review-id={review_id}", status_code=status.HTTP_200_OK)
def like_review(
    review_id: str,
    current_user_role_permission: UserRolePermissionSchema = Depends(oauth2.get_current_user_role_permission),
    db: Session = Depends(deps.get_db),
) -> JSONResponse:
    response = review_service.like_review(
        db=db,
        review_id=review_id,
        current_user_role_permission=current_user_role_permission,
    )
    return response