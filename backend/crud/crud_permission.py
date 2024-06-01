from backend.crud.base import CRUDBase
from backend.models.permission import Permission
from backend.schemas.permission_schema import (PermissionCreateSchema,
                                               PermissionUpdateSchema)


class CRUDPermission(
    CRUDBase[Permission, PermissionCreateSchema, PermissionUpdateSchema]
):
    pass


crud_permission = CRUDPermission(Permission)
