import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { SiteBrandWrapper } from '~/styles/header';
import { staticImages } from '~/utils/images';
import { breakpoints, defaultTheme } from '~/styles/themes/default';
import configs from '~/configs';
import useAppStore from '~/store';
import { useContext } from 'react';
import { CartContext } from '~/contexts/cart.context';

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
            transform: scale(1);
            &:hover {
                background: ${defaultTheme.color_yellow_green};
                transform: scale(1.05);

                a {
                    span {
                        color: ${defaultTheme.color_white};
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
    // {
    //     id: 'side-menu-4',
    //     menuLink: configs.roures.user.profile,
    //     menuText: 'Tài khoản',
    //     iconName: 'person-fill',
    // },
];

const Sidebar = () => {
    const location = useLocation();
    const { isSidebarOpen, setIsSidebarOpen, accessToken, profile } = useAppStore();
    const { totalCartItem } = useContext(CartContext);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
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
                    {/* Conditional rendering based on accessToken */}
                    {accessToken && profile.role_name !== 'admin' && (
                        <li>
                            <Link
                                to={configs.roures.user.profile}
                                className={`flex items-center text-gray ${
                                    location.pathname === configs.roures.user.profile ? 'active' : ''
                                }`}
                            >
                                <span className="text-xxl">
                                    <i className={`bi bi-bag-check-fill`}></i>
                                </span>
                                <span className="text-lg font-medium">Tài khoản</span>
                            </Link>
                        </li>
                    )}
                    {/* Conditional rendering based on totalCartItem */}

                    {accessToken && profile.role_name !== 'admin' && (
                        <li>
                            <Link
                                to={totalCartItem === 0 ? configs.roures.user.emptyCart : configs.roures.user.cart}
                                className={`flex items-center text-gray ${
                                    location.pathname === configs.roures.user.cart ? 'active' : ''
                                }`}
                            >
                                <span className="text-xxl">
                                    <i className={`bi bi-bag-check-fill`}></i>
                                </span>
                                <span className="text-lg font-medium">Giỏ hàng</span>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </SideNavigationWrapper>
    );
};

export default Sidebar;
