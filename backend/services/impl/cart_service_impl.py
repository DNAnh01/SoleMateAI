from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.common.logger import setup_logger
from backend.crud.crud_cart import crud_cart
from backend.crud.crud_shoe import crud_shoe
from backend.schemas.cart_item_schema import (
    AddCartItemSchema,
    CartItemCreateSchema,
    CartItemOutSchema,
    CartItemUpdateSchema,
)
from backend.schemas.cart_schema import CartOutSchema
from backend.schemas.shoe_schema import ShoeOutSchema
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.services.abc.cart_item_service import CartItemService
from backend.services.abc.cart_service import CartService
from backend.services.abc.shoe_service import ShoeService
from backend.services.impl.cart_item_service_impl import CartItemServiceImpl
from backend.services.impl.shoe_service_impl import ShoeServiceImpl

logger = setup_logger()


class CartServiceImpl(CartService):

    def __init__(self):
        self.__crud_cart = crud_cart
        self.__cart_item_service: CartItemService = CartItemServiceImpl()
        self.__shoe_service: ShoeService = ShoeServiceImpl()
        self.__crud_shoe = crud_shoe

    def add_cart_item(
        self,
        db: Session,
        add_cart_item_req: AddCartItemSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> JSONResponse:
        if (
            "create_cart_item"
            not in current_user_role_permission.u_list_permission_name
        ):
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.add_cart_item: User does not have permission to create cart item"
            )
            return JSONResponse(
                status_code=400,
                content={
                    "status": 400,
                    "message": "Add Cart Item failed: User does not have permission to create cart item",
                },
            )

        try:
            cart_found = self.__crud_cart.get_one_by(
                db=db, filter={"user_id": current_user_role_permission.u_id}
            )
            if cart_found is None:
                return JSONResponse(
                    status_code=404,
                    content={"status": 404, "message": "Cart not found"},
                )

            shoe_found = self.__crud_shoe.get(db=db, id=add_cart_item_req.shoe_id)
            if shoe_found is None:
                return JSONResponse(
                    status_code=404,
                    content={"status": 404, "message": "Shoe not found"},
                )

            if shoe_found.quantity_in_stock < add_cart_item_req.quantity:
                logger.exception(
                    f"Exception in {__name__}.{self.__class__.__name__}.add_cart_item: Quantity in stock of shoe is not enough"
                )
                return JSONResponse(
                    status_code=400,
                    content={
                        "status": 400,
                        "message": "Add Cart Item failed: Quantity in stock of shoe is not enough",
                    },
                )

            cart_item_exists = self.__cart_item_service.is_cart_item_exists(
                db=db, cart_id=cart_found.id, shoe_id=shoe_found.id
            )

            if cart_item_exists is not None:
                new_quantity = cart_item_exists.quantity + add_cart_item_req.quantity
                if new_quantity <= 0:
                    new_quantity = 1

                cart_item_update_req = CartItemUpdateSchema(
                    shoe_id=shoe_found.id,
                    quantity=new_quantity,
                )
                self.__cart_item_service.update_cart_item(
                    db=db,
                    cart_item_update=cart_item_update_req,
                    current_user_role_permission=current_user_role_permission,
                )
            else:
                cart_item_create_req = CartItemCreateSchema(
                    shoe_id=shoe_found.id, quantity=add_cart_item_req.quantity
                )
                self.__cart_item_service.create_cart_item(
                    db=db,
                    cart_item_create=cart_item_create_req,
                    current_user_role_permission=current_user_role_permission,
                )

            logger.info(
                f"Cart updated successfully, total warehouse price: {cart_found.total_warehouse_price}"
            )

            return JSONResponse(
                status_code=200,
                content={"status": 200, "message": "Add Cart Item successfully"},
            )

        except Exception as e:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.add_cart_item: {str(e)}"
            )
            return JSONResponse(
                status_code=500,
                content={"status": 500, "message": "Internal Server Error"},
            )

    def get_cart(
        self, db: Session, current_user_role_permission: UserRolePermissionSchema
    ) -> CartOutSchema:

        if "read_cart" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.get_cart: User does not have permission to read cart"
            )
            return JSONResponse(
                status_code=400,
                content={
                    "status": 400,
                    "message": "Get Cart failed: User does not have permission to read cart",
                },
            )
        try:
            cart_found = self.__crud_cart.get_one_by(
                db=db, filter={"user_id": current_user_role_permission.u_id}
            )
            if cart_found is None:
                return JSONResponse(
                    status_code=404,
                    content={"status": 404, "message": "Cart not found"},
                )

            total_item: int = 0
            total_display_price: float = 0
            total_warehouse_price: float = 0
            total_discounted_price: float = 0

            for cart_item in cart_found.cart_items:
                if cart_item.deleted_at is None and cart_item.is_active is True:
                    total_item += cart_item.quantity
                    total_display_price += cart_item.display_price
                    total_warehouse_price += cart_item.warehouse_price
                    total_discounted_price += cart_item.discounted_price

            cart_found.total_item = total_item
            cart_found.total_display_price = total_display_price
            cart_found.total_warehouse_price = total_warehouse_price
            cart_found.total_discounted_price = total_discounted_price
            db.commit()
            cart_out: CartOutSchema = CartOutSchema(
                id=cart_found.id,
                user_id=cart_found.user_id,
                total_item=cart_found.total_item,
                total_display_price=cart_found.total_display_price,
                total_warehouse_price=cart_found.total_warehouse_price,
                total_discounted_price=cart_found.total_discounted_price,
                cart_items=[
                    CartItemOutSchema(
                        shoe=ShoeOutSchema(
                            **self.__shoe_service.get_shoe_by_id(
                                db=db,
                                shoe_id=cart_item.shoe_id,
                            ).__dict__
                        ),
                        **cart_item.__dict__,
                    )
                    for cart_item in cart_found.cart_items
                    if cart_item.deleted_at is None and cart_item.is_active is True
                ],
            )

            return cart_out
        except:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.get_cart"
            )
            return JSONResponse(
                status_code=500,
                content={"status": 500, "message": "Internal Server Error"},
            )
