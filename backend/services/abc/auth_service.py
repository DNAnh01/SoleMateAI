from abc import ABC, abstractmethod

from sqlalchemy.orm import Session
from starlette.requests import Request

from backend.models.user import User
from backend.schemas.auth_schema import (
    ChangePasswordSchema,
    EmailSchema,
    TokenSchema,
    UserSignInSchema,
    UserSignUpSchema,
)


class AuthService(ABC):

    @abstractmethod
    async def sign_up(self, db: Session, user: UserSignUpSchema):
        pass

    @abstractmethod
    def sign_in(self, db: Session, user_credentials: UserSignInSchema) -> TokenSchema:
        pass

    @abstractmethod
    def verify_user(self, db: Session, token: str):
        pass

    @abstractmethod
    async def handle_google_callback(self, request: Request, db: Session):
        pass

    @abstractmethod
    def sign_out(self, db: Session, current_user: User):
        pass

    @abstractmethod
    async def forgot_password(self, db: Session, email: EmailSchema):
        pass

    @abstractmethod
    async def change_password(
        self, db: Session, current_user: User, password: ChangePasswordSchema
    ):
        pass
    
