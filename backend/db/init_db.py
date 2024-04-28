import uuid
from datetime import datetime, timedelta
# Import the necessary classes
from backend.models.user import User
from backend.models.user_session import UserSession
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from backend.core.config import settings
from backend.db.base_class import Base
import os
from backend.common import utils

import csv
from backend.common.logger import setup_logger
"""Import CRUDs from backend.crud."""
from backend.crud.crud_knowledge_base import crud_knowledge_base
from backend.crud.crud_user_session import crud_user_session
from backend.crud.crud_role_permission import crud_role_permission
from backend.crud.crud_role import crud_role
from backend.crud.crud_permission import crud_permission
from backend.crud.crud_promotion import crud_promotion
from backend.crud.crud_chatbot import crud_chatbot
from backend.crud.crud_user import crud_user
from backend.crud.crud_shoe_promotion import crud_shoe_promotion
from backend.crud.crud_brand import crud_brand
from backend.crud.crud_color import crud_color
from backend.crud.crud_message import crud_message
from backend.crud.crud_conversation import crud_conversation
from backend.crud.crud_review import crud_review
from backend.crud.crud_shoe import crud_shoe
from backend.crud.crud_size import crud_size
from backend.crud.crud_cart import crud_cart
from backend.crud.crud_address import crud_address
from backend.crud.crud_order_item import crud_order_item
from backend.crud.crud_shoe_color import crud_shoe_color
from backend.crud.crud_color_size import crud_color_size
from backend.crud.crud_order import crud_order
from backend.crud.crud_cart_item import crud_cart_item

"""Import schemas from backend.schemas."""
from backend.schemas.knowledge_base_schema import KnowledgeBaseCreateSchema
from backend.schemas.user_session_schema import UserSessionCreateSchema
from backend.schemas.role_permission_schema import RolePermissionCreateSchema
from backend.schemas.role_schema import RoleCreateSchema
from backend.schemas.permission_schema import PermissionCreateSchema
from backend.schemas.promotion_schema import PromotionCreateSchema
from backend.schemas.chatbot_schema import ChatbotCreateSchema
from backend.schemas.user_schema import UserInDBSchema
from backend.schemas.shoe_promotion_schema import ShoePromotionCreateSchema
from backend.schemas.brand_schema import BrandCreateSchema
from backend.schemas.color_schema import ColorCreateSchema
from backend.schemas.message_schema import MessageCreateSchema
from backend.schemas.conversation_schema import ConversationCreateSchema
from backend.schemas.review_schema import ReviewCreateSchema
from backend.schemas.shoe_schema import ShoeCreateSchema
from backend.schemas.size_schema import SizeCreateSchema
from backend.schemas.cart_schema import CartCreateSchema
from backend.schemas.address_schema import AddressCreateSchema
from backend.schemas.order_item_schema import OrderItemCreateSchema
from backend.schemas.shoe_color_schema import ShoeColorCreateSchema
from backend.schemas.color_size_schema import ColorSizeCreateSchema
from backend.schemas.order_schema import OrderCreateSchema
from backend.schemas.cart_item_schema import CartItemCreateSchema


logger = setup_logger()

engine = create_engine(
    f"postgresql://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@{settings.POSTGRES_SERVER}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"
)

# logger.info(f"Connecting to database: {settings.POSTGRES_DB}")


def init_db():
    Base.metadata.create_all(bind=engine)
    with Session(engine) as session:
        # Check if tables are empty
        if (
            not session.query(crud_knowledge_base.model).count()
            and not session.query(crud_user_session.model).count()
            and not session.query(crud_role_permission.model).count()
            and not session.query(crud_role.model).count()
            and not session.query(crud_permission.model).count()
            and not session.query(crud_promotion.model).count()
            and not session.query(crud_chatbot.model).count()
            and not session.query(crud_user.model).count()
            and not session.query(crud_shoe_promotion.model).count()
            and not session.query(crud_brand.model).count()
            and not session.query(crud_color.model).count()
            and not session.query(crud_message.model).count()
            and not session.query(crud_conversation.model).count()
            and not session.query(crud_review.model).count()
            and not session.query(crud_shoe.model).count()
            and not session.query(crud_size.model).count()
            and not session.query(crud_cart.model).count()
            and not session.query(crud_address.model).count()
            and not session.query(crud_order_item.model).count()
            and not session.query(crud_shoe_color.model).count()
            and not session.query(crud_color_size.model).count()
            and not session.query(crud_order.model).count()
            and not session.query(crud_cart_item.model).count()
        ):

            # Read permissions from CSV file
            script_dir = os.path.dirname(os.path.realpath(__file__))
            
            with open(os.path.join(script_dir, "raw_data", "admin_permissions.csv"), "r") as f:
                reader = csv.reader(f)
                
                logger.warning("Reading admin permissions from CSV file")
                next(reader)  # Skip the header
                for row in reader:
                    # logger.info(row)
                    permission_name = row[0]
                    permission = crud_permission.create(
                        db=session,
                        obj_in=PermissionCreateSchema(permission_name=permission_name),
                    )
            f.close()

            # Create admin role
            admin_role = crud_role.create(
                db=session,
                obj_in=RoleCreateSchema(role_name="admin"),
            )

            # Fetch all permissions
            all_permissions = crud_permission.get_multi_not_paging(db=session)

            for permission in all_permissions["results"]:
                crud_role_permission.create(
                    db=session,
                    obj_in=RolePermissionCreateSchema(
                        permission_id=permission.id,
                        role_id=admin_role.id,
                    ),
                )

            # Create user role
            user_role = crud_role.create(
                db=session,
                obj_in=RoleCreateSchema(role_name="user"),
            )

            # Read user permissions from CSV file
            with open(os.path.join(script_dir, "raw_data", "user_permissions.csv"), "r") as f:
                reader = csv.reader(f)
                
                logger.warning("Reading user permissions from CSV file")
                next(reader)  # Skip the header
                for row in reader:
                    permission_name = row[0]
                    # logger.info(permission_name)
                    # Fetch the permission by permission_name
                    permission = crud_permission.get_one_by_or_fail(
                        db=session,
                        filter={"permission_name": permission_name},
                    )
                    # logger.info(permission)
                    if permission is not None:
                        crud_role_permission.create(
                            db=session,
                            obj_in=RolePermissionCreateSchema(
                                permission_id=permission.id, role_id=user_role.id
                            ),
                        )
            f.close()
            
            user_found = crud_user.get_one_by(
                db=session,
                filter={"email": "admin@admin.com"}
            )
            
            logger.warning(user_found)
            if user_found is None:
                created_user = crud_user.create(
                    db=session,
                    obj_in=UserInDBSchema(
                        id=uuid.uuid4(),
                        role_id=admin_role.id,
                        email="admin@admin.com",
                        password_hash=utils.hash("admin"),
                        display_name="admin",
                        avatar_url="https://raw.githubusercontent.com/DNAnh01/assets/main/default_user_avatar.png",
                        payment_information="",
                        is_verified=False,
                        user_role="admin",
                        is_active=True,
                        created_at=datetime.now(),
                        updated_at=datetime.now(),
                        deleted_at=None,
                    )
                )
