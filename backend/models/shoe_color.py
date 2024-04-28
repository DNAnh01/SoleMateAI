from backend.db.base_class import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID



class ShoeColor(Base):
    __tablename__ = "shoes_colors"
    shoe_id = Column(UUID(as_uuid=True), ForeignKey("shoes.id"))
    color_id = Column(UUID(as_uuid=True), ForeignKey("colors.id"))
    sort_order = Column(Integer, nullable=True)
    image_url = Column(
        String,
        nullable=False,
        default="https://raw.githubusercontent.com/DNAnh01/assets/main/avatars-000318938987-vks2y6-t500x500.jpg",
    )

    # relationships
    color = relationship("Color", back_populates="shoes_colors")
    shoe = relationship("Shoe", back_populates="shoes_colors")
    colors_sizes = relationship("ColorSize", back_populates="shoe_color")
