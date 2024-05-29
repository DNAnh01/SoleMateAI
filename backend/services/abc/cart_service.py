from abc import ABC, abstractmethod

from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.schemas.cart_item_schema import AddCartItemSchema
from backend.schemas.cart_schema import CartOutSchema
from backend.schemas.user_role_permission_schema import \
    UserRolePermissionSchema


class CartService(ABC):

    @abstractmethod
    def add_cart_item(
        self,
        db: Session,
        add_cart_item_req: AddCartItemSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> JSONResponse:
        pass

    @abstractmethod
    def get_cart(
        self, db: Session, current_user_role_permission: UserRolePermissionSchema
    ) -> CartOutSchema:
        pass
