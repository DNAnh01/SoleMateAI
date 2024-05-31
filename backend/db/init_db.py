import json
import os
import random
import uuid
from datetime import datetime, timedelta

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
from backend.crud.crud_shoe_promotion import crud_shoe_promotion
from backend.crud.crud_size import crud_size
from backend.crud.crud_user import crud_user
from backend.crud.crud_user_session import crud_user_session

"""Import schemas from backend.schemas."""
import pytz

from backend.common.enum.prompt_default import PromptDefault
from backend.schemas.address_schema import AddressInDBSchema
from backend.schemas.brand_schema import BrandCreateSchema
from backend.schemas.chatbot_schema import ChatbotInDBSchema
from backend.schemas.color_schema import ColorCreateSchema
from backend.schemas.order_schema import OrderInDBSchema
from backend.schemas.permission_schema import PermissionCreateSchema
from backend.schemas.promotion_schema import PromotionInDBSchema
from backend.schemas.review_schema import ReviewInDBSchema
from backend.schemas.role_permission_schema import RolePermissionCreateSchema
from backend.schemas.role_schema import RoleCreateSchema
from backend.schemas.shoe_promotion_schema import ShoePromotionInDBSchema
from backend.schemas.shoe_schema import ShoeInDBSchema
from backend.schemas.size_schema import SizeCreateSchema
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
                crud_user.get_one_by(db=session, filter={"email": "admin@gmail.com"})
                is None
            ):
                crud_user.create(
                    db=session,
                    obj_in=UserInDBSchema(
                        id=uuid.uuid4(),
                        role_id=admin_role.id,
                        email="admin@gmail.com",
                        password_hash=utils.hash("admin123"),
                        display_name="admin",
                        avatar_url="https://raw.githubusercontent.com/DNAnh01/assets/main/SoleMateAI/AdobeStock_630609726_Preview.png",
                        payment_information="",
                        is_verified=False,
                        is_active=True,
                        created_at=datetime.now(),
                        updated_at=datetime.now(),
                        deleted_at=None,
                    ),
                )
                crud_user.create(
                    db=session,
                    obj_in=UserInDBSchema(
                        id=uuid.uuid4(),
                        role_id=user_role.id,
                        email="userdefault@gmail.com",
                        password_hash=utils.hash("userdefault"),
                        display_name="userdefault",
                        avatar_url="https://raw.githubusercontent.com/DNAnh01/assets/main/SoleMateAI/default_user_avatar.png",
                        payment_information="",
                        is_verified=False,
                        is_active=True,
                        created_at=datetime.now(),
                        updated_at=datetime.now(),
                        deleted_at=None,
                    ),
                )

            logger.warning(
                "INSERTING DATA INTO THE `promotions` TABLE FROM THE promotions.csv FILE"
            )
            for row in utils.read_csv(
                os.path.join(script_dir, "raw_data", "promotions.csv")
            ):
                """['Summer Sale', '2023-06-01', '2023-08-31', '20']"""
                promotion_name = row[0]
                start_date = datetime.strptime(row[1], "%Y-%m-%d").replace(
                    tzinfo=pytz.utc
                )
                end_date = datetime.strptime(row[2], "%Y-%m-%d").replace(
                    tzinfo=pytz.utc
                )
                discount_percent = int(row[3])
                crud_promotion.create(
                    db=session,
                    obj_in=PromotionInDBSchema(
                        id=uuid.uuid4(),
                        promotion_name=promotion_name,
                        start_date=start_date,
                        end_date=end_date,
                        discount_percent=discount_percent,
                        is_active=True,
                        created_at=datetime.now(),
                        updated_at=datetime.now(),
                        deleted_at=None,
                    ),
                )
            logger.warning(
                "INSERTING DATA INTO THE `brands` TABLE FROM THE brands.csv FILE"
            )
            for row in utils.read_csv(
                os.path.join(script_dir, "raw_data", "brands.csv")
            ):
                """['Adidas','https://raw.githubusercontent.com/DNAnh01/assets/main/SoleMateAI/brand_logo_Adidas.png']"""
                brand_name = row[0]
                brand_logo = row[1]
                crud_brand.create(
                    db=session,
                    obj_in=BrandCreateSchema(
                        brand_name=brand_name,
                        brand_logo=brand_logo,
                    ),
                )
            logger.warning(
                "INSERTING DATA INTO THE `colors` TABLE FROM THE colors.csv FILE"
            )
            for row in utils.read_csv(
                os.path.join(script_dir, "raw_data", "colors.csv")
            ):
                """['Green','#00FF00']"""
                color_name = row[0]
                hex_value = row[1]
                crud_color.create(
                    db=session,
                    obj_in=ColorCreateSchema(
                        color_name=color_name,
                        hex_value=hex_value,
                    ),
                )
            logger.warning(
                "INSERTING DATA INTO THE `sizes` TABLE FROM THE sizes.csv FILE"
            )
            for row in utils.read_csv(
                os.path.join(script_dir, "raw_data", "sizes.csv")
            ):
                size_number = row[0]
                crud_size.create(
                    db=session,
                    obj_in=SizeCreateSchema(
                        size_number=size_number,
                    ),
                )
            logger.warning(
                "INSERTING DATA INTO THE `shoes` TABLE FROM THE shoes.csv FILE"
            )
            for row in utils.read_csv(
                os.path.join(script_dir, "raw_data", "shoes.csv")
            ):
                brand_id_found = crud_brand.get_one_ignore_deleted_and_inactive(
                    db=session,
                    filter={"brand_name": str(row[0])},
                ).id
                if brand_id_found is None:
                    logger.error(f"Brand {row[0]} not found")

                color_id_found = crud_color.get_one_ignore_deleted_and_inactive(
                    db=session,
                    filter={"color_name": str(row[1])},
                ).id
                if color_id_found is None:
                    logger.error(f"Color {row[1]} not found")

                size_id_found = crud_size.get_one_ignore_deleted_and_inactive(
                    db=session,
                    filter={"size_number": int(row[2])},
                ).id
                if size_id_found is None:
                    logger.error(f"Size {row[2]} not found")

                image_url = str(row[3])
                shoe_name = str(row[4])
                description = str(row[5])
                quantity_in_stock = int(row[6])
                display_price = float(row[7])
                warehouse_price = float(row[8])
                discounted_price = float(row[9])

                created_shoe = crud_shoe.create(
                    db=session,
                    obj_in=ShoeInDBSchema(
                        id=uuid.uuid4(),
                        brand_id=brand_id_found,
                        size_id=size_id_found,
                        color_id=color_id_found,
                        image_url=image_url,
                        shoe_name=shoe_name,
                        description=description,
                        quantity_in_stock=quantity_in_stock,
                        display_price=display_price,
                        warehouse_price=warehouse_price,
                        discounted_price=discounted_price,
                        is_active=True,
                        created_at=datetime.now(),
                        updated_at=datetime.now(),
                        deleted_at=None,
                    ),
                )

                if created_shoe is None:
                    logger.error(f"Shoe {shoe_name} not created")
            logger.warning(
                "INSERTING DATA INTO THE `shoes_promotions` TABLE FROM THE shoes_promotions.csv FILE"
            )
            for row in utils.read_csv(
                os.path.join(script_dir, "raw_data", "shoes_promotions.csv")
            ):
                promotion_found = crud_promotion.get_one_ignore_deleted_and_inactive(
                    db=session,
                    filter={"promotion_name": str(row[0])},
                )
                if promotion_found is None:
                    logger.error(f"Promotion {row[0]} not found")

                shoe_name = str(row[1])
                shoe_counter = 0
                for shoe in crud_shoe.get_multi_ignore_deleted_and_inactive(
                    db=session,
                    filter_param={"filter": json.dumps({"shoe_name": str(row[1])})},
                ):
                    if shoe is None:
                        logger.error(f"Shoe {row[1]} not found")
                    """update shoe's discounted price"""
                    if shoe.shoe_name == shoe_name:
                        updated_shoe = crud_shoe.update_one_by(
                            db=session,
                            filter={"id": shoe.id},
                            obj_in=ShoeInDBSchema(
                                id=shoe.id,
                                brand_id=shoe.brand_id,
                                size_id=shoe.size_id,
                                color_id=shoe.color_id,
                                image_url=shoe.image_url,
                                shoe_name=shoe.shoe_name,
                                description=shoe.description,
                                quantity_in_stock=shoe.quantity_in_stock,
                                display_price=shoe.display_price,
                                warehouse_price=shoe.warehouse_price,
                                discounted_price=shoe.display_price
                                - (
                                    shoe.display_price
                                    * promotion_found.discount_percent
                                    / 100
                                ),
                                is_active=True,
                                created_at=shoe.created_at,
                                updated_at=datetime.now(),
                                deleted_at=None,
                            ),
                        )
                        """create shoe_promotion"""
                        created_shoe_promotion = crud_shoe_promotion.create(
                            db=session,
                            obj_in=ShoePromotionInDBSchema(
                                id=uuid.uuid4(),
                                shoe_id=updated_shoe.id,
                                promotion_id=promotion_found.id,
                                is_active=True,
                                created_at=datetime.now(),
                                updated_at=datetime.now(),
                                deleted_at=None,
                            ),
                        )
                        shoe_counter += 1
                        if shoe_counter >= 10:
                            break
            logger.warning(
                "INSERTING DATA INTO THE `reviews` TABLE FROM THE reviews.csv FILE"
            )
            ratings_comments = {
                3: "Giày tạm được nha shop.",
                4: "Giày đẹp chất lượng ổn.",
                5: "Giày đẹp lắm, chất lượng tuyệt vời.",
            }
            for row in utils.read_csv(
                os.path.join(script_dir, "raw_data", "reviews.csv")
            ):
                user_found = crud_user.get_one_ignore_deleted_and_inactive(
                    db=session,
                    filter={"email": str(row[0])},
                )
                if user_found is None:
                    logger.error(f"User {row[0]} not found")

                shoe_name = str(row[1])
                for shoe in crud_shoe.get_multi_ignore_deleted_and_inactive(
                    db=session,
                    filter_param={"filter": json.dumps({"shoe_name": str(row[1])})},
                ):
                    if shoe is None:
                        logger.error(f"Shoe {row[1]} not found")
                    if shoe.shoe_name == shoe_name:
                        """create review"""
                        random_rating = random.choice(list(ratings_comments.keys()))
                        random_comment = ratings_comments[random_rating]
                        created_review = crud_review.create(
                            db=session,
                            obj_in=ReviewInDBSchema(
                                id=uuid.uuid4(),
                                user_id=user_found.id,
                                shoe_id=shoe.id,
                                rating=random_rating,
                                comment=random_comment,
                                heart_count=random.randint(100, 500),
                                is_active=True,
                                created_at=datetime.now(),
                                updated_at=datetime.now(),
                                deleted_at=None,
                            ),
                        )

            logger.warning(
                "INSERTING DATA INTO THE `addresses` TABLE FROM THE addresses.csv FILE"
            )
            for row in utils.read_csv(
                os.path.join(script_dir, "raw_data", "addresses.csv")
            ):

                user_found = crud_user.get_one_ignore_deleted_and_inactive(
                    db=session,
                    filter={"email": str(row[0])},
                )
                if user_found is None:
                    logger.error(f"User {row[0]} not found")

                address_ward = str(row[1])
                address_district = str(row[2])
                address_province = str(row[3])

                address_is_active = False
                address_created_at = datetime.strptime(row[4], "%Y-%m-%d").replace(
                    tzinfo=pytz.utc
                )
                address_updated_at = datetime.strptime(row[5], "%Y-%m-%d").replace(
                    tzinfo=pytz.utc
                )
                address_deleted_at = datetime.strptime(row[6], "%Y-%m-%d").replace(
                    tzinfo=pytz.utc
                )
                created_address = crud_address.create(
                    db=session,
                    obj_in=AddressInDBSchema(
                        id=uuid.uuid4(),
                        user_id=user_found.id,
                        ward=address_ward,
                        district=address_district,
                        province=address_province,
                        is_active=address_is_active,
                        created_at=address_created_at,
                        updated_at=address_updated_at,
                        deleted_at=address_deleted_at,
                    ),
                )
            logger.warning(
                "INSERTING DATA INTO THE `orders` TABLE FROM THE orders.csv FILE"
            )
            for row in utils.read_csv(
                os.path.join(script_dir, "raw_data", "orders.csv")
            ):
                user_found = crud_user.get_one_ignore_deleted_and_inactive(
                    db=session,
                    filter={"email": str(row[0])},
                )
                if user_found is None:
                    logger.error(f"User {row[0]} not found")

                address_ward = str(row[1])
                address_district = str(row[2])
                address_province = str(row[3])

                order_date = datetime.strptime(row[4], "%Y-%m-%d %H:%M:%S").replace(
                    tzinfo=pytz.utc
                )
                # Thay đổi cách tính delivery_date
                delivery_date = datetime.strptime(row[5], "%Y-%m-%d %H:%M:%S").replace(
                    tzinfo=pytz.utc
                ) + timedelta(days=7)

                status = str(row[6])
                total_item = int(row[7])
                total_display_price = float(row[8])
                total_warehouse_price = float(row[9])
                total_discounted_price = float(row[10])

                order_created_at = datetime.strptime(
                    row[12], "%Y-%m-%d %H:%M:%S"
                ).replace(tzinfo=pytz.utc)

                order_updated_at = datetime.strptime(
                    row[13], "%Y-%m-%d %H:%M:%S"
                ).replace(tzinfo=pytz.utc)

                try:
                    order_deleted_at = datetime.strptime(
                        row[14], "%Y-%m-%d %H:%M:%S"
                    ).replace(tzinfo=pytz.utc)
                except ValueError:
                    logger.error(f"Invalid date in row: {row}")

                order_is_active = False

                address_found = crud_address.get_one_ignore_deleted_and_inactive(
                    db=session,
                    filter={
                        "user_id": user_found.id,
                        "province": address_province,
                        "district": address_district,
                        "ward": address_ward,
                    },
                )

                created_order = crud_order.create(
                    db=session,
                    obj_in=OrderInDBSchema(
                        id=uuid.uuid4(),
                        address_id=address_found.id,
                        user_id=user_found.id,
                        order_date=order_date,
                        delivery_date=delivery_date,
                        status=status,
                        total_item=total_item,
                        total_display_price=total_display_price,
                        total_warehouse_price=total_warehouse_price,
                        total_discounted_price=total_discounted_price,
                        is_active=order_is_active,
                        created_at=order_created_at,
                        updated_at=order_updated_at,
                        deleted_at=order_deleted_at,
                    ),
                )

            user_found = crud_user.get_one_ignore_deleted_and_inactive(
                db=session, filter={"email": "admin@gmail.com"}
            )
            created_chatbot = crud_chatbot.create(
                db=session,
                obj_in=ChatbotInDBSchema(
                    id=uuid.uuid4(),
                    user_id=user_found.id,
                    chatbot_name="Chatbot mặc định.",
                    # model="gpt-3.5-turbo-16k",
                    model="gpt-4",
                    is_public=True,
                    description="Chatbot mặc định khi khởi chạy dự án.",
                    temperature=0.5,
                    max_token=100,
                    is_default=True,
                    prompt=PromptDefault.PROMPT_DEFAULT.value,
                    is_active=True,
                    created_at=datetime.now(),
                    updated_at=datetime.now(),
                    deleted_at=None,
                ),
            )
