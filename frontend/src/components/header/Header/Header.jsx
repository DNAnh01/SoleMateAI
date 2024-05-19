import styled from 'styled-components';
import { HeaderMainWrapper, SiteBrandWrapper } from '~/styles/header';
import { Container } from '~/styles/styles';
import { Link, useLocation } from 'react-router-dom';
import { Input, InputGroupWrapper } from '~/styles/form';
import { breakpoints, defaultTheme } from '~/styles/themes/default';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '~/redux/slices/sidebarSlice';
import Icons from '~/components/common/Icons/Icons';
import images from '~/assets/images';

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
`;

const Header = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    return (
        <HeaderMainWrapper className="header flex items-center">
            <Container className="container">
                <div className="header-wrap flex items-center justify-between">
                    <div className="flex items-center">
                        <button type="button" className="sidebar-toggler" onClick={() => dispatch(toggleSidebar())}>
                            <Icons icon='list' width={20} height={20} className={"icon-hover"} color={defaultTheme.color_dim_gray} />
                        </button>
                        <SiteBrandWrapper to="/" className="inline-flex">
                            <div className="brand-img-wrap flex items-center justify-center">
                                <img src={images.logo} alt="" className='site-brand-img' />
                            </div>
                            <span className="site-brand-text text-outerspace">Sole Mate AI</span>
                        </SiteBrandWrapper>
                    </div>
                    <NavigationAndSearchWrapper className="flex items-center">
                        <form className="search-form">
                            <InputGroupWrapper className="input-group">
                                <span className="input-icon flex items-center justify-center text-xl text-gray">
                                    <Icons icon='search' width={20} height={20} className={"icon-hover"} color={defaultTheme.color_dim_gray} />
                                </span>
                                <Input type="text" className="input-control w-full" placeholder="Tìm kiếm sản phẩm" />
                            </InputGroupWrapper>
                        </form>
                    </NavigationAndSearchWrapper>

                    <IconLinksWrapper className="flex items-center">
                        <Link
                            to="/account"
                            className={`icon-link ${location.pathname === '/account' || location.pathname === '/account/add' ? 'active' : ''
                                } inline-flex items-center justify-center`}
                        >
                            <Icons icon='user' width={20} height={20} className={"icon-hover"} color={defaultTheme.color_dim_gray} />
                        </Link>
                        <Link
                            to="/cart"
                            className={`icon-link ${location.pathname === '/cart' ? 'active' : ''
                                } inline-flex items-center justify-center`}
                        >
                            <Icons icon='cart' width={20} height={20} className={"icon-hover"} color={defaultTheme.color_dim_gray} />
                        </Link>
                    </IconLinksWrapper>
                </div>
            </Container>
        </HeaderMainWrapper>
    );
};

export default Header;
