from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from backend.db.base_class import Base


class ColorSize(Base):
    __tablename__ = "colors_sizes"

    shoe_color_id = Column(UUID(as_uuid=True), ForeignKey("shoes_colors.id"))
    size_id = Column(UUID(as_uuid=True), ForeignKey("sizes.id"))
    quantity_in_stock = Column(Integer, nullable=False)
    reorder = Column(Integer, nullable=False, default=50)

    # relationships
    size = relationship("Size", back_populates="colors_sizes")
    shoe_color = relationship("ShoeColor", back_populates="colors_sizes")