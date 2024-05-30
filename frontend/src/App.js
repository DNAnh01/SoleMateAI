import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyles from '~/styles/global/GlobalStyles';
import { toast } from 'react-toastify';
import Home from '~/pages/home/HomePage';
import BaseLayout from '~/components/layout/BaseLayout';
import AuthLayout from '~/components/layout/AuthLayout';
import AdminLayout from '~/components/layout/AdminLayout/AdminLayout';
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
import DashboardAdmin from '~/pages/dashboardAdmin/dashboardAdmin';
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
function App() {
    const { accessToken, setAccessToken, setProducts } = useAppStore();

    // Setup axios interceptors
    useAxiosInterceptors(accessToken, setAccessToken);

    const { setPromotions } = useContext(AppContext);
    const { setCart, setTotalCartItem } = useContext(CartContext);
    const { setAddress } = useContext(AddressContext);
    const { setHistoryOrders } = useContext(OrderContext);

    // Fetch products on mount
    useEffect(() => {
        const fetchProducts = async () => {
            const result = await productApi.getAll();
            setProducts(result.data);
        };

        fetchProducts();
    }, [setProducts]);

    // Fetch promotions on mount
    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const response = await promotionApi.getAllPromotion();
                setPromotions(response.data);
            } catch (error) {
                toast.error('Không có chương trình khuyến mãi nào.', {
                    autoClose: 3000,
                });
            }
        };
        fetchPromotions();
    }, [setPromotions]);

    // Fetch carts on mount
    useEffect(() => {
        if (accessToken) {
            const fetchCart = async () => {
                const response = await cartAPI.getAllCartItem();
                setCart(response.data);
                setTotalCartItem(response.data.total_item);
            };
            fetchCart();
        }
    }, [setCart, setTotalCartItem, accessToken]);
    // Fetch address on mount
    useEffect(() => {
        if (accessToken) {
            const fetchAddress = async () => {
                const response = await addressApi.getCurrentShippingAddress();
                setAddress(response.data);
            };
            fetchAddress();
        }
    }, [setAddress, accessToken]);
    // Fetch orders on mount
    useEffect(() => {
        if (accessToken) {
            const fetchOrders = async () => {
                try {
                    const response = await orderApi.getHistoryOrderByFilter({
                        status: 'ORDER-PLACED',
                        orderDate: '',
                    });
                    setHistoryOrders(response.data);
                } catch (error) {
                    console.log('error', error);
                }
            };
            fetchOrders();
        }
    }, [setHistoryOrders, accessToken]);

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
                        <Route path={configs.roures.user.addAddress} element={<Address />} />
                    </Route>
                    <Route path="/" element={<AuthLayout />}>
                        <Route path={configs.roures.auth.signIn} element={<SignIn />} />
                        <Route path={configs.roures.auth.signUp} element={<SignUp />} />
                        <Route path={configs.roures.auth.forgetPassword} element={<Reset />} />
                        <Route path="change_password" element={<ChangePassword />} />
                    </Route>
                    <Route path="admin" element={<AdminLayout />}>
                        <Route path="dashboard" element={<DashboardAdmin />} />
                        <Route path="product" element={<ProductAdmin />} />
                        <Route path="chatbot" element={<ChatbotAdmin />} />
                        <Route path="chatbot/:id" element={<UpdateChatbotAdmin />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
            <Loading />
            <Overlay />
        </>
    );
}

export default App;
