from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from backend.db.base_class import Base


class ShoeColor(Base):
    __tablename__ = "shoes_colors"
    shoe_id = Column(UUID(as_uuid=True), ForeignKey("shoes.id"))
    color_id = Column(UUID(as_uuid=True), ForeignKey("colors.id"))
    sort_order = Column(Integer, nullable=True)
    image_url = Column(
        String,
        nullable=False,
        default="https://raw.githubusercontent.com/DNAnh01/assets/main/SoleMateAI/null.jpg",
    )

    # relationships
    color = relationship("Color", back_populates="shoes_colors")
    shoe = relationship("Shoe", back_populates="shoes_colors")
    colors_sizes = relationship("ColorSize", back_populates="shoe_color")
