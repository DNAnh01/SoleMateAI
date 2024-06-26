import uuid
from datetime import datetime
from typing import List, Optional

from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.common.logger import setup_logger
from backend.crud.crud_brand import crud_brand
from backend.crud.crud_color import crud_color
from backend.crud.crud_review import crud_review
from backend.crud.crud_shoe import crud_shoe
from backend.crud.crud_size import crud_size
from backend.crud.crud_user import crud_user
from backend.schemas.brand_schema import BrandCreateSchema, BrandInDBSchema
from backend.schemas.color_schema import ColorCreateSchema, ColorInDBSchema
from backend.schemas.review_schema import ReviewOutInProductDetailPageSchema
from backend.schemas.shoe_schema import (
    AdminUpdateShoeSchema,
    ShoeCreateSchema,
    ShoeInDBSchema,
    ShoeOutInHomePageSchema,
    ShoeOutInProductDetailPageSchema,
    ShoeOutSchema,
)
from backend.schemas.size_schema import SizeCreateSchema, SizeInDBSchema
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.schemas.user_schema import UserOutInProductDetailPageSchema
from backend.services.abc.shoe_service import ShoeService
from backend.crud.crud_knowledge_base import crud_knowledge_base

logger = setup_logger()


class ShoeServiceImpl(ShoeService):

    def __init__(self):
        self.__crud_shoe = crud_shoe
        self.__crud_brand = crud_brand
        self.__crud_color = crud_color
        self.__crud_size = crud_size
        self.__crud_review = crud_review
        self.__crud_user = crud_user
        self.__crud_knowledge_base = crud_knowledge_base

    def create_shoe(
        self,
        db: Session,
        shoe: ShoeCreateSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> ShoeOutSchema:
        if "create_shoe" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.create_shoe: User does not have permission to create shoe"
            )
            return JSONResponse(
                status_code=400,
                content={
                    "status": 400,
                    "message": "Create shoe failed: User does not have permission to create shoe",
                },
            )

        try:
            logger.info(f"shoe.brand_name: {shoe.brand.brand_name}")
            brand_found = self.__crud_brand.get_one_by(
                db=db, filter={"brand_name": shoe.brand.brand_name}
            )

            if brand_found is None:
                brand_saved = self.__crud_brand.create(
                    db=db,
                    obj_in=BrandInDBSchema(
                        id=uuid.uuid4(),
                        brand_name=shoe.brand.brand_name,
                        brand_logo=shoe.brand.brand_logo,
                        is_active=True,
                        created_at=datetime.now(),
                        updated_at=datetime.now(),
                        deleted_at=None,
                    ),
                )
                brand_found = brand_saved

            color_found = self.__crud_color.get_one_by(
                db=db, filter={"hex_value": shoe.color.hex_value}
            )

            if color_found is None:
                color_saved = self.__crud_color.create(
                    db=db,
                    obj_in=ColorInDBSchema(
                        id=uuid.uuid4(),
                        color_name=shoe.color.color_name,
                        hex_value=shoe.color.hex_value,
                        is_active=True,
                        created_at=datetime.now(),
                        updated_at=datetime.now(),
                        deleted_at=None,
                    ),
                )
                color_found = color_saved

            size_found = self.__crud_size.get_one_by(
                db=db, filter={"size_number": shoe.size.size_number}
            )

            if size_found is None:
                size_saved = self.__crud_size.create(
                    db=db,
                    obj_in=SizeInDBSchema(
                        id=uuid.uuid4(),
                        size_number=shoe.size.size_number,
                        is_active=True,
                        created_at=datetime.now(),
                        updated_at=datetime.now(),
                        deleted_at=None,
                    ),
                )
                size_found = size_saved

            shoe_saved = self.__crud_shoe.create(
                db=db,
                obj_in=ShoeInDBSchema(
                    id=uuid.uuid4(),
                    brand_id=brand_found.id,
                    size_id=size_found.id,
                    color_id=color_found.id,
                    image_url=shoe.image_url,
                    shoe_name=shoe.shoe_name,
                    description=shoe.description,
                    quantity_in_stock=shoe.quantity_in_stock,
                    display_price=shoe.display_price,
                    warehouse_price=shoe.warehouse_price,
                    discounted_price=shoe.discounted_price,
                    is_active=True,
                    created_at=datetime.now(),
                    updated_at=datetime.now(),
                    deleted_at=None,
                ),
            )
            logger.info(f"shoe_saved.brand.brand_name: {shoe_saved.brand.brand_name}")
            logger.info(f"shoe_saved.color.color_name: {shoe_saved.color.color_name}")
            shoe_out = ShoeOutSchema(
                id=shoe_saved.id,
                brand=BrandCreateSchema(
                    brand_name=shoe_saved.brand.brand_name,
                    brand_logo=shoe_saved.brand.brand_logo,
                ),
                color=ColorCreateSchema(
                    color_name=shoe_saved.color.color_name,
                    hex_value=shoe_saved.color.hex_value,
                ),
                size=SizeCreateSchema(size_number=shoe_saved.size.size_number),
                image_url=shoe_saved.image_url,
                shoe_name=shoe_saved.shoe_name,
                description=shoe_saved.description,
                quantity_in_stock=shoe_saved.quantity_in_stock,
                display_price=shoe_saved.display_price,
                warehouse_price=shoe_saved.warehouse_price,
                discounted_price=shoe_saved.discounted_price,
                is_active=shoe_saved.is_active,
                created_at=shoe_saved.created_at,
                updated_at=shoe_saved.updated_at,
                deleted_at=shoe_saved.deleted_at,
            )
        except:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.create_shoe"
            )
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Create shoe failed"},
            )
        return shoe_out

    def create_multi_shoes(
        self,
        db: Session,
        shoes: List[ShoeCreateSchema],
        current_user_role_permission: UserRolePermissionSchema,
    ) -> List[ShoeOutSchema]:
        if "create_shoe" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.create_shoe: User does not have permission to create shoe"
            )
            return JSONResponse(
                status_code=400,
                content={
                    "status": 400,
                    "message": "Create shoe failed: User does not have permission to create shoe",
                },
            )
        shoes_saved = []
        for shoe in shoes:
            shoes_saved.append(
                self.create_shoe(
                    db=db,
                    shoe=shoe,
                    current_user_role_permission=current_user_role_permission,
                )
            )
        return shoes_saved

    def get_shoe_by_id(
        self,
        db: Session,
        shoe_id: uuid.UUID,
    ) -> Optional[ShoeOutInProductDetailPageSchema]:
        try:

            shoe_found = self.__crud_shoe.get(db=db, id=shoe_id)
            if shoe_found is None:
                return JSONResponse(
                    status_code=404,
                    content={"status": 404, "message": "Shoe not found"},
                )

            # Initialize variables for reviews and average rating calculation
            avg_rating = 0
            reviews_out = []

            # Retrieve reviews for the specified shoe
            reviews_found = self.__crud_review.get_all_reviews_by_shoe_id(
                db=db, shoe_id=shoe_id
            )

            if not reviews_found:
                reviews_found = []

            total_user_rating = 0
            total_rating = 0

            for review in reviews_found:
                user_found = self.__crud_user.get_one_ignore_deleted_and_inactive(
                    db=db, filter={"id": review.user_id}
                )
                if user_found is None:
                    logger.error(
                        f"User with ID {review.user_id} not found for review {review.id}"
                    )
                    continue

                # Add review details to output
                total_user_rating += 1
                total_rating += review.rating
                reviews_out.append(
                    ReviewOutInProductDetailPageSchema(
                        id=review.id,
                        user=UserOutInProductDetailPageSchema(
                            email=user_found.email,
                            display_name=user_found.display_name,
                            avatar_url=user_found.avatar_url,
                        ),
                        rating=review.rating,
                        comment=review.comment,
                        heart_count=review.heart_count,
                    )
                )

            # Calculate average rating
            if total_user_rating != 0:
                avg_rating = total_rating / total_user_rating
            else:
                avg_rating = 0

            # Prepare shoe details for output
            shoe_out = ShoeOutInProductDetailPageSchema(
                id=shoe_found.id,
                brand=BrandCreateSchema(
                    brand_name=shoe_found.brand.brand_name,
                    brand_logo=shoe_found.brand.brand_logo,
                ),
                color=ColorCreateSchema(
                    color_name=shoe_found.color.color_name,
                    hex_value=shoe_found.color.hex_value,
                ),
                size=SizeCreateSchema(size_number=shoe_found.size.size_number),
                image_url=shoe_found.image_url,
                shoe_name=shoe_found.shoe_name,
                description=shoe_found.description,
                quantity_in_stock=shoe_found.quantity_in_stock,
                display_price=shoe_found.display_price,
                warehouse_price=shoe_found.warehouse_price,
                discounted_price=shoe_found.discounted_price,
                avg_rating=avg_rating,
                reviews=reviews_out,
                is_active=shoe_found.is_active,
                created_at=shoe_found.created_at,
                updated_at=shoe_found.updated_at,
                deleted_at=shoe_found.deleted_at,
            )
        except Exception as e:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.get_shoe_by_id: {e}"
            )
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Get shoe by id failed"},
            )
        return shoe_out

    def get_all_shoes(
        self,
        db: Session,
        common_filters: dict,
    ) -> Optional[List[ShoeOutInHomePageSchema]]:
        try:
            shoes = self.__crud_shoe.get_multi(db=db, filter_param=common_filters)
            if shoes is None:
                return JSONResponse(
                    status_code=404,
                    content={"status": 404, "message": "Shoes not found"},
                )
            shoes_out = []
            for shoe in shoes:
                total_user_rating = 0
                total_rating = 0
                avg_rating = 0
                review_found = self.__crud_review.get_all_reviews_by_shoe_id(
                    db=db, shoe_id=shoe.id
                )
                if not review_found:
                    review_found = []

                for review in review_found:
                    total_user_rating += 1
                    total_rating += review.rating

                if total_user_rating != 0:
                    avg_rating = total_rating / total_user_rating
                else:
                    avg_rating = 0

                shoes_out.append(
                    ShoeOutInHomePageSchema(
                        id=shoe.id,
                        brand=BrandCreateSchema(
                            brand_name=shoe.brand.brand_name,
                            brand_logo=shoe.brand.brand_logo,
                        ),
                        color=ColorCreateSchema(
                            color_name=shoe.color.color_name,
                            hex_value=shoe.color.hex_value,
                        ),
                        size=SizeCreateSchema(size_number=shoe.size.size_number),
                        image_url=shoe.image_url,
                        shoe_name=shoe.shoe_name,
                        description=shoe.description,
                        quantity_in_stock=shoe.quantity_in_stock,
                        display_price=shoe.display_price,
                        warehouse_price=shoe.warehouse_price,
                        discounted_price=shoe.discounted_price,
                        avg_rating=avg_rating,
                        is_active=shoe.is_active,
                        created_at=shoe.created_at,
                        updated_at=shoe.updated_at,
                        deleted_at=shoe.deleted_at,
                    )
                )
        except:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.get_all_shoes"
            )
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Get all shoes failed"},
            )
        return shoes_out
    
    def get_latest_shoes(
        self,
        db: Session,
        limit: int,
    ) -> Optional[List[ShoeOutInHomePageSchema]]:
        
        try:
            shoes = self.__crud_knowledge_base.get_latest_shoe(db=db,limit=limit);
            if shoes is None:
                return JSONResponse(
                    status_code=404,
                    content={"status": 404, "message": "Shoes not found"},
                )
            shoes_out = []
            for shoe in shoes:
                shoe_found = self.__crud_shoe.get(db=db, id=shoe.get_shoe_id())
                if shoe_found is None:
                    continue
                
                total_user_rating = 0
                total_rating = 0
                avg_rating = 0
                review_found = self.__crud_review.get_all_reviews_by_shoe_id(
                    db=db, shoe_id=shoe.get_shoe_id()
                )
                if not review_found:
                    review_found = []
                
                for review in review_found:
                    total_user_rating += 1
                    total_rating += review.rating
                
                if total_user_rating != 0:
                    avg_rating = total_rating / total_user_rating
                else:
                    avg_rating = 0
                
                shoes_out.append(
                    ShoeOutInHomePageSchema(
                        id=shoe_found.id,
                        brand=BrandCreateSchema(
                            brand_name=shoe_found.brand.brand_name,
                            brand_logo=shoe_found.brand.brand_logo,
                        ),
                        color=ColorCreateSchema(
                            color_name=shoe_found.color.color_name,
                            hex_value=shoe_found.color.hex_value,
                        ),
                        size=SizeCreateSchema(size_number=shoe_found.size.size_number),
                        image_url=shoe_found.image_url,
                        shoe_name=shoe_found.shoe_name,
                        description=shoe_found.description,
                        quantity_in_stock=shoe_found.quantity_in_stock,
                        display_price=shoe_found.display_price,
                        warehouse_price=shoe_found.warehouse_price,
                        discounted_price=shoe_found.discounted_price,
                        avg_rating=avg_rating,
                        is_active=shoe_found.is_active,
                        created_at=shoe_found.created_at,
                        updated_at=shoe_found.updated_at,
                        deleted_at=shoe_found.deleted_at,
                    )
                )
        except:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.get_latest_shoes"
            )
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Get latest shoes failed"},
            )
        return shoes_out
                        


    def update_shoe(
        self,
        db: Session,
        shoe_id: uuid.UUID,
        shoe: AdminUpdateShoeSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[ShoeOutSchema]:
        if "update_shoe" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.update_shoe: User does not have permission to update shoe"
            )
            return JSONResponse(
                status_code=400,
                content={
                    "status": 400,
                    "message": "Update shoe failed: User does not have permission to update shoe",
                },
            )
        try:
            shoe_found = self.__crud_shoe.get(db=db, id=shoe_id)

            if shoe_found is None:
                return JSONResponse(
                    status_code=404,
                    content={"status": 404, "message": "Shoe not found"},
                )

            shoe_found.id = shoe.id
            shoe_found.brand.brand_name = shoe.brand.brand_name
            shoe_found.brand.brand_logo = shoe.brand.brand_logo
            shoe_found.size.size_number = shoe.size.size_number
            shoe_found.color.color_name = shoe.color.color_name
            shoe_found.color.hex_value = shoe.color.hex_value
            shoe_found.image_url = shoe.image_url
            shoe_found.shoe_name = shoe.shoe_name
            shoe_found.description = shoe.description
            shoe_found.quantity_in_stock = shoe.quantity_in_stock
            shoe_found.display_price = shoe.display_price
            shoe_found.warehouse_price = shoe.warehouse_price
            shoe_found.discounted_price = shoe.discounted_price
            shoe_found.is_active = shoe.is_active
            shoe_found.created_at = shoe.created_at
            shoe_found.updated_at = shoe.updated_at
            shoe_found.deleted_at = shoe.deleted_at

            db.commit()
            shoe_out = ShoeOutSchema(
                id=shoe_found.id,
                brand=BrandCreateSchema(
                    brand_name=shoe_found.brand.brand_name,
                    brand_logo=shoe_found.brand.brand_logo,
                ),
                color=ColorCreateSchema(
                    color_name=shoe_found.color.color_name,
                    hex_value=shoe_found.color.hex_value,
                ),
                size=SizeCreateSchema(size_number=shoe_found.size.size_number),
                image_url=shoe_found.image_url,
                shoe_name=shoe_found.shoe_name,
                description=shoe_found.description,
                quantity_in_stock=shoe_found.quantity_in_stock,
                display_price=shoe_found.display_price,
                warehouse_price=shoe_found.warehouse_price,
                discounted_price=shoe_found.discounted_price,
                is_active=shoe_found.is_active,
                created_at=shoe_found.created_at,
                updated_at=shoe_found.updated_at,
                deleted_at=shoe_found.deleted_at,
            )
        except:
            db.rollback()
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.update_shoe"
            )
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Update shoe failed"},
            )

        return shoe_out

    def delete_shoe(
        self,
        db: Session,
        shoe_id: uuid.UUID,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[ShoeOutSchema]:
        if "delete_shoe" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.delete_shoe: User does not have permission to delete shoe"
            )
            return JSONResponse(
                status_code=400,
                content={
                    "status": 400,
                    "message": "Delete shoe failed: User does not have permission to delete shoe",
                },
            )
        try:
            shoe_found = self.__crud_shoe.get(db=db, id=shoe_id)
            if shoe_found is None:
                return JSONResponse(
                    status_code=404,
                    content={"status": 404, "message": "Shoe not found"},
                )
            shoe_removed = self.__crud_shoe.remove(db=db, id=shoe_id)
            return JSONResponse(
                status_code=200,
                content={"status": 200, "message": f"Shoe {shoe_removed.id} removed"},
            )
        except:
            db.rollback()
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.delete_shoe"
            )
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Delete shoe failed"},
            )
