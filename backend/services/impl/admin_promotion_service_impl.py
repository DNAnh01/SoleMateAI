import json
import uuid
from datetime import datetime
from typing import List, Optional

from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.common.logger import setup_logger
from backend.crud.crud_brand import crud_brand
from backend.crud.crud_color import crud_color
from backend.crud.crud_promotion import crud_promotion
from backend.crud.crud_shoe import crud_shoe
from backend.crud.crud_shoe_promotion import crud_shoe_promotion
from backend.crud.crud_size import crud_size
from backend.schemas.brand_schema import BrandCreateSchema
from backend.schemas.color_schema import ColorCreateSchema
from backend.schemas.promotion_schema import (PromotionCreateSchema,
                                              PromotionInDBSchema,
                                              PromotionOutSchema,
                                              PromotionUpdateSchema)
from backend.schemas.shoe_promotion_schema import ShoePromotionInDBSchema
from backend.schemas.shoe_schema import ShoeInDBSchema, ShoeOutSchema
from backend.schemas.size_schema import SizeCreateSchema
from backend.schemas.user_role_permission_schema import \
    UserRolePermissionSchema
from backend.services.abc.admin_promotion_service import AdminPromotionService

logger = setup_logger()


class AdminPromotionServiceImpl(AdminPromotionService):
    def __init__(self):
        self.__crud_promotion = crud_promotion
        self.__crud_shoe = crud_shoe
        self.__crud_shoe_promotion = crud_shoe_promotion
        self.__crud_brand = crud_brand
        self.__crud_size = crud_size
        self.__crud_color = crud_color

    def create_promotion(
        self,
        db: Session,
        promotion: PromotionCreateSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> PromotionOutSchema:
        if (
            "create_shoe_promotion"
            not in current_user_role_permission.u_list_permission_name
        ):
            logger.exception(
                f"Permission Error: User {current_user_role_permission.u_username} has no permission to create promotion"
            )
            return JSONResponse(
                status_code=403,
                content={
                    "status": 403,
                    "message": "Permission Error: You do not have permission to create promotion",
                },
            )
        try:
            promotion_found = self.__crud_promotion.get_one_by(
                db=db,
                filter={
                    "promotion_name": promotion.promotion_name,
                    "start_date": promotion.start_date,
                    "end_date": promotion.end_date,
                    "discount_percent": promotion.discount_percent,
                },
            )
            if promotion_found:
                return JSONResponse(
                    status_code=400,
                    content={"status": 400, "message": "Promotion already exists"},
                )
            """create promotion"""
            created_promotion = self.__crud_promotion.create(
                db=db,
                obj_in=PromotionInDBSchema(
                    id=uuid.uuid4(),
                    promotion_name=promotion.promotion_name,
                    start_date=promotion.start_date,
                    end_date=promotion.end_date,
                    discount_percent=promotion.discount_percent,
                    is_active=True,
                    created_at=datetime.now(),
                    updated_at=datetime.now(),
                    deleted_at=None,
                ),
            )
            if created_promotion is None:
                return JSONResponse(
                    status_code=400,
                    content={"status": 400, "message": "Create promotion failed"},
                )
            shoes_out = []
            """check shoe in promotion"""
            for shoe_id in promotion.shoe_ids:
                shoe_found = self.__crud_shoe.get(db=db, id=shoe_id)
                if shoe_found is None:
                    return JSONResponse(
                        status_code=400,
                        content={
                            "status": 400,
                            "message": f"Shoe with id {shoe_id} not found",
                        },
                    )
                brand_found = self.__crud_brand.get(db=db, id=shoe_found.brand_id)
                if brand_found is None:
                    return JSONResponse(
                        status_code=400,
                        content={
                            "status": 400,
                            "message": f"Brand with id {shoe_found.brand_id} not found",
                        },
                    )
                size_found = self.__crud_size.get(db=db, id=shoe_found.size_id)
                if size_found is None:
                    return JSONResponse(
                        status_code=400,
                        content={
                            "status": 400,
                            "message": f"Size with id {shoe_found.size_id} not found",
                        },
                    )

                color_found = self.__crud_color.get(db=db, id=shoe_found.color_id)
                if color_found is None:
                    return JSONResponse(
                        status_code=400,
                        content={
                            "status": 400,
                            "message": f"Color with id {shoe_found.color_id} not found",
                        },
                    )

                """update discounted_price in shoe"""
                updated_shoe = self.__crud_shoe.update_one_by(
                    db=db,
                    filter={"id": shoe_found.id},
                    obj_in=ShoeInDBSchema(
                        id=shoe_found.id,
                        brand_id=shoe_found.brand_id,
                        size_id=shoe_found.size_id,
                        color_id=shoe_found.color_id,
                        image_url=shoe_found.image_url,
                        shoe_name=shoe_found.shoe_name,
                        description=shoe_found.description,
                        quantity_in_stock=shoe_found.quantity_in_stock,
                        display_price=shoe_found.display_price,
                        warehouse_price=shoe_found.warehouse_price,
                        discounted_price=shoe_found.display_price
                        - (shoe_found.display_price * promotion.discount_percent / 100),
                        is_active=shoe_found.is_active,
                        created_at=shoe_found.created_at,
                        updated_at=shoe_found.updated_at,
                        deleted_at=shoe_found.deleted_at,
                    ),
                )
                """Create shoe_promotion"""
                created_shoes_promotions = self.__crud_shoe_promotion.create(
                    db=db,
                    obj_in=ShoePromotionInDBSchema(
                        id=uuid.uuid4(),
                        shoe_id=shoe_found.id,
                        promotion_id=created_promotion.id,
                        is_active=True,
                        created_at=datetime.now(),
                        updated_at=datetime.now(),
                        deleted_at=None,
                    ),
                )
                if created_shoes_promotions is None:
                    return JSONResponse(
                        status_code=400,
                        content={
                            "status": 400,
                            "message": "Create shoe promotion failed",
                        },
                    )
                shoes_out.append(
                    ShoeOutSchema(
                        id=updated_shoe.id,
                        brand=BrandCreateSchema(
                            brand_logo=brand_found.brand_logo,
                            brand_name=brand_found.brand_name,
                        ),
                        size=SizeCreateSchema(
                            size_number=size_found.size_number,
                        ),
                        color=ColorCreateSchema(
                            color_name=color_found.color_name,
                            hex_value=color_found.hex_value,
                        ),
                        image_url=updated_shoe.image_url,
                        shoe_name=updated_shoe.shoe_name,
                        description=updated_shoe.description,
                        quantity_in_stock=updated_shoe.quantity_in_stock,
                        display_price=updated_shoe.display_price,
                        warehouse_price=updated_shoe.warehouse_price,
                        discounted_price=updated_shoe.discounted_price,
                        is_active=updated_shoe.is_active,
                        created_at=updated_shoe.created_at,
                        updated_at=updated_shoe.updated_at,
                        deleted_at=updated_shoe.deleted_at,
                    )
                )
            return PromotionOutSchema(
                id=created_promotion.id,
                promotion_name=created_promotion.promotion_name,
                start_date=created_promotion.start_date,
                end_date=created_promotion.end_date,
                discount_percent=created_promotion.discount_percent,
                shoes=shoes_out,
                is_active=created_promotion.is_active,
                created_at=created_promotion.created_at,
                updated_at=created_promotion.updated_at,
                deleted_at=created_promotion.deleted_at,
            )
        except Exception as e:
            logger.exception(f"Create promotion failed: {e}")
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Create promotion failed"},
            )

    def get_all_promotion(
        self,
        db: Session,
        common_filters: dict,
    ) -> Optional[List[PromotionOutSchema]]:
        try:
            promotions = self.__crud_promotion.get_multi(
                db=db, filter_param=common_filters
            )
            promotions_out = []
            for promotion in promotions:
                shoes_out = []
                shoes_promotions = self.__crud_shoe_promotion.get_multi(
                    db=db,
                    filter_param={
                        "filter": json.dumps({"promotion_id": str(promotion.id)})
                    },
                )
                for shoe_promotion in shoes_promotions:
                    shoe = self.__crud_shoe.get(db=db, id=shoe_promotion.shoe_id)
                    if shoe is None:
                        return JSONResponse(
                            status_code=400,
                            content={
                                "status": 400,
                                "message": f"Shoe with id {shoe_promotion.shoe_id} not found",
                            },
                        )
                    brand = self.__crud_brand.get(db=db, id=shoe.brand_id)
                    if brand is None:
                        return JSONResponse(
                            status_code=400,
                            content={
                                "status": 400,
                                "message": f"Brand with id {shoe.brand_id} not found",
                            },
                        )
                    size = self.__crud_size.get(db=db, id=shoe.size_id)
                    if size is None:
                        return JSONResponse(
                            status_code=400,
                            content={
                                "status": 400,
                                "message": f"Size with id {shoe.size_id} not found",
                            },
                        )
                    color = self.__crud_color.get(db=db, id=shoe.color_id)
                    if color is None:
                        return JSONResponse(
                            status_code=400,
                            content={
                                "status": 400,
                                "message": f"Color with id {shoe.color_id} not found",
                            },
                        )
                    shoes_out.append(
                        ShoeOutSchema(
                            id=shoe.id,
                            brand=BrandCreateSchema(**brand.__dict__),
                            size=SizeCreateSchema(**size.__dict__),
                            color=ColorCreateSchema(**color.__dict__),
                            image_url=shoe.image_url,
                            shoe_name=shoe.shoe_name,
                            description=shoe.description,
                            quantity_in_stock=shoe.quantity_in_stock,
                            display_price=shoe.display_price,
                            warehouse_price=shoe.warehouse_price,
                            discounted_price=shoe.discounted_price,
                            is_active=shoe.is_active,
                            created_at=shoe.created_at,
                            updated_at=shoe.updated_at,
                            deleted_at=shoe.deleted_at,
                        )
                    )
                promotions_out.append(
                    PromotionOutSchema(
                        id=promotion.id,
                        promotion_name=promotion.promotion_name,
                        start_date=promotion.start_date,
                        end_date=promotion.end_date,
                        discount_percent=promotion.discount_percent,
                        shoes=shoes_out,
                        is_active=promotion.is_active,
                        created_at=promotion.created_at,
                        updated_at=promotion.updated_at,
                        deleted_at=promotion.deleted_at,
                    )
                )
            return promotions_out
        except Exception as e:
            logger.exception(f"Get all promotion failed: {e}")
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Get all promotion failed"},
            )

    def get_promotion_by_id(
        self,
        db: Session,
        promotion_id: uuid.UUID,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[PromotionOutSchema]:
        if "read_promotion" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Permission Error: User {current_user_role_permission.u_username} has no permission to read promotion"
            )
            return JSONResponse(
                status_code=403,
                content={
                    "status": 403,
                    "message": "Permission Error: You do not have permission to read promotion",
                },
            )
        try:
            promotion = self.__crud_promotion.get(db=db, id=promotion_id)
            if promotion is None:
                return JSONResponse(
                    status_code=400,
                    content={
                        "status": 400,
                        "message": f"Promotion with id {promotion_id} not found",
                    },
                )
            shoes_out = []
            shoes_promotions = self.__crud_shoe_promotion.get_multi(
                db=db,
                filter_param={
                    "filter": json.dumps({"promotion_id": str(promotion.id)})
                },
            )
            for shoe_promotion in shoes_promotions:
                shoe = self.__crud_shoe.get(db=db, id=shoe_promotion.shoe_id)
                if shoe is None:
                    return JSONResponse(
                        status_code=400,
                        content={
                            "status": 400,
                            "message": f"Shoe with id {shoe_promotion.shoe_id} not found",
                        },
                    )
                brand = self.__crud_brand.get(db=db, id=shoe.brand_id)
                if brand is None:
                    return JSONResponse(
                        status_code=400,
                        content={
                            "status": 400,
                            "message": f"Brand with id {shoe.brand_id} not found",
                        },
                    )
                size = self.__crud_size.get(db=db, id=shoe.size_id)
                if size is None:
                    return JSONResponse(
                        status_code=400,
                        content={
                            "status": 400,
                            "message": f"Size with id {shoe.size_id} not found",
                        },
                    )
                color = self.__crud_color.get(db=db, id=shoe.color_id)
                if color is None:
                    return JSONResponse(
                        status_code=400,
                        content={
                            "status": 400,
                            "message": f"Color with id {shoe.color_id} not found",
                        },
                    )
                shoes_out.append(
                    ShoeOutSchema(
                        id=shoe.id,
                        brand=BrandCreateSchema(**brand.__dict__),
                        size=SizeCreateSchema(**size.__dict__),
                        color=ColorCreateSchema(**color.__dict__),
                        image_url=shoe.image_url,
                        shoe_name=shoe.shoe_name,
                        description=shoe.description,
                        quantity_in_stock=shoe.quantity_in_stock,
                        display_price=shoe.display_price,
                        warehouse_price=shoe.warehouse_price,
                        discounted_price=shoe.discounted_price,
                        is_active=shoe.is_active,
                        created_at=shoe.created_at,
                        updated_at=shoe.updated_at,
                        deleted_at=shoe.deleted_at,
                    )
                )
            return PromotionOutSchema(
                id=promotion.id,
                promotion_name=promotion.promotion_name,
                start_date=promotion.start_date,
                end_date=promotion.end_date,
                discount_percent=promotion.discount_percent,
                shoes=shoes_out,
                is_active=promotion.is_active,
                created_at=promotion.created_at,
                updated_at=promotion.updated_at,
                deleted_at=promotion.deleted_at,
            )
        except Exception as e:
            logger.exception(f"Get promotion by id failed: {e}")
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Get promotion by id failed"},
            )

    def update_promotion(
        self,
        db: Session,
        promotion_id: uuid.UUID,
        promotion: PromotionUpdateSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> PromotionOutSchema:
        if (
            "update_promotion"
            not in current_user_role_permission.u_list_permission_name
        ):
            logger.exception(
                f"Permission Error: User {current_user_role_permission.u_username} has no permission to update promotion"
            )
            return JSONResponse(
                status_code=403,
                content={
                    "status": 403,
                    "message": "Permission Error: You do not have permission to update promotion",
                },
            )
        try:
            promotion_found = self.__crud_promotion.get(db=db, id=promotion_id)
            if promotion_found is None:
                return JSONResponse(
                    status_code=400,
                    content={
                        "status": 400,
                        "message": f"Promotion with id {promotion_id} not found",
                    },
                )
            if promotion.promotion_name is not None:
                promotion_found.promotion_name = promotion.promotion_name
            if promotion.start_date is not None:
                promotion_found.start_date = promotion.start_date
            if promotion.end_date is not None:
                promotion_found.end_date = promotion.end_date
            if promotion.discount_percent is not None:
                promotion_found.discount_percent = promotion.discount_percent
            updated_promotion = self.__crud_promotion.update_one_by(
                db=db, filter={"id": promotion_id}, obj_in=promotion_found
            )
            if updated_promotion is None:
                return JSONResponse(
                    status_code=400,
                    content={"status": 400, "message": "Update promotion failed"},
                )
            shoes_out = []
            for shoe_id in promotion.shoe_ids:
                shoe_found = self.__crud_shoe.get(db=db, id=shoe_id)
                if shoe_found is None:
                    return JSONResponse(
                        status_code=400,
                        content={
                            "status": 400,
                            "message": f"Shoe with id {shoe_id} not found",
                        },
                    )
                """update discounted_price in shoe"""
                updated_shoe = self.__crud_shoe.update_one_by(
                    db=db,
                    filter={"id": shoe_found.id},
                    obj_in=ShoeInDBSchema(
                        id=shoe_found.id,
                        brand_id=shoe_found.brand_id,
                        size_id=shoe_found.size_id,
                        color_id=shoe_found.color_id,
                        image_url=shoe_found.image_url,
                        shoe_name=shoe_found.shoe_name,
                        description=shoe_found.description,
                        quantity_in_stock=shoe_found.quantity_in_stock,
                        display_price=shoe_found.display_price,
                        warehouse_price=shoe_found.warehouse_price,
                        discounted_price=shoe_found.display_price
                        - (shoe_found.display_price * promotion.discount_percent / 100),
                        is_active=shoe_found.is_active,
                        created_at=shoe_found.created_at,
                        updated_at=shoe_found.updated_at,
                        deleted_at=shoe_found.deleted_at,
                    ),
                )

                brand_found = self.__crud_brand.get(db=db, id=shoe_found.brand_id)
                if brand_found is None:
                    return JSONResponse(
                        status_code=400,
                        content={
                            "status": 400,
                            "message": f"Brand with id {shoe_found.brand_id} not found",
                        },
                    )
                size_found = self.__crud_size.get(db=db, id=shoe_found.size_id)
                if size_found is None:
                    return JSONResponse(
                        status_code=400,
                        content={
                            "status": 400,
                            "message": f"Size with id {shoe_found.size_id} not found",
                        },
                    )

                color_found = self.__crud_color.get(db=db, id=shoe_found.color_id)
                if color_found is None:
                    return JSONResponse(
                        status_code=400,
                        content={
                            "status": 400,
                            "message": f"Color with id {shoe_found.color_id} not found",
                        },
                    )
                shoes_out.append(
                    ShoeOutSchema(
                        id=updated_shoe.id,
                        brand=BrandCreateSchema(**brand_found.__dict__),
                        size=SizeCreateSchema(**size_found.__dict__),
                        color=ColorCreateSchema(**color_found.__dict__),
                        image_url=updated_shoe.image_url,
                        shoe_name=updated_shoe.shoe_name,
                        description=updated_shoe.description,
                        quantity_in_stock=updated_shoe.quantity_in_stock,
                        display_price=updated_shoe.display_price,
                        warehouse_price=updated_shoe.warehouse_price,
                        discounted_price=updated_shoe.discounted_price,
                        is_active=updated_shoe.is_active,
                        created_at=updated_shoe.created_at,
                        updated_at=updated_shoe.updated_at,
                        deleted_at=updated_shoe.deleted_at,
                    )
                )
            return PromotionOutSchema(
                id=updated_promotion.id,
                promotion_name=updated_promotion.promotion_name,
                start_date=updated_promotion.start_date,
                end_date=updated_promotion.end_date,
                discount_percent=updated_promotion.discount_percent,
                shoes=shoes_out,
                is_active=updated_promotion.is_active,
                created_at=updated_promotion.created_at,
                updated_at=updated_promotion.updated_at,
                deleted_at=updated_promotion.deleted_at,
            )
        except Exception as e:
            logger.exception(f"Update promotion failed: {e}")
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Update promotion failed"},
            )

    def delete_promotion(
        self,
        db: Session,
        promotion_id: uuid.UUID,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> JSONResponse:
        if (
            "delete_promotion"
            not in current_user_role_permission.u_list_permission_name
        ):
            logger.exception(
                f"Permission Error: User {current_user_role_permission.u_username} has no permission to delete promotion"
            )
            return JSONResponse(
                status_code=403,
                content={
                    "status": 403,
                    "message": "Permission Error: You do not have permission to delete promotion",
                },
            )
        try:
            promotion_found = self.__crud_promotion.get(db=db, id=promotion_id)
            if promotion_found is None:
                return JSONResponse(
                    status_code=400,
                    content={
                        "status": 400,
                        "message": f"Promotion with id {promotion_id} not found",
                    },
                )
            shoes_promotions = self.__crud_shoe_promotion.get_multi(
                db=db,
                filter_param={
                    "filter": json.dumps({"promotion_id": str(promotion_found.id)})
                },
            )
            if shoes_promotions is None:
                return JSONResponse(
                    status_code=400,
                    content={
                        "status": 400,
                        "message": f"Shoe promotion with promotion id {promotion_found.id} not found",
                    },
                )
            for shoe_promotion in shoes_promotions:
                shoe_found = self.__crud_shoe.get(db=db, id=shoe_promotion.shoe_id)
                if shoe_found is None:
                    return JSONResponse(
                        status_code=400,
                        content={
                            "status": 400,
                            "message": f"Shoe with id {shoe_promotion.shoe_id} not found",
                        },
                    )
                """update discounted_price in shoe"""
                updated_shoe = self.__crud_shoe.update_one_by(
                    db=db,
                    filter={"id": shoe_found.id},
                    obj_in=ShoeInDBSchema(
                        id=shoe_found.id,
                        brand_id=shoe_found.brand_id,
                        size_id=shoe_found.size_id,
                        color_id=shoe_found.color_id,
                        image_url=shoe_found.image_url,
                        shoe_name=shoe_found.shoe_name,
                        description=shoe_found.description,
                        quantity_in_stock=shoe_found.quantity_in_stock,
                        display_price=shoe_found.display_price,
                        warehouse_price=shoe_found.warehouse_price,
                        discounted_price=shoe_found.display_price,
                        is_active=shoe_found.is_active,
                        created_at=shoe_found.created_at,
                        updated_at=shoe_found.updated_at,
                        deleted_at=shoe_found.deleted_at,
                    ),
                )
                if updated_shoe is None:
                    return JSONResponse(
                        status_code=400,
                        content={
                            "status": 400,
                            "message": f"Update shoe with id {shoe_found.id} failed",
                        },
                    )
            """delete shoes promotions"""
            for shoe_promotion in shoes_promotions:
                deleted_shoe_promotion = self.__crud_shoe_promotion.remove(
                    db=db, id=shoe_promotion.id
                )
                if deleted_shoe_promotion is None:
                    return JSONResponse(
                        status_code=400,
                        content={
                            "status": 400,
                            "message": f"Delete shoe promotion with id {shoe_promotion.id} failed",
                        },
                    )
            """delete promotion"""
            deleted_promotion = self.__crud_promotion.remove(db=db, id=promotion_id)
            if deleted_promotion is None:
                return JSONResponse(
                    status_code=400,
                    content={
                        "status": 400,
                        "message": f"Delete promotion with id {promotion_id} failed",
                    },
                )
            return JSONResponse(
                status_code=200,
                content={"status": 200, "message": "Delete promotion success"},
            )
        except Exception as e:
            logger.exception(f"Delete promotion failed: {e}")
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Delete promotion failed"},
            )
