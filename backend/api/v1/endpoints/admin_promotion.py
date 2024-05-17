from typing import Optional, List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from backend.common import parameters
from backend.api import deps
from backend.common.logger import setup_logger
from backend.core import oauth2
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from fastapi.responses import JSONResponse
from backend.schemas.promotion_schema import (
    PromotionCreateSchema,
    PromotionInDBSchema,
    PromotionUpdateSchema,
    PromotionOutSchema,
)
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.services.abc.admin_promotion_service import AdminPromotionService
from backend.services.impl.admin_promotion_service_impl import AdminPromotionServiceImpl

logger = setup_logger()

admin_promotion_service: AdminPromotionService = AdminPromotionServiceImpl()

router = APIRouter()


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=PromotionOutSchema)
def create_promotion(
    promotion: PromotionCreateSchema,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> PromotionOutSchema:
    return admin_promotion_service.create_promotion(
        db=db,
        promotion=promotion,
        current_user_role_permission=current_user_role_permission,
    )
    
@router.get("/get-all", status_code=status.HTTP_200_OK, response_model=Optional[List[PromotionOutSchema]])
def get_all_promotion(
    common_filter_parameters: dict = Depends(parameters.common_filter_parameters),
    db: Session = Depends(deps.get_db),
) -> Optional[List[PromotionOutSchema]]:
    return admin_promotion_service.get_all_promotion(
        db=db,
        common_filters=common_filter_parameters,
    )
    
@router.get("/promotion-id={promotion_id}", status_code=status.HTTP_200_OK, response_model=Optional[PromotionOutSchema])
def get_promotion_by_id(
    promotion_id: str,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> Optional[PromotionOutSchema]:
    return admin_promotion_service.get_promotion_by_id(
        db=db,
        promotion_id=promotion_id,
        current_user_role_permission=current_user_role_permission,
    )
    
@router.patch("/promotion-id={promotion_id}", status_code=status.HTTP_200_OK, response_model=PromotionOutSchema)
def update_promotion(
    promotion_id: str,
    promotion: PromotionUpdateSchema,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> PromotionOutSchema:
    return admin_promotion_service.update_promotion(
        db=db,
        promotion_id=promotion_id,
        promotion=promotion,
        current_user_role_permission=current_user_role_permission,
    )
    
@router.delete("/promotion-id={promotion_id}", status_code=status.HTTP_200_OK)
def delete_promotion(
    promotion_id: str,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> JSONResponse:
    return admin_promotion_service.delete_promotion(
        db=db,
        promotion_id=promotion_id,
        current_user_role_permission=current_user_role_permission,
    )
