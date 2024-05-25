import json
import uuid
from datetime import datetime, timedelta
from typing import List, Optional

from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.common.logger import setup_logger
from backend.crud.crud_address import crud_address
from backend.crud.crud_brand import crud_brand
from backend.crud.crud_cart import crud_cart
from backend.crud.crud_color import crud_color
from backend.crud.crud_order import crud_order
from backend.crud.crud_order_item import crud_order_item
from backend.crud.crud_shoe import crud_shoe
from backend.crud.crud_size import crud_size
from backend.schemas.address_schema import AddAddressSchema, AddressInDBSchema
from backend.schemas.brand_schema import BrandCreateSchema
from backend.schemas.color_schema import ColorCreateSchema
from backend.schemas.order_item_schema import OrderItemInDBSchema, OrderItemOutSchema
from backend.schemas.order_schema import (
    OrderInDBSchema,
    OrderOutSchema,
    OrderUpdateSchema,
)
from backend.schemas.shoe_schema import ShoeOutSchema, ShoeUpdateSchema
from backend.schemas.size_schema import SizeCreateSchema
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.services.abc.address_service import AddressService
from backend.services.abc.order_service import OrderService
from backend.services.abc.shoe_service import ShoeService
from backend.services.impl.address_service_impl import AddressServiceImpl
from backend.services.impl.shoe_service_impl import ShoeServiceImpl

logger = setup_logger()


