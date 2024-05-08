from sqlalchemy import Column, Integer
from sqlalchemy.orm import relationship

from backend.db.base_class import Base


class Size(Base):
    __tablename__ = "sizes"
    size_number = Column(Integer, nullable=False)

    # relationships
    shoes = relationship("Shoe", back_populates="size")