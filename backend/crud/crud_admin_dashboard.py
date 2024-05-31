from typing import List, Optional

from sqlalchemy import text
from sqlalchemy.orm import Session

from backend.common.logger import setup_logger
from backend.schemas.chart_data_schema import ChartDataSchema
from backend.schemas.total_data_schema import TotalDataSchema

logger = setup_logger()

# Statistic revenue, profit, capital by hour of a specific day
GET_STATISTIC_REVENUE_PROFIT_CAPITAL_BY_HOUR_OF_SPECIFIC_DAY = f"""
    WITH HourReference AS ( 
        SELECT 0 AS hour_of_day 
        UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 
        UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 
        UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 
        UNION SELECT 10 UNION SELECT 11 UNION SELECT 12 
        UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 
        UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 
        UNION SELECT 19 UNION SELECT 20 UNION SELECT 21 
        UNION SELECT 22 UNION SELECT 23 
    ) 
    SELECT 
        hr.hour_of_day AS {ChartDataSchema.TIME_POINT}, 
        COALESCE(SUM(revenue_subquery.total_discounted_price), 0) AS {ChartDataSchema.REVENUE_COST}, 
        COALESCE(SUM(profit_subquery.total_profit), 0) AS {ChartDataSchema.PROFIT_COST}, 
        COALESCE(SUM(warehouse_subquery.total_warehouse_price), 0) AS {ChartDataSchema.WAREHOUSE_COST} 
    FROM 
        HourReference hr 
    LEFT JOIN ( 
        SELECT 
            EXTRACT(HOUR FROM o1.order_date) AS hour_of_day, 
            SUM(o1.total_discounted_price) AS total_discounted_price 
        FROM 
            orders o1 
        WHERE 
            TO_CHAR(o1.order_date, 'YYYY-MM-DD') = :date 
            AND o1.status = 'ORDER-DELIVERED' 
        GROUP BY 
            EXTRACT(HOUR FROM o1.order_date) 
    ) revenue_subquery ON hr.hour_of_day = revenue_subquery.hour_of_day 
    LEFT JOIN ( 
        SELECT 
            EXTRACT(HOUR FROM o2.order_date) AS hour_of_day, 
            SUM(o2.total_discounted_price - o2.total_warehouse_price) AS total_profit 
        FROM 
            orders o2 
        WHERE 
            TO_CHAR(o2.order_date, 'YYYY-MM-DD') = :date 
            AND o2.status = 'ORDER-DELIVERED' 
        GROUP BY 
            EXTRACT(HOUR FROM o2.order_date) 
    ) profit_subquery ON hr.hour_of_day = profit_subquery.hour_of_day 
    LEFT JOIN ( 
        SELECT 
            EXTRACT(HOUR FROM o3.order_date) AS hour_of_day, 
            SUM(o3.total_warehouse_price) AS total_warehouse_price 
        FROM 
            orders o3 
        WHERE 
            TO_CHAR(o3.order_date, 'YYYY-MM-DD') = :date 
            AND o3.status = 'ORDER-DELIVERED' 
        GROUP BY 
            EXTRACT(HOUR FROM o3.order_date) 
    ) warehouse_subquery ON hr.hour_of_day = warehouse_subquery.hour_of_day 
    GROUP BY 
        hr.hour_of_day 
    ORDER BY 
        hr.hour_of_day;
"""
# Statistic revenue, profit, capital by day of a specific month
GET_STATISTIC_REVENUE_PROFIT_CAPITAL_BY_DAY_OF_SPECIFIC_MONTH = f"""
    WITH RECURSIVE DayReference AS ( 
        SELECT 1 AS day_of_month 
        UNION ALL 
        SELECT day_of_month + 1 
        FROM DayReference 
        WHERE day_of_month < EXTRACT(DAY FROM DATE_TRUNC('month', TO_DATE('2024-05', 'YYYY-MM')) + INTERVAL '1 month' - INTERVAL '1 day') 
    ) 
    SELECT 
        dr.day_of_month AS {ChartDataSchema.TIME_POINT}, 
        COALESCE(SUM(revenue_subquery.total_revenue), 0) AS {ChartDataSchema.REVENUE_COST}, 
        COALESCE(SUM(profit_subquery.total_profit), 0) AS {ChartDataSchema.PROFIT_COST}, 
        COALESCE(SUM(warehouse_subquery.total_warehouse_price), 0) AS {ChartDataSchema.WAREHOUSE_COST} 
    FROM 
        DayReference dr 
    LEFT JOIN ( 
        SELECT 
            EXTRACT(DAY FROM o1.order_date) AS day_of_month, 
            SUM(o1.total_discounted_price) AS total_revenue 
        FROM 
            orders o1 
        WHERE 
            TO_CHAR(o1.order_date, 'YYYY-MM') = :month 
            AND o1.status = 'ORDER-DELIVERED' 
        GROUP BY 
            EXTRACT(DAY FROM o1.order_date) 
    ) revenue_subquery ON dr.day_of_month = revenue_subquery.day_of_month 
    LEFT JOIN ( 
        SELECT 
            EXTRACT(DAY FROM o2.order_date) AS day_of_month, 
            SUM(o2.total_discounted_price - o2.total_warehouse_price) AS total_profit 
        FROM 
            orders o2 
        WHERE 
            TO_CHAR(o2.order_date, 'YYYY-MM') = :month 
            AND o2.status = 'ORDER-DELIVERED' 
        GROUP BY 
            EXTRACT(DAY FROM o2.order_date) 
    ) profit_subquery ON dr.day_of_month = profit_subquery.day_of_month 
    LEFT JOIN ( 
        SELECT 
            EXTRACT(DAY FROM o3.order_date) AS day_of_month, 
            SUM(o3.total_warehouse_price) AS total_warehouse_price 
        FROM 
            orders o3 
        WHERE 
            TO_CHAR(o3.order_date, 'YYYY-MM') = :month 
            AND o3.status = 'ORDER-DELIVERED' 
        GROUP BY 
            EXTRACT(DAY FROM o3.order_date) 
    ) warehouse_subquery ON dr.day_of_month = warehouse_subquery.day_of_month 
    GROUP BY 
        dr.day_of_month 
    ORDER BY 
        dr.day_of_month;
"""

