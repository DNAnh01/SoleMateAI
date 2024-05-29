import styled from 'styled-components';
import { Container } from '~/styles/styles';
import Breadcrumb from '~/components/common/Breadcrumb';
import { UserContent, UserDashboardWrapper } from '~/styles/user';
import UserMenu from '~/components/user/UserMenu';
import Title from '~/components/common/Title';
import { orderData } from '~/data/data.mock';
import { currencyFormat, formatCurrency, getFormattedDate } from '~/utils/helper';
import { breakpoints, defaultTheme } from '~/styles/themes/default';
import configs from '~/configs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseButtonBlack, BaseButtonGreen } from '~/styles/button';
import orderApi from '~/apis/order.api';
import { toast } from 'react-toastify';

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

const OrderDetailStatusWrapper = styled.div`
    margin: 0 36px;
    @media (max-width: ${breakpoints.sm}) {
        margin: 0 10px;
        overflow-x: scroll;
    }

    .order-status {
        height: 4px;
        margin: 50px 0;
        max-width: 580px;
        width: 340px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        margin-bottom: 70px;

        @media (max-width: ${breakpoints.sm}) {
            margin-right: 40px;
            margin-left: 40px;
        }

        &-dot {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);

            &:nth-child(1) {
                left: 0;
            }

            &:nth-child(2) {
                left: calc(33.3333% - 10px);
            }

            &:nth-child(3) {
                left: calc(66.6666% - 10px);
            }
            &:nth-child(4) {
                right: 0;
            }

            &.status-done {
                background-color: ${defaultTheme.color_outerspace};
                .order-status-text {
                    color: ${defaultTheme.color_outerspace};
                }
            }

            &.status-current {
                position: absolute;
                &::after {
                    content: '';
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    background-color: ${defaultTheme.color_outerspace};
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 30;
                    border-radius: 50%;
                }

                .order-status-text {
                    color: ${defaultTheme.color_outerspace};
                }
            }
        }

        &-text {
            position: absolute;
            top: calc(100% + 8px);
            left: 50%;
            transform: translateX(-50%);
        }
    }
`;

const OrderDetailMessageWrapper = styled.div`
    background-color: ${defaultTheme.color_whitesmoke};
    max-width: 748px;
    margin-right: auto;
    margin-left: auto;
    min-height: 68px;
    padding: 16px 24px;
    border-radius: 8px;
    position: relative;
    margin-top: 80px;

    &::after {
        content: '';
        position: absolute;
        top: -34px;
        left: 20%;
        border-bottom: 22px solid ${defaultTheme.color_whitesmoke};
        border-top: 18px solid transparent;
        border-left: 18px solid transparent;
        border-right: 18px solid transparent;
    }

    @media (max-width: ${breakpoints.sm}) {
        margin-top: 10px;
    }
`;

