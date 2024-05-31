import { createContext, useState } from 'react';

export const getInitialOrderContext = () => ({
    historyOrders: [],
    setHistoryOrders: () => null,
    historyOrdersByFilter: [],
    setHistoryOrdersByFilter: () => null,
});

const initialOrderContext = getInitialOrderContext();

export const OrderContext = createContext(initialOrderContext);

export const OrderProvider = ({ children, defaultValue = initialOrderContext }) => {
    const [historyOrders, setHistoryOrders] = useState(defaultValue.historyOrders);
    const [historyOrdersByFilter, setHistoryOrdersByFilter] = useState(defaultValue.historyOrdersByFilter);

    return (
        <OrderContext.Provider
            value={{ historyOrdersByFilter, setHistoryOrdersByFilter, historyOrders, setHistoryOrders }}
        >
            {children}
        </OrderContext.Provider>
    );
};
