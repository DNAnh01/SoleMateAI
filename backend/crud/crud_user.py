from backend.crud.base import CRUDBase
from backend.models.user import User
from backend.schemas.user_schema import UserCreateSchema, UserUpdateSchema


class CRUDUser(CRUDBase[User, UserCreateSchema, UserUpdateSchema]):
    pass


crud_user = CRUDUser(User)
