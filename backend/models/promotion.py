from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.orm import relationship

from backend.db.base_class import Base


class Promotion(Base):

    __tablename__ = "promotions"

    promotion_name = Column(String, nullable=False)
    start_date = Column(DateTime(timezone=True), default=datetime.now)
    end_date = Column(DateTime(timezone=True), default=None)
    discount_percent = Column(Integer, nullable=False)

    # relationship
    shoes_promotions = relationship("ShoePromotion", back_populates="promotion")
