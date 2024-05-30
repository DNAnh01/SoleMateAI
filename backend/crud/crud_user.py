from sqlalchemy.orm import Session

from backend.crud.base import CRUDBase
from backend.models.user import User
from backend.schemas.user_schema import (UserCreateSchema, UserInDBSchema,
                                         UserUpdateSchema)


class CRUDUser(CRUDBase[User, UserCreateSchema, UserUpdateSchema]):
    def create_user(self, db: Session, user_create: UserInDBSchema):
        user_created = super().create(db=db, obj_in=user_create)
        return user_created


crud_user = CRUDUser(User)
