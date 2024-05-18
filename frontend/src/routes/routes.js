import AuthLayout from '~/components/layout/AuthLayout';
import BaseLayout from '~/components/layout/BaseLayout';
import configs from '~/configs';
import ChangePasswordPage from '~/pages/auth/ChangePasswordPage';
import CheckMailPage from '~/pages/auth/CheckMailPage';
import ResetPage from '~/pages/auth/ResetPage';
import SignInPage from '~/pages/auth/SignInPage';
import SignUpPage from '~/pages/auth/SignUpPage';
import VerificationPage from '~/pages/auth/VerificationPage';
import CartEmptyPage from '~/pages/cart/CartEmptyPage';
import CartPage from '~/pages/cart/CartPage';
import CheckoutPage from '~/pages/checkout/CheckoutPage';
import NotFoundPage from '~/pages/error/NotFoundPage';
import HomePage from '~/pages/home/HomePage';
import ProductDetailsPage from '~/pages/product/ProductDetailsPage';
import ProductListPage from '~/pages/product/ProductListPage';
import AccountPage from '~/pages/user/AccountPage';
import AddressPage from '~/pages/user/AddressPage';
import ConfirmPage from '~/pages/user/ConfirmPage';
import OrderDetailPage from '~/pages/user/OrderDetailPage';
import OrderListPage from '~/pages/user/OrderListPage';

// public routers
const publicRoutes = [
    // main pages
    { path: configs.roures.home, component: HomePage, layout: BaseLayout },
    { path: configs.roures.productList, component: ProductListPage, layout: BaseLayout },
    { path: configs.roures.productDetail, component: ProductDetailsPage, layout: BaseLayout },
    { path: configs.roures.user.cart, component: CartPage, layout: BaseLayout },
    { path: configs.roures.user.emptyCart, component: CartEmptyPage, layout: BaseLayout },
    { path: configs.roures.user.checkout, component: CheckoutPage, layout: BaseLayout },
    { path: configs.roures.user.order, component: OrderListPage, layout: BaseLayout },
    { path: configs.roures.user.orderDetail, component: OrderDetailPage, layout: BaseLayout },
    { path: configs.roures.user.confirm, component: ConfirmPage, layout: BaseLayout },
    { path: configs.roures.user.profile, component: AccountPage, layout: BaseLayout },
    { path: configs.roures.user.addAddress, component: AddressPage, layout: BaseLayout },
    // auth pages
    { path: configs.roures.auth.signIn, component: SignInPage, layout: AuthLayout },
    { path: configs.roures.auth.signUp, component: SignUpPage, layout: AuthLayout },
    { path: configs.roures.auth.resetPassword, component: ResetPage, layout: AuthLayout },
    { path: configs.roures.auth.changePassword, component: ChangePasswordPage, layout: AuthLayout },
    { path: configs.roures.auth.checkMail, component: CheckMailPage, layout: AuthLayout },
    { path: configs.roures.auth.verification, component: VerificationPage, layout: AuthLayout },
    // 404 page
    { path: configs.roures.notFound, component: NotFoundPage, layout: null },
];
//  private routers

const privateRoutes = [];

export { publicRoutes, privateRoutes };
