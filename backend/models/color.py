from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from backend.db.base_class import Base


class Color(Base):
    __tablename__ = "colors"

    color_name = Column(String, nullable=False)
    hex_value = Column(String, nullable=False)
    sort_order = Column(Integer, nullable=True)

    # relationships
    shoes_colors = relationship("ShoeColor", back_populates="color")
