from backend.crud.base import CRUDBase
from backend.models.knowledge_base import KnowledgeBase
from backend.schemas.knowledge_base_schema import (
    KnowledgeBaseCreateSchema,
    KnowledgeBaseUpdateSchema,
)


class CRUDKnowledgeBase(
    CRUDBase[KnowledgeBase, KnowledgeBaseCreateSchema, KnowledgeBaseUpdateSchema]
):
    pass


crud_knowledge_base = CRUDKnowledgeBase(KnowledgeBase)