# Statistic revenue, profit, capital by month of a specific year
GET_STATISTIC_REVENUE_PROFIT_CAPITAL_BY_HOUR_OF_SPECIFIC_YEAR = f"""
    WITH MonthReference AS ( 
        SELECT 1 AS month_of_year 
        UNION ALL 
        SELECT 2 UNION SELECT 3 UNION SELECT 4 
        UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 
        UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 
        UNION SELECT 11 UNION SELECT 12 
    ) 
    SELECT 
        mr.month_of_year AS {ChartDataSchema.TIME_POINT}, 
        COALESCE(SUM(revenue_subquery.total_revenue), 0) AS {ChartDataSchema.REVENUE_COST}, 
        COALESCE(SUM(profit_subquery.total_profit), 0) AS {ChartDataSchema.PROFIT_COST}, 
        COALESCE(SUM(warehouse_subquery.total_warehouse_price), 0) AS {ChartDataSchema.WAREHOUSE_COST} 
    FROM 
        MonthReference mr 
    LEFT JOIN ( 
        SELECT 
            EXTRACT(MONTH FROM o1.order_date) AS month_of_year, 
            SUM(o1.total_discounted_price) AS total_revenue 
        FROM 
            orders o1 
        WHERE 
            TO_CHAR(o1.order_date, 'YYYY') = :year 
            AND o1.status = 'ORDER-DELIVERED' 
        GROUP BY 
            EXTRACT(MONTH FROM o1.order_date) 
    ) revenue_subquery ON mr.month_of_year = revenue_subquery.month_of_year 
    LEFT JOIN ( 
        SELECT 
            EXTRACT(MONTH FROM o2.order_date) AS month_of_year, 
            SUM(o2.total_discounted_price - o2.total_warehouse_price) AS total_profit 
        FROM 
            orders o2 
        WHERE 
            TO_CHAR(o2.order_date, 'YYYY') = :year 
            AND o2.status = 'ORDER-DELIVERED' 
        GROUP BY 
            EXTRACT(MONTH FROM o2.order_date) 
    ) profit_subquery ON mr.month_of_year = profit_subquery.month_of_year 
    LEFT JOIN ( 
        SELECT 
            EXTRACT(MONTH FROM o3.order_date) AS month_of_year, 
            SUM(o3.total_warehouse_price) AS total_warehouse_price 
        FROM 
            orders o3 
        WHERE 
            TO_CHAR(o3.order_date, 'YYYY') = :year 
            AND o3.status = 'ORDER-DELIVERED' 
        GROUP BY 
            EXTRACT(MONTH FROM o3.order_date) 
    ) warehouse_subquery ON mr.month_of_year = warehouse_subquery.month_of_year 
    GROUP BY 
        mr.month_of_year 
    ORDER BY 
        mr.month_of_year;
"""
# Total revenue, profit, capital, item sold of a specific day
GET_TOTAL_REVENUE_PROFIT_CAPITAL_ITEM_SOLD_OF_SPECIFIC_DAY = f"""
    WITH revenue_profit_warehouse AS ( 
        SELECT 
            COALESCE(SUM(revenue_subquery.total_revenue), 0) AS revenue_cost, 
            COALESCE(SUM(profit_subquery.total_profit), 0) AS profit_cost, 
            COALESCE(SUM(warehouse_subquery.total_warehouse_price), 0) AS warehouse_cost 
        FROM 
            ( 
                SELECT 
                    SUM(o1.total_discounted_price) AS total_revenue 
                FROM 
                    orders o1 
                WHERE 
                    TO_CHAR(o1.order_date, 'YYYY-MM-DD') = :date 
                    AND o1.status = 'ORDER-DELIVERED' 
            ) revenue_subquery, 
            ( 
                SELECT 
                    SUM(o2.total_discounted_price - o2.total_warehouse_price) AS total_profit 
                FROM 
                    orders o2 
                WHERE 
                    TO_CHAR(o2.order_date, 'YYYY-MM-DD') = :date 
                    AND o2.status = 'ORDER-DELIVERED' 
            ) profit_subquery, 
            ( 
                SELECT 
                    SUM(o3.total_warehouse_price) AS total_warehouse_price 
                FROM 
                    orders o3 
                WHERE 
                    TO_CHAR(o3.order_date, 'YYYY-MM-DD') = :date 
                    AND o3.status = 'ORDER-DELIVERED' 
            ) warehouse_subquery 
    ) 
    SELECT 
        rp.revenue_cost AS {TotalDataSchema.REVENUE_COST}, 
        rp.profit_cost AS {TotalDataSchema.PROFIT_COST}, 
        rp.warehouse_cost AS {TotalDataSchema.WAREHOUSE_COST}, 
        TO_CHAR(o.order_date, 'YYYY-MM-DD') AS selected_day, 
        SUM(o.total_item) AS {TotalDataSchema.TOTAL_ITEMS_SOLD} 
    FROM 
        orders o 
    CROSS JOIN 
        revenue_profit_warehouse rp 
    WHERE 
        TO_CHAR(o.order_date, 'YYYY-MM-DD') = :date 
        AND o.status = 'ORDER-DELIVERED' 
    GROUP BY 
        TO_CHAR(o.order_date, 'YYYY-MM-DD'), 
        rp.revenue_cost, 
        rp.profit_cost, 
        rp.warehouse_cost 
    ORDER BY 
        selected_day;
"""
# Total revenue, profit, capital, item sold of a specific month
GET_TOTAL_REVENUE_PROFIT_CAPITAL_ITEM_SOLD_OF_SPECIFIC_MONTH = f"""
    WITH revenue_profit_warehouse AS (
        SELECT 
            COALESCE(SUM(revenue_subquery.total_revenue), 0) AS revenue_cost, 
            COALESCE(SUM(profit_subquery.total_profit), 0) AS profit_cost, 
            COALESCE(SUM(warehouse_subquery.total_warehouse_price), 0) AS warehouse_cost 
        FROM 
            ( 
                SELECT 
                    SUM(o1.total_discounted_price) AS total_revenue 
                FROM 
                    orders o1 
                WHERE 
                    TO_CHAR(o1.order_date, 'YYYY-MM') = :month 
                    AND o1.status = 'ORDER-DELIVERED' 
            ) revenue_subquery, 
            ( 
                SELECT 
                    SUM(o2.total_discounted_price - o2.total_warehouse_price) AS total_profit 
                FROM 
                    orders o2 
                WHERE 
                    TO_CHAR(o2.order_date, 'YYYY-MM') = :month 
                    AND o2.status = 'ORDER-DELIVERED' 
            ) profit_subquery, 
            ( 
                SELECT 
                    SUM(o3.total_warehouse_price) AS total_warehouse_price 
                FROM 
                    orders o3 
                WHERE 
                    TO_CHAR(o3.order_date, 'YYYY-MM') = :month 
                    AND o3.status = 'ORDER-DELIVERED' 
            ) warehouse_subquery 
    )
    SELECT
        rp.revenue_cost AS {TotalDataSchema.REVENUE_COST},
        rp.profit_cost AS {TotalDataSchema.PROFIT_COST},
        rp.warehouse_cost AS {TotalDataSchema.WAREHOUSE_COST},
        TO_CHAR(o.order_date, 'YYYY-MM') AS selected_month,
        SUM(o.total_item) AS {TotalDataSchema.TOTAL_ITEMS_SOLD}
    FROM
        orders o
    CROSS JOIN
        revenue_profit_warehouse rp
    WHERE
        TO_CHAR(o.order_date, 'YYYY-MM') = :month
        AND o.status = 'ORDER-DELIVERED'
    GROUP BY
        TO_CHAR(o.order_date, 'YYYY-MM'),
        rp.revenue_cost,
        rp.profit_cost,
        rp.warehouse_cost
    ORDER BY
        selected_month;
"""
# Total revenue, profit, capital, item sold of a specific year
GET_TOTAL_REVENUE_PROFIT_CAPITAL_ITEM_SOLD_OF_SPECIFIC_YEAR = f"""
    WITH revenue_profit_warehouse AS (
        SELECT 
            COALESCE(SUM(revenue_subquery.total_revenue), 0) AS revenue_cost, 
            COALESCE(SUM(profit_subquery.total_profit), 0) AS profit_cost, 
            COALESCE(SUM(warehouse_subquery.total_warehouse_price), 0) AS warehouse_cost 
        FROM 
            ( 
                SELECT 
                    SUM(o1.total_discounted_price) AS total_revenue 
                FROM 
                    orders o1 
                WHERE 
                    TO_CHAR(o1.order_date, 'YYYY') = :year 
                    AND o1.status = 'ORDER-DELIVERED' 
            ) revenue_subquery, 
            ( 
                SELECT 
                    SUM(o2.total_discounted_price - o2.total_warehouse_price) AS total_profit 
                FROM 
                    orders o2 
                WHERE 
                    TO_CHAR(o2.order_date, 'YYYY') = :year 
                    AND o2.status = 'ORDER-DELIVERED' 
            ) profit_subquery, 
            ( 
                SELECT 
                    SUM(o3.total_warehouse_price) AS total_warehouse_price 
                FROM 
                    orders o3 
                WHERE 
                    TO_CHAR(o3.order_date, 'YYYY') = :year 
                    AND o3.status = 'ORDER-DELIVERED' 
            ) warehouse_subquery 
    )
    SELECT
        rp.revenue_cost AS {TotalDataSchema.REVENUE_COST},
        rp.profit_cost AS {TotalDataSchema.PROFIT_COST},
        rp.warehouse_cost AS {TotalDataSchema.WAREHOUSE_COST},
        TO_CHAR(o.order_date, 'YYYY') AS selected_year,
        SUM(o.total_item) AS {TotalDataSchema.TOTAL_ITEMS_SOLD}
    FROM
        orders o
    CROSS JOIN
        revenue_profit_warehouse rp
    WHERE
        TO_CHAR(o.order_date, 'YYYY') = :year
        AND o.status = 'ORDER-DELIVERED'
    GROUP BY
        TO_CHAR(o.order_date, 'YYYY'),
        rp.revenue_cost,
        rp.profit_cost,
        rp.warehouse_cost
    ORDER BY
        selected_year;
"""


