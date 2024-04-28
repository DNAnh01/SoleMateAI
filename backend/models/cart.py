from sqlalchemy import Column, Double, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from backend.db.base_class import Base



class Cart(Base):
    __tablename__ = "carts"
    
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    total_item = Column(Integer, nullable=False)
    total_display_price = Column(Double, nullable=False)
    total_warehouse_price = Column(Double, nullable=False)
    total_discounted_price = Column(Double, nullable=False)

    # relationship
    user = relationship("User", back_populates="carts")
    cart_items = relationship("CartItem", back_populates="cart")
