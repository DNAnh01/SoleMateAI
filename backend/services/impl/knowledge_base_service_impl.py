import uuid
from datetime import datetime
from typing import List, Optional

from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.common.logger import setup_logger
from backend.crud.crud_knowledge_base import crud_knowledge_base
from backend.crud.crud_chatbot import crud_chatbot
from backend.schemas.knowledge_base_schema import (
    KnowledgeBaseCreateSchema,
    KnowledgeBaseInDBSchema,
)
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.services.abc.knowledge_base_service import KnowledgeBaseService

logger = setup_logger()


class KnowledgeBaseServiceImpl(KnowledgeBaseService):
    def __init__(self):
        self.__crud_knowledge_base = crud_knowledge_base
        self.__crud_chatbot = crud_chatbot

    def create(
        self,
        db: Session,
        chatbot_id: str,
        knowledge_base_create: KnowledgeBaseCreateSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ):
        if (
            "create_knowledge_base"
            not in current_user_role_permission.u_list_permission_name
        ):
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.add_knowledge_base: User does not have permission to create knowledge base"
            )
            return JSONResponse(
                status_code=400,
                content="Add knowledge base failed: User does not have permission to create knowledge base",
            )
        try:
            chatbot_found = self.__crud_chatbot.get_one_by(
                db=db,
                filter={"id": chatbot_id}
            )
            if chatbot_found is None:
                logger.exception(
                    f"Exception in {__name__}.{self.__class__.__name__}.add_knowledge_base: Chatbot not found"
                )
                return JSONResponse(
                    status_code=400,
                    content="Add knowledge base failed: Chatbot not found"
                )
            knowledge_base_created = self.__crud_knowledge_base.create(
                db=db,
                obj_in=KnowledgeBaseInDBSchema(
                    **knowledge_base_create.__dict__,
                    id=uuid.uuid4(),
                    chatbot_id=chatbot_found.id,
                    created_at=datetime.now(),
                ),
            )
        except:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.add_knowledge_base"
            )
            return JSONResponse(status_code=400, content="Add knowledge base failed")
        return {"chatbot_id": chatbot_found.id, "knowledge_base": knowledge_base_created}

    def get_all(
        self,
        db: Session,
        chatbot_id: str,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[List[KnowledgeBaseInDBSchema]]:
        if (
            "read_knowledge_base"
            not in current_user_role_permission.u_list_permission_name
        ):
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.get_all: User does not have permission to read knowledge base"
            )
            return JSONResponse(
                status_code=400,
                content="Get all knowledge base failed: User does not have permission to read knowledge base",
            )
        try:
            chatbot_found = self.__crud_chatbot.get_one_by(
                db=db,
                filter={"id": chatbot_id}
            )
            if chatbot_found is None:
                logger.exception(
                    f"Exception in {__name__}.{self.__class__.__name__}.get_all: Chatbot not found"
                )
                return JSONResponse(
                    status_code=400,
                    content="Get all knowledge base failed: Chatbot not found",
                )
        
            knowledge_bases: List[KnowledgeBaseInDBSchema] = \
                self.__crud_knowledge_base.get_multi(db=db, filter_param={"chatbot_id": chatbot_found.id})
        except:
            logger.exception(f"Exception in {__name__}.{self.__class__name__}.get_all")
            return JSONResponse(
                status_code=400, content="Get all knowledge base failed"
            )
        return knowledge_bases

    def delete(
        self,
        db: Session,
        chatbot_id: str,
        knowledge_base_id: str,
        current_user_role_permission: UserRolePermissionSchema,
    ):
        if (
            "delete_knowledge_base"
            not in current_user_role_permission.u_list_permission_name
        ):
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.remove_knowledge_base: User does not have permission to delete knowledge base"
            )
            return JSONResponse(
                status_code=400,
                content="Remove knowledge base failed: User does not have permission to delete knowledge base",
            )

        try:
            knowledge_base_found = self.__crud_knowledge_base.get_one_by(
                db=db, filter={"id": knowledge_base_id, "chatbot_id": chatbot_id}
            )

            if knowledge_base_found is None:
                return JSONResponse(status_code=404, content="Knowledge base not found")

            knowledge_base_deleted = self.__crud_knowledge_base.remove(
                db=db, id=knowledge_base_found.id
            )
        except:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.remove_knowledge_base"
            )
            return JSONResponse(status_code=400, content="Remove knowledge base failed")
        return {
            "chatbot_id": chatbot_id,
            "knowledge_base": {
                "id": knowledge_base_deleted.id,
                "knowledge_base_name": knowledge_base_deleted.knowledge_base_name,
                "deleted_at": knowledge_base_deleted.deleted_at,
            },
        }
