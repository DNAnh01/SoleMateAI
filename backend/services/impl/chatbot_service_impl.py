import json
import uuid
from datetime import datetime
from typing import List, Optional

from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.common.logger import setup_logger
from backend.crud.crud_chatbot import crud_chatbot
from backend.schemas.chatbot_schema import (ChatbotCreateSchema,
                                            ChatbotInDBSchema,
                                            ChatbotUpdateSchema)
from backend.schemas.user_role_permission_schema import \
    UserRolePermissionSchema
from backend.services.abc.chatbot_service import ChatbotService

logger = setup_logger()


class ChatbotServiceImpl(ChatbotService):
    def __init__(self):
        self.__crud_chatbot = crud_chatbot

    def create(
        self,
        db: Session,
        chatbot_create: ChatbotCreateSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> ChatbotInDBSchema:
        if "create_chatbot" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.create_chatbot: User does not have permission to create chatbot"
            )
            return JSONResponse(
                status_code=400,
                content={
                    "status": 400,
                    "message": "Create Chatbot failed: User does not have permission to create chatbot",
                },
            )
        try:
            created_chatbot: ChatbotInDBSchema = self.__crud_chatbot.create(
                db=db,
                obj_in=ChatbotInDBSchema(
                    **chatbot_create.__dict__,
                    id=uuid.uuid4(),
                    user_id=current_user_role_permission.u_id,
                    is_active=True,
                    created_at=datetime.now(),
                    updated_at=datetime.now(),
                    deleted_at=None,
                ),
            )
        except:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.create_chatbot"
            )
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Create Chatbot failed"},
            )
        return created_chatbot

    def get_all(
        self, db: Session, current_user_role_permission: UserRolePermissionSchema
    ) -> Optional[List[ChatbotInDBSchema]]:
        if "read_chatbot" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.get_all: User does not have permission to read chatbot"
            )
            return JSONResponse(
                status_code=400,
                content={
                    "status": 400,
                    "message": "Get all chatbot failed: User does not have permission to read chatbot",
                },
            )
        try:
            chatbots: List[ChatbotInDBSchema] = self.__crud_chatbot.get_multi(
                db=db,
                filter_param={
                    "filter": json.dumps(
                        {"user_id": str(current_user_role_permission.u_id)}
                    )
                },
            )
        except:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.get_all"
            )
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Get all chatbot failed"},
            )
        return chatbots

    def get_one(
        self,
        db: Session,
        chatbot_id: str,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[ChatbotInDBSchema]:
        if "read_chatbot" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.get_one: User does not have permission to read chatbot"
            )
            return JSONResponse(
                status_code=400,
                content={
                    "status": 400,
                    "message": "Get one chatbot failed: User does not have permission to read chatbot",
                },
            )
        try:
            chatbot_found: ChatbotInDBSchema = self.__crud_chatbot.get_one_by(
                db=db, filter={"id": chatbot_id}
            )
        except:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.get_one"
            )
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Get one chatbot failed"},
            )

        if chatbot_found is None:
            return JSONResponse(
                status_code=404, content={"status": 404, "message": "Chatbot not found"}
            )
        return chatbot_found

    def update(
        self,
        db: Session,
        chatbot_id: str,
        chatbot_update: ChatbotUpdateSchema,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[ChatbotInDBSchema]:
        if "update_chatbot" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.update: User does not have permission to update chatbot"
            )
            return JSONResponse(
                status_code=400,
                content={
                    "status": 400,
                    "message": "Update chatbot failed: User does not have permission to update chatbot",
                },
            )
        chatbot_found: ChatbotInDBSchema = self.get_one(
            db=db,
            chatbot_id=chatbot_id,
            current_user_role_permission=current_user_role_permission,
        )

        if chatbot_update.is_public:
            """If chatbot is public, set all other chatbots of the user to is_public = False"""
            try:
                chatbots: List[ChatbotInDBSchema] = self.__crud_chatbot.get_multi(
                    db=db,
                    filter_param={
                        "filter": json.dumps(
                            {"user_id": str(current_user_role_permission.u_id)}
                        )
                    },
                )
                for chatbot in chatbots:
                    if chatbot.id != chatbot_found.id:
                        """If chatbot is not the chatbot being updated, set is_public = False"""
                        # logger.warning(f"chatbot: {chatbot.chatbot_name}")
                        chatbot_patch = self.__crud_chatbot.patch(
                            db=db, db_obj=chatbot, obj_in={"is_public": False}
                        )
                    else:
                        chatbot_updated = self.__crud_chatbot.patch(
                            db=db, db_obj=chatbot, obj_in=chatbot_update
                        )
            except:
                logger.exception(
                    f"Exception in {__name__}.{self.__class__.__name__}.update"
                )
                return JSONResponse(
                    status_code=400,
                    content={"status": 400, "message": "Update chatbot failed"},
                )
        else:
            try:
                chatbot_updated: ChatbotInDBSchema = self.__crud_chatbot.update(
                    db=db, db_obj=chatbot_found, obj_in=chatbot_update
                )
            except:
                logger.exception(
                    f"Exception in {__name__}.{self.__class__.__name__}.update"
                )
                return JSONResponse(
                    status_code=400,
                    content={"status": 400, "message": "Update chatbot failed"},
                )
        return chatbot_updated

    def delete(
        self,
        db: Session,
        chatbot_id: str,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> Optional[ChatbotInDBSchema]:
        if "delete_chatbot" not in current_user_role_permission.u_list_permission_name:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.delete: User does not have permission to delete chatbot"
            )
            return JSONResponse(
                status_code=400,
                content={
                    "status": 400,
                    "message": "Delete chatbot failed: User does not have permission to delete chatbot",
                },
            )
        chatbot_found: ChatbotInDBSchema = self.get_one(
            db=db,
            chatbot_id=chatbot_id,
            current_user_role_permission=current_user_role_permission,
        )
        try:
            chatbot_deleted: ChatbotInDBSchema = self.__crud_chatbot.remove(
                db=db, id=chatbot_found.id
            )
        except:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.delete"
            )
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Delete chatbot failed"},
            )
        return chatbot_deleted
