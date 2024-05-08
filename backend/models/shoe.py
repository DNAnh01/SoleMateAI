from sqlalchemy import Column, Double, ForeignKey, String, Integer
from sqlalchemy.dialects.postgresql.base import UUID
from sqlalchemy.orm import relationship

from backend.db.base_class import Base


class Shoe(Base):
    __tablename__ = "shoes"
    brand_id = Column(UUID(as_uuid=True), ForeignKey("brands.id"), index=True)
    size_id = Column(UUID(as_uuid=True), ForeignKey("sizes.id"), index=True)
    color_id = Column(UUID(as_uuid=True), ForeignKey("colors.id"), index=True)
    image_url = Column(String, nullable=False, default="https://raw.githubusercontent.com/DNAnh01/assets/main/SoleMateAI/null.jpg")
    shoe_name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    quantity_in_stock = Column(Integer, nullable=False)
    
    display_price = Column(Double, nullable=False)
    warehouse_price = Column(Double, nullable=False)
    discounted_price = Column(Double, nullable=False)

    # relationships
    size = relationship("Size", back_populates="shoes")
    brand = relationship("Brand", back_populates="shoes")
    shoes_promotions = relationship("ShoePromotion", back_populates="shoe")
    reviews = relationship("Review", back_populates="shoe")
    order_items = relationship("OrderItem", back_populates="shoe")
    cart_items = relationship("CartItem", back_populates="shoe")
    color = relationship("Color", back_populates="shoes")