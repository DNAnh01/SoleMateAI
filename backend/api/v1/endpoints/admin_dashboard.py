from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.api import deps
from backend.common.logger import setup_logger
from backend.core import oauth2
from backend.schemas.chart_data_schema import ChartDataSchema
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.services.abc.admin_dashboard_service import AdminDashboardService
from backend.services.impl.admin_dashboard_service_impl import AdminDashboardServiceImpl

logger = setup_logger()

admin_dashboard_service: AdminDashboardService = AdminDashboardServiceImpl()


router = APIRouter()


@router.get("/chart/{filter}/{value}", response_model=List[ChartDataSchema])
def get_statistic_revenue_profit_capital_by_filter(
    filter: str,
    value: str,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> List[ChartDataSchema]:
    return admin_dashboard_service.get_statistic_revenue_profit_capital_by_filter(
        db=db,
        filter=filter,
        value=value,
        current_user_role_permission=current_user_role_permission,
    )
