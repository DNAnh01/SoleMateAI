import { createContext, useState } from 'react';

export const getInitialAppContext = () => ({
    promotions: [],
    setPromotions: () => null,
    products: [],
    setProducts: () => null,
    latestProducts: [],
    setLatestProducts: () => null,
});

const initialAppContext = getInitialAppContext();

export const AppContext = createContext(initialAppContext);

export const AppProvider = ({ children, defaultValue = initialAppContext }) => {
    const [promotions, setPromotions] = useState([]);
    const [products, setProducts] = useState([]);
    const [latestProducts, setLatestProducts] = useState([]);

    return (
        <AppContext.Provider
            value={{
                promotions,
                setPromotions,
                products,
                setProducts,
                latestProducts,
                setLatestProducts,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
