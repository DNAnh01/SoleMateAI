from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql.base import UUID
from sqlalchemy.orm import relationship

# from backend.db.base_class import BaseMTM
from backend.db.base_class import Base



class RolePermission(Base):

    __tablename__ = "roles_permissions"

    permission_id = Column(
        UUID(as_uuid=True),
        ForeignKey("permissions.id", ondelete="CASCADE"),
        nullable=False
    )
    role_id = Column(
        UUID(as_uuid=True), ForeignKey("roles.id", ondelete="CASCADE"), nullable=False
    )

    # is_active = Column(Boolean, default=True)
    # created_at = Column(DateTime(timezone=True), default=datetime.now)
    # updated_at = Column(
    #     DateTime(timezone=True), default=datetime.now, onupdate=datetime.now
    # )
    # deleted_at = Column(DateTime(timezone=True), default=None)

    # relationships
    permission = relationship("Permission", back_populates="roles_permissions")
    role = relationship("Role", back_populates="roles_permissions")

