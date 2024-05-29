import json
import uuid
from datetime import datetime

import requests
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.common.logger import setup_logger
from backend.crud.crud_chatbot import crud_chatbot
from backend.crud.crud_conversation import crud_conversation
from backend.crud.crud_user import crud_user
from backend.schemas.conversation_schema import ConversationInDBSchema
from backend.schemas.user_role_permission_schema import \
    UserRolePermissionSchema
from backend.services.abc.conversation_service import ConversationService

logger = setup_logger()


class ConversationServiceImpl(ConversationService):
    def __init__(self):
        self.__crud_conversation = crud_conversation
        self.__crud_chatbot = crud_chatbot
        self.__crud_user = crud_user

    def create_conversation_with_auth(
        self,
        db: Session,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> ConversationInDBSchema:
        if (
            "create_conversation"
            and "read_chatbot"
            not in current_user_role_permission.u_list_permission_name
        ):
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.create_conversation: User does not have permission to create conversation"
            )
            return JSONResponse(
                status_code=400,
                content={
                    "status": 400,
                    "message": "Create Conversation failed: User does not have permission to create conversation",
                },
            )
        try:
            chatbot_found = self.__crud_chatbot.get_one_by(
                db=db, filter={"is_public": True}
            )
            if chatbot_found is None:
                return JSONResponse(
                    status_code=400,
                    content={
                        "status": 400,
                        "message": "Create Conversation failed: No public chatbot found",
                    },
                )
            user_id = current_user_role_permission.u_id
            """check if user already has an active conversation then return that conversation else create new conversation"""
            conversation_found = self.__crud_conversation.get_one_by(
                db=db,
                filter={"user_id": user_id},
            )
            if conversation_found is not None:
                return conversation_found
            else:
                conversation_created = self.__crud_conversation.create(
                    db=db,
                    obj_in=ConversationInDBSchema(
                        id=uuid.uuid4(),
                        chatbot_id=chatbot_found.id,
                        user_id=user_id,
                        conversation_name="",
                        started_at=datetime.now(),
                        ended_at=None,
                        rating_score=None,
                        is_active=True,
                        created_at=datetime.now(),
                        updated_at=datetime.now(),
                        deleted_at=None,
                    ),
                )
                return conversation_created
        except:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.create_conversation"
            )
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Create Conversation failed"},
            )

    def create_conversation_without_auth(
        self,
        db: Session,
        client_ip: str,
    ) -> ConversationInDBSchema:
        try:
            chatbot_found = self.__crud_chatbot.get_one_by(
                db=db, filter={"is_public": True}
            )
            if chatbot_found is None:
                return JSONResponse(
                    status_code=400,
                    content={
                        "status": 400,
                        "message": "Create Conversation failed: No public chatbot found",
                    },
                )
            client_info = json.loads(
                requests.get("http://ip-api.com/json/" + client_ip).text
            )
            user_default_id = self.__crud_user.get_one_by(
                db=db, filter={"email": "userdefault@gmail.com"}
            ).id
            """if without auth, create conversation with client ip"""
            conversation_created = self.__crud_conversation.create(
                db=db,
                obj_in=ConversationInDBSchema(
                    id=uuid.uuid4(),
                    chatbot_id=chatbot_found.id,
                    user_id=user_default_id,
                    conversation_name=client_info["countryCode"]
                    + str(client_ip.replace(".", "")),
                    started_at=datetime.now(),
                    ended_at=None,
                    rating_score=None,
                    is_active=True,
                    created_at=datetime.now(),
                    updated_at=datetime.now(),
                    deleted_at=None,
                ),
            )
        except:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.create_conversation"
            )
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Create Conversation failed"},
            )

        return conversation_created