const OrderDetailListWrapper = styled.div`
    padding: 24px;
    margin-top: 40px;
    border: 1px solid rgba(0, 0, 0, 0.05);

    @media (max-width: ${defaultTheme.md}) {
        padding: 18px;
    }

    @media (max-width: ${defaultTheme.md}) {
        padding: 12px;
    }

    .order-d-item {
        grid-template-columns: 80px 1fr 1fr 32px;
        gap: 20px;
        padding: 12px 0;
        border-bottom: 1px solid ${defaultTheme.color_whitesmoke};
        position: relative;

        @media (max-width: ${defaultTheme.xl}) {
            grid-template-columns: 80px 3fr 2fr 32px;
            padding: 16px 0;
            gap: 16px;
        }

        @media (max-width: ${defaultTheme.sm}) {
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
            width: 80px;
            height: 80px;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

            @media (max-width: ${breakpoints.sm}) {
                width: 50px;
                height: 50px;
            }

            @media (max-width: ${breakpoints.sm}) {
                width: 100%;
                height: 100%;
            }
        }

        &-calc {
            p {
                display: inline-block;
                margin-right: 50px;

                @media (max-width: ${defaultTheme.lg}) {
                    margin-right: 20px;
                }
            }
        }

        &-btn {
            margin-bottom: auto;
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

/**
{
    "id": "2f6644ad-6db7-4b0c-bbef-aaca3ad26179",
    "address_id": "22378672-67b4-4604-be86-c48602e20784",
    "user_id": "4a44ac73-b93e-4d30-8e40-1471b57f4a76",
    "order_date": "2024-05-29T14:20:29.682646",
    "delivery_date": "2024-06-05T14:20:29.682646",
    "status": "ORDER-PLACED",
    "total_item": 1,
    "total_display_price": 2000000.0,
    "total_warehouse_price": 1500000.0,
    "total_discounted_price": 1800000.0,
    "shipping_address": {
        "is_active": false,
        "created_at": "2024-05-29T13:54:32.402109+07:00",
        "updated_at": "2024-05-29T18:20:32.133526+07:00",
        "deleted_at": "2024-05-29T18:20:32.129523+07:00",
        "id": "22378672-67b4-4604-be86-c48602e20784",
        "user_id": "4a44ac73-b93e-4d30-8e40-1471b57f4a76",
        "province": "Thành phố Đà Nẵng",
        "district": "Quận Liên Chiểu",
        "ward": "Phường Hòa Khánh Bắc"
    },
    "order_items": [
        {
            "id": "f5e004a6-e219-471f-a8b5-45a1725d2a5d",
            "order_id": "2f6644ad-6db7-4b0c-bbef-aaca3ad26179",
            "shoe_id": "e90a9037-623b-4b2d-a2ac-1b3f8a4ab905",
            "shoe": {
                "is_active": true,
                "created_at": "2024-05-28T18:19:05.951230+07:00",
                "updated_at": "2024-05-29T18:20:08.850415+07:00",
                "deleted_at": null,
                "id": "e90a9037-623b-4b2d-a2ac-1b3f8a4ab905",
                "brand": {
                    "brand_name": "Puma",
                    "brand_logo": "https://raw.githubusercontent.com/DNAnh01/assets/main/SoleMateAI/brand_logo_Puma.png"
                },
                "size": {
                    "size_number": 43
                },
                "color": {
                    "color_name": "Black",
                    "hex_value": "#2a292b"
                },
                "image_url": "https://raw.githubusercontent.com/DNAnh01/assets/main/SoleMateAI/shoe8.png",
                "shoe_name": "Puma Suede Classic+",
                "description": "Giày thể thao nam Puma Suede Classic+ mang đến sự êm ái, thoải mái cho người sử dụng.",
                "quantity_in_stock": 90,
                "display_price": 2000000.0,
                "warehouse_price": 1500000.0,
                "discounted_price": 1800000.0
            },
            "quantity": 1,
            "display_price": 2000000.0,
            "warehouse_price": 1500000.0,
            "discounted_price": 1800000.0
        }
    ]
}
 */

const OrderDetailPage = () => {
    // const { order, setOrder } = useState({});
    const { id } = useParams();
    const [activeButton, setActiveButton] = useState('Cancel');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await orderApi.getOrderById(id);
                if (response.status === 200) {
                    // setOrder(response.data);
                    console.log('order', response.data);
                }
            } catch (error) {
                toast.error('Lỗi khi lấy dữ liệu đơn hàng', {
                    autoClose: 3000,
                });
            }
        };
        fetchData();
    }, [id]);

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };
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
                                {activeButton === 'Cancel' ? (
                                    <BaseButtonBlack className="mx-1" onClick={() => handleButtonClick('Cancel')}>
                                        Hủy đơn hàng
                                    </BaseButtonBlack>
                                ) : (
                                    <BaseButtonGreen className="mx-1" onClick={() => handleButtonClick('Cancel')}>
                                        Hủy đơn hàng
                                    </BaseButtonGreen>
                                )}
                                {activeButton === 'Payment' ? (
                                    <BaseButtonBlack className="mx-1" onClick={() => handleButtonClick('Payment')}>
                                        Thanh toán đơn hàng
                                    </BaseButtonBlack>
                                ) : (
                                    <BaseButtonGreen className="mx-1" onClick={() => handleButtonClick('Payment')}>
                                        Thanh toán đơn hàng
                                    </BaseButtonGreen>
                                )}
                            </div>
                        </div>

                        {/*<div className="order-d-wrapper">
                            <div className="order-d-top flex justify-between items-start">
                                <div className="order-d-top-l">
                                    <h4 className="text-3xl order-d-no">Đơn hàng: {order?.id}</h4>
                                    <p className="text-lg font-medium text-gray">
                                        Đặt hàng vào lúc: {getFormattedDate(order?.order_date)}
                                    </p>
                                    <p className="text-lg font-medium text-gray">
                                        Ngày giao hàng dự kiến: {getFormattedDate(order?.delivery_date)}
                                    </p>
                                </div>
                                <div className="order-d-top-r text-xxl text-gray font-semibold">
                                    Tổng số tiền:{' '}
                                    <span className="text-outerspace">
                                        {formatCurrency(order?.total_display_price)}
                                    </span>
                                </div>
                                <div className="order-d-top-r text-xxl text-gray font-semibold">
                                    Tổng phần trăm khuyến mãi:{' '}
                                    <span className="text-outerspace">
                                        {(
                                            ((order?.total_display_price - order?.total_discounted_price) /
                                                order?.total_display_price) *
                                            100
                                        ).toFixed(3)}
                                    </span>
                                </div>
                                <div className="order-d-top-r text-xxl text-gray font-semibold">
                                    Tổng số tiền phải thanh toán:{' '}
                                    <span className="text-outerspace">
                                        {formatCurrency(order?.total_discounted_price)}
                                    </span>
                                </div>
                            </div>

                            <OrderDetailStatusWrapper className="order-d-status">
                                <div className="order-status bg-silver">
                                    <div className="order-status-dot status-done bg-silver">
                                        <span className="order-status-text font-semibold text-center no-wrap text-silver">
                                            Order Placed
                                        </span>
                                    </div>
                                    <div className="order-status-dot status-current bg-silver">
                                        <span className="order-status-text font-semibold text-center no-wrap text-silver">
                                            In Progress
                                        </span>
                                    </div>
                                    <div className="order-status-dot bg-silver">
                                        <span className="order-status-text font-semibold text-center no-wrap text-silver">
                                            Shipped
                                        </span>
                                    </div>
                                    <div className="order-status-dot bg-silver">
                                        <span className="order-status-text font-semibold text-center no-wrap text-silver">
                                            Delivered
                                        </span>
                                    </div>
                                </div>
                            </OrderDetailStatusWrapper>
                            <OrderDetailMessageWrapper className="order-message flex items-center justify-start">
                                <p className="font-semibold text-gray">
                                    8 June 2023 3:40 PM &nbsp;
                                    <span className="text-outerspace">Your order has been successfully verified.</span>
                                </p>
                            </OrderDetailMessageWrapper>

                            <OrderDetailListWrapper className="order-d-list">
                                {orderData[0].items?.map((item) => {
                                    return (
                                        <div className="order-d-item grid" key={item.id}>
                                            <div className="order-d-item-img">
                                                <img src={item.imgSource} alt="" className="object-fit-cover" />
                                            </div>
                                            <div className="order-d-item-info">
                                                <p className="text-xl font-bold">{item.name}</p>
                                                <p className="text-md font-bold">
                                                    Color: &nbsp;
                                                    <span className="font-medium text-gray">{item.color}</span>
                                                </p>
                                            </div>
                                            <div className="order-d-item-calc">
                                                <p className="font-bold text-lg">
                                                    Qty: &nbsp;
                                                    <span className="text-gray">{item.quantity}</span>
                                                </p>
                                                <p className="font-bold text-lg">
                                                    Price: &nbsp;
                                                    <span className="text-gray">{currencyFormat(item.price)}</span>
                                                </p>
                                            </div>
                                            <button type="button" className="text-xl text-outerspace order-d-item-btn">
                                                <i className="bi bi-x-lg"></i>
                                            </button>
                                        </div>
                                    );
                                })}
                            </OrderDetailListWrapper>
                            </div>*/}
                    </UserContent>
                </UserDashboardWrapper>
            </Container>
        </OrderDetailPageWrapper>
    );
};

export default OrderDetailPage;
