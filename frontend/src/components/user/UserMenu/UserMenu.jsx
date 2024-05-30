import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Icons from '~/components/common/Icons/Icons';
import Title from '~/components/common/Title';
import configs from '~/configs';
import { OrderContext } from '~/contexts/order.context';
import useAppStore from '~/store';
import { breakpoints, defaultTheme } from '~/styles/themes/default';

const NavMenuWrapper = styled.nav`
    margin-top: 32px;

    .nav-menu-list {
        row-gap: 8px;

        @media (max-width: ${breakpoints.md}) {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
        }
    }

    .nav-menu-item {
        border-radius: 4px;

        @media (max-width: ${breakpoints.sm}) {
            flex: 1 1 0;
        }
    }

    .nav-menu-link {
        padding-left: 36px;
        width: 100%;
        height: 40px;
        column-gap: 12px;
        border: 1px solid transparent;

        &:hover {
            background-color: ${defaultTheme.color_yellow_green};
        }

        .nav-link-text {
            color: ${defaultTheme.color_gray};

            &.active {
                color: ${defaultTheme.color_white};
            }
        }

        &.active {
            border-left: 4px solid ${defaultTheme.color_purple};
            background-color: ${defaultTheme.color_yellow_green};
            color: ${defaultTheme.color_white};

            @media (max-width: ${breakpoints.md}) {
                border-bottom: 2px solid ${defaultTheme.color_gray};
                border-left: 0;
                background-color: transparent;
            }
        }

        @media (max-width: ${breakpoints.md}) {
            padding-left: 16px;
            padding-right: 16px;
        }

        @media (max-width: ${breakpoints.sm}) {
            padding-left: 8px;
            padding-right: 8px;
            column-gap: 8px;
        }
    }
`;

const UserMenu = () => {
    const { profile } = useAppStore();
    const { historyOrders } = useContext(OrderContext);

    const location = useLocation();
    return (
        <div>
            <Title titleText={profile.display_name} />
            <NavMenuWrapper>
                <ul className="nav-menu-list grid">
                    <li className="nav-menu-item">
                        <Link
                            to={historyOrders.length === 0 ? configs.roures.user.emptyOrder : configs.roures.user.order}
                            className={`nav-menu-link flex items-center ${
                                location.pathname === configs.roures.user.order ||
                                location.pathname === configs.roures.user.orderDetail
                                    ? 'active'
                                    : ''
                            }`}
                        >
                            <span className="nav-link-icon flex items-center justify-center">
                                <Icons
                                    className=""
                                    icon="cart"
                                    width={20}
                                    height={20}
                                    color={
                                        location.pathname === configs.roures.user.order ||
                                        location.pathname === configs.roures.user.orderDetail
                                            ? defaultTheme.color_white
                                            : defaultTheme.color_gray
                                    }
                                />
                            </span>
                            <span
                                className={`text-base font-semibold nav-link-text no-wrap ${
                                    location.pathname === configs.roures.user.order ||
                                    location.pathname === configs.roures.user.orderDetail
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                Các đơn hàng
                            </span>
                        </Link>
                    </li>
                    <li className="nav-menu-item">
                        <Link
                            to={configs.roures.user.profile}
                            className={`nav-menu-link flex items-center ${
                                location.pathname === `${configs.roures.user.profile}` ||
                                location.pathname === `${configs.roures.user.addAddress}`
                                    ? 'active'
                                    : ''
                            }`}
                        >
                            <span className="nav-link-icon flex items-center justify-center">
                                <Icons
                                    className=""
                                    icon="user"
                                    width={20}
                                    height={20}
                                    color={
                                        location.pathname === `${configs.roures.user.profile}` ||
                                        location.pathname === `${configs.roures.user.addAddress}`
                                            ? defaultTheme.color_white
                                            : defaultTheme.color_gray
                                    }
                                />
                            </span>
                            <span
                                className={`text-base font-semibold nav-link-text no-wrap ${
                                    location.pathname === `${configs.roures.user.profile}` ||
                                    location.pathname === `${configs.roures.user.addAddress}`
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                Tài khoản của tôi
                            </span>
                        </Link>
                    </li>
                </ul>
            </NavMenuWrapper>
        </div>
    );
};

export default UserMenu;
