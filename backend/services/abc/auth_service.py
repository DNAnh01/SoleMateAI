from abc import ABC, abstractmethod
from backend.schemas.user_schema import UserSignUpSchema
from sqlalchemy.orm import Session


class AuthService(ABC):

    @abstractmethod
    def sign_up(db: Session, user: UserSignUpSchema):
        pass
