from backend.crud.base import CRUDBase
from backend.models.conversation import Conversation
from backend.schemas.conversation_schema import (
    ConversationCreateSchema,
    ConversationUpdateSchema,
)


class CRUDConversation(
    CRUDBase[Conversation, ConversationCreateSchema, ConversationUpdateSchema]
):
    pass


crud_conversation = CRUDConversation(Conversation)
