from typing import List, Optional

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from backend.api import deps
from backend.common import parameters
from backend.common.logger import setup_logger
from backend.schemas.brand_schema import BrandInDBSchema
from backend.services.abc.brand_service import BrandService
from backend.services.impl.brand_service_impl import BrandServiceImpl

logger = setup_logger()

brand_service: BrandService = BrandServiceImpl()


router = APIRouter()


@router.get(
    "/get-all",
    status_code=status.HTTP_200_OK,
    response_model=Optional[List[BrandInDBSchema]],
)
def get_all_brands(
    common_filter_parameters: dict = Depends(parameters.common_filter_parameters),
    db: Session = Depends(deps.get_db),
) -> Optional[List[BrandInDBSchema]]:
    brands = brand_service.get_all_brands(
        common_filters=common_filter_parameters, db=db
    )
    return brands
