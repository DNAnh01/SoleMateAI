from typing import List

from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.orm import Session

from backend.api import deps
from backend.common.logger import setup_logger
from backend.core import oauth2
from backend.schemas.message_schema import MessageInDBSchema
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.services.abc.message_service import MessageService
from backend.services.impl.message_service_impl import MessageServiceImpl

logger = setup_logger()

router = APIRouter()

message_service: MessageService = MessageServiceImpl()


@router.post(
    "/with-auth", status_code=status.HTTP_201_CREATED, response_model=MessageInDBSchema
)
def create_message_with_auth(
    request: Request,
    message: dict,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> MessageInDBSchema:
    return message_service.create_message_with_auth(
        db=db,
        message=message["message"],
        conversation_id=message["conversation_id"],
        current_user_role_permission=current_user_role_permission,
    )


@router.post(
    "/without-auth",
    status_code=status.HTTP_201_CREATED,
    response_model=MessageInDBSchema,
)
def create_message_without_auth(
    request: Request,
    message: dict,
    db: Session = Depends(deps.get_db),
) -> MessageInDBSchema:
    # client_ip = request.client.host
    # logger.info("client_ip: " + client_ip)
    client_ip = "42.118.119.124"
    return message_service.create_message_without_auth(
        db=db,
        message=message["message"],
        conversation_id=message["conversation_id"],
        client_ip=client_ip,
    )


@router.get("/conversation-id={conversation_id}", status_code=status.HTTP_200_OK)
def get_all_by_conversation_id(
    conversation_id: str,
    db: Session = Depends(deps.get_db),
) -> List[MessageInDBSchema]:
    return message_service.get_all_by_conversation_id(
        db=db,
        conversation_id=conversation_id,
    )
