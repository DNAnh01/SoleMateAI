import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import { AppProvider } from './contexts/app.context';
import { CartProvider } from './contexts/cart.context';
import { AddressProvider } from './contexts/address.context';
import { OrderProvider } from './contexts/order.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppProvider>
        <AddressProvider>
            <CartProvider>
                <OrderProvider>
                    <App />
                </OrderProvider>
            </CartProvider>
        </AddressProvider>
    </AppProvider>,
);
