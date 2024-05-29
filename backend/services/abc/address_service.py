from abc import ABC, abstractmethod
from typing import Optional

from sqlalchemy.orm import Session

from backend.schemas.address_schema import AddAddressSchema, AddressInDBSchema
from backend.schemas.user_role_permission_schema import \
    UserRolePermissionSchema


class AddressService(ABC):

    @abstractmethod
    def add_or_check_address(
        self,
        db: Session,
        add_address_req: AddAddressSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> AddressInDBSchema:
        pass

    @abstractmethod
    def get_current_shipping_address(
        self, db: Session, current_user_role_permission: UserRolePermissionSchema
    ) -> Optional[AddressInDBSchema]:
        pass
