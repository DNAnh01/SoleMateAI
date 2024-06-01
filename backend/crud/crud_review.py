import uuid
from typing import List

from sqlalchemy import text
from sqlalchemy.orm import Session

from backend.crud.base import CRUDBase
from backend.models.review import Review
from backend.schemas.review_schema import (ReviewCreateSchema,
                                           ReviewInDBSchema,
                                           ReviewUpdateSchema)

GET_ALL_REVIEWS_BY_SHOE_ID = f"""
    SELECT
        r.id AS {ReviewInDBSchema.ID},
        r.user_id AS {ReviewInDBSchema.USER_ID},
        r.shoe_id AS {ReviewInDBSchema.SHOE_ID},
        r.rating AS {ReviewInDBSchema.RATING},
        r.comment AS {ReviewInDBSchema.COMMENT},
        r.heart_count AS {ReviewInDBSchema.HEART_COUNT},
        r.created_at AS {ReviewInDBSchema.CREATED_AT},
        r.updated_at AS {ReviewInDBSchema.UPDATED_AT},
        r.deleted_at AS {ReviewInDBSchema.DELETED_AT}
    FROM reviews AS r
    WHERE r.shoe_id = :shoe_id
    AND r.deleted_at IS NULL;
    """


class CRUDReview(CRUDBase[Review, ReviewCreateSchema, ReviewUpdateSchema]):
    def get_all_reviews_by_shoe_id(
        self, db: Session, shoe_id: uuid.UUID
    ) -> List[ReviewInDBSchema]:
        result_proxy = db.execute(
            text(GET_ALL_REVIEWS_BY_SHOE_ID),
            {"shoe_id": shoe_id},
        )
        column_names = result_proxy.keys()
        results = result_proxy.fetchall()
        reviews = []
        for result in results:
            result_dict = dict(zip(column_names, result))
            reviews.append(ReviewInDBSchema(**result_dict))
        return reviews


crud_review = CRUDReview(Review)
