// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Fragment } from 'react';
// import { publicRoutes } from '~/routes';
// import GlobalStyles from './styles/global/GlobalStyles';

// function App() {
//     return (
//         <Router>
//             <GlobalStyles />
//             <div className="App">
//                 <Routes>
//                     {publicRoutes.map((route, index) => {
//                         const Page = route.component;
//                         let Layout = Fragment;
//                         if (route.layout) {
//                             Layout = route.layout;
//                         }

//                         return (
//                             <Route
//                                 key={index}
//                                 path={route.path}
//                                 element={
//                                     <Layout>
//                                         <Page />
//                                     </Layout>
//                                 }
//                             />
//                         );
//                     })}
//                 </Routes>
//             </div>
//         </Router>
//     );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '~/pages/home/HomePage';
// layouts
import BaseLayout from '~/components/layout/BaseLayout';
import AuthLayout from '~/components/layout/AuthLayout';
import GlobalStyles from '~/styles/global/GlobalStyles';
// auth pages
import SignIn from '~/pages/auth/SignInPage';
import SignUp from '~/pages/auth/SignUpPage';
import Reset from '~/pages/auth/ResetPage';
import ChangePassword from '~/pages/auth/ChangePasswordPage';
import NotFound from '~/pages/error/NotFoundPage';
import ProductList from '~/pages/product/ProductListPage';
import ProductDetails from '~/pages/product/ProductDetailsPage';
import Cart from '~/pages/cart/CartPage';
import CartEmpty from '~/pages/cart/CartEmptyPage';
import Checkout from '~/pages/checkout/CheckoutPage';
import Order from '~/pages/user/OrderListPage';
import OrderDetail from '~/pages/user/OrderDetailPage';
import Confirm from '~/pages/user/ConfirmPage';
import Account from '~/pages/user/AccountPage';
import Address from '~/pages/user/AddressPage';
import configs from './configs';
import { useContext, useEffect } from 'react';
import { AppContext } from './contexts/app.context';
import { LocalStorageEventTarget } from './utils/auth';
import AdminLayout from './components/layout/AdminLayout/AdminLayout';
import DashboardAdmin from './pages/dashboardAdmin/dashboardAdmin';
import ProductAdmin from './pages/productAdmin/productAdmin';
import './index.css';
import productApi from './apis/product.api';

function App() {
    const { reset, setProducts } = useContext(AppContext);
    useEffect(() => {
        LocalStorageEventTarget.addEventListener('clearLocalStorage', reset);
        return () => {
            LocalStorageEventTarget.removeEventListener('clearLocalStorage', reset);
        };
    }, [reset]);
    useEffect(() => {
        const fetchProducts = async () => {
            const result = await productApi.getAll();
            setProducts(result.data);
        };

        fetchProducts();
    }, []);

    return (
        <>
            <Router>
                <GlobalStyles />
                <Routes>
                    {/* main screens */}
                    <Route path="/" element={<BaseLayout />}>
                        <Route index element={<Home />} />
                        <Route path={configs.roures.productList} element={<ProductList />} />
                        <Route path="/product/details" element={<ProductDetails />} />
                        <Route path={configs.roures.user.cart} element={<Cart />} />
                        <Route path="/empty_cart" element={<CartEmpty />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/order" element={<Order />} />
                        <Route path="/order_detail" element={<OrderDetail />} />
                        <Route path="/confirm" element={<Confirm />} />
                        <Route path={configs.roures.user.profile} element={<Account />} />
                        <Route path={configs.roures.user.addAddress} element={<Address />} />
                    </Route>
                    {/* auth screens */}
                    <Route path="/" element={<AuthLayout />}>
                        <Route path={configs.roures.auth.signIn} element={<SignIn />} />
                        <Route path={configs.roures.auth.signUp} element={<SignUp />} />
                        <Route path={configs.roures.auth.forgetPassword} element={<Reset />} />
                        <Route path="change_password" element={<ChangePassword />} />
                    </Route>
                    <Route path="admin" element={<AdminLayout />}>
                        <Route path="dashboard" element={<DashboardAdmin />} />
                        <Route path="product" element={<ProductAdmin />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
