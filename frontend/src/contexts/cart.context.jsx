import { createContext, useState } from 'react';

export const getInitialCartContext = () => ({
    cart: {},
    setCart: () => null,
});

const initialCartContext = getInitialCartContext();

export const CartContext = createContext(initialCartContext);

export const CartProvider = ({ children, defaultValue = initialCartContext }) => {
    const [cart, setCart] = useState({});
    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
/*
{
    "id": "bc46360b-bccb-45f3-92e6-990d34615df9",
    "user_id": "74955289-f09e-4330-9c5a-ff766344d4e7",
    "total_item": 0,
    "total_display_price": 0.0,
    "total_warehouse_price": 0.0,
    "total_discounted_price": 0.0,
    "cart_items": []
}
 */

/*
{
    "id": "bc46360b-bccb-45f3-92e6-990d34615df9",
    "user_id": "74955289-f09e-4330-9c5a-ff766344d4e7",
    "total_item": 14,
    "total_display_price": 28000000.0,
    "total_warehouse_price": 21000000.0,
    "total_discounted_price": 28000000.0,
    "cart_items": [
        {
            "id": "eed804fc-f4e8-402b-8850-01384b76b762",
            "cart_id": "bc46360b-bccb-45f3-92e6-990d34615df9",
            "shoe_id": "cda17a14-cbb2-472c-8310-f20696a48c55",
            "shoe": {
                "is_active": true,
                "created_at": "2024-05-26T15:08:27.552209+07:00",
                "updated_at": "2024-05-26T15:08:27.552209+07:00",
                "deleted_at": null,
                "id": "cda17a14-cbb2-472c-8310-f20696a48c55",
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
                "quantity_in_stock": 100,
                "display_price": 2000000.0,
                "warehouse_price": 1500000.0,
                "discounted_price": 2000000.0
            },
            "quantity": 7,
            "display_price": 14000000.0,
            "warehouse_price": 10500000.0,
            "discounted_price": 14000000.0
        },
        {
            "id": "6fb76875-674d-4ddb-a60e-c536254f99ac",
            "cart_id": "bc46360b-bccb-45f3-92e6-990d34615df9",
            "shoe_id": "1cfe5a29-9abc-4b4e-8323-5dbcf85d6eaf",
            "shoe": {
                "is_active": true,
                "created_at": "2024-05-26T15:08:27.611189+07:00",
                "updated_at": "2024-05-26T15:08:27.611189+07:00",
                "deleted_at": null,
                "id": "1cfe5a29-9abc-4b4e-8323-5dbcf85d6eaf",
                "brand": {
                    "brand_name": "Reebok",
                    "brand_logo": "https://raw.githubusercontent.com/DNAnh01/assets/main/SoleMateAI/brand_logo_Reebok.png"
                },
                "size": {
                    "size_number": 41
                },
                "color": {
                    "color_name": "Yellow",
                    "hex_value": "#e3a338"
                },
                "image_url": "https://raw.githubusercontent.com/DNAnh01/assets/main/SoleMateAI/shoe1.png",
                "shoe_name": "Reebok Classic",
                "description": "Giày thể thao nữ Reebok Classic mang đến sự êm ái, thoải mái cho người sử dụng.",
                "quantity_in_stock": 100,
                "display_price": 2000000.0,
                "warehouse_price": 1500000.0,
                "discounted_price": 2000000.0
            },
            "quantity": 7,
            "display_price": 14000000.0,
            "warehouse_price": 10500000.0,
            "discounted_price": 14000000.0
        }
    ]
}
 */
