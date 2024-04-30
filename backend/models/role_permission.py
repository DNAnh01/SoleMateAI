from sqlalchemy import Column, ForeignKey
from sqlalchemy.dialects.postgresql.base import UUID
from sqlalchemy.orm import relationship

from backend.db.base_class import Base


class RolePermission(Base):

    __tablename__ = "roles_permissions"

    permission_id = Column(
        UUID(as_uuid=True),
        ForeignKey("permissions.id", ondelete="CASCADE"),
        nullable=False,
    )
    role_id = Column(
        UUID(as_uuid=True), ForeignKey("roles.id", ondelete="CASCADE"), nullable=False
    )

    # relationships
    permission = relationship("Permission", back_populates="roles_permissions")
    role = relationship("Role", back_populates="roles_permissions")
