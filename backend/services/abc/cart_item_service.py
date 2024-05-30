import uuid
from abc import ABC, abstractmethod
from typing import Optional

from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.schemas.cart_item_schema import (
    CartItemCreateSchema,
    CartItemInDBSchema,
    CartItemRemoveMultipleSchema,
    CartItemRemoveSchema,
    CartItemUpdateSchema,
)
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema


class CartItemService(ABC):

    @abstractmethod
    def create_cart_item(
        self,
        db: Session,
        cart_item_create: CartItemCreateSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> CartItemInDBSchema:
        pass

    @abstractmethod
    def is_cart_item_exists(
        self, db: Session, cart_id: uuid.UUID, shoe_id: uuid.UUID
    ) -> Optional[CartItemInDBSchema]:
        pass

    @abstractmethod
    def update_cart_item(
        self,
        db: Session,
        cart_item_update: CartItemUpdateSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> CartItemInDBSchema:
        pass

    @abstractmethod
    def remove_cart_item(
        self,
        db: Session,
        cart_item_remove: CartItemRemoveSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> JSONResponse:
        pass

    @abstractmethod
    def remove_multiple_cart_items(
        self,
        db: Session,
        cart_item_remove_multiple: CartItemRemoveMultipleSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> JSONResponse:
        pass
