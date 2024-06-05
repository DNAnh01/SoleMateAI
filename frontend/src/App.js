import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyles from '~/styles/global/GlobalStyles';
import Home from '~/pages/home/HomePage';
import BaseLayout from '~/components/layout/BaseLayout';
import AuthLayout from '~/components/layout/AuthLayout';
import AdminLayout from '~/components/layout/AdminLayout';
import SignIn from '~/pages/auth/SignInPage';
import SignUp from '~/pages/auth/SignUpPage';
import Reset from '~/pages/auth/ResetPage';
import ChangePassword from '~/pages/auth/ChangePasswordPage';
import NotFound from '~/pages/error/NotFoundPage';
import ProductList from '~/pages/product/ProductListPage';
import ProductDetails from '~/pages/product/ProductDetailsPage';
import Cart from '~/pages/cart/CartPage';
import CartEmpty from '~/pages/empty/CartEmptyPage';
import Order from '~/pages/user/OrderListPage';
import OrderDetail from '~/pages/user/OrderDetailPage';
import Confirm from '~/pages/user/ConfirmPage';
import Account from '~/pages/user/AccountPage';
import Address from '~/pages/user/AddressPage';

import ProductAdmin from '~/pages/productAdmin/productAdmin';
import ChatbotAdmin from '~/pages/chatbotAdmin/chatbotAdmin';
import UpdateChatbotAdmin from '~/pages/updateChatbotAdmin/updateChatbotAdmin';
import Loading from '~/components/loading/loading';
import Overlay from '~/components/overlay/overlay';
import configs from '~/configs';
import { AppContext } from '~/contexts/app.context';
import productApi from '~/apis/product.api';
import promotionApi from '~/apis/promotion.api';
import useAppStore from '~/store';
import { useAxiosInterceptors } from '~/utils/http';
import './index.css';
import { CartContext } from './contexts/cart.context';
import cartAPI from './apis/cart.api';
import { AddressContext } from './contexts/address.context';
import addressApi from './apis/address.api';
import { ProductFilterProvider } from './contexts/productFilter.context';
import OrderEmpty from './pages/empty/OrderEmptyPage';
import { OrderContext } from './contexts/order.context';
import orderApi from './apis/order.api';
import PaymentSuccess from './pages/checkout/PaymentSuccessPage';
import PaymentFailure from './pages/checkout/PaymentFailurePage';
import DashboardAdmin from './pages/dashboardAdmin';
import OrderAdmin from './pages/orderAdmin/orderAdmin';
// import { Toaster } from 'react-hot-toast';
import PromotionAdmin from './pages/promotionAdmin/promotionAdmin';
import PromotionDetails from './pages/promotionDetails/promotionDetails';

function App() {
    const { accessToken, setAccessToken, profile, clearLocalStorage } = useAppStore();
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     clearLocalStorage();
    // }, [clearLocalStorage]);

    // Setup axios interceptors
    useAxiosInterceptors(accessToken, setAccessToken);
    const { setPromotions, setProducts } = useContext(AppContext);
    const { setCart, setTotalCartItem } = useContext(CartContext);
    const { setAddress } = useContext(AddressContext);
    const { setHistoryOrdersByFilter } = useContext(OrderContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const productPromise = productApi.getAll();
                const promotionPromise = promotionApi.getAllPromotion();
                const cartPromise =
                    accessToken && profile?.role_name !== 'admin' ? cartAPI.getAllCartItem() : Promise.resolve(null);
                const addressPromise =
                    accessToken && profile?.role_name !== 'admin'
                        ? addressApi.getCurrentShippingAddress()
                        : Promise.resolve(null);
                const orderPromise = accessToken
                    ? orderApi.getHistoryOrderByFilter({ status: 'ORDER-PLACED', orderDate: '' })
                    : Promise.resolve(null);

                const [productResult, promotionResult, cartResult, addressResult, orderResult] = await Promise.all([
                    productPromise,
                    promotionPromise,
                    cartPromise,
                    addressPromise,
                    orderPromise,
                ]);

                if (productResult) setProducts(productResult.data);
                if (promotionResult) setPromotions(promotionResult.data);
                if (cartResult) {
                    setCart(cartResult.data);
                    setTotalCartItem(cartResult.data.total_item);
                }
                if (addressResult) setAddress(addressResult.data);
                if (orderResult) setHistoryOrdersByFilter(orderResult.data);
            } catch (error) {
                console.error(error);
            } finally {
                console.log('ed');
                setIsLoading(false);
            }
            console.log('111111');
        };

        fetchData();
    }, [
        accessToken,
        profile?.role_name,
        setProducts,
        setPromotions,
        setCart,
        setTotalCartItem,
        setAddress,
        setHistoryOrdersByFilter,
    ]);

    return (
        <>
            <Router>
                <GlobalStyles />
                <Routes>
                    <Route path="/" element={<BaseLayout />}>
                        <Route index element={<Home />} />
                        <Route
                            path={configs.roures.productList}
                            element={
                                <ProductFilterProvider>
                                    <ProductList />
                                </ProductFilterProvider>
                            }
                        />
                        <Route path={configs.roures.productDetail} element={<ProductDetails />} />
                        <Route path={configs.roures.user.cart} element={<Cart />} />
                        <Route path={configs.roures.user.emptyCart} element={<CartEmpty />} />
                        <Route path={configs.roures.user.order} element={<Order />} />
                        <Route path={configs.roures.user.orderDetail} element={<OrderDetail />} />
                        <Route path={configs.roures.user.paymentSuccess} element={<PaymentSuccess />} />
                        <Route path={configs.roures.user.paymentFailure} element={<PaymentFailure />} />
                        <Route path={configs.roures.user.emptyOrder} element={<OrderEmpty />} />
                        <Route path={configs.roures.confirm} element={<Confirm />} />
                        <Route path={configs.roures.user.profile} element={<Account />} />
                        <Route path={configs.roures.user.changePassword} element={<ChangePassword />} />
                        <Route path={configs.roures.user.addAddress} element={<Address />} />
                    </Route>
                    <Route path="/" element={<AuthLayout />}>
                        <Route path={configs.roures.auth.signIn} element={<SignIn />} />
                        <Route path={configs.roures.auth.signUp} element={<SignUp />} />
                        <Route path={configs.roures.auth.forgetPassword} element={<Reset />} />
                    </Route>
                    <Route path="admin" element={<AdminLayout />}>
                        <Route path="dashboard" element={<DashboardAdmin />} />
                        <Route path="product" element={<ProductAdmin />} />
                        <Route path="chatbot" element={<ChatbotAdmin />} />
                        <Route path="chatbot/:id" element={<UpdateChatbotAdmin />} />
                        <Route path="order" element={<OrderAdmin />} />
                        <Route path="promotion" element={<PromotionAdmin />} />
                        <Route path="promotion/:id" element={<PromotionDetails />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
            <Loading isLoading={isLoading} />
            <Overlay />
        </>
    );
}

export default App;
