from sqlalchemy import Column, Double, ForeignKey, Integer
from sqlalchemy.dialects.postgresql.base import UUID
from sqlalchemy.orm import relationship

from backend.db.base_class import Base



class OrderItem(Base):
    __tablename__ = "order_items"
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"), index=True)
    shoe_id = Column(UUID(as_uuid=True), ForeignKey("shoes.id"), index=True)
    quantity = Column(Integer, nullable=False)
    display_price = Column(Double, nullable=False)
    warehouse_price = Column(Double, nullable=False)
    discounted_price = Column(Double, nullable=False)

    # relationships
    shoe = relationship("Shoe", back_populates="order_items")
    order = relationship("Order", back_populates="order_items")
