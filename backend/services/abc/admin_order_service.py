import uuid
from abc import ABC, abstractmethod
from typing import List, Optional

from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.schemas.order_schema import OrderOutSchema
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema


class AdminOrderService(ABC):

    @abstractmethod
    def get_all_order(
        self,
        db: Session,
        common_filters: dict,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[List[OrderOutSchema]]:
        pass

    @abstractmethod
    def get_order_by_id(
        self,
        db: Session,
        order_id: uuid.UUID,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[OrderOutSchema]:
        pass

    @abstractmethod
    def cancel_order(
        self,
        db: Session,
        order_id: uuid.UUID,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> JSONResponse:
        pass

    @abstractmethod
    def deliver_order(
        self,
        db: Session,
        order_id: uuid.UUID,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> JSONResponse:
        pass
