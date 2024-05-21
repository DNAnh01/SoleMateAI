import { PageWrapper } from '~/styles/styles';
import Footer from '~/components/footer/Footer';
import AuthHeader from '~/components/header/AuthHeader';
import { Outlet } from 'react-router-dom';
import Toast from '~/components/common/Toast';

const AuthLayout = () => {
    return (
        <PageWrapper>
            <Toast />
            <AuthHeader />
            <main>
                <Outlet />
            </main>
            <Footer />
        </PageWrapper>
    );
};

export default AuthLayout;
