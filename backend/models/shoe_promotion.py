from sqlalchemy import Column, ForeignKey
from sqlalchemy.dialects.postgresql.base import UUID
from sqlalchemy.orm import relationship

from backend.db.base_class import Base


class ShoePromotion(Base):
    __tablename__ = "shoes_promotions"
    shoe_id = Column(UUID(as_uuid=True), ForeignKey("shoes.id"))
    promotion_id = Column(UUID(as_uuid=True), ForeignKey("promotions.id"))

    # relationships
    promotion = relationship("Promotion", back_populates="shoes_promotions")
    shoe = relationship("Shoe", back_populates="shoes_promotions")
