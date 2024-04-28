from backend.crud.base import CRUDBase
from backend.models.size import Size
from backend.schemas.size_schema import SizeCreateSchema, SizeUpdateSchema


class CRUDSize(CRUDBase[Size, SizeCreateSchema, SizeUpdateSchema]):
    pass


crud_size = CRUDSize(Size)
