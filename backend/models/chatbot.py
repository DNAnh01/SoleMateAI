from sqlalchemy import Boolean, Column, Double, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql.base import UUID
from sqlalchemy.orm import relationship

from backend.db.base_class import Base


class Chatbot(Base):
    __tablename__ = "chatbots"
    user_id = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    chatbot_name = Column(String, nullable=False)
    model = Column(String, nullable=False)
    description = Column(String, nullable=True, default="description not provided")
    temperature = Column(Double, default=0.5)
    max_token = Column(Integer, default=100)
    is_default = Column(Boolean, default=True)
    prompt = Column(
        String,
        default="You are a helpful assistant. The first prompt will be a long text,"
        "and any messages that you get be regarding that. Please answer any "
        "questions and requests having in mind the first prompt ",
    )
    # relationship
    user = relationship("User", back_populates="chatbots")
    knowledge_bases = relationship("KnowledgeBase", back_populates="chatbot")
    conversations = relationship("Conversation", back_populates="chatbot")