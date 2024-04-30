from datetime import datetime

from sqlalchemy import Column, DateTime, Double, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql.base import UUID
from sqlalchemy.orm import relationship

from backend.db.base_class import Base


class Order(Base):
    __tablename__ = "orders"
    address_id = Column(UUID(as_uuid=True), ForeignKey("addresses.id"), index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), index=True)
    order_date = Column(DateTime, nullable=False, default=datetime.now)
    delivery_date = Column(DateTime, nullable=False, default=datetime.now)
    status = Column(String, nullable=False)
    total_item = Column(Integer, nullable=False)
    total_display_price = Column(Double, nullable=False)
    total_warehouse_price = Column(Double, nullable=False)
    total_discounted_price = Column(Double, nullable=False)

    # relationships
    user = relationship("User", back_populates="orders")
    address = relationship("Address", back_populates="orders")
    order_items = relationship("OrderItem", back_populates="order")
