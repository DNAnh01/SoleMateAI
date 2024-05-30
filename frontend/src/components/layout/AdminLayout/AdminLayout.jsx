import { Outlet } from 'react-router-dom';
import HeaderAdmin from '~/components/headerAdmin/headerAdmin';
import { MainContainer, PageContainer, Wrapper } from './AdminLayout.style';
import SideBarAdmin from '~/components/sideBarAdmin/sideBarAdmin';
// import Chatbot from '~/components/Chatbot';
import '../../../index.css';

const AdminLayout = () => {
    return (
        <Wrapper>
            <SideBarAdmin />
            <MainContainer>
                <HeaderAdmin />
                <PageContainer>
                    <div className="mx-4 my-2 overflow-y-auto bg-white flex-1">
                        <Outlet />
                    </div>
                </PageContainer>
            </MainContainer>
            {/*<Chatbot />*/}
        </Wrapper>
    );
};

export default AdminLayout;
