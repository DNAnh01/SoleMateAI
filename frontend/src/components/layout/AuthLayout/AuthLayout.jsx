import { PageWrapper } from '~/styles/styles';
import Footer from '~/components/footer/Footer';
import AuthHeader from '~/components/header/AuthHeader';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <PageWrapper>
            <AuthHeader />
            <main>
                <Outlet />
            </main>
            <Footer />
        </PageWrapper>
    );
};

export default AuthLayout;
