from backend.services.abc.auth_service import AuthService

from backend.schemas.user_schema import UserSignUpSchema, UserCreateSchema
from backend.crud.crud_user import crud_user
from sqlalchemy.orm import Session
from backend.common import utils


class AuthServiceImpl(AuthService):
    def __init__(self):
        self.__crud_user = crud_user

    def sign_up(self, db: Session, user: UserSignUpSchema):
        hashed_password = utils.hash(user.password)
        new_user = self.__crud_user.create(
            db=db,
            obj_in=UserCreateSchema(email=user.email, password_hash=hashed_password),
        )
        return new_user
