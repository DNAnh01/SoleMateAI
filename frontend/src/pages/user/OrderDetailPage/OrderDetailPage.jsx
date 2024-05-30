import styled from 'styled-components';
import { Container } from '~/styles/styles';
import Breadcrumb from '~/components/common/Breadcrumb';
import { UserContent, UserDashboardWrapper } from '~/styles/user';
import UserMenu from '~/components/user/UserMenu';
import Title from '~/components/common/Title';
import { convertOrderStatus, currencyFormat, getFormattedDate } from '~/utils/helper';
import { breakpoints, defaultTheme } from '~/styles/themes/default';
import configs from '~/configs';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BaseButtonGreen, BaseButtonOuterspace } from '~/styles/button';
import orderApi from '~/apis/order.api';
import { toast } from 'react-toastify';
import { OrderContext } from '~/contexts/order.context';

const OrderDetailPageWrapper = styled.main`
    .btn-and-title-wrapper {
        margin-bottom: 24px;
        .title {
            margin-bottom: 0;
        }

        .btn-go-back {
            margin-right: 12px;
            transition: ${defaultTheme.default_transition};

            &:hover {
                margin-right: 16px;
            }
        }
    }

    .order-d-top {
        background-color: ${defaultTheme.color_whitesmoke};
        padding: 26px 32px;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.05);

        @media (max-width: ${breakpoints.sm}) {
            flex-direction: column;
            row-gap: 12px;
        }
    }
`;

const OrderDetailListWrapper = styled.div`
    padding: 24px;
    margin-top: 40px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    background-color: ${defaultTheme.color_whitesmoke};
    border-radius: 8px;

    @media (max-width: ${defaultTheme.md}) {
        padding: 18px;
    }

    @media (max-width: ${defaultTheme.md}) {
        padding: 12px;
    }

    .order-d-item {
        display: grid;
        grid-template-columns: 80px 1fr 1fr 32px;
        gap: 20px;
        padding: 12px 0;
        border-bottom: 1px solid ${defaultTheme.color_whitesmoke};
        position: relative;
        align-items: center;

        @media (max-width: ${defaultTheme.xl}) {
            grid-template-columns: 80px 3fr 2fr 32px;
            padding: 16px 0;
            gap: 16px;
        }

        @media (max-width: ${breakpoints.sm}) {
            grid-template-columns: 50px 3fr 2fr;
            gap: 16px;
        }

        @media (max-width: ${defaultTheme.xs}) {
            grid-template-columns: 100%;
            gap: 12px;
        }

        &:first-child {
            padding-top: 0;
        }

        &:last-child {
            padding-bottom: 0;
            border-bottom: 0;
        }

        &-img {
            width: 90px;
            height: auto;
            border-radius: 8px;
            overflow: hidden;
            /* object-fit: cover; */
            background-color: ${defaultTheme.color_whitesmoke};

            @media (max-width: ${breakpoints.sm}) {
                width: 50px;
                height: 50px;
            }

            @media (max-width: ${breakpoints.sm}) {
                width: 100%;
                height: 100%;
            }
        }

        &-info {
            display: flex;
            flex-direction: column;
            gap: 4px;

            .prod-name {
                font-weight: bold;
            }

            .prod-size,
            .prod-quantity-in-stock,
            .prod-color {
                display: flex;
                align-items: center;
                gap: 4px;

                .prod-colorbox {
                    border-radius: 100%;
                    width: 16px;
                    height: 16px;
                    display: inline-block;
                }
            }
        }

        &-calc {
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            p {
                margin: 0;
                display: inline-block;
                &:not(:last-child) {
                    margin-bottom: 8px;
                }
            }
        }

        &-btn {
            background: none;
            border: none;
            color: ${defaultTheme.color_outerspace};
            cursor: pointer;
            font-size: 16px;
            transition: color 0.3s;

            &:hover {
                color: ${defaultTheme.color_yellow_green};
            }

            @media (max-width: ${breakpoints.sm}) {
                position: absolute;
                right: 0;
                top: 10px;
            }

            @media (max-width: ${defaultTheme.xs}) {
                width: 28px;
                height: 28px;
                z-index: 5;
                background-color: ${defaultTheme.color_white};
                border-radius: 50%;
                right: 8px;
                top: 24px;
            }
        }
    }
`;

const breadcrumbItems = [
    { label: 'Home', link: configs.roures.home },
    { label: 'Order', link: configs.roures.user.order },
    { label: 'Order Details', link: configs.roures.user.orderDetail },
];

