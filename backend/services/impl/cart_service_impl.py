from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.common.logger import setup_logger
from backend.crud.crud_cart import crud_cart
from backend.crud.crud_shoe import crud_shoe
from backend.schemas.cart_item_schema import (
    AddCartItemSchema,
    CartItemCreateSchema,
    CartItemInDBSchema,
    CartItemOutSchema,
    CartItemUpdateSchema,
)
from backend.schemas.cart_schema import CartOutSchema
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
                content="Add Cart Item failed: User does not have permission to create cart item",
            )
        try:
            """
            class CartItemCreateSchema(pydantic.BaseModel):
            # cart_id: uuid.UUID
            shoe_id: uuid.UUID
            quantity: int
            """

            """
            class AddCartItemSchema(pydantic.BaseModel):
            shoe_id: uuid.UUID
            quantity: int
            """
            cart_found = self.__crud_cart.get_one_by(
                db=db, filter={"user_id": current_user_role_permission.u_id}
            )
            if cart_found is None:
                return JSONResponse(status_code=404, content="Cart not found")
            shoe_found = self.__crud_shoe.get(db=db, id=add_cart_item_req.shoe_id)
            if shoe_found is None:
                return JSONResponse(status_code=404, content="Shoe not found")
            cart_item_exists: CartItemInDBSchema = (
                self.__cart_item_service.is_cart_item_exists(
                    db=db, cart_id=cart_found.id, shoe_id=shoe_found.id
                )
            )
            # nếu tồn tại cart item thì update số lượng cho cart item đó
            if cart_item_exists is not None:
                cart_item_update_req = CartItemUpdateSchema(
                    shoe_id=shoe_found.id, quantity=add_cart_item_req.quantity
                )

                updated_cart_item = self.__cart_item_service.update_cart_item(
                    db=db,
                    cart_item_update=cart_item_update_req,
                    current_user_role_permission=current_user_role_permission,
                )

            else:
                cart_item_create_req = CartItemCreateSchema(
                    shoe_id=shoe_found.id, quantity=add_cart_item_req.quantity
                )
                created_cart_item = self.__cart_item_service.create_cart_item(
                    db=db,
                    cart_item_create=cart_item_create_req,
                    current_user_role_permission=current_user_role_permission,
                )
            logger.info(
                f"cart_found.total_warehouse_price: {cart_found.total_warehouse_price}"
            )

            return JSONResponse(status_code=200, content="Add Cart Item successfully")
        except:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.add_cart_item"
            )
            return JSONResponse(status_code=500, content="Internal Server Error")

    def get_cart(
        self, db: Session, current_user_role_permission: UserRolePermissionSchema
    ) -> CartOutSchema:

        if "read_cart" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.get_cart: User does not have permission to read cart"
            )
            return JSONResponse(
                status_code=400,
                content="Get Cart failed: User does not have permission to read cart",
            )
        try:
            cart_found = self.__crud_cart.get_one_by(
                db=db, filter={"user_id": current_user_role_permission.u_id}
            )
            if cart_found is None:
                return JSONResponse(status_code=404, content="Cart not found")

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
                        shoe=self.__shoe_service.get_shoe_by_id(
                            db=db,
                            shoe_id=cart_item.shoe_id,
                            current_user_role_permission=current_user_role_permission,
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
            return JSONResponse(status_code=500, content="Internal Server Error")
