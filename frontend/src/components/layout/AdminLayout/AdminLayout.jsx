import { Outlet } from 'react-router-dom';
import HeaderAdmin from '~/components/headerAdmin/headerAdmin';
import { MainContainer, PageContainer, Wrapper } from './AdminLayout.style';
import SideBarAdmin from '~/components/sideBarAdmin/sideBarAdmin';

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
        </Wrapper>
    );
};

export default AdminLayout;