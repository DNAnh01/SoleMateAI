from fastapi import APIRouter

from backend.api.v1.endpoints import (address, admin_dashboard, admin_order,
                                      admin_promotion, auth, brand, cart,
                                      chatbot, conversation, knowledge_base,
                                      message, order, payment, shoe, user)

api_router = APIRouter()
api_router.include_router(
    admin_dashboard.router, prefix="/admin-dashboard", tags=["admin-dashboard"]
)
api_router.include_router(auth.router, prefix="/auth", tags=["authentications"])
api_router.include_router(chatbot.router, prefix="/chatbot", tags=["chatbots"])
api_router.include_router(
    knowledge_base.router, prefix="/knowledge-base", tags=["knowledge-bases"]
)
api_router.include_router(
    conversation.router, prefix="/conversation", tags=["conversations"]
)
api_router.include_router(message.router, prefix="/message", tags=["messages"])
api_router.include_router(shoe.router, prefix="/shoe", tags=["shoes"])
api_router.include_router(user.router, prefix="/user", tags=["users"])
api_router.include_router(brand.router, prefix="/brand", tags=["brands"])
api_router.include_router(cart.router, prefix="/cart", tags=["carts"])
api_router.include_router(address.router, prefix="/address", tags=["addresses"])
api_router.include_router(order.router, prefix="/order", tags=["orders"])
api_router.include_router(
    admin_order.router, prefix="/admin-order", tags=["admin-orders"]
)
api_router.include_router(
    admin_promotion.router, prefix="/admin-promotion", tags=["admin-promotions"]
)

api_router.include_router(payment.router, prefix="/payment", tags=["payments"])
