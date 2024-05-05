from fastapi import APIRouter

from backend.api.v1.endpoints import auth, chatbot, knowledge_base, conversation, message

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["authentications"])
api_router.include_router(chatbot.router, prefix="/chatbot", tags=["chatbots"])
api_router.include_router(
    knowledge_base.router, prefix="/knowledge-base", tags=["knowledge-bases"]
)
api_router.include_router(conversation.router, prefix="/conversation", tags=["conversations"])
api_router.include_router(message.router, prefix="/message", tags=["messages"])
