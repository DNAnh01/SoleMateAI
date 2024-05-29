import { createContext, useState } from 'react';

export const getInitialOrderContext = () => ({
    historyOrders: [],
    setHistoryOrders: () => null,
});

const initialOrderContext = getInitialOrderContext();

export const OrderContext = createContext(initialOrderContext);

export const OrderProvider = ({ children, defaultValue = initialOrderContext }) => {
    const [historyOrders, setHistoryOrders] = useState(defaultValue.historyOrders);

    return <OrderContext.Provider value={{ historyOrders, setHistoryOrders }}>{children}</OrderContext.Provider>;
};

/*
[
    {
        "id": "0aa792db-bb3b-44e7-9254-22ab78022534",
        "address_id": "c6c666fd-7cb8-4c8c-9b06-791aa19283b3",
        "user_id": "4a44ac73-b93e-4d30-8e40-1471b57f4a76",
        "order_date": "2024-05-28T18:22:08.570628",
        "delivery_date": "2024-06-04T18:22:08.570628",
        "status": "ORDER-CANCELLED",
        "total_item": 8,
        "total_display_price": 16000000.0,
        "total_warehouse_price": 12000000.0,
        "total_discounted_price": 16000000.0,
        "shipping_address": {
            "is_active": false,
            "created_at": "2024-05-28T18:22:08.498990+07:00",
            "updated_at": "2024-05-28T22:49:03.900169+07:00",
            "deleted_at": "2024-05-28T22:49:03.897729+07:00",
            "id": "c6c666fd-7cb8-4c8c-9b06-791aa19283b3",
            "user_id": "4a44ac73-b93e-4d30-8e40-1471b57f4a76",
            "province": "Đà Nẵng",
            "district": "Hải Châu",
            "ward": "Lê Duẩn"
        },
        "order_items": [
            {
                "id": "d2b7a076-d780-447a-b3c9-b83637dba82a",
                "order_id": "0aa792db-bb3b-44e7-9254-22ab78022534",
                "shoe_id": "d4c819e1-797d-4076-94de-51ccbb3a6946",
                "shoe": {
                    "is_active": true,
                    "created_at": "2024-05-28T18:19:05.748103+07:00",
                    "updated_at": "2024-05-29T14:46:02.104668+07:00",
                    "deleted_at": null,
                    "id": "d4c819e1-797d-4076-94de-51ccbb3a6946",
                    "brand": {
                        "brand_name": "Reebok",
                        "brand_logo": "https://raw.githubusercontent.com/DNAnh01/assets/main/SoleMateAI/brand_logo_Reebok.png"
                    },
                    "size": {
                        "size_number": 42
                    },
                    "color": {
                        "color_name": "Grey",
                        "hex_value": "#636a6e"
                    },
                    "image_url": "https://raw.githubusercontent.com/DNAnh01/assets/main/SoleMateAI/shoe5.png",
                    "shoe_name": "Reebok Classic",
                    "description": "Giày thể thao nữ Reebok Classic mang đến sự êm ái, thoải mái cho người sử dụng.",
                    "quantity_in_stock": 60,
                    "display_price": 2000000.0,
                    "warehouse_price": 1500000.0,
                    "discounted_price": 2000000.0
                },
                "quantity": 8,
                "display_price": 16000000.0,
                "warehouse_price": 12000000.0,
                "discounted_price": 16000000.0
            }
        ]
    }
]
*/
