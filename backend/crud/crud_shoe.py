from backend.crud.base import CRUDBase
from backend.models.shoe import Shoe
from backend.schemas.shoe_schema import ShoeCreateSchema, ShoeUpdateSchema


class CRUDShoe(CRUDBase[Shoe, ShoeCreateSchema, ShoeUpdateSchema]):

    pass


crud_shoe = CRUDShoe(Shoe)
