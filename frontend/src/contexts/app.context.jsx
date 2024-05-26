import { createContext, useState } from 'react';

export const getInitialAppContext = () => ({
    promotions: [],
    setPromotions: () => null,
});

const initialAppContext = getInitialAppContext();

export const AppContext = createContext(initialAppContext);

export const AppProvider = ({ children, defaultValue = initialAppContext }) => {
    const [promotions, setPromotions] = useState([]);

    return (
        <AppContext.Provider
            value={{
                promotions,
                setPromotions,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
