from backend.crud.base import CRUDBase
from backend.models.order_item import OrderItem

from backend.schemas.order_item_schema import (
    OrderItemCreateSchema,
    OrderItemUpdateSchema,
)


class CRUDOrderItem(CRUDBase[OrderItem, OrderItemCreateSchema, OrderItemUpdateSchema]):
    pass


crud_order_item = CRUDOrderItem(OrderItem)
