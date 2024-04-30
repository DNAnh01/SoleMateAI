from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql.base import UUID
from sqlalchemy.orm import relationship

from backend.db.base_class import Base


class Review(Base):
    __tablename__ = "reviews"

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), index=True)
    shoe_id = Column(UUID(as_uuid=True), ForeignKey("shoes.id"), index=True)

    rating = Column(Integer, nullable=False, default=0)
    comment = Column(String, nullable=False, default="")
    heart_count = Column(Integer, default=0)

    # relationships
    shoe = relationship("Shoe", back_populates="reviews")
    user = relationship("User", back_populates="reviews")
