from sqlalchemy import Column, Double, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql.base import UUID
from sqlalchemy.orm import relationship

from backend.db.base_class import Base


class KnowledgeBase(Base):
    __tablename__ = "knowledge_bases"
    chatbot_id = Column(
        UUID(as_uuid=True),
        ForeignKey("chatbots.id", ondelete="CASCADE"),
        nullable=False,
    )

    knowledge_base_name = Column(String, nullable=False)
    content_type = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    character_count = Column(Integer, nullable=False)
    file_size = Column(Double, nullable=False)

    # relationship
    chatbot = relationship("Chatbot", back_populates="knowledge_bases")
