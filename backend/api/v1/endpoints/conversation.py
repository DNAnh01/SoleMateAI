from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.orm import Session

from backend.api import deps
from backend.common.logger import setup_logger
from backend.core import oauth2
from backend.schemas.conversation_schema import ConversationInDBSchema
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.services.abc.conversation_service import ConversationService
from backend.services.impl.conversation_service_impl import ConversationServiceImpl

logger = setup_logger()

router = APIRouter()

conversation_service: ConversationService = ConversationServiceImpl()


@router.get(
    "/with-auth",
    status_code=status.HTTP_201_CREATED,
    response_model=ConversationInDBSchema,
)
def create_conversation_with_auth(
    request: Request,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> ConversationInDBSchema:
    return conversation_service.create_conversation_with_auth(
        db=db,
        current_user_role_permission=current_user_role_permission,
    )


@router.get(
    "/without-auth",
    status_code=status.HTTP_201_CREATED,
    response_model=ConversationInDBSchema,
)
def create_conversation_without_auth(
    request: Request,
    db: Session = Depends(deps.get_db),
) -> ConversationInDBSchema:
    # client_ip = request.client.host
    # logger.info("client_ip: " + client_ip)
    client_ip = "42.118.119.124"
    return conversation_service.create_conversation_without_auth(
        db=db,
        client_ip=client_ip,
    )
