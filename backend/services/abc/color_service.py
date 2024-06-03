from abc import ABC, abstractmethod
from typing import List, Optional

from sqlalchemy.orm import Session

from backend.schemas.color_schema import ColorInDBSchema


class ColorService(ABC):
    @abstractmethod
    def get_all_colors(
        self, common_filters: dict, db: Session
    ) -> Optional[List[ColorInDBSchema]]:
        pass
