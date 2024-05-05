from fastapi import APIRouter, Depends, HTTPException, status, Request

from backend.services.abc.conversation_service import ConversationService
from backend.services.impl.conversation_service_impl import ConversationServiceImpl
from backend.api import deps
from backend.core import oauth2
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema

from sqlalchemy.orm import Session
from backend.schemas.conversation_schema import ConversationInDBSchema

from backend.common.logger import setup_logger

logger = setup_logger()

router = APIRouter()

conversation_service: ConversationService = ConversationServiceImpl()

@router.get("/", status_code=status.HTTP_201_CREATED, response_model=ConversationInDBSchema)
def create_conversation(
    request: Request,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> ConversationInDBSchema:
    # client_ip = request.client.host
    # logger.info("client_ip: " + client_ip)
    client_ip = "42.118.119.124"
    return conversation_service.create(
        db=db,
        client_ip=client_ip,
        current_user_role_permission=current_user_role_permission,
    )

