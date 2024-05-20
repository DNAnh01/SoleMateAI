import styled from 'styled-components';
import { HeaderMainWrapper, SiteBrandWrapper } from '~/styles/header';
import { Container } from '~/styles/styles';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input, InputGroupWrapper } from '~/styles/form';
import { breakpoints, defaultTheme } from '~/styles/themes/default';
import Icons from '~/components/common/Icons/Icons';
import images from '~/assets/images';
import configs from '~/configs';
import { useContext, useState } from 'react';
import { AppContext } from '~/contexts/app.context';
import Image from '~/components/common/Image';
import { BaseLinkGreen, BaseLinkOutlineDark } from '~/styles/button';
import Tippy from '@tippyjs/react';
import authApi from '~/apis/auth.api';
import { clearLocalStorage, getAccessTokenFromLocalStorage } from '~/utils/auth';
import { toast } from 'react-toastify';

const NavigationAndSearchWrapper = styled.div`
    column-gap: 20px;
    .search-form {
        @media (max-width: ${breakpoints.lg}) {
            width: 100%;
            max-width: 500px;
        }
        @media (max-width: ${breakpoints.sm}) {
            display: none;
        }
    }
    .ml-3 {
        margin-left: 0.75rem;
    }

    .input-group {
        min-width: 500px;

        .input-control {
            @media (max-width: ${breakpoints.sm}) {
                display: none;
            }
        }

        @media (max-width: ${breakpoints.xl}) {
            min-width: 160px;
        }

        @media (max-width: ${breakpoints.sm}) {
            min-width: auto;
            grid-template-columns: 100%;
        }
    }

    @media (max-width: ${breakpoints.lg}) {
        width: 100%;
        justify-content: flex-end;
    }
`;

const IconLinksWrapper = styled.div`
    column-gap: 18px;
    .icon-link {
        width: 36px;
        height: 36px;
        border-radius: 6px;

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

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isSidebarOpen, toggleSidebar, profile, setIsAuthenticated } = useContext(AppContext);
    const [activeButton, setActiveButton] = useState('signIn');
    const handleButtonClick = (button) => {
        setActiveButton(button);
    };
    const handleSignOut = async () => {
        try {
            const res = await authApi.signOut();
            if (res.status === 200) {
                clearLocalStorage();
                setIsAuthenticated(false);
                toast.success('Đăng xuất thành công', {
                    autoClose: 3000,
                });
                navigate(configs.roures.auth.signIn);
            }
            if (res.status === 404) {
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

    return (
        <HeaderMainWrapper className="header flex items-center">
            <Container className="container">
                <div className="header-wrap flex items-center justify-between">
                    <div className="flex items-center">
                        <button type="button" onClick={toggleSidebar}>
                            <Icons
                                icon="list"
                                className={`ml-3 icon-link inline-flex items-center justify-center icon-default ${
                                    isSidebarOpen ? 'active' : ''
                                }`}
                                color={defaultTheme.color_dim_gray}
                            />
                        </button>
                        <SiteBrandWrapper to={configs.roures.home} className="inline-flex">
                            <div className="brand-img-wrap flex items-center justify-center">
                                <img src={images.logo} alt="" className="site-brand-img" />
                            </div>
                            <span className="site-brand-text text-outerspace name-project">Sole Mate AI</span>
                        </SiteBrandWrapper>
                    </div>
                    <NavigationAndSearchWrapper className="flex items-center">
                        <form className="search-form">
                            <InputGroupWrapper className="input-group">
                                <span className="input-icon flex items-center justify-center text-xl text-gray">
                                    <Icons
                                        icon="search"
                                        className={'icon-default'}
                                        color={defaultTheme.color_dim_gray}
                                    />
                                </span>
                                <Input type="text" className="input-control w-full" placeholder="Tìm kiếm sản phẩm" />
                            </InputGroupWrapper>
                        </form>
                    </NavigationAndSearchWrapper>
                    <IconLinksWrapper>
                        {profile ? (
                            <ActionGroupWrapper>
                                <Link
                                    to={configs.roures.user.cart}
                                    className={`icon-link ${
                                        location.pathname === configs.roures.user.cart ? 'active' : ''
                                    } inline-flex items-center justify-center`}
                                >
                                    <Icons icon="cart" className={'icon-default'} color={defaultTheme.color_dim_gray} />
                                </Link>
                                <CustomTippyBox>
                                    <Tippy
                                        delay={[0, 40]}
                                        placement="bottom"
                                        interactive={true}
                                        content={
                                            <MenuTippyWrapper>
                                                <Link to={configs.roures.user.profile} className="tippy-item">
                                                    Cá nhân
                                                </Link>
                                                <div className="tippy-item" onClick={handleSignOut}>
                                                    Đăng xuất
                                                </div>
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
