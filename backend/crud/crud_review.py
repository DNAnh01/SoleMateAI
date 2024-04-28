from backend.crud.base import CRUDBase
from backend.models.review import Review
from backend.schemas.review_schema import ReviewCreateSchema, ReviewUpdateSchema


class CRUDReview(CRUDBase[Review, ReviewCreateSchema, ReviewUpdateSchema]):
    pass


crud_review = CRUDReview(Review)
