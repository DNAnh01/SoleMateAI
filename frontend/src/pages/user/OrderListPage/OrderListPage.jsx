import styled from 'styled-components';
import { Container } from '~/styles/styles';
import Breadcrumb from '~/components/common/Breadcrumb';
import { UserContent, UserDashboardWrapper } from '~/styles/user';
import UserMenu from '~/components/user/UserMenu';
import Title from '~/components/common/Title';
import { breakpoints, defaultTheme } from '~/styles/themes/default';
import OrderItemList from '~/components/user/OrderItemList';
import configs from '~/configs';
import { useContext, useEffect, useState } from 'react';
import { OrderContext } from '~/contexts/order.context';
import orderApi from '~/apis/order.api';
import { toast } from 'react-toastify';
import useAppStore from '~/store';

const OrderListPageWrapper = styled.div`
    .order-tabs-contents {
        margin-top: 40px;
    }
    .order-tabs-head {
        min-width: 170px;
        padding: 12px 0;
        border-bottom: 3px solid ${defaultTheme.color_whitesmoke};

        &.order-tabs-head-active {
            border-bottom-color: ${defaultTheme.color_yellow_green};
        }

        @media (max-width: ${breakpoints.lg}) {
            min-width: 120px;
        }

        @media (max-width: ${breakpoints.xs}) {
            min-width: 80px;
        }
    }
`;

const breadcrumbItems = [
    { label: 'Home', link: configs.roures.home },
    { label: 'Order', link: configs.roures.user.order },
];

const OrderListPage = () => {
    const { setIsLoadingAPI } = useAppStore();
    const { historyOrders, setHistoryOrders, historyOrdersByFilter, setHistoryOrdersByFilter } =
        useContext(OrderContext);

    const [activeTab, setActiveTab] = useState('ALL');

    const fetchOrders = async (status) => {
        if (status !== 'ALL') {
            try {
                setIsLoadingAPI(true);
                const response = await orderApi.getHistoryOrderByFilter({
                    status,
                    orderDate: '',
                });
                if (response.status === 200) {
                    setHistoryOrdersByFilter(response.data);
                } else {
                    toast.error('Bạn chưa có đơn hàng nào.', {
                        autoClose: 3000,
                    });
                }
            } catch (error) {
                toast.error('Bạn chưa có đơn hàng nào.', {
                    autoClose: 3000,
                });
            } finally {
                setIsLoadingAPI(false);
            }
        }
        try {
            setIsLoadingAPI(true);
            const response = await orderApi.getHistoryOrder();
            setHistoryOrders(response.data);
        } catch (error) {
            toast.error('Bạn chưa có đơn hàng nào.', {
                autoClose: 3000,
            });
        } finally {
            setIsLoadingAPI(false);
        }
    };

    useEffect(() => {
        fetchOrders(activeTab);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    const handleTabClick = (status) => {
        setActiveTab(status);
    };

    return (
        <OrderListPageWrapper className="page-py-spacing">
            <Container>
                <Breadcrumb items={breadcrumbItems} />
                <UserDashboardWrapper>
                    <UserMenu />
                    <UserContent>
                        <Title titleText={'Các đơn hàng của tôi'} />
                        <div className="order-tabs">
                            <div className="order-tabs-heads">
                                <button
                                    type="button"
                                    className={`order-tabs-head text-xl italic ${
                                        activeTab === 'ALL' ? 'order-tabs-head-active' : ''
                                    }`}
                                    onClick={() => handleTabClick('ALL')}
                                >
                                    Tất cả
                                </button>
                                <button
                                    type="button"
                                    className={`order-tabs-head text-xl italic ${
                                        activeTab === 'ORDER-PLACED' ? 'order-tabs-head-active' : ''
                                    }`}
                                    onClick={() => handleTabClick('ORDER-PLACED')}
                                >
                                    Đã đặt
                                </button>
                                <button
                                    type="button"
                                    className={`order-tabs-head text-xl italic ${
                                        activeTab === 'ORDER-CANCELLED' ? 'order-tabs-head-active' : ''
                                    }`}
                                    onClick={() => handleTabClick('ORDER-CANCELLED')}
                                >
                                    Đã hủy
                                </button>
                                <button
                                    type="button"
                                    className={`order-tabs-head text-xl italic ${
                                        activeTab === 'ORDER-SHIPPING' ? 'order-tabs-head-active' : ''
                                    }`}
                                    onClick={() => handleTabClick('ORDER-SHIPPING')}
                                >
                                    Đang giao
                                </button>
                                <button
                                    type="button"
                                    className={`order-tabs-head text-xl italic ${
                                        activeTab === 'ORDER-DELIVERED' ? 'order-tabs-head-active' : ''
                                    }`}
                                    onClick={() => handleTabClick('ORDER-DELIVERED')}
                                >
                                    Đã hoàn thành
                                </button>
                            </div>

                            <div className="order-tabs-contents">
                                <div className="order-tabs-content" id="active">
                                    {
                                        <OrderItemList
                                            orders={activeTab !== 'ALL' ? historyOrdersByFilter : historyOrders}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </UserContent>
                </UserDashboardWrapper>
            </Container>
        </OrderListPageWrapper>
    );
};

export default OrderListPage;
