from typing import List

from sqlalchemy import text
from sqlalchemy.orm import Session

from backend.common.logger import setup_logger
from backend.crud.base import CRUDBase
from backend.models.knowledge_base import KnowledgeBase
from backend.schemas.default_kn_chatbot import DefaultKNChatbotSchema
from backend.schemas.knowledge_base_schema import (KnowledgeBaseCreateSchema,
                                                   KnowledgeBaseUpdateSchema)

logger = setup_logger()

GET_DEFAULT_KN_CHATBOT = f"""
        WITH ranked_shoes AS ( 
            SELECT 
                sho.id AS shoe_id, 
                sho.shoe_name, 
                b.brand_name, 
                s.size_number, 
                c.color_name, 
                sho.discounted_price, 
                sp.promotion_id, 
                ROW_NUMBER() OVER (PARTITION BY sho.brand_id ORDER BY sho.id) AS rn 
            FROM 
                shoes AS sho 
            JOIN 
                brands AS b ON sho.brand_id = b.id 
            JOIN 
                sizes AS s ON sho.size_id = s.id 
            JOIN 
                colors AS c ON sho.color_id = c.id 
            LEFT JOIN 
                shoes_promotions AS sp ON sho.id = sp.shoe_id 
            WHERE 
                sho.deleted_at IS NULL 
                AND b.deleted_at IS NULL 
                AND s.deleted_at IS NULL 
                AND c.deleted_at IS NULL 
                AND sp.promotion_id IS NOT NULL 
        ) 
        SELECT 
            rs.shoe_id AS {DefaultKNChatbotSchema.SHOE_ID} ,
            rs.shoe_name AS {DefaultKNChatbotSchema.SHOE_NAME} ,
            rs.brand_name AS {DefaultKNChatbotSchema.BRAND_NAME} ,
            rs.size_number AS {DefaultKNChatbotSchema.SIZE_NUMBER} ,
            rs.color_name AS {DefaultKNChatbotSchema.COLOR_NAME} ,
            rs.discounted_price AS {DefaultKNChatbotSchema.DISCOUNTED_PRICE} ,
            p.promotion_name AS {DefaultKNChatbotSchema.PROMOTION_NAME} ,
            p.start_date AS {DefaultKNChatbotSchema.PROMOTION_START_DATE} ,
            p.end_date AS {DefaultKNChatbotSchema.PROMOTION_END_DATE} ,
            p.discount_percent AS {DefaultKNChatbotSchema.PROMOTION_DISCOUNT_PERCENT}
        FROM 
            ranked_shoes AS rs 
        LEFT JOIN 
            promotions AS p ON rs.promotion_id = p.id AND p.deleted_at IS NULL 
        WHERE 
            rs.rn <= 1;
    """


class CRUDKnowledgeBase(
    CRUDBase[KnowledgeBase, KnowledgeBaseCreateSchema, KnowledgeBaseUpdateSchema]
):
    def get_default_kn_chatbot(self, db: Session) -> List[DefaultKNChatbotSchema]:
        result_proxy = db.execute(text(GET_DEFAULT_KN_CHATBOT))
        column_names = result_proxy.keys()
        results = result_proxy.fetchall()
        default_kn_chatbots = []
        for result in results:
            result_dict = dict(zip(column_names, result))
            builder = DefaultKNChatbotSchema.builder()
            builder.with_shoe_id(
                result_dict[DefaultKNChatbotSchema.SHOE_ID]
            ).with_shoe_name(
                result_dict[DefaultKNChatbotSchema.SHOE_NAME]
            ).with_brand_name(
                result_dict[DefaultKNChatbotSchema.BRAND_NAME]
            ).with_size_number(
                result_dict[DefaultKNChatbotSchema.SIZE_NUMBER]
            ).with_color_name(
                result_dict[DefaultKNChatbotSchema.COLOR_NAME]
            ).with_discounted_price(
                result_dict[DefaultKNChatbotSchema.DISCOUNTED_PRICE]
            ).with_promotion_name(
                result_dict[DefaultKNChatbotSchema.PROMOTION_NAME]
            ).with_promotion_start_date(
                DefaultKNChatbotSchema.convert_date(
                    str(result_dict[DefaultKNChatbotSchema.PROMOTION_START_DATE])
                )
            ).with_promotion_end_date(
                DefaultKNChatbotSchema.convert_date(
                    str(result_dict[DefaultKNChatbotSchema.PROMOTION_END_DATE])
                )
            ).with_promotion_discount_percent(
                result_dict[DefaultKNChatbotSchema.PROMOTION_DISCOUNT_PERCENT]
            )
            default_kn_chatbot = builder.build()
            # logger.info(f"default_kn_chatbot: {default_kn_chatbot.__dict__}")
            default_kn_chatbots.append(default_kn_chatbot)
        if default_kn_chatbots:
            return default_kn_chatbots
        return []


crud_knowledge_base = CRUDKnowledgeBase(KnowledgeBase)
