from backend.crud.base import CRUDBase
from backend.models.message import Message
from backend.schemas.message_schema import (MessageCreateSchema,
                                            MessageUpdateSchema)


class CRUDMessage(CRUDBase[Message, MessageCreateSchema, MessageUpdateSchema]):
    pass


crud_message = CRUDMessage(Message)
