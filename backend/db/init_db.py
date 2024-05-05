import os
import uuid
from datetime import datetime

from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from backend.common import utils
from backend.common.logger import setup_logger
from backend.core.config import settings
from backend.db.base_class import Base

"""Import CRUDs from backend.crud."""
from backend.crud.crud_address import crud_address
from backend.crud.crud_brand import crud_brand
from backend.crud.crud_cart import crud_cart
from backend.crud.crud_cart_item import crud_cart_item
from backend.crud.crud_chatbot import crud_chatbot
from backend.crud.crud_color import crud_color
from backend.crud.crud_color_size import crud_color_size
from backend.crud.crud_conversation import crud_conversation
from backend.crud.crud_knowledge_base import crud_knowledge_base
from backend.crud.crud_message import crud_message
from backend.crud.crud_order import crud_order
from backend.crud.crud_order_item import crud_order_item
from backend.crud.crud_permission import crud_permission
from backend.crud.crud_promotion import crud_promotion
from backend.crud.crud_review import crud_review
from backend.crud.crud_role import crud_role
from backend.crud.crud_role_permission import crud_role_permission
from backend.crud.crud_shoe import crud_shoe
from backend.crud.crud_shoe_color import crud_shoe_color
from backend.crud.crud_shoe_promotion import crud_shoe_promotion
from backend.crud.crud_size import crud_size
from backend.crud.crud_user import crud_user
from backend.crud.crud_user_session import crud_user_session

"""Import schemas from backend.schemas."""
from backend.schemas.permission_schema import PermissionCreateSchema
from backend.schemas.role_permission_schema import RolePermissionCreateSchema
from backend.schemas.role_schema import RoleCreateSchema
from backend.schemas.user_schema import UserInDBSchema

logger = setup_logger()

engine = create_engine(
    f"postgresql://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@{settings.POSTGRES_SERVER}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"
)


def init_db():
    Base.metadata.create_all(bind=engine)
    with Session(engine) as session:
        crud_models = [
            crud_knowledge_base,
            crud_user_session,
            crud_role_permission,
            crud_role,
            crud_permission,
            crud_promotion,
            crud_chatbot,
            crud_user,
            crud_shoe_promotion,
            crud_brand,
            crud_color,
            crud_message,
            crud_conversation,
            crud_review,
            crud_shoe,
            crud_size,
            crud_cart,
            crud_address,
            crud_order_item,
            crud_shoe_color,
            crud_color_size,
            crud_order,
            crud_cart_item,
        ]

        if not any(session.query(crud.model).count() for crud in crud_models):
            script_dir = os.path.dirname(os.path.realpath(__file__))
            logger.warning(
                "INSERTING DATA INTO THE `permissions` TABLE FROM THE admin_permissions.csv FILE"
            )
            for row in utils.read_csv(
                os.path.join(script_dir, "raw_data", "admin_permissions.csv")
            ):
                permission_name = row[0]
                permission = crud_permission.create(
                    db=session,
                    obj_in=PermissionCreateSchema(permission_name=permission_name),
                )
            logger.warning("INSERTING DATA INTO THE `roles` TABLE (ADMIN)")
            admin_role = crud_role.create(
                db=session,
                obj_in=RoleCreateSchema(role_name="admin"),
            )
            logger.warning("INSERTING DATA INTO THE `roles_permissions` TABLE (ADMIN)")
            all_permissions = crud_permission.get_multi_not_paging(db=session)
            for permission in all_permissions["results"]:
                crud_role_permission.create(
                    db=session,
                    obj_in=RolePermissionCreateSchema(
                        permission_id=permission.id,
                        role_id=admin_role.id,
                    ),
                )
            logger.warning("INSERTING DATA INTO THE `roles` TABLE (USER)")
            user_role = crud_role.create(
                db=session,
                obj_in=RoleCreateSchema(role_name="user"),
            )
            logger.warning("INSERTING DATA INTO THE `roles_permissions` TABLE (USER)")
            for row in utils.read_csv(
                os.path.join(script_dir, "raw_data", "user_permissions.csv")
            ):
                permission_name = row[0]
                permission = crud_permission.get_one_by_or_fail(
                    db=session,
                    filter={"permission_name": permission_name},
                )
                crud_role_permission.create(
                    db=session,
                    obj_in=RolePermissionCreateSchema(
                        permission_id=permission.id,
                        role_id=user_role.id,
                    ),
                )
            logger.warning("INSERTING DATA INTO THE `users` TABLE (ADMIN)")
            if (
                crud_user.get_one_by(db=session, filter={"email": "admin@admin.com"})
                is None
            ):
                crud_user.create(
                    db=session,
                    obj_in=UserInDBSchema(
                        id=uuid.uuid4(),
                        role_id=admin_role.id,
                        email="admin@admin.com",
                        password_hash=utils.hash("admin"),
                        display_name="admin",
                        avatar_url="https://raw.githubusercontent.com/DNAnh01/assets/main/SoleMateAI/default_user_avatar.png",
                        payment_information="",
                        is_verified=False,
                        user_role="admin",
                        is_active=True,
                        created_at=datetime.now(),
                        updated_at=datetime.now(),
                        deleted_at=None,
                    ),
                )
            # logger.warning("INSERTING DATA INTO THE `promotions` TABLE FROM THE promotions.csv FILE")
            # for row in utils.read_csv(os.path.join(script_dir, "raw_data", "promotions.csv")):
            #     """['Summer Sale', '2023-06-01', '2023-08-31', '20']"""
            #     promotion_name = row[0]
            #     start_date = datetime.strptime(row[1], "%Y-%m-%d").replace(tzinfo=pytz.utc)
            #     end_date = datetime.strptime(row[2], "%Y-%m-%d").replace(tzinfo=pytz.utc)
            #     discount_percent = int(row[3])
            #     crud_promotion.create(
            #         db=session,
            #         obj_in=PromotionCreateSchema(
            #             promotion_name=promotion_name,
            #             start_date=start_date,
            #             end_date=end_date,
            #             discount_percent=discount_percent,
            #         ),
            #     )
            # logger.warning("INSERTING DATA INTO THE `colors` TABLE FROM THE colors.csv FILE")
            # for row in utils.read_csv(os.path.join(script_dir, "raw_data", "colors.csv")):
            #     """['Green','#00FF00']"""
            #     color_name = row[0]
            #     hex_value = row[1]
            #     crud_color.create(
            #         db=session,
            #         obj_in=ColorCreateSchema(
            #             color_name=color_name,
            #             hex_value=hex_value,
            #         ),
            #     )
            # logger.warning("INSERTING DATA INTO THE `brands` TABLE FROM THE brands.csv FILE")
            # for row in utils.read_csv(os.path.join(script_dir, "raw_data", "brands.csv")):
            #     """['Adidas','https://raw.githubusercontent.com/DNAnh01/assets/main/SoleMateAI/brand_logo_Adidas.png']"""
            #     brand_name = row[0]
            #     brand_logo = row[1]
            #     crud_brand.create(
            #         db=session,
            #         obj_in=BrandCreateSchema(
            #             brand_name=brand_name,
            #             brand_logo=brand_logo,
            #         ),
            #     )

            # logger.warning("INSERTING DATA INTO THE `sizes` TABLE FROM THE sizes.csv FILE")
            # for row in utils.read_csv(os.path.join(script_dir, "raw_data", "sizes.csv")):
            #     size_number = row[0]
            #     crud_size.create(
            #         db=session,
            #         obj_in=SizeCreateSchema(
            #             size_number=size_number,
            #         ),
            #     )
