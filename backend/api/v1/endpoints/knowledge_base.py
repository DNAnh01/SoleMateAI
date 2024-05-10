import os
from typing import List, Optional

from fastapi import APIRouter, Depends, File, UploadFile, status
from sqlalchemy.orm import Session

from backend.api import deps
from backend.common import utils
from backend.common.logger import setup_logger
from backend.core import oauth2
from backend.schemas.knowledge_base_schema import (
    KnowledgeBaseCreateSchema,
    KnowledgeBaseInDBSchema,
)
from backend.schemas.user_role_permission_schema import UserRolePermissionSchema
from backend.services.abc.knowledge_base_service import KnowledgeBaseService
from backend.services.impl.knowledge_base_service_impl import KnowledgeBaseServiceImpl

logger = setup_logger()

knowledge_base_service: KnowledgeBaseService = KnowledgeBaseServiceImpl()

router = APIRouter()


@router.post("/chatbot-id={chatbot_id}", status_code=status.HTTP_200_OK)
def create(
    chatbot_id: str,
    file: UploadFile = File(...),
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
):
    file_path = f"backend/assets/knowledge_files/{chatbot_id}_{file.filename}"
    # Ensure the directory exists
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, "wb") as f:
        f.write(file.file.read())
    knowledge_base_created = knowledge_base_service.create(
        db=db,
        chatbot_id=chatbot_id,
        knowledge_base_create=KnowledgeBaseCreateSchema(
            knowledge_base_name=file.filename,
            content_type=file.filename.split(".")[-1],
            file_path=file_path,
            character_count=len(utils.read_pdf(file_path)),
            file_size=os.path.getsize(file_path),
        ),
        current_user_role_permission=current_user_role_permission,
    )
    return knowledge_base_created


@router.get(
    "/chatbot-id={chatbot_id}/get-all",
    status_code=status.HTTP_200_OK,
    response_model=Optional[List[KnowledgeBaseInDBSchema]],
)
def get_all(
    chatbot_id: str,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
) -> Optional[List[KnowledgeBaseInDBSchema]]:
    return knowledge_base_service.get_all(
        db=db,
        chatbot_id=chatbot_id,
        current_user_role_permission=current_user_role_permission,
    )


@router.delete(
    "/chatbot-id={chatbot_id}/knowledge-base-id={knowledge_base_id}",
    status_code=status.HTTP_200_OK,
)
def delete(
    chatbot_id: str,
    knowledge_base_id: str,
    current_user_role_permission: UserRolePermissionSchema = Depends(
        oauth2.get_current_user_role_permission
    ),
    db: Session = Depends(deps.get_db),
):
    return knowledge_base_service.delete(
        db=db,
        chatbot_id=chatbot_id,
        knowledge_base_id=knowledge_base_id,
        current_user_role_permission=current_user_role_permission,
    )
