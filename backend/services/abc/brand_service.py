from abc import ABC, abstractmethod
from sqlalchemy.orm import Session
from backend.schemas.brand_schema import BrandCreateSchema, BrandInDBSchema, BrandUpdateSchema


from typing import Optional, List

class BrandService(ABC):
    
    @abstractmethod
    def get_all_brands(self, common_filters: dict,  db: Session) -> Optional[List[BrandInDBSchema]]:
        pass


