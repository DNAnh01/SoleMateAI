import { PageWrapper } from '~/styles/styles';
import Header from '~/components/header/Header';
import Footer from '~/components/footer/Footer';
import Sidebar from '~/components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Toast from '~/components/common/Toast';
import Chatbot from '~/components/Chatbot';

const BaseLayout = () => {
    return (
        <PageWrapper>
            <Toast />
            <Header />
            <Sidebar />
            <div
                style={{
                    minHeight: 'calc(100vh - 545px)',
                }}
            >
                <Outlet />
            </div>
            <Chatbot />
            <Footer />
        </PageWrapper>
    );
};

export default BaseLayout;