const OrderDetailPage = () => {
    const [order, setOrder] = useState(null);
    const { setHistoryOrders } = useContext(OrderContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [activeButton, setActiveButton] = useState('Cancel');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await orderApi.getOrderById(id);
                if (response.status === 200) {
                    setOrder(response.data);
                }
            } catch (error) {
                toast.error('Lỗi khi lấy dữ liệu đơn hàng', {
                    autoClose: 3000,
                });
            }
        };
        fetchData();
    }, [id]);

    const handleButtonClick = async (button) => {
        if (button === 'Cancel') {
            try {
                const response = await orderApi.cancelOrderById(id);
                if (response.status === 200) {
                    toast.success('Hủy đơn hàng thành công', {
                        autoClose: 3000,
                    });
                    const fetchOrders = async () => {
                        try {
                            const response = await orderApi.getHistoryOrderByFilter({
                                status: 'ORDER-PLACED',
                                orderDate: '',
                            });
                            if (response.status === 200) {
                                setHistoryOrders(response.data);
                            } else {
                                toast.error('Bạn chưa có đơn hàng nào.', {
                                    autoClose: 3000,
                                });
                            }
                        } catch (error) {
                            toast.error('Bạn chưa có đơn hàng nào.', {
                                autoClose: 3000,
                            });
                        }
                    };
                    fetchOrders();
                    navigate(configs.roures.user.order);
                }
            } catch (error) {}
        } else if (button === 'Payment') {
            console.log('Call API to payment order');
        }
        setActiveButton(button);
    };

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <OrderDetailPageWrapper className="page-py-spacing">
            <Container>
                <Breadcrumb items={breadcrumbItems} />
                <UserDashboardWrapper>
                    <UserMenu />
                    <UserContent>
                        <div className="flex items-center justify-between btn-and-title-wrapper">
                            <Title titleText={'Chi tiết đơn hàng'} />
                            <div>
                                {order?.status === 'ORDER-PLACED' || order?.status === 'ORDER-SHIPPING' ? (
                                    <div>
                                        {activeButton === 'Cancel' ? (
                                            <BaseButtonGreen
                                                className="mx-1"
                                                onClick={() => handleButtonClick('Cancel')}
                                            >
                                                Hủy đơn hàng
                                            </BaseButtonGreen>
                                        ) : (
                                            <BaseButtonOuterspace
                                                className="mx-1"
                                                onClick={() => handleButtonClick('Cancel')}
                                            >
                                                Hủy đơn hàng
                                            </BaseButtonOuterspace>
                                        )}
                                        {activeButton === 'Payment' ? (
                                            <BaseButtonGreen
                                                className="mx-1"
                                                onClick={() => handleButtonClick('Payment')}
                                            >
                                                Thanh toán đơn hàng
                                            </BaseButtonGreen>
                                        ) : (
                                            <BaseButtonOuterspace
                                                className="mx-1"
                                                onClick={() => handleButtonClick('Payment')}
                                            >
                                                Thanh toán đơn hàng
                                            </BaseButtonOuterspace>
                                        )}
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        <div className="flex justify-between order-d-top">
                            <div className="flex flex-col w-full flex-1 mb-8">
                                <span className="mb-2">
                                    <strong>Ngày đặt hàng:</strong> {getFormattedDate(order?.order_date)}
                                </span>
                                <span>
                                    <strong>Ngày giao hàng dự kiến:</strong> {getFormattedDate(order?.delivery_date)}
                                </span>
                                <span>
                                    <strong>Trạng thái đơn hàng:</strong> {convertOrderStatus(order?.status)}
                                </span>
                                <span>
                                    <strong>Tổng tiền:</strong> {currencyFormat(order?.total_display_price)}
                                </span>
                                <span>
                                    <strong>Giảm giá:</strong>{' '}
                                    {(
                                        ((order?.total_display_price - order?.total_discounted_price) /
                                            order?.total_display_price) *
                                        100
                                    ).toFixed(3)}
                                    %
                                </span>
                                <span>
                                    <strong>Tổng tiền phải thanh toán:</strong>{' '}
                                    {currencyFormat(order?.total_discounted_price)}
                                </span>
                            </div>
                        </div>

                        <OrderDetailListWrapper>
                            {order?.order_items.map((item) => (
                                <div className="grid items-center order-d-item" key={item?.shoe?.id}>
                                    <div className="order-d-item-img">
                                        <img src={item?.shoe?.image_url} alt={item?.shoe?.shoe_name} />
                                    </div>
                                    <div className="order-d-item-info">
                                        <div className="prod-name">Tên sản phẩm: {item?.shoe?.shoe_name}</div>
                                        <div className="prod-size">Kích thước: {item?.shoe?.size?.size_number}</div>
                                        <div className="prod-quantity-in-stock">
                                            Số lượng trong kho: {item?.shoe?.quantity_in_stock}
                                        </div>
                                        <div className="prod-color">
                                            Màu sắc:
                                            <span
                                                className="prod-colorbox"
                                                style={{ background: item?.shoe?.color?.hex_value }}
                                            ></span>
                                        </div>
                                    </div>
                                    <div className="order-d-item-calc">
                                        <p>Số lượng: {item?.quantity}</p>
                                        <p>Giá: {currencyFormat(item?.display_price)}</p>
                                        <p>
                                            Giảm giá:{' '}
                                            {(
                                                ((item?.display_price - item?.discounted_price) /
                                                    item?.discounted_price) *
                                                100
                                            ).toFixed(3)}{' '}
                                            %
                                        </p>
                                        <p>Giá khuyến mãi: {currencyFormat(item?.discounted_price)}</p>
                                    </div>
                                </div>
                            ))}
                        </OrderDetailListWrapper>
                    </UserContent>
                </UserDashboardWrapper>
            </Container>
        </OrderDetailPageWrapper>
    );
};

export default OrderDetailPage;
