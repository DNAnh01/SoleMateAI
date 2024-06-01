from typing import ClassVar

import pydantic  # type: ignore


class ChartDataSchema(pydantic.BaseModel):
    TIME_POINT: ClassVar[str] = "time_point"
    REVENUE_COST: ClassVar[str] = "revenue_cost"
    PROFIT_COST: ClassVar[str] = "profit_cost"
    WAREHOUSE_COST: ClassVar[str] = "warehouse_cost"

    time_point: int
    revenue_cost: float
    profit_cost: float
    warehouse_cost: float
