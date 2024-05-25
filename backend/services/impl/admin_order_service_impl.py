import json
import uuid
from datetime import datetime
from typing import List, Optional

from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.common.logger import setup_logger
from backend.crud.crud_address import crud_address
from backend.crud.crud_brand import crud_brand
from backend.crud.crud_color import crud_color
from backend.crud.crud_order import crud_order
from backend.crud.crud_order_item import crud_order_item
from backend.crud.crud_shoe import crud_shoe
from backend.crud.crud_size import crud_size
from backend.schemas.address_schema import AddressInDBSchema
from backend.schemas.brand_schema import BrandCreateSchema
from backend.schemas.color_schema import ColorCreateSchema
from backend.schemas.order_item_schema import OrderItemOutSchema
from backend.schemas.order_schema import OrderOutSchema, OrderUpdateSchema
from backend.schemas.shoe_schema import ShoeOutSchema, ShoeUpdateSchema
from backend.schemas.size_schema import SizeCreateSchema
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.services.abc.admin_order_service import AdminOrderService

logger = setup_logger()


class AdminOrderServiceImpl(AdminOrderService):
    def __init__(self):
        self.__crud_order = crud_order
        self.__crud_order_item = crud_order_item
        self.__crud_address = crud_address
        self.__crud_brand = crud_brand
        self.__crud_size = crud_size
        self.__crud_color = crud_color
        self.__crud_shoe = crud_shoe

    def get_all_order(
        self,
        db: Session,
        common_filters: dict,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[List[OrderOutSchema]]:
        if "read_order" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"User {current_user_role_permission.user_id} does not have permission to read order"
            )
            return JSONResponse(
                status_code=403,
                content={
                    "status": 403,
                    "message": "User does not have permission to read order",
                },
            )
        try:
            orders = self.__crud_order.get_multi(
                db=db,
                filter_param=common_filters,
            )
            order_outs = []
            for order in orders:
                order_items = []
                address_id = order.address_id
                logger.info(f"address_id: {address_id}")
                order_items_db = self.__crud_order_item.get_multi(
                    db=db,
                    filter_param={"filter": json.dumps({"order_id": str(order.id)})},
                )
                for order_item in order_items_db:
                    if order_item.order_id == order.id:
                        shoe_id = order_item.shoe_id
                        shoe = self.__crud_shoe.get(db=db, id=shoe_id)
                        brand = self.__crud_brand.get(db=db, id=shoe.brand_id)
                        size = self.__crud_size.get(db=db, id=shoe.size_id)
                        color = self.__crud_color.get(db=db, id=shoe.color_id)

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
                logger.info(f"shipping_address: {shipping_address}")
                order_out = OrderOutSchema(
                    **order.__dict__,
                    shipping_address=AddressInDBSchema(**shipping_address.__dict__),
                    order_items=order_items,
                )
                order_outs.append(order_out)
            return order_outs

        except Exception as e:
            logger.exception(f"Error: {e}")
            return JSONResponse(
                status_code=500,
                content={"status": 500, "message": "Internal Server Error"},
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
            order = self.__crud_order.get_one_by(db=db, filter={"id": order_id})

            order_items = []

            address_id = order.address_id

            order_items_db = self.__crud_order_item.get_multi(
                db=db, filter_param={"filter": json.dumps({"order_id": str(order.id)})}
            )

            for order_item in order_items_db:
                if order_item.order_id == order.id:
                    shoe_id = order_item.shoe_id
                    shoe = self.__crud_shoe.get_one_by(db=db, filter={"id": shoe_id})
                    brand = self.__crud_brand.get_one_by(
                        db=db, filter={"id": shoe.brand_id}
                    )
                    size = self.__crud_size.get_one_by(
                        db=db, filter={"id": shoe.size_id}
                    )
                    color = self.__crud_color.get_one_by(
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
            if order_found.status == "ORDER-CANCELLED":
                logger.exception(
                    f"Exception in {__name__}.{self.__class__.__name__}.cancel_order: Order already cancelled"
                )
                return JSONResponse(
                    status_code=400,
                    content={"status": 400, "message": "Order already cancelled"},
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

    def deliver_order(
        self,
        db: Session,
        order_id: uuid.UUID,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> JSONResponse:
        if "update_order" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.deliver_order: User does not have permission to update order"
            )
            return JSONResponse(
                status_code=403,
                content={
                    "status": 403,
                    "message": "User does not have permission to update order",
                },
            )
        if "admin" != current_user_role_permission.u_role_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.deliver_order: User does not have permission to update order"
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
                    f"Exception in {__name__}.{self.__class__.__name__}.deliver_order: Order not found"
                )
                return JSONResponse(
                    status_code=404,
                    content={"status": 404, "message": "Order not found"},
                )
            if order_found.status == "ORDER-CANCELLED":
                logger.exception(
                    f"Exception in {__name__}.{self.__class__.__name__}.deliver_order: Order already cancelled"
                )
                return JSONResponse(
                    status_code=400,
                    content={"status": 400, "message": "Order already cancelled"},
                )
            if order_found.status == "ORDER-DELIVERED":
                logger.exception(
                    f"Exception in {__name__}.{self.__class__.__name__}.deliver_order: Order already delivered"
                )
                return JSONResponse(
                    status_code=400,
                    content={"status": 400, "message": "Order already delivered"},
                )
            updated_order = self.__crud_order.update_one_by(
                db=db,
                filter={"id": order_id},
                obj_in=OrderUpdateSchema(
                    status="ORDER-DELIVERED", updated_at=datetime.now()
                ),
            )
            return JSONResponse(
                status_code=200,
                content={"status": 200, "message": "Order delivered successfully"},
            )
        except Exception as e:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.deliver_order: {str(e)}"
            )
            return JSONResponse(
                status_code=500,
                content={"status": 500, "message": "Internal server error"},
            )
