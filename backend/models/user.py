from sqlalchemy import Boolean, Column, ForeignKey, String
from sqlalchemy.dialects.postgresql.base import UUID
from sqlalchemy.orm import relationship

from backend.common.generate import generate_random_string
from backend.db.base_class import Base


class User(Base):

    __tablename__ = "users"
    role_id = Column(
        UUID(as_uuid=True), ForeignKey("roles.id", ondelete="CASCADE"), nullable=False
    )

    email = Column(String, nullable=False, unique=True)
    password_hash = Column(String, nullable=False)
    display_name = Column(
        String, nullable=False, default=lambda: generate_random_string(10)
    )
    avatar_url = Column(
        String,
        nullable=False,
        default="https://raw.githubusercontent.com/DNAnh01/assets/main/SoleMateAI/default_user_image.png",
    )
    phone_number = Column(String, nullable=True)
    payment_information = Column(String, nullable=True)
    is_verified = Column(Boolean, nullable=False, default=False)

    # relationship
    role = relationship("Role", back_populates="users")
    users_sessions = relationship("UserSession", back_populates="user")
    chatbots = relationship("Chatbot", back_populates="user")
    conversations = relationship("Conversation", back_populates="user")
    carts = relationship("Cart", back_populates="user")
    addresses = relationship("Address", back_populates="user")
    orders = relationship("Order", back_populates="user")
    reviews = relationship("Review", back_populates="user")
