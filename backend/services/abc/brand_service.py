from abc import ABC, abstractmethod
from typing import List, Optional

from sqlalchemy.orm import Session

from backend.schemas.brand_schema import BrandInDBSchema


class BrandService(ABC):

    @abstractmethod
    def get_all_brands(
        self, common_filters: dict, db: Session
    ) -> Optional[List[BrandInDBSchema]]:
        pass
