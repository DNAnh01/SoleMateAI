import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import { AppProvider } from './contexts/app.context';
import { ProductFilterProvider } from './contexts/productFilter.context';
import { CartProvider } from './contexts/cart.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppProvider>
        <CartProvider>
            <ProductFilterProvider>
                <App />
            </ProductFilterProvider>
        </CartProvider>
    </AppProvider>,
);