class OrderServiceImpl(OrderService):

    def __init__(self):
        self.__crud_cart = crud_cart
        self.__crud_order = crud_order
        self.__crud_order_item = crud_order_item
        self.__crud_shoe = crud_shoe
        self.__crud_address = crud_address
        self.__crud_brand = crud_brand
        self.__crud_size = crud_size
        self.__crud_color = crud_color
        self.__address_service: AddressService = AddressServiceImpl()
        self.__shoe_service: ShoeService = ShoeServiceImpl()

    def create_order(
        self,
        db: Session,
        shipping_address: AddAddressSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[OrderOutSchema]:
        if "create_order" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.create_order: User does not have permission to create order"
            )
            return JSONResponse(
                status_code=403,
                content={
                    "status": 403,
                    "message": "User does not have permission to create order",
                },
            )

        try:
            cart_found = self.__crud_cart.get_one_by(
                db=db, filter={"user_id": current_user_role_permission.u_id}
            )
            if cart_found is None:
                logger.exception(
                    f"Exception in {__name__}.{self.__class__.__name__}.__create_new_order: Cart not found"
                )
                return JSONResponse(
                    status_code=404,
                    content={"status": 404, "message": "Cart not found"},
                )
            """add or check shipping address"""
            shipping_address_found = self.__address_service.add_or_check_address(
                db=db,
                add_address_req=shipping_address,
                current_user_role_permission=current_user_role_permission,
            )
            temporary_order_items = []

            created_order = self.__crud_order.create(
                db=db,
                obj_in=OrderInDBSchema(
                    id=uuid.uuid4(),
                    address_id=shipping_address_found.id,
                    user_id=current_user_role_permission.u_id,
                    order_date=datetime.now(),
                    delivery_date=datetime.now() + timedelta(days=7),
                    status="ORDER-PLACED",
                    total_item=0,
                    total_display_price=0,
                    total_warehouse_price=0,
                    total_discounted_price=0,
                    is_active=True,
                    created_at=datetime.now(),
                    updated_at=datetime.now(),
                    deleted_at=None,
                ),
            )

            for cart_item in cart_found.cart_items:
                """create order item for each cart item in cart"""
                if cart_item.is_active is True and cart_item.deleted_at is None:
                    created_order_item = self.__crud_order_item.create(
                        db=db,
                        obj_in=OrderItemInDBSchema(
                            id=uuid.uuid4(),
                            order_id=created_order.id,
                            shoe_id=cart_item.shoe_id,
                            quantity=cart_item.quantity,
                            display_price=cart_item.display_price,
                            warehouse_price=cart_item.warehouse_price,
                            discounted_price=cart_item.discounted_price,
                            is_active=True,
                            created_at=datetime.now(),
                            updated_at=datetime.now(),
                            deleted_at=None,
                        ),
                    )
                    temporary_order_items.append(created_order_item)
                """update quantity in stock of shoe"""
                shoe_found = self.__crud_shoe.get(db=db, id=cart_item.shoe_id)

                if shoe_found is None:
                    logger.exception(
                        f"Exception in {__name__}.{self.__class__.__name__}.__create_new_order: Shoe not found"
                    )
                    return JSONResponse(
                        status_code=404,
                        content={"status": 404, "message": "Shoe not found"},
                    )
                updated_shoe = self.__crud_shoe.update_one_by(
                    db=db,
                    filter={"id": cart_item.shoe_id},
                    obj_in=ShoeUpdateSchema(
                        quantity_in_stock=shoe_found.quantity_in_stock
                        - cart_item.quantity,
                        updated_at=datetime.now(),
                    ),
                )
                if updated_shoe is None:
                    logger.exception(
                        f"Exception in {__name__}.{self.__class__.__name__}.__create_new_order: Error occurred while updating shoe"
                    )
                    return JSONResponse(
                        status_code=500,
                        content={
                            "status": 500,
                            "message": "Error occurred while updating shoe",
                        },
                    )
            """create order"""
            total_item = 0
            total_display_price = 0
            total_warehouse_price = 0
            total_discounted_price = 0

            for order_item in temporary_order_items:
                total_item += order_item.quantity
                total_display_price += order_item.display_price
                total_warehouse_price += order_item.warehouse_price
                total_discounted_price += order_item.discounted_price

            updated_order = self.__crud_order.update_one_by(
                db=db,
                filter={"id": created_order.id},
                obj_in=OrderInDBSchema(
                    id=created_order.id,
                    address_id=shipping_address_found.id,
                    user_id=current_user_role_permission.u_id,
                    order_date=datetime.now(),
                    delivery_date=datetime.now() + timedelta(days=7),
                    status="ORDER-PLACED",
                    total_item=total_item,
                    total_display_price=total_display_price,
                    total_warehouse_price=total_warehouse_price,
                    total_discounted_price=total_discounted_price,
                    is_active=True,
                    created_at=datetime.now(),
                    updated_at=datetime.now(),
                    deleted_at=None,
                ),
            )
            order_out: OrderOutSchema = OrderOutSchema(
                **updated_order.__dict__,
                shipping_address=shipping_address_found,
                order_items=[
                    OrderItemOutSchema(
                        shoe=ShoeOutSchema(
                            **self.__shoe_service.get_shoe_by_id(
                                db=db,
                                shoe_id=cart_item.shoe_id,
                            ).__dict__
                        ),
                        **order_item.__dict__,
                    )
                    for order_item in temporary_order_items
                    if order_item.is_active is True and order_item.deleted_at is None
                ],
            )
            return order_out
        except:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.__create_new_order: Error occurred while fetching cart"
            )
            return JSONResponse(
                status_code=500,
                content={
                    "status": 500,
                    "message": "Error occurred while fetching cart",
                },
            )

    def get_history_order(
        self,
        db: Session,
        common_filters: dict,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[List[OrderOutSchema]]:
        if "read_order" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.get_history_order: User does not have permission to read order"
            )
            return JSONResponse(
                status_code=403,
                content={
                    "status": 403,
                    "message": "User does not have permission to read order",
                },
            )
        try:
            history_orders = self.__crud_order.get_multi(
                db=db,
                filter_param={
                    "filter": json.dumps(
                        {"user_id": str(current_user_role_permission.u_id)}
                    ),
                    **common_filters,
                },
            )
            history_orders_out = []
            for order in history_orders:
                order_items = []
                address_id = order.address_id
                order_items_db = self.__crud_order_item.get_multi(
                    db=db,
                    filter_param={"filter": json.dumps({"order_id": str(order.id)})},
                )
                for order_item in order_items_db:
                    if order_item.order_id == order.id:
                        shoe_id = order_item.shoe_id
                        shoe = self.__crud_shoe.get_one_ignore_deleted_and_inactive(
                            db=db, filter={"id": shoe_id}
                        )
                        brand = self.__crud_brand.get_one_ignore_deleted_and_inactive(
                            db=db, filter={"id": shoe.brand_id}
                        )
                        size = self.__crud_size.get_one_ignore_deleted_and_inactive(
                            db=db, filter={"id": shoe.size_id}
                        )
                        color = self.__crud_color.get_one_ignore_deleted_and_inactive(
                            db=db, filter={"id": shoe.color_id}
                        )
                        order_items.append(
                            OrderItemOutSchema(
                                shoe=ShoeOutSchema(
                                    brand=BrandCreateSchema(**brand.__dict__),
                                    size=SizeCreateSchema(**size.__dict__),
                                    color=ColorCreateSchema(**color.__dict__),
                                    **shoe.__dict__,
                                ),
                                **order_item.__dict__,
                            )
                        )
                shipping_address = (
                    self.__crud_address.get_one_ignore_deleted_and_inactive(
                        db=db, filter={"id": address_id}
                    )
                )

                order_out = OrderOutSchema(
                    **order.__dict__,
                    shipping_address=AddressInDBSchema(**shipping_address.__dict__),
                    order_items=order_items,
                )

                history_orders_out.append(order_out)

            # Moved order_items.clear() outside the loop

            return history_orders_out
        except Exception as e:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.get_history_order: {str(e)}"
            )
            return JSONResponse(
                status_code=500,
                content={"status": 500, "message": "Internal server error"},
            )

    def get_order_by_id(
        self,
        db: Session,
        order_id: uuid.UUID,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[OrderOutSchema]:
        if "read_order" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.get_order_by_id: User does not have permission to read order"
            )
            return JSONResponse(
                status_code=403,
                content={
                    "status": 403,
                    "message": "User does not have permission to read order",
                },
            )
        try:
            order = self.__crud_order.get_one_ignore_deleted_and_inactive(
                db=db, filter={"id": order_id}
            )

            order_items = []

            address_id = order.address_id

            order_items_db = self.__crud_order_item.get_multi(
                db=db, filter_param={"filter": json.dumps({"order_id": str(order.id)})}
            )

            for order_item in order_items_db:
                if order_item.order_id == order.id:
                    shoe_id = order_item.shoe_id
                    shoe = self.__crud_shoe.get_one_ignore_deleted_and_inactive(
                        db=db, filter={"id": shoe_id}
                    )
                    brand = self.__crud_brand.get_one_ignore_deleted_and_inactive(
                        db=db, filter={"id": shoe.brand_id}
                    )
                    size = self.__crud_size.get_one_ignore_deleted_and_inactive(
                        db=db, filter={"id": shoe.size_id}
                    )
                    color = self.__crud_color.get_one_ignore_deleted_and_inactive(
                        db=db, filter={"id": shoe.color_id}
                    )
                    order_items.append(
                        OrderItemOutSchema(
                            shoe=ShoeOutSchema(
                                brand=BrandCreateSchema(**brand.__dict__),
                                size=SizeCreateSchema(**size.__dict__),
                                color=ColorCreateSchema(**color.__dict__),
                                **shoe.__dict__,
                            ),
                            **order_item.__dict__,
                        )
                    )

            shipping_address = self.__crud_address.get_one_ignore_deleted_and_inactive(
                db=db, filter={"id": address_id}
            )

            order_out = OrderOutSchema(
                **order.__dict__,
                shipping_address=AddressInDBSchema(**shipping_address.__dict__),
                order_items=order_items,
            )

            return order_out
        except Exception as e:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.get_order_by_id: {str(e)}"
            )
            return JSONResponse(
                status_code=500,
                content={"status": 500, "message": "Internal server error"},
            )

    def cancel_order(
        self,
        db: Session,
        order_id: uuid.UUID,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> JSONResponse:
        if "update_order" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.cancel_order: User does not have permission to update order"
            )
            return JSONResponse(
                status_code=403,
                content={
                    "status": 403,
                    "message": "User does not have permission to update order",
                },
            )
        try:
            order_found = self.__crud_order.get(db=db, id=order_id)
            if order_found is None:
                logger.exception(
                    f"Exception in {__name__}.{self.__class__.__name__}.cancel_order: Order not found"
                )
                return JSONResponse(
                    status_code=404,
                    content={"status": 404, "message": "Order not found"},
                )

            """update quantity in stock of shoe"""
            for order_item in order_found.order_items:
                shoe_found = self.__crud_shoe.get(db=db, id=order_item.shoe_id)
                if shoe_found is None:
                    logger.exception(
                        f"Exception in {__name__}.{self.__class__.__name__}.cancel_order: Shoe not found"
                    )
                    return JSONResponse(
                        status_code=404,
                        content={"status": 404, "message": "Shoe not found"},
                    )
                """update quantity in stock of shoe"""
                updated_shoe = self.__crud_shoe.update_one_by(
                    db=db,
                    filter={"id": order_item.shoe_id},
                    obj_in=ShoeUpdateSchema(
                        quantity_in_stock=shoe_found.quantity_in_stock
                        + order_item.quantity,
                        updated_at=datetime.now(),
                    ),
                )
                if updated_shoe is None:
                    logger.exception(
                        f"Exception in {__name__}.{self.__class__name__}.cancel_order: Error occurred while updating shoe"
                    )
                    return JSONResponse(
                        status_code=500,
                        content={
                            "status": 500,
                            "message": "Error occurred while updating shoe",
                        },
                    )
            updated_order = self.__crud_order.update_one_by(
                db=db,
                filter={"id": order_id},
                obj_in=OrderUpdateSchema(
                    status="ORDER-CANCELLED", updated_at=datetime.now()
                ),
            )

            return JSONResponse(
                status_code=200,
                content={"status": 200, "message": "Order cancelled successfully"},
            )
        except Exception as e:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.cancel_order: {str(e)}"
            )
            return JSONResponse(
                status_code=500,
                content={"status": 500, "message": "Internal server error"},
            )

    def paid_order(
        self,
        db: Session,
        order_id: uuid.UUID,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> JSONResponse:
        if "update_order" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.paid_order: User does not have permission to update order"
            )
            return JSONResponse(
                status_code=403,
                content={
                    "status": 403,
                    "message": "User does not have permission to update order",
                },
            )
        try:
            order_found = self.__crud_order.get(db=db, id=order_id)
            if order_found is None:
                logger.exception(
                    f"Exception in {__name__}.{self.__class__.__name__}.paid_order: Order not found"
                )
                return JSONResponse(
                    status_code=404,
                    content={"status": 404, "message": "Order not found"},
                )
            updated_order = self.__crud_order.update_one_by(
                db=db,
                filter={"id": order_id},
                obj_in=OrderUpdateSchema(
                    status="ORDER-PAID", updated_at=datetime.now()
                ),
            )
            if updated_order is None:
                logger.exception(
                    f"Exception in {__name__}.{self.__class__name__}.paid_order: Error occurred while updating order"
                )
                return JSONResponse(
                    status_code=500,
                    content={
                        "status": 500,
                        "message": "Error occurred while updating order",
                    },
                )
            return JSONResponse(
                status_code=200,
                content={"status": 200, "message": "Order paid successfully"},
            )
        except Exception as e:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.paid_order: {str(e)}"
            )
            return JSONResponse(
                status_code=500,
                content={"status": 500, "message": "Internal server error"},
            )
