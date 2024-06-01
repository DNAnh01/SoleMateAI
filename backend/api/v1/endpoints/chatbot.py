from typing import List, Optional

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from backend.api import deps
from backend.common.logger import setup_logger
from backend.core import oauth2
from backend.schemas.chatbot_schema import (
    ChatbotCreateSchema,
    ChatbotInDBSchema,
    ChatbotUpdateSchema,
)
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.services.abc.chatbot_service import ChatbotService
from backend.services.impl.chatbot_service_impl import ChatbotServiceImpl

logger = setup_logger()

chatbot_service: ChatbotService = ChatbotServiceImpl()


router = APIRouter()


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=ChatbotInDBSchema)
def create(
    chatbot_create: ChatbotCreateSchema,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> ChatbotInDBSchema:
    return chatbot_service.create(
        db=db,
        chatbot_create=chatbot_create,
        current_user_role_permission=current_user_role_permission,
    )


@router.get(
    "/get-all",
    status_code=status.HTTP_200_OK,
    response_model=Optional[List[ChatbotInDBSchema]],
)
def get_all(
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> Optional[List[ChatbotInDBSchema]]:
    return chatbot_service.get_all(
        db=db, current_user_role_permission=current_user_role_permission
    )


@router.get(
    "/id={chatbot_id}",
    status_code=status.HTTP_200_OK,
    response_model=Optional[ChatbotInDBSchema],
)
def get_one(
    chatbot_id: str,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> Optional[ChatbotInDBSchema]:
    return chatbot_service.get_one(
        db=db,
        chatbot_id=chatbot_id,
        current_user_role_permission=current_user_role_permission,
    )


@router.patch(
    "/id={chatbot_id}", status_code=status.HTTP_200_OK, response_model=ChatbotInDBSchema
)
def update(
    chatbot_id: str,
    chatbot_update: ChatbotUpdateSchema,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> ChatbotInDBSchema:
    return chatbot_service.update(
        db=db,
        chatbot_id=chatbot_id,
        chatbot_update=chatbot_update,
        current_user_role_permission=current_user_role_permission,
    )


@router.delete(
    "/id={chatbot_id}", status_code=status.HTTP_200_OK, response_model=ChatbotInDBSchema
)
def delete(
    chatbot_id: str,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> ChatbotInDBSchema:
    return chatbot_service.delete(
        db=db,
        chatbot_id=chatbot_id,
        current_user_role_permission=current_user_role_permission,
    )
