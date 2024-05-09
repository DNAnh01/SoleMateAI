from sqlalchemy.orm import Session
from backend.schemas.brand_schema import BrandCreateSchema, BrandInDBSchema, BrandUpdateSchema
from backend.services.abc.brand_service import BrandService

from typing import Optional, List
from fastapi.responses import JSONResponse

from backend.crud.crud_brand import crud_brand
from backend.common.logger import setup_logger


logger = setup_logger()

class BrandServiceImpl(BrandService):
    def __init__(self):
        self.__crud_brand = crud_brand


    def get_all_brands(self, common_filters: dict,  db: Session) -> Optional[List[BrandInDBSchema]]:
        try:
            brands = self.__crud_brand.get_multi(
                db=db,
                filter_param=common_filters
            )
            if not brands:
                return JSONResponse(status_code=404, content={"Brand not found"})
        except:
            logger.error("Error while fetching brands")
            return JSONResponse(status_code=500, content={"Internal Server Error"})
        
        return brands