from typing import List, Optional

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from backend.api import deps
from backend.common import parameters
from backend.common.logger import setup_logger
from backend.schemas.color_schema import ColorInDBSchema
from backend.services.abc.color_service import ColorService
from backend.services.impl.color_service_impl import ColorServiceImpl

logger = setup_logger()

color_service: ColorService = ColorServiceImpl()


router = APIRouter()


@router.get(
    "/get-all",
    status_code=status.HTTP_200_OK,
    response_model=Optional[List[ColorInDBSchema]],
)
def get_all_colors(
    common_filter_parameters: dict = Depends(parameters.common_filter_parameters),
    db: Session = Depends(deps.get_db),
) -> Optional[List[ColorInDBSchema]]:
    colors = color_service.get_all_colors(
        common_filters=common_filter_parameters, db=db
    )
    return colors
