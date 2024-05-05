from typing import List, Optional

from sqlalchemy.orm import Session
import json

from backend.schemas.conversation_schema import (
    ConversationCreateSchema,
    ConversationInDBSchema,
    ConversationUpdateSchema,
)
import uuid
import requests
from datetime import datetime

from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.services.abc.conversation_service import ConversationService
from fastapi.responses import JSONResponse

from backend.crud.crud_conversation import crud_conversation
from backend.crud.crud_chatbot import crud_chatbot

from backend.common.logger import setup_logger

logger = setup_logger()

class ConversationServiceImpl(ConversationService):
    def __init__(self):
        self.__crud_conversation = crud_conversation
        self.__crud_chatbot = crud_chatbot
        
    def create(
        self,
        db: Session,
        client_ip: str,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> ConversationInDBSchema:
        if 'create_conversation' and 'read_chatbot' not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.create_conversation: User does not have permission to create conversation"
            )
            return JSONResponse(
                status_code=400,
                content="Create Conversation failed: User does not have permission to create conversation",
            )
        
        try:
            chatbot_found = self.__crud_chatbot.get_one_by(
                db=db,
                filter={'is_public': True}
            )
            if chatbot_found is None:
                return JSONResponse(
                    status_code=400,
                    content="Create Conversation failed: No public chatbot found"
                )
            client_info = json.loads(requests.get('http://ip-api.com/json/' + client_ip).text)
            # logger.info("client_info: " + str(client_info))
            conversation_created = self.__crud_conversation.create(
                db=db,
                obj_in=ConversationInDBSchema(
                    id=uuid.uuid4(),
                    chatbot_id=chatbot_found.id,
                    user_id=current_user_role_permission.u_id,
                    conversation_name=client_info['countryCode'] + str(client_ip.replace(".", "")),
                    started_at=datetime.now(),
                    ended_at=None,
                    rating_score=None,
                    is_active=True,
                    created_at=datetime.now(),
                    updated_at=datetime.now(),
                    deleted_at=None,
                )
            )
        except:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.create_conversation"
            )
            return JSONResponse(status_code=400, content="Create Conversation failed")
        return conversation_created