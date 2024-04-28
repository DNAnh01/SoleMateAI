from backend.crud.base import CRUDBase
from backend.models.color import Color
from backend.schemas.color_schema import ColorCreateSchema, ColorUpdateSchema


class CRUDColor(CRUDBase[Color, ColorCreateSchema, ColorUpdateSchema]):
    pass


crud_color = CRUDColor(Color)
