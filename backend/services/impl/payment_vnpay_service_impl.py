from datetime import datetime

from fastapi import Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from backend.common.logger import setup_logger
from backend.core.config import settings
from backend.core.vnpay import Vnpay
from backend.crud.crud_order import crud_order
from backend.schemas.order_schema import OrderUpdateSchema
from backend.services.abc.payment_vnpay_service import PaymentVnPayService

logger = setup_logger()


class PaymentVnPayServiceImpl(PaymentVnPayService):
    def __init__(self):
        self.__vnpay = Vnpay(
            tmn_code=f"{settings.VNPAY_TMN_CODE}",
            secret_key=f"{settings.VNPAY_HASH_SECRET_KEY}",
            return_url=f"{settings.VNPAY_RETURN_URL}",
            vnpay_payment_url=f"{settings.VNPAY_PAYMENT_URL}",
            api_url=f"{settings.VNPAY_API_URL}",
        )
        self.__crud_order = crud_order

    def read_root(
        self, vnp_Amount: str, vnp_TxnRef: str, vnp_OrderInfo: str
    ) -> RedirectResponse:
        req = {
            "vnp_Version": "2.1.0",
            "vnp_Command": "pay",
            "vnp_TmnCode": f"{settings.VNPAY_TMN_CODE}",
            "vnp_Amount": vnp_Amount,
            "vnp_CurrCode": "VND",
            "vnp_TxnRef": vnp_TxnRef,
            "vnp_OrderInfo": vnp_OrderInfo,
            "vnp_OrderType": "ao_tunaasd",
            "vnp_Locale": "vn",
            "vnp_BankCode": "NCB",
            "vnp_CreateDate": datetime.now().strftime("%Y%m%d%H%M%S"),
            "vnp_IpAddr": "192.168.1.11",
            "vnp_ReturnUrl": f"{settings.VNPAY_RETURN_URL}",
        }
        return RedirectResponse(self.__vnpay.get_payment_url(req))

    def read_item(self, request: Request, db: Session) -> RedirectResponse:
        response = dict(request.query_params)
        
        
        res_vnp_Amount = str(int(response.get("vnp_Amount")) / 100)

        if not self.__vnpay.validate_response(response):
            logger.error("Payment validation failed")
            return RedirectResponse(
                f"{settings.REDIRECT_FRONTEND_URL}/user/payment-failure?vnp_Amount={res_vnp_Amount}&vnp_TxnRef={response['vnp_TxnRef']}"
            )

        try:
            order_id = response["vnp_TxnRef"]
            order = self.__crud_order.get(db=db, id=order_id)
            if not order or order.status in ["ORDER-CANCELLED", "ORDER-DELIVERED"]:
                logger.error("Invalid order status or order not found")
                return RedirectResponse(
                    f"{settings.REDIRECT_FRONTEND_URL}/user/payment-failure?vnp_Amount={res_vnp_Amount}&vnp_TxnRef={response['vnp_TxnRef']}"
                )

            updated_order = self.__crud_order.update_one_by(
                db=db,
                filter={"id": order_id},
                obj_in=OrderUpdateSchema(
                    status="ORDER-DELIVERED", updated_at=datetime.now()
                ),
            )
            if not updated_order:
                logger.error("Order update failed")
                return RedirectResponse(
                    f"{settings.REDIRECT_FRONTEND_URL}/user/payment-failure?vnp_Amount={res_vnp_Amount}&vnp_TxnRef={response['vnp_TxnRef']}"
                )
        except Exception as e:
            logger.error(f"Error: {e}")
            return RedirectResponse(
                f"{settings.REDIRECT_FRONTEND_URL}/user/payment-failure?vnp_Amount={res_vnp_Amount}&vnp_TxnRef={response['vnp_TxnRef']}"
            )

        logger.info("Payment validation succeeded")
        return RedirectResponse(
            f"{settings.REDIRECT_FRONTEND_URL}/user/payment-success?vnp_Amount={res_vnp_Amount}&vnp_TxnRef={response['vnp_TxnRef']}&vnp_TransactionNo={response['vnp_TransactionNo']}"
        )
