from backend.crud.base import CRUDBase
from backend.models.chatbot import Chatbot
from backend.schemas.chatbot_schema import ChatbotCreateSchema, ChatbotUpdateSchema


class CRUDChatbot(CRUDBase[Chatbot, ChatbotCreateSchema, ChatbotUpdateSchema]):
    pass


crud_chatbot = CRUDChatbot(Chatbot)
