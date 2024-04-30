from sqlalchemy import Column, Integer
from sqlalchemy.orm import relationship

from backend.db.base_class import Base


class Size(Base):
    __tablename__ = "sizes"
    size_number = Column(Integer, nullable=False)
    sort_order = Column(Integer, nullable=True)

    # relationships
    colors_sizes = relationship("ColorSize", back_populates="size")
