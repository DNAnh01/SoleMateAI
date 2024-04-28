from datetime import datetime, timedelta
from typing import Dict, Union

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from backend.api import deps
from backend.common.logger import setup_logger
from backend.core.config import settings
from backend.crud.crud_user import crud_user


logger = setup_logger()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def create_access_token(data: Dict[str, Union[str, int]]) -> str:
    """
    Create a new access token.

    Parameters:
    data (Dict[str, Union[str, int]]): The data to encode into the token.

    Returns:
    str: The encoded JWT token as a string.
    """
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode, key=settings.SECRET_KEY, algorithm=settings.ALGORITHM
    )

    return encoded_jwt


def verify_access_token(token: str, credentials_exception: HTTPException):
    """
    Verify the access token.

    Parameters:
    token (str): The access token to be verified.
    credentials_exception (HTTPException): The exception to be raised if verification fails.

    Returns:
    TokenData: The token data if verification is successful.
    """
    try:
        # Decode the token using the secret key and algorithm from settings
        payload = jwt.decode(
            token, key=settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )

        # Get the user id from the payload
        id: str = payload.get("user_id")

        # If the id is None, raise the credentials exception
        if id is None:
            logger.error("User id is None")
            raise credentials_exception

        # Create a TokenData instance with the id
        token_data = {"id": id}
    except JWTError:
        # If there is a JWTError while decoding, raise the credentials exception
        logger.error("JWTError while decoding token")
        raise credentials_exception

    # Return the token data
    return token_data


def get_current_user(
    db: Session = Depends(deps.get_db), token: str = Depends(oauth2_scheme)
):
    """
    Get the current user from the access token.

    Parameters:
    db (Session): The database session.
    token (str): The access token.

    Returns:
    UserOut: The current user data.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=f"Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token_data = verify_access_token(token, credentials_exception)

    # user = user_service.get_by_id(db, token_data.id)
    user = crud_user.get_one_by_or_fail(db=db, filter={"id": token_data.id})
    if user is None:
        logger.error(f"Error in {__name__}.get_current_user: User not found")
        raise credentials_exception
    return user
