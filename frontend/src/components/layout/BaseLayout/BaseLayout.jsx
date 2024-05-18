import { PageWrapper } from '~/styles/styles';
import Header from '~/components/header/Header';
import Footer from '~/components/footer/Footer';
import Sidebar from '~/components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const BaseLayout = () => {
    return (
        <PageWrapper>
            <Header />
            <Sidebar />
            <div
                style={{
                    minHeight: 'calc(100vh - 545px)',
                }}
            >
                <Outlet />
            </div>
            <Footer />
        </PageWrapper>
    );
};

export default BaseLayout;
