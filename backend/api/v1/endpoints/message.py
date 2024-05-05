from fastapi import APIRouter, Depends, HTTPException, status, Request, Cookie
from backend.services.abc.message_service import MessageService
from backend.services.impl.message_service_impl import MessageServiceImpl
from backend.api import deps
from backend.core import oauth2
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.schemas.message_schema import MessageInDBSchema
from sqlalchemy.orm import Session

from backend.common.logger import setup_logger


logger = setup_logger()

router = APIRouter()

message_service: MessageService = MessageServiceImpl()


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=MessageInDBSchema)
def create_message(
    request: Request,
    message: dict,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
    conversation_id: str = Cookie(None),
) -> MessageInDBSchema:
    # client_ip = request.client.host
    client_ip = "42.118.119.124"
    return message_service.create(
        db=db,
        message=message['message'],
        conversation_id=message['conversation_id'],
        client_ip=client_ip,
        current_user_role_permission=current_user_role_permission,
    )