import styled from 'styled-components';
import { HeaderMainWrapper, SiteBrandWrapper } from '~/styles/header';
import { Container } from '~/styles/styles';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { breakpoints, defaultTheme } from '~/styles/themes/default';
import Icons from '~/components/common/Icons/Icons';
import images from '~/assets/images';
import configs from '~/configs';
import Image from '~/components/common/Image';
import { BaseLinkGreen, BaseLinkOutlineDark } from '~/styles/button';
import Tippy from '@tippyjs/react';
import authApi from '~/apis/auth.api';
import { toast } from 'react-toastify';
import Search from '~/components/header/Search';
import useAppStore from '~/store';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '~/contexts/cart.context';
import cartAPI from '~/apis/cart.api';

const IconLinksWrapper = styled.div`
    column-gap: 18px;
    .icon-link {
        width: 36px;
        height: 36px;
        border-radius: 6px;
        position: relative;

        &.active {
            background-color: ${defaultTheme.color_yellow_green};
            img {
                filter: brightness(100);
            }
        }

        &:hover {
            background-color: ${defaultTheme.color_whitesmoke};
        }
    }

    @media (max-width: ${breakpoints.xl}) {
        column-gap: 8px;
    }

    @media (max-width: ${breakpoints.xl}) {
        column-gap: 6px;
    }

    .user-avatar {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
        cursor: pointer;
    }
`;

const ActionGroupWrapper = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: space-between;
    @media (max-width: ${breakpoints.sm}) {
        button,
        a {
            min-width: 100px;
        }
    }
`;

const CustomTippyBox = styled.div`
    .tippy-box {
        border-radius: 8px;
        font-weight: 600;
        font-size: 16px;
        line-height: 2.2rem;
        background-color: ${defaultTheme.color_gray};
        margin-top: -5px;

        .tippy-arrow {
            color: ${defaultTheme.color_gray};
        }

        .tippy-content {
            padding: 0;
        }

        .tippy-box[data-placement^='bottom'] > .tippy-arrow:before {
            top: -7px;
        }
    }
`;

const MenuTippyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 16px;

    .tippy-item {
        width: 100%;
        padding: 8px 9px;
        cursor: pointer;
        user-select: none;
        transition: background-color 0.3s, color 0.3s;
        &:hover {
            border-radius: 8px;
            background-color: ${defaultTheme.color_yellow_green};
            color: ${defaultTheme.color_white};
        }
    }
`;

const CartBadge = styled.div`
    position: absolute;
    top: -5px;
    right: -5px;
    width: 20px;
    height: 20px;
    background-color: ${defaultTheme.color_red};
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
`;

