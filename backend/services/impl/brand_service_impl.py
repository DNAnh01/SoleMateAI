from typing import List, Optional

from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.common.logger import setup_logger
from backend.crud.crud_brand import crud_brand
from backend.schemas.brand_schema import BrandInDBSchema
from backend.services.abc.brand_service import BrandService

logger = setup_logger()


class BrandServiceImpl(BrandService):
    def __init__(self):
        self.__crud_brand = crud_brand

    def get_all_brands(
        self, common_filters: dict, db: Session
    ) -> Optional[List[BrandInDBSchema]]:
        try:
            brands = self.__crud_brand.get_multi(db=db, filter_param=common_filters)
            if brands is None:
                return JSONResponse(
                    status_code=404, 
                    content={
                        "status": 404,
                        "message": "Brands not found"
                    }
                )
        except:
            logger.error("Error while fetching brands")
            return JSONResponse(
                status_code=500, 
                content={
                    "status": 500,
                    "message": "Error while fetching brands"
                }
            )

        return brands
