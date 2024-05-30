from backend.crud.base import CRUDBase
from backend.models.promotion import Promotion
from backend.schemas.promotion_schema import (PromotionCreateSchema,
                                              PromotionUpdateSchema)


class CRUDPromotion(CRUDBase[Promotion, PromotionCreateSchema, PromotionUpdateSchema]):
    pass


crud_promotion = CRUDPromotion(Promotion)
