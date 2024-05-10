import uuid

from sqlalchemy.orm import Session

from backend.crud.base import CRUDBase
from backend.models.message import Message
from backend.schemas.message_schema import MessageCreateSchema, MessageUpdateSchema


class CRUDMessage(CRUDBase[Message, MessageCreateSchema, MessageUpdateSchema]):
    def get_messages_by_conversation_id(
        self, db: Session, conversation_id: uuid.UUID
    ) -> dict:
        return super().get_multi(
            db=db,
            filter={"conversation_id": conversation_id},
        )


crud_message = CRUDMessage(Message)
