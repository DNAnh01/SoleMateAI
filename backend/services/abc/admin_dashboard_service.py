from abc import ABC, abstractmethod
from typing import List, Optional

from sqlalchemy.orm import Session

from backend.schemas.chart_data_schema import ChartDataSchema
from backend.schemas.total_data_schema import TotalDataSchema
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema

class AdminDashboardService(ABC):

    @abstractmethod
    def get_statistic_revenue_profit_capital_by_filter(
        self,
        db: Session,
        filter: str,
        value: str,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> List[ChartDataSchema]:
        pass
    
    @abstractmethod
    def get_total_revenue_profit_capital_item_sold_by_filter(
        self,
        db: Session,
        filter: str,
        value: str,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[TotalDataSchema]:
        pass
