from backend.crud.base import CRUDBase
from backend.models.user_session import UserSession
from backend.schemas.user_session_schema import (
    UserSessionCreateSchema,
    UserSessionUpdateSchema,
)


class CRUDUserSession(
    CRUDBase[UserSession, UserSessionCreateSchema, UserSessionUpdateSchema]
):
    pass


crud_user_session = CRUDUserSession(UserSession)
