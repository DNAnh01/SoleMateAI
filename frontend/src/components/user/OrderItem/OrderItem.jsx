import styled from 'styled-components';
import PropTypes from 'prop-types';
import { convertOrderStatus, currencyFormat, getFormattedDate } from '~/utils/helper';
import { BaseButtonGreen } from '~/styles/button';
import { breakpoints, defaultTheme } from '~/styles/themes/default';
import { useNavigate } from 'react-router-dom';

const OrderItemWrapper = styled.div`
    margin: 30px 0;
    border-bottom: 1px solid ${defaultTheme.color_anti_flash_white};

    .order-item-title {
        margin-bottom: 12px;
    }

    .order-item-details {
        border: 1px solid rgba(0, 0, 0, 0.1);
        padding: 24px 32px;
        border-radius: 8px;

        @media (max-width: ${breakpoints.sm}) {
            padding: 20px 24px;
        }

        @media (max-width: ${breakpoints.xs}) {
            padding: 12px 16px;
        }
    }

    .order-info-group {
        @media (max-width: ${breakpoints.sm}) {
            flex-direction: column;
        }
    }

    .order-info-item {
        width: 50%;

        span {
            &:nth-child(2) {
                margin-left: 4px;
            }
        }

        &:nth-child(even) {
            text-align: right;
            @media (max-width: ${breakpoints.lg}) {
                text-align: left;
            }
        }

        @media (max-width: ${breakpoints.sm}) {
            width: 100%;
            margin: 2px 0;
        }
    }
    .order-prod-img {
        width: 100px;
        height: 100px;
        overflow: hidden;
        border-radius: 8px;

        @media (max-width: ${breakpoints.xl}) {
            width: 80px;
            height: 80px;
        }
    }
    .prod-colorbox {
        border-radius: 100%;
        width: 16px;
        height: 16px;
        display: inline-block;
    }
    .order-overview {
        margin: 28px 0;
        gap: 12px;

        @media (max-width: ${breakpoints.lg}) {
            margin: 20px 0;
        }

        @media (max-width: ${breakpoints.sm}) {
            flex-direction: column;
        }

        &-img {
            width: 100px;
            height: 100px;
            border-radius: 6px;
            overflow: hidden;
        }

        &-content {
            grid-template-columns: 100px auto;
            gap: 18px;
        }

        &-info {
            ul {
                span {
                    &:nth-child(2) {
                        margin-left: 4px;
                    }
                }
            }
        }
    }
`;

const OrderItem = ({ order }) => {
    const navigate = useNavigate();
    const handleOrderDetailClick = () => {
        navigate(`/user/order/${order.id}`);
    };

    return (
        <OrderItemWrapper>
            <div className="order-item-details">
                <h3 className="text-x order-item-title">Đơn hàng: {order?.id}</h3>

                <div className="order-info-group flex flex-wrap">
                    <div className="order-info-item">
                        <span className="text-outerspace font-semibold">Địa chỉ giao hàng:</span>
                        <span className="text-dark_slate_blue">
                            {order?.shipping_address?.ward} - {order?.shipping_address?.district} -{' '}
                            {order?.shipping_address?.province}
                        </span>
                    </div>
                    <div className="order-info-item">
                        <span className="text-outerspace font-semibold">Ngày đặt hàng:</span>
                        <span className="text-dark_slate_blue">{getFormattedDate(order?.order_date)}</span>
                    </div>
                    <div className="order-info-item">
                        <span className="text-outerspace font-semibold">Trạng thái:</span>
                        <span className="text-dark_slate_blue">{convertOrderStatus(order?.status)}</span>
                    </div>
                    <div className="order-info-item">
                        <span className="text-outerspace font-semibold">Ngày giao hàng dự kiến:</span>
                        <span className="text-dark_slate_blue">{getFormattedDate(order?.delivery_date)}</span>
                    </div>
                </div>
            </div>
            <div className="order-overview flex justify-between">
                <div className="order-overview-content grid">
                    <div className="order-overview-img">
                        <img src={order?.order_items[0]?.shoe?.image_url} alt="" className="order-prod-img" />
                    </div>
                    <div className="order-overview-info">
                        <h4 className="text-xl">{order?.order_items[0]?.shoe?.shoe_name}</h4>
                        <ul>
                            <li className="font-semibold text-base">
                                <span>Màu sắc:</span>
                                <span
                                    className="prod-colorbox"
                                    style={{ background: order?.order_items[0]?.shoe?.color?.hex_value }}
                                ></span>
                            </li>
                            <li className="font-semibold text-base">
                                <span>Số lượng:</span>
                                <span className="text-dark_slate_blue">{order?.order_items[0]?.quantity}</span>
                            </li>
                            <li className="font-semibold text-base">
                                <span>Tổng cộng:</span>
                                <span className="text-dark_slate_blue">
                                    {currencyFormat(order?.order_items[0]?.discounted_price)}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <BaseButtonGreen onClick={handleOrderDetailClick}>Xem chi tiết</BaseButtonGreen>
            </div>
        </OrderItemWrapper>
    );
};

export default OrderItem;

OrderItem.propTypes = {
    order: PropTypes.object,
};
