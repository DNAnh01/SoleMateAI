from sqlalchemy import ForeignKey  # type: ignore
from sqlalchemy import Boolean, Column, Double, Integer, String
from sqlalchemy.dialects.postgresql.base import UUID  # type: ignore
from sqlalchemy.orm import relationship  # type: ignore

from backend.common.enum.prompt_default import PromptDefault
from backend.db.base_class import Base


class Chatbot(Base):
    __tablename__ = "chatbots"
    user_id = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    chatbot_name = Column(String, nullable=False)
    model = Column(String, default="gpt-4")

    is_public = Column(Boolean, default=False)
    description = Column(String, nullable=True, default="description not provided")
    temperature = Column(Double, default=0.2)
    max_token = Column(Integer, default=100)
    prompt = Column(
        String,
        default=PromptDefault.PROMPT_DEFAULT.value,
    )
    # relationship
    user = relationship("User", back_populates="chatbots")
    knowledge_bases = relationship("KnowledgeBase", back_populates="chatbot")
    conversations = relationship("Conversation", back_populates="chatbot")
