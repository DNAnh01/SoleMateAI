import uuid

from sqlalchemy.orm import Session

from backend.common import utils
from backend.core import oauth2
from backend.crud.base import CRUDBase
from backend.models.user_session import UserSession
from backend.schemas.user_session_schema import (UserSessionCreateSchema,
                                                 UserSessionUpdateSchema)


class CRUDUserSession(
    CRUDBase[UserSession, UserSessionCreateSchema, UserSessionUpdateSchema]
):
    def create_user_session_with_user_id(self, db: Session, user_id: uuid.UUID):
        """Create a new user session with user_id."""
        access_token = oauth2.create_access_token(data={"user_id": str(user_id)})

        user_session_created = super().create(
            db=db,
            obj_in=UserSessionCreateSchema(
                token=access_token, user_id=user_id, expires_at=utils.get_expires_at()
            ),
        )

        return user_session_created


crud_user_session = CRUDUserSession(UserSession)
