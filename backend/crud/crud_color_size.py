from backend.crud.base import CRUDBase
from backend.models.color_size import ColorSize

from backend.schemas.color_size_schema import (
    ColorSizeCreateSchema,
    ColorSizeUpdateSchema,
)


class CRUDColorSize(CRUDBase[ColorSize, ColorSizeCreateSchema, ColorSizeUpdateSchema]):
    pass


crud_color_size = CRUDColorSize(ColorSize)
