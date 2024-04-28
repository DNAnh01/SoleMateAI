from backend.crud.base import CRUDBase

from backend.models.brand import Brand
from backend.schemas.brand_schema import BrandCreateSchema, BrandUpdateSchema


class CRUDBrand(CRUDBase[Brand, BrandCreateSchema, BrandUpdateSchema]):
    pass


crud_brand = CRUDBrand(Brand)
