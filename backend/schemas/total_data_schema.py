from typing import ClassVar

import pydantic  # type: ignore


class TotalDataSchema(pydantic.BaseModel):
    REVENUE_COST: ClassVar[str] = "revenue_cost"
    PROFIT_COST: ClassVar[str] = "profit_cost"
    WAREHOUSE_COST: ClassVar[str] = "warehouse_cost"
    TOTAL_ITEMS_SOLD: ClassVar[str] = "total_items_sold"

    revenue_cost: float
    profit_cost: float
    warehouse_cost: float
    total_items_sold: int
