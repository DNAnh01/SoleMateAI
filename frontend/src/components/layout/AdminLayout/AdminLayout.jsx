import { Outlet } from 'react-router-dom';
import HeaderAdmin from '~/components/headerAdmin/headerAdmin';
import SideBarAdmin from '~/components/sideBarAdmin/sideBarAdmin';
// import Chatbot from '~/components/Chatbot';
import '../../../index.css';
import styled from 'styled-components';
import { DashboardProvider } from '~/contexts/dashboard.context';
import useFetchData from '~/hooks/useFetchData';
import brandAPI from '~/apis/brand.api';
import useAppStore from '~/store';
import { useEffect } from 'react';
import colorApi from '~/apis/colors.api';

export const Wrapper = styled.div`
    height: 100vh;
    overflow: hidden;
    display: flex;
`;

export const MainContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

export const PageContainer = styled.div`
    flex: 1;
    padding-left: 6px;
    padding-top: 4px;
    overflow: hidden;
    display: flex;
    background-color: rgb(226 232 240);
`;

const AdminLayout = () => {
    const { setBrands, setColors } = useAppStore();
    const { data: brands } = useFetchData(brandAPI.getAll);
    const { data: colors } = useFetchData(colorApi.getAll);

    useEffect(() => {
        if (brands) {
            const formatedBrands = brands.map((item) => ({
                value: item.brand_name,
                id: item.id,
                label: item.brand_name,
                isActive: item.is_active,
                logo: item.brand_logo,
            }));
            setBrands(formatedBrands);
        }
        if (colors) {
            const formatedColors = colors.map((item) => ({
                value: item.color_name,
                id: item.id,
                label: item.color_name,
                isActive: item.is_active,
                hex_value: item.hex_value,
            }));
            setColors(formatedColors);
        }
    }, [brands, setBrands, colors, setColors]);

    return (
        <Wrapper>
            <SideBarAdmin />
            <DashboardProvider>
                <MainContainer>
                    <HeaderAdmin />
                    <PageContainer>
                        <div className="mx-1/2 my-1/2 overflow-y-auto bg-white flex-1">
                            <Outlet />
                        </div>
                    </PageContainer>
                </MainContainer>
            </DashboardProvider>
        </Wrapper>
    );
};

export default AdminLayout;
