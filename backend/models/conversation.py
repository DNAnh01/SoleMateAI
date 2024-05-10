from datetime import datetime

from sqlalchemy import Column, DateTime, Double, ForeignKey, String
from sqlalchemy.dialects.postgresql.base import UUID
from sqlalchemy.orm import relationship

from backend.db.base_class import Base


class Conversation(Base):
    __tablename__ = "conversations"
    chatbot_id = Column(
        UUID(as_uuid=True),
        ForeignKey("chatbots.id", ondelete="CASCADE"),
        nullable=False,
    )
    user_id = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    conversation_name = Column(String, nullable=False)
    started_at = Column(DateTime(timezone=True), nullable=False, default=datetime.now)
    ended_at = Column(DateTime(timezone=True), nullable=True)
    rating_score = Column(Double, nullable=True)

    # relationships
    user = relationship("User", back_populates="conversations")
    chatbot = relationship("Chatbot", back_populates="conversations")
    messages = relationship("Message", back_populates="conversation")
