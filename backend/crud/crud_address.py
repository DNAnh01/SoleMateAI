from backend.crud.base import CRUDBase
from backend.models.address import Address
from backend.schemas.address_schema import AddressCreateSchema, AddressUpdateSchema


class CRUDAddress(CRUDBase[Address, AddressCreateSchema, AddressUpdateSchema]):
    pass


crud_address = CRUDAddress(Address)
