import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { SiteBrandWrapper } from '~/styles/header';
import { staticImages } from '~/utils/images';
import { breakpoints, defaultTheme } from '~/styles/themes/default';
import { useContext } from 'react';
import { AppContext } from '~/contexts/app.context';
import configs from '~/configs';

const SideNavigationWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 280px;
    margin-top: 100px;
    z-index: 999;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
    padding: 16px;
    transform: translateX(-100%);
    transition: ${defaultTheme.default_transition};

    &.show {
        transform: translateX(0);
    }

    .sidebar-close-btn {
        position: absolute;
        right: 16px;
        top: 16px;
        &:hover {
            color: ${defaultTheme.color_yellow_green};
        }
    }

    .sidenav-search-form {
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        margin-top: 20px;

        .input-group {
            min-width: 100%;
            column-gap: 0;
        }
    }

    .sidenav-menu-list {
        gap: 14px;
        margin: 20px 0;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        padding: 24px 0;

        li {
            padding: 5px 5px 5px 12px;
            border-radius: 4px;
            transition: ${defaultTheme.default_transition};

            &:hover {
                background: rgba(0, 0, 0, 0.05);

                a {
                    span {
                        color: ${defaultTheme.color_yellow_green};
                    }
                }
            }
        }

        a {
            column-gap: 16px;
            &.active {
                color: ${defaultTheme.color_yellow_green};
            }
        }
    }

    @media (max-width: ${breakpoints.xs}) {
        width: 100%;
    }
`;
const sideMenuData = [
    {
        id: 'side-menu-1',
        menuLink: configs.roures.home,
        menuText: 'Trang chủ',
        iconName: 'house',
    },
    {
        id: 'side-menu-2',
        menuLink: configs.roures.productList,
        menuText: 'Sản phẩm',
        iconName: 'grid-fill',
    },
    {
        id: 'side-menu-4',
        menuLink: '/account',
        menuText: 'Tài khoản',
        iconName: 'person-fill',
    },
    {
        id: 'side-menu-5',
        menuLink: '/cart',
        menuText: 'Giỏ hàng',
        iconName: 'bag-check-fill',
    },
];

const Sidebar = () => {
    const location = useLocation();
    // const isSidebarOpen = useSelector(selectIsSidebarOpen);
    // const dispatch = useDispatch();

    const { isSidebarOpen, toggleSidebar } = useContext(AppContext);

    return (
        <SideNavigationWrapper className={`bg-white h-full ${isSidebarOpen ? 'show' : ''}`}>
            <button className="sidebar-close-btn text-3xl" onClick={toggleSidebar}>
                <i className="bi bi-x-square"></i>
            </button>
            <div className="sidenav-head">
                <SiteBrandWrapper to="/" className="inline-flex">
                    <div className="brand-img-wrap flex items-center justify-center">
                        <img className="site-brand-img" src={staticImages.logo} alt="" />
                    </div>
                    <span className="site-brand-text text-outerspace">Sole Mate AI</span>
                </SiteBrandWrapper>
                <ul className="sidenav-menu-list grid">
                    {sideMenuData?.map((menu) => (
                        <li key={menu.id}>
                            <Link
                                to={menu.menuLink}
                                className={`flex items-center text-gray ${
                                    location.pathname === menu.menuLink ? 'active' : ''
                                }`}
                            >
                                <span className="text-xxl">
                                    <i className={`bi bi-${menu.iconName}`}></i>
                                </span>
                                <span className="text-lg font-medium">{menu.menuText}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </SideNavigationWrapper>
    );
};

export default Sidebar;