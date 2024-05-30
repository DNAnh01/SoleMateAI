from abc import ABC, abstractmethod

from fastapi import Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session


class PaymentVnPayService(ABC):

    @abstractmethod
    def read_root(self) -> RedirectResponse:
        pass

    @abstractmethod
    def read_item(self, request: Request, db: Session) -> RedirectResponse:
        pass
