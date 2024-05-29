import json
import uuid
from datetime import datetime
from typing import List

import openai
import requests
from fastapi.responses import JSONResponse
from openai import OpenAI
from sqlalchemy.orm import Session

from backend.common import utils
from backend.common.logger import setup_logger
from backend.core.config import settings
from backend.crud.crud_chatbot import crud_chatbot
from backend.crud.crud_conversation import crud_conversation
from backend.crud.crud_knowledge_base import crud_knowledge_base
from backend.crud.crud_message import crud_message
from backend.schemas.message_schema import MessageInDBSchema
from backend.schemas.user_role_permission_schema import \
    UserRolePermissionSchema
from backend.services.abc.message_service import MessageService

logger = setup_logger()


class MessageServiceImpl(MessageService):

    def __init__(self):
        self.__crud_conversation = crud_conversation
        self.__crud_message = crud_message
        self.__crud_knowledge_base = crud_knowledge_base
        self.__crud_chatbot = crud_chatbot
        self.__client_openai = OpenAI(api_key=f"{settings.OPENAI_API_KEY}")

    def create_message_with_auth(
        self,
        message: str,
        conversation_id: uuid.UUID,
        current_user_role_permission: UserRolePermissionSchema,
        db: Session,
    ) -> MessageInDBSchema:
        try:
            chatbot_found = self.__crud_chatbot.get_one_by(
                db=db,
                filter={"is_public": True},
            )
            if chatbot_found is None:
                return JSONResponse(
                    status_code=400,
                    content={
                        "status": 400,
                        "message": "Create message failed: No public chatbot found",
                    },
                )
            conversation_found = self.__crud_conversation.get(
                db=db, id=str(conversation_id)
            )
            if conversation_found is None:
                return JSONResponse(
                    status_code=400,
                    content={
                        "status": 400,
                        "message": "Create message failed: No conversation found",
                    },
                )
            message_created = self.__crud_message.create(
                db=db,
                obj_in=MessageInDBSchema(
                    id=uuid.uuid4(),
                    conversation_id=conversation_found.id,
                    sender_id=str(current_user_role_permission.u_id),
                    sender_type="guest",
                    message_text=message,
                    is_active=True,
                    created_at=datetime.now(),
                    updated_at=datetime.now(),
                    deleted_at=None,
                ),
            )
            """Handle response and add to message"""
            response, chatbot_id = self.handle_message(
                db=db,
                chatbot_id=chatbot_found.id,
                conversation_id=conversation_found.id,
            )
            """create a new message with the bot's response"""
            message_added = self.__crud_message.create(
                db=db,
                obj_in=MessageInDBSchema(
                    id=uuid.uuid4(),
                    conversation_id=conversation_found.id,
                    sender_id=str(chatbot_id),
                    sender_type="bot",
                    message_text=response,
                    is_active=True,
                    created_at=datetime.now(),
                    updated_at=datetime.now(),
                    deleted_at=None,
                ),
            )
            return message_added

        except:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.create_message_with_auth"
            )
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Create message failed"},
            )

    def create_message_without_auth(
        self,
        message: str,
        conversation_id: uuid.UUID,
        client_ip: str,
        db: Session,
    ) -> MessageInDBSchema:
        try:
            """check chatbot is exist"""
            chatbot_found = self.__crud_chatbot.get_one_by(
                db=db,
                filter={"is_public": True},
            )
            if chatbot_found is None:
                return JSONResponse(
                    status_code=400,
                    content={
                        "status": 400,
                        "message": "Create message failed: No public chatbot found",
                    },
                )
            conversation_found = self.__crud_conversation.get(
                db=db, id=str(conversation_id)
            )
            if conversation_found is None:
                return JSONResponse(
                    status_code=400,
                    content={
                        "status": 400,
                        "message": "Create message failed: No conversation found",
                    },
                )

            client_info = json.loads(
                requests.get("http://ip-api.com/json/" + client_ip).text
            )
            message_created = self.__crud_message.create(
                db=db,
                obj_in=MessageInDBSchema(
                    id=uuid.uuid4(),
                    conversation_id=conversation_found.id,
                    sender_id=client_info["countryCode"]
                    + str(client_ip.replace(".", "")),
                    sender_type="guest",
                    message_text=message,
                    is_active=True,
                    created_at=datetime.now(),
                    updated_at=datetime.now(),
                    deleted_at=None,
                ),
            )
            """Handle response and add to message"""
            response, chatbot_id = self.handle_message(
                db=db,
                chatbot_id=chatbot_found.id,
                conversation_id=conversation_found.id,
            )
            """create a new message with the bot's response"""
            message_added = self.__crud_message.create(
                db=db,
                obj_in=MessageInDBSchema(
                    id=uuid.uuid4(),
                    conversation_id=conversation_found.id,
                    sender_id=str(chatbot_id),
                    sender_type="bot",
                    message_text=response,
                    is_active=True,
                    created_at=datetime.now(),
                    updated_at=datetime.now(),
                    deleted_at=None,
                ),
            )
            return message_added
        except:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.create_message_without_auth"
            )
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Create message failed"},
            )

    def handle_message(self, db: Session, chatbot_id: str, conversation_id: str):
        try:
            temp_knowledge_base = []
            messages = self.__crud_message.get_multi(
                db=db,
                filter_param={
                    "filter": json.dumps({"conversation_id": str(conversation_id)})
                },
            )
            knowledge_bases = self.__crud_knowledge_base.get_multi(
                db=db,
                filter_param={"filter": json.dumps({"chatbot_id": str(chatbot_id)})},
            )
            chatbot_found = self.__crud_chatbot.get(db=db, id=chatbot_id)
            """add chatbot's prompt to knowledge base"""
            temp_knowledge_base.append(
                {"role": "system", "content": chatbot_found.prompt}
            )
            """add content of files to knowledge base"""
            for knowledge_base in knowledge_bases:
                if knowledge_base.file_path:
                    temp_knowledge_base.append(
                        {
                            "role": "system",
                            "content": utils.read_pdf(knowledge_base.file_path),
                        }
                    )

            """add data in DB to knowledge base"""
            default_kn_chatbots = self.__crud_knowledge_base.get_default_kn_chatbot(db)
            # logger.error(f"default_kn_chatbots: {default_kn_chatbots.__dict__}")
            # logger.info(f"default_kn_chatbots: {[default_kn_chatbot.__dict__ for default_kn_chatbot in default_kn_chatbots]}")
            temp_knowledge_base.append(
                {
                    "role": "system",
                    "content": json.dumps(
                        [
                            default_kn_chatbot.__dict__
                            for default_kn_chatbot in default_kn_chatbots
                        ],
                        cls=utils.UUIDEncoder,
                    ),
                }
            )

            for message_ in messages:
                temp_knowledge_base.append(
                    {
                        "role": (
                            "user" if message_.sender_type == "guest" else "assistant"
                        ),
                        "content": message_.message_text,
                    }
                )
            response = self.__client_openai.chat.completions.create(
                model="gpt-4", messages=temp_knowledge_base
            )
            response_rs = response.choices[0].message.content
            chatbot_id_rs = chatbot_found.id

            return response_rs, chatbot_id_rs
        except openai.OpenAIError as e:
            logger.error(f"Error calling OpenAI API: {e}")
            # Handle the error here, for example, return a default response
            return (
                "An error occurred while processing your request. Please try again later.",
                chatbot_id,
            )

    def get_all_by_conversation_id(
        self,
        conversation_id: uuid.UUID,
        db: Session,
    ) -> List[MessageInDBSchema]:
        try:
            # Ensure that the conversation_id is converted to a string before passing to the filter_param
            messages = self.__crud_message.get_multi(
                db=db,
                filter_param={
                    "filter": json.dumps({"conversation_id": str(conversation_id)})
                },
            )
            # logger.info(f"messages: {messages}")
            return messages
        except Exception as e:
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.get_all_by_conversation_id"
            )
            return JSONResponse(
                status_code=400,
                content={"status": 400, "message": "Read message failed"},
            )
