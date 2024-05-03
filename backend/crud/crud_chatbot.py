from backend.crud.base import CRUDBase
from backend.models.chatbot import Chatbot
from backend.schemas.chatbot_schema import ChatbotCreateSchema, ChatbotUpdateSchema
from sqlalchemy.orm import Session
from typing import List
from sqlalchemy import and_
from backend.db.query_builder import query_builder, get_filter
from backend.common.logger import setup_logger

logger = setup_logger()

class CRUDChatbot(CRUDBase[Chatbot, ChatbotCreateSchema, ChatbotUpdateSchema]):
    def get_multi_with_filter(
        self,
        db: Session,
        filter_param: dict = None,
    ) -> List[Chatbot]:
        if filter_param is None:
            filter_param = {}
            
        logger.info(f"filter_param: {filter_param}")
        
        
        query = query_builder(
            db=db,
            model=self.model,
            filter=filter_param.get("filter"),
            order_by=filter_param.get("order_by"),
            include=filter_param.get("include"),
            join=filter_param.get("join"),
        )
        return db.query \
            .filter(and_(self.model.deleted_at == None, get_filter(self.model, filter))) \
            .offset(filter_param.get("skip")) \
            .limit(filter_param.get("limit")).all()


crud_chatbot = CRUDChatbot(Chatbot)
