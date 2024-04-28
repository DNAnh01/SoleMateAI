from sqlalchemy import Column, Double, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from backend.db.base_class import Base



class CartItem(Base):
    __tablename__ = "cart_items"
    
    cart_id = Column(UUID(as_uuid=True), ForeignKey("carts.id"))
    shoe_id = Column(UUID(as_uuid=True), ForeignKey("shoes.id"))
    quantity = Column(Integer, nullable=False)
    display_price = Column(Double, nullable=False)
    warehouse_price = Column(Double, nullable=False)
    discounted_price = Column(Double, nullable=False)

    # relationships
    cart = relationship("Cart", back_populates="cart_items")
    shoe = relationship("Shoe", back_populates="cart_items")
