import pydantic
from backend.schemas.user_schema import UserOutSchema
"""request"""


class UserSignUpSchema(pydantic.BaseModel):
    email: pydantic.EmailStr
    password: str


class UserSignInSchema(pydantic.BaseModel):
    email: pydantic.EmailStr
    password: str


class EmailSchema(pydantic.BaseModel):
    email: pydantic.EmailStr


class ChangePasswordSchema(pydantic.BaseModel):
    password_old: str
    password_new: str


"""response"""


class TokenSchema(pydantic.BaseModel):
    access_token: str
    token_type: str
    user: UserOutSchema
