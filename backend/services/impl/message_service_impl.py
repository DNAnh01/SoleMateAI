import json
import uuid
from datetime import datetime

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
from backend.schemas.conversation_schema import ConversationInDBSchema
from backend.schemas.message_schema import MessageInDBSchema
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.services.abc.message_service import MessageService
from backend.crud.crud_shoe import crud_shoe
from backend.services.abc.shoe_service import ShoeService
from backend.services.impl.shoe_service_impl import ShoeServiceImpl


logger = setup_logger()


class MessageServiceImpl(MessageService):

    def __init__(self):
        self.__crud_conversation = crud_conversation
        self.__crud_message = crud_message
        self.__crud_knowledge_base = crud_knowledge_base
        self.__crud_chatbot = crud_chatbot
        self.__client_openai = OpenAI(api_key=f"{settings.OPENAI_API_KEY}")
        self.__shoe_service: ShoeService = ShoeServiceImpl()

    def create(
        self,
        message: str,
        conversation_id: uuid.UUID,
        client_ip: str,
        db: Session,
        current_user_role_permission: UserRolePermissionSchema,
    ) -> MessageInDBSchema:
        if (
            "create_message"
            and "read_chatbot"
            not in current_user_role_permission.u_list_permission_name
        ):
            logger.exception(
                f"Exception in {__name__}.{self.__class__.__name__}.create_message: User does not have permission to create message"
            )
            return JSONResponse(
                status_code=400,
                content={
                    "status": 400,
                    "message": "Create message failed: User does not have permission to create message"
                },
            )
        try:
            """Check if conversation exists"""
            chatbot_found = self.__crud_chatbot.get_one_by(
                db=db, filter={"is_public": True}
            )

            if chatbot_found is None:
                return JSONResponse(
                    status_code=400,
                    content={
                        "status": 400,
                        "message": "Create message failed: No public chatbot found"
                    },
                )

            """Check if conversation exists, if not, create a new one"""
            conversation = self.__crud_conversation.get(db=db, id=str(conversation_id))

            if conversation is None:
                """Create a new conversation"""
                client_info = json.loads(
                    requests.get("http://ip-api.com/json/" + client_ip).text
                )
                conversation_created = self.__crud_conversation.create(
                    db=db,
                    obj_in=ConversationInDBSchema(
                        id=conversation_id,
                        chatbot_id=chatbot_found.id,
                        user_id=current_user_role_permission.u_id,
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
                conversation = conversation_created
            else:
                """Create a new message"""
                message_created = self.__crud_message.create(
                    db=db,
                    obj_in=MessageInDBSchema(
                        id=uuid.uuid4(),
                        conversation_id=conversation.id,
                        sender_id=conversation.conversation_name,
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
                db=db, chatbot_id=chatbot_found.id, conversation_id=conversation.id
            )

            # Create a new message with the bot's response
            message_added = self.__crud_message.create(
                db=db,
                obj_in=MessageInDBSchema(
                    id=uuid.uuid4(),
                    conversation_id=conversation.id,
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
                f"Exception in {__name__}.{self.__class__.__name__}.create"
            )
            return JSONResponse(
                status_code=400, 
                content={
                    "status": 400,
                    "message": "Create message failed"
                }
            )

    def handle_message(self, db: Session, chatbot_id: str, conversation_id: str):
        try:
            temp_knowledge_base = []
            messages = self.__crud_message.get_multi(
                db=db, filter_param={"conversation_id": conversation_id}
            )
            knowledge_bases = self.__crud_knowledge_base.get_multi(
                db=db, filter_param={"chatbot_id": chatbot_id}
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
            shoes_json_lm3 = self.__shoe_service.get_all_shoes(
                db=db, common_filters={"limit": 3}
            )
            temp_knowledge_base.append(
                {
                    "role": "system",
                    "content": json.dumps(
                        [shoe.json() for shoe in shoes_json_lm3]
                    ),
                }
            )
            
            
            logger.info(f"len temp_knowledge_base: {len(temp_knowledge_base)}")
            
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