class CRUDAdminDashboard:
    def get_statistic_revenue_profit_capital_by_filter(
        self, db: Session, filter: str, value: str
    ) -> Optional[List[ChartDataSchema]]:
        if filter == "day":
            result_proxy = db.execute(
                text(GET_STATISTIC_REVENUE_PROFIT_CAPITAL_BY_HOUR_OF_SPECIFIC_DAY),
                {"date": value},
            )
        elif filter == "month":
            result_proxy = db.execute(
                text(GET_STATISTIC_REVENUE_PROFIT_CAPITAL_BY_DAY_OF_SPECIFIC_MONTH),
                {"month": value},
            )
        elif filter == "year":
            result_proxy = db.execute(
                text(GET_STATISTIC_REVENUE_PROFIT_CAPITAL_BY_HOUR_OF_SPECIFIC_YEAR),
                {"year": value},
            )
        else:
            logger.error(f"Filter {filter} is not valid")
            return None

        column_names = result_proxy.keys()
        results = result_proxy.fetchall()
        list_result = []
        for result in results:
            result_dict = dict(zip(column_names, result))

            chart_data = ChartDataSchema(
                time_point=result_dict[ChartDataSchema.TIME_POINT],
                revenue_cost=result_dict[ChartDataSchema.REVENUE_COST],
                profit_cost=result_dict[ChartDataSchema.PROFIT_COST],
                warehouse_cost=result_dict[ChartDataSchema.WAREHOUSE_COST],
            )
            list_result.append(chart_data)
        logger.info(
            f"Get statistic revenue, profit, capital by {filter} {value} successfully with: {len(list_result)}"
        )
        return list_result

    def get_total_revenue_profit_capital_item_sold_by_filter(
        self, db: Session, filter: str, value: str
    ) -> Optional[TotalDataSchema]:
        if filter == "day":
            result_proxy = db.execute(
                text(GET_TOTAL_REVENUE_PROFIT_CAPITAL_ITEM_SOLD_OF_SPECIFIC_DAY),
                {"date": value},
            )
        elif filter == "month":
            result_proxy = db.execute(
                text(GET_TOTAL_REVENUE_PROFIT_CAPITAL_ITEM_SOLD_OF_SPECIFIC_MONTH),
                {"month": value},
            )
        elif filter == "year":
            result_proxy = db.execute(
                text(GET_TOTAL_REVENUE_PROFIT_CAPITAL_ITEM_SOLD_OF_SPECIFIC_YEAR),
                {"year": value},
            )
        else:
            logger.error(f"Filter {filter} is not valid")
            return None

        column_names = result_proxy.keys()
        results = result_proxy.fetchone()
        if results is None:
            return None
        result_dict = dict(zip(column_names, results))
        total_data = TotalDataSchema(
            revenue_cost=result_dict[TotalDataSchema.REVENUE_COST],
            profit_cost=result_dict[TotalDataSchema.PROFIT_COST],
            warehouse_cost=result_dict[TotalDataSchema.WAREHOUSE_COST],
            total_items_sold=result_dict[TotalDataSchema.TOTAL_ITEMS_SOLD],
        )
        logger.info(
            f"Get total revenue, profit, capital, item sold by {filter} {value} successfully"
        )
        return total_data


crud_admin_dashboard = CRUDAdminDashboard()
