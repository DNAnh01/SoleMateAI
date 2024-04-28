from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from backend.api import deps
from backend.services.abc.auth_service import AuthService
from backend.services.impl.auth_service_impl import AuthServiceImpl
from backend.schemas.user_schema import UserSignUpSchema

router = APIRouter()
auth_service: AuthService = AuthServiceImpl()

@router.post("/sign-up", status_code=status.HTTP_201_CREATED)
def sign_up(user: UserSignUpSchema, db: Session = Depends(deps.get_db)):
    return auth_service.sign_up(db, user)