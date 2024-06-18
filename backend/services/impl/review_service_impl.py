from backend.schemas.review_schema import ReviewInDBSchema, ReviewCreateSchema,ReviewUpdateSchema
from backend.common.logger import setup_logger
from backend.crud.crud_review import crud_review
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.services.abc.review_service import ReviewService
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import uuid
from datetime import datetime

logger = setup_logger()

class ReviewServiceImpl(ReviewService):
    def __init__(self):
        self.crud_review = crud_review
    def create_review(
        self,
        db: Session,
        review: ReviewCreateSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> JSONResponse:
        if "create_review" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.create_review: User {current_user_role_permission.u_email} has no permission to create review"
            )
        try:
            review_in_db = self.crud_review.create(
                db=db,
                obj_in=ReviewInDBSchema(
                    id=uuid.uuid4(),
                    user_id=current_user_role_permission.u_id,
                    shoe_id=review.shoe_id,
                    rating=review.rating,
                    comment=review.comment,
                    heart_count=0,
                    is_active=True,
                    created_at=datetime.now(),
                    updated_at=datetime.now(),
                    deleted_at=None,
                )
            )
            return JSONResponse(
                status_code=200,
                content={"message": "Create review successfully"},
            )
        except Exception as e:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.create_review: {str(e)}"
            )
            return JSONResponse(status_code=500, content={"message": "Internal server error"})

    def like_review(
        self,
        db: Session,
        review_id: str,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> JSONResponse:
        if "update_review" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.like_review: User {current_user_role_permission.u_email} has no permission to like review"
            )
            return JSONResponse(
                status_code=403, content={"message": "You have no permission to like review"}
            )
        try:
            # check if the user has already  liked this review
            # TODO
            
            
            review_found = self.crud_review.get(db=db, id=review_id)
            updated_review = self.crud_review.update_one_by(
                db=db,
                filter={"id": review_found.id},
                obj_in=ReviewUpdateSchema(heart_count=review_found.heart_count + 1),
            )
            return JSONResponse(
                status_code=200,
                content={"message": "Like review successfully"},
            )
        except Exception as e:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.like_review: {str(e)}"
            )
            return JSONResponse(status_code=500, content={"message": "Internal server error"})