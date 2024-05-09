import os
from typing import List, Optional

from fastapi import APIRouter, Depends, File, UploadFile, status
from sqlalchemy.orm import Session

from backend.api import deps
from backend.common import utils
from backend.common.logger import setup_logger
from backend.core import oauth2


from backend.services.abc.brand_service import BrandService
from backend.services.impl.brand_service_impl import BrandServiceImpl

from backend.schemas.brand_schema import BrandCreateSchema, BrandInDBSchema, BrandUpdateSchema
from backend.common import parameters



logger = setup_logger()

brand_service: BrandService = BrandServiceImpl()


router = APIRouter()


@router.get("/get-all", status_code=status.HTTP_200_OK, response_model=Optional[List[BrandInDBSchema]])
def get_all_brands(
    common_filter_parameters: dict = Depends(parameters.common_filter_parameters),
    db: Session = Depends(deps.get_db),
) -> Optional[List[BrandInDBSchema]]:
    brands = brand_service.get_all_brands(
        common_filters=common_filter_parameters,
        db=db
    )
    return brands