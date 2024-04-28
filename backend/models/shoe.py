from sqlalchemy import Column, Double, ForeignKey, String
from sqlalchemy.dialects.postgresql.base import UUID
from sqlalchemy.orm import relationship

from backend.db.base_class import Base




class Shoe(Base):
    __tablename__ = "shoes"
    brand_id = Column(UUID(as_uuid=True), ForeignKey("brands.id"), index=True)
    shoe_name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    display_price = Column(Double, nullable=False)
    warehouse_price = Column(Double, nullable=False)
    discounted_price = Column(Double, nullable=False)

    # relationships
    brand = relationship("Brand", back_populates="shoes")
    shoes_promotions = relationship("ShoePromotion", back_populates="shoe")
    reviews = relationship("Review", back_populates="shoe")
    order_items = relationship("OrderItem", back_populates="shoe")
    cart_items = relationship("CartItem", back_populates="shoe")
    shoes_colors = relationship("ShoeColor", back_populates="shoe")
