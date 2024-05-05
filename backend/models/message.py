from sqlalchemy import Column, ForeignKey, String
from sqlalchemy.dialects.postgresql.base import UUID
from sqlalchemy.orm import relationship

from backend.db.base_class import Base


class Message(Base):
    __tablename__ = "messages"
    conversation_id = Column(
        UUID(as_uuid=True),
        ForeignKey("conversations.id", ondelete="CASCADE"),
        nullable=False,
    )
    sender_id = Column(String, nullable=False)
    sender_type = Column(String, nullable=False)
    message_text = Column(String, nullable=False)

    # relationships
    conversation = relationship("Conversation", back_populates="messages")
