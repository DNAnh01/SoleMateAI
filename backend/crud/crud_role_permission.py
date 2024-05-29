from backend.crud.base import CRUDBase
from backend.models.role_permission import RolePermission
from backend.schemas.role_permission_schema import (RolePermissionCreateSchema,
                                                    RolePermissionUpdateSchema)


class CRUDRolePermission(
    CRUDBase[RolePermission, RolePermissionCreateSchema, RolePermissionUpdateSchema]
):
    pass


crud_role_permission = CRUDRolePermission(RolePermission)
