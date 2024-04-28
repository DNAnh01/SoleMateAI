from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from backend.db.base_class import Base



class Role(Base):

    __tablename__ = "roles"
    role_name = Column(String, nullable=False, unique=True)

    # relationships
    roles_permissions = relationship("RolePermission", back_populates="role")
    users = relationship("User", back_populates="role")
