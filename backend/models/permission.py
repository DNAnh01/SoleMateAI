from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from backend.db.base_class import Base


class Permission(Base):

    __tablename__ = "permissions"
    permission_name = Column(String, nullable=False, unique=True)

    # relationships
    roles_permissions = relationship("RolePermission", back_populates="permission")
