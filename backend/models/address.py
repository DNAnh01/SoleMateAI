from sqlalchemy import Column, ForeignKey, String
from sqlalchemy.dialects.postgresql.base import UUID
from sqlalchemy.orm import relationship

from backend.db.base_class import Base



class Address(Base):
    __tablename__ = "addresses"
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), index=True)
    street = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)

    # relationships
    user = relationship("User", back_populates="addresses")
    orders = relationship("Order", back_populates="address")
