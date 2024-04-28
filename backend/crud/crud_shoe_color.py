from backend.crud.base import CRUDBase
from backend.models.shoe_color import ShoeColor
from backend.schemas.shoe_color_schema import (
    ShoeColorCreateSchema,
    ShoeColorUpdateSchema,
)


class CRUDShoeColor(CRUDBase[ShoeColor, ShoeColorCreateSchema, ShoeColorUpdateSchema]):
    pass


crud_shoe_color = CRUDShoeColor(ShoeColor)
