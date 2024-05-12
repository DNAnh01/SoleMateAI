import uuid
from datetime import datetime
from typing import Optional

from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.common.logger import setup_logger
from backend.crud.crud_address import crud_address
from backend.schemas.address_schema import AddAddressSchema, AddressInDBSchema
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.services.abc.address_service import AddressService

logger = setup_logger()


class AddressServiceImpl(AddressService):
    def __init__(self):
        self.__crud_address = crud_address

    def add_or_check_address(
        self,
        db: Session,
        add_address_req: AddAddressSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> AddressInDBSchema:

        if (
            "create_address"
            and "read_address"
            and "update_address"
            and "delete_address"
            not in current_user_role_permission.u_list_permission_name
        ):
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.add_or_update_address: User does not have permission to add or update address"
            )
            return JSONResponse(
                status_code=400,
                content={
                    "status": 400,
                    "message": "Add or Update Address failed: User does not have permission to add or update address",
                },
            )
        try:
            address_found = self.__crud_address.get_one_by(
                db=db, filter={"user_id": current_user_role_permission.u_id}
            )
            
            if address_found is None:
                """create address"""
                created_address = self.__crud_address.create(
                    db=db,
                    obj_in=AddressInDBSchema(
                        id=uuid.uuid4(),
                        user_id=current_user_role_permission.u_id,
                        street=add_address_req.street,
                        city=add_address_req.city,
                        is_active=True,
                        created_at=datetime.now(),
                        updated_at=datetime.now(),
                        deleted_at=None,
                    ),
                )
                return AddressInDBSchema(**created_address.__dict__)
                
            check_address = self.__crud_address.get_one_by(
                db=db, 
                filter={
                    "user_id": current_user_role_permission.u_id,
                    "street": add_address_req.street,
                    "city": add_address_req.city
                }
            )
            if check_address is None:
                """remove old address"""
                self.__crud_address.remove(db=db, id=address_found.id)
                """add new address"""
                created_address = self.__crud_address.create(
                    db=db,
                    obj_in=AddressInDBSchema(
                        id=uuid.uuid4(),
                        user_id=current_user_role_permission.u_id,
                        street=add_address_req.street,
                        city=add_address_req.city,
                        is_active=True,
                        created_at=datetime.now(),
                        updated_at=datetime.now(),
                        deleted_at=None,
                    ),
                )
                return AddressInDBSchema(**created_address.__dict__)
            """if address is matched with existing address"""
            return AddressInDBSchema(**check_address.__dict__)
        except:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.add_or_update_address: Unexpected error"
            )
            return JSONResponse(
                status_code=400,
                content={
                    "status": 400,
                    "message": "Add or Update Address failed: Unexpected error",
                },
            )

    def get_current_shipping_address(
        self, db: Session, current_user_role_permission: UserRolePermissionSchema
    ) -> Optional[AddressInDBSchema]:
        if "read_address" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.get_current_shipping_address: User does not have permission to read address"
            )
            return JSONResponse(
                status_code=400,
                content={
                    "status": 400,
                    "message": "Get Current Shipping Address failed: User does not have permission to read address",
                },
            )
        try:
            current_shipping_address = self.__crud_address.get_one_by(
                db=db, filter={"user_id": current_user_role_permission.u_id}
            )
            if current_shipping_address is None:
                logger.exception(
                    f"Exception in {__name__}.{self.__class__.__name__}.get_current_shipping_address: No shipping address found"
                )
                return JSONResponse(
                    status_code=400,
                    content={
                        "status": 400,
                        "message": "Get Current Shipping Address failed: No shipping address found"
                    },
                )
            return current_shipping_address
        except:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.get_current_shipping_address: Unexpected error"
            )
            return JSONResponse(
                status_code=400,
                content={
                    "status": 400,
                    "message": "Get Current Shipping Address failed: Unexpected error"
                },
            )
