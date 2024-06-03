from typing import List, Optional

from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.common.logger import setup_logger
from backend.crud.crud_color import crud_color
from backend.schemas.color_schema import ColorInDBSchema
from backend.services.abc.color_service import ColorService

logger = setup_logger()


class ColorServiceImpl(ColorService):
    def __init__(self):
        self.__crud_color = crud_color

    def get_all_colors(
        self, common_filters: dict, db: Session
    ) -> Optional[List[ColorInDBSchema]]:
        try:
            colors = self.__crud_color.get_multi(db=db, filter_param=common_filters)
            if colors is None:
                return JSONResponse(
                    status_code=404,
                    content={"status": 404, "message": "Colors not found"},
                )
        except:
            logger.error("Error while fetching colors")
            return JSONResponse(
                status_code=500,
                content={"status": 500, "message": "Error while fetching colors"},
            )
        return colors