const Header = () => {
    const { setCart, totalCartItem, setTotalCartItem } = useContext(CartContext);
    const {
        clearLocalStorage,
        setIsAuthenticated,
        isSidebarOpen,
        setIsSidebarOpen,
        profile,
        isAuthenticated,
        accessToken,
        setIsLoadingAPI,
    } = useAppStore();
    const location = useLocation();
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState('signIn');

    useEffect(() => {
        if (accessToken) {
            const fetchAllCartItem = async () => {
                try {
                    setIsLoadingAPI(true);
                    const res = await cartAPI.getAllCartItem();
                    if (res.status === 200) {
                        setCart(res.data);
                        setTotalCartItem(res.data.total_item);
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setIsLoadingAPI(false);
                }
            };
            fetchAllCartItem();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setCart]);

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    const handleSignOut = async () => {
        try {
            const res = await authApi.signOut();
            if (res.status === 200) {
                setIsAuthenticated(false);
                clearLocalStorage();
                toast.success('Đăng xuất thành công', {
                    autoClose: 3000,
                });
                navigate(configs.roures.auth.signIn);
            } else if (res.status === 404) {
                toast.error('Người dùng chưa đăng nhập', {
                    autoClose: 3000,
                });
            }
        } catch (error) {
            toast.error('Đã xãy ra lỗi', {
                autoClose: 3000,
            });
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <HeaderMainWrapper className="header flex items-center">
            <Container className="container">
                <div className="header-wrap flex items-center justify-between">
                    <div className="flex items-center">
                        <button type="button" onClick={toggleSidebar}>
                            <div className={`icon-list ${isSidebarOpen ? 'active' : ''}`}>
                                <Icons
                                    icon="list"
                                    className="inline-flex items-center justify-center icon-default"
                                    color={defaultTheme.color_dim_gray}
                                />
                            </div>
                        </button>

                        <SiteBrandWrapper to={configs.roures.home} className="inline-flex">
                            <div className="brand-img-wrap flex items-center justify-center">
                                <img src={images.logo} alt="" className="site-brand-img" />
                            </div>
                            <span className="site-brand-text text-outerspace name-project">Sole Mate AI</span>
                        </SiteBrandWrapper>
                    </div>
                    <Search />
                    <IconLinksWrapper>
                        {isAuthenticated ? (
                            <ActionGroupWrapper>
                                {profile.role_name === 'user' && (
                                    <Link
                                        to={
                                            totalCartItem === 0
                                                ? configs.roures.user.emptyCart
                                                : configs.roures.user.cart
                                        }
                                        className={`icon-link ${
                                            location.pathname === configs.roures.user.cart ? 'active' : ''
                                        } inline-flex items-center justify-center`}
                                    >
                                        <Icons
                                            icon="cart"
                                            className={'icon-default'}
                                            color={defaultTheme.color_dim_gray}
                                        />
                                        <CartBadge>{totalCartItem}</CartBadge>
                                    </Link>
                                )}
                                <CustomTippyBox>
                                    <Tippy
                                        delay={[0, 40]}
                                        placement="bottom"
                                        interactive={true}
                                        content={
                                            <MenuTippyWrapper>
                                                {profile.role_name === 'user' && (
                                                    <Link to={configs.roures.user.profile} className="tippy-item">
                                                        Cá nhân
                                                    </Link>
                                                )}
                                                <div className="tippy-item" onClick={handleSignOut}>
                                                    Đăng xuất
                                                </div>
                                                {profile.role_name === 'admin' && (
                                                    <Link to={'/admin/dashboard'} className="tippy-item">
                                                        Trang quản lý
                                                    </Link>
                                                )}
                                            </MenuTippyWrapper>
                                        }
                                    >
                                        <Image
                                            className="user-avatar"
                                            src={profile?.avatar_url}
                                            alt={profile?.display_name}
                                        />
                                    </Tippy>
                                </CustomTippyBox>
                            </ActionGroupWrapper>
                        ) : (
                            <ActionGroupWrapper>
                                {activeButton === 'signIn' ? (
                                    <BaseLinkGreen
                                        to={configs.roures.auth.signIn}
                                        onClick={() => handleButtonClick('signIn')}
                                    >
                                        Đăng nhập
                                    </BaseLinkGreen>
                                ) : (
                                    <BaseLinkOutlineDark
                                        to={configs.roures.auth.signIn}
                                        onClick={() => handleButtonClick('signIn')}
                                    >
                                        Đăng nhập
                                    </BaseLinkOutlineDark>
                                )}
                                {activeButton === 'signUp' ? (
                                    <BaseLinkGreen
                                        to={configs.roures.auth.signUp}
                                        onClick={() => handleButtonClick('signUp')}
                                    >
                                        Đăng ký
                                    </BaseLinkGreen>
                                ) : (
                                    <BaseLinkOutlineDark
                                        to={configs.roures.auth.signUp}
                                        onClick={() => handleButtonClick('signUp')}
                                    >
                                        Đăng ký
                                    </BaseLinkOutlineDark>
                                )}
                            </ActionGroupWrapper>
                        )}
                    </IconLinksWrapper>
                </div>
            </Container>
        </HeaderMainWrapper>
    );
};

export default Header;
