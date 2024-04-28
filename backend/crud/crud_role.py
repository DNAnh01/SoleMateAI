from backend.crud.base import CRUDBase
from backend.models.role import Role
from backend.schemas.role_schema import RoleCreateSchema, RoleUpdateSchema


class CRUDRole(CRUDBase[Role, RoleCreateSchema, RoleUpdateSchema]):
    pass


crud_role = CRUDRole(Role)
