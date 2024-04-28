from backend.crud.base import CRUDBase
from backend.models.order import Order
from backend.schemas.order_schema import OrderCreateSchema, OrderUpdateSchema


class CRUDOrder(CRUDBase[Order, OrderCreateSchema, OrderUpdateSchema]):
    pass


crud_order = CRUDOrder(Order)
