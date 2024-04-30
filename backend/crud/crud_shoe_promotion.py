from backend.crud.base import CRUDBase
from backend.models.shoe_promotion import ShoePromotion
from backend.schemas.shoe_promotion_schema import (
    ShoePromotionCreateSchema,
    ShoePromotionUpdateSchema,
)


class CRUDShoePromotion(
    CRUDBase[ShoePromotion, ShoePromotionCreateSchema, ShoePromotionUpdateSchema]
):
    pass


crud_shoe_promotion = CRUDShoePromotion(ShoePromotion)
