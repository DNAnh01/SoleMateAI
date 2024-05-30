import { createContext, useState } from 'react';

export const getInitialCartContext = () => ({
    cart: {},
    setCart: () => null,
    totalCartItem: 0,
    setTotalCartItem: () => null,
});

const initialCartContext = getInitialCartContext();

export const CartContext = createContext(initialCartContext);

export const CartProvider = ({ children, defaultValue = initialCartContext }) => {
    const [cart, setCart] = useState({});
    const [totalCartItem, setTotalCartItem] = useState(0);
    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                totalCartItem,
                setTotalCartItem,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
