from typing import List, Optional

from sqlalchemy.orm import Session

from backend.common.logger import setup_logger
from backend.crud.crud_admin_dashboard import crud_admin_dashboard
from backend.schemas.chart_data_schema import ChartDataSchema
from backend.schemas.total_data_schema import TotalDataSchema
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.services.abc.admin_dashboard_service import AdminDashboardService

logger = setup_logger()


class AdminDashboardServiceImpl(AdminDashboardService):
    def __init__(self):
        self.__crud_admin_dashboard = crud_admin_dashboard

    def get_statistic_revenue_profit_capital_by_filter(
        self,
        db: Session,
        filter: str,
        value: str,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> List[ChartDataSchema]:
        if "admin" != current_user_role_permission.u_role_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.get_statistic_revenue_profit_capital_by_filter: User {current_user_role_permission.u_role_name} is not allowed to access this service"
            )
            return []
        try:
            return self.__crud_admin_dashboard.get_statistic_revenue_profit_capital_by_filter(
                db, filter, value
            )
        except Exception as e:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.get_statistic_revenue_profit_capital_by_filter: {e}"
            )
            return []
        
    def get_total_revenue_profit_capital_item_sold_by_filter(
        self,
        db: Session,
        filter: str,
        value: str,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[TotalDataSchema]:
        if "admin" != current_user_role_permission.u_role_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.get_total_revenue_profit_capital_item_sold_by_filter: User {current_user_role_permission.u_role_name} is not allowed to access this service"
            )
            return []
        try:
            return self.__crud_admin_dashboard.get_total_revenue_profit_capital_item_sold_by_filter(
                db, filter, value
            )
        except Exception as e:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.get_total_revenue_profit_capital_item_sold_by_filter: {e}"
            )
            return []
        
