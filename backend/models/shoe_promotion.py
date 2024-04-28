from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql.base import UUID
from sqlalchemy.orm import relationship

# from backend.db.base_class import BaseMTM
from backend.db.base_class import Base


class ShoePromotion(Base):
    __tablename__ = "shoes_promotions"
    shoe_id = Column(UUID(as_uuid=True), ForeignKey("shoes.id"))
    promotion_id = Column(UUID(as_uuid=True), ForeignKey("promotions.id"))

    # shoe_id = Column(UUID(as_uuid=True), ForeignKey("shoes.id"), primary_key=True)
    # promotion_id = Column(
    #     UUID(as_uuid=True), ForeignKey("promotions.id"), primary_key=True
    # )

    # is_active = Column(Boolean, default=True)
    # created_at = Column(DateTime(timezone=True), default=datetime.now)
    # updated_at = Column(
    #     DateTime(timezone=True), default=datetime.now, onupdate=datetime.now
    # )
    # deleted_at = Column(DateTime(timezone=True), default=None)

    # relationships
    promotion = relationship("Promotion", back_populates="shoes_promotions")
    shoe = relationship("Shoe", back_populates="shoes_promotions")
