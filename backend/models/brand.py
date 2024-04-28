from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from backend.db.base_class import Base


class Brand(Base):
    __tablename__ = "brands"

    brand_name = Column(String, unique=True, index=True)
    brand_logo = Column(String, nullable=False)
    sort_order = Column(Integer, nullable=True)

    # relationships
    shoes = relationship("Shoe", back_populates="brand")
