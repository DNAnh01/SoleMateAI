import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import orderApi from '~/apis/order.api';
import configs from '~/configs';
import { AddressContext } from '~/contexts/address.context';
import { OrderContext } from '~/contexts/order.context';
import { BaseButtonGreen } from '~/styles/button';
import { breakpoints, defaultTheme } from '~/styles/themes/default';
import { formatCurrency } from '~/utils/helper';

const CartSummaryWrapper = styled.div`
    background-color: ${defaultTheme.color_flash_white};
    padding: 16px;

    .checkout-btn {
        min-width: 100%;
    }

    .summary-list {
        padding: 20px;

        @media (max-width: ${breakpoints.xs}) {
            padding-top: 0;
            padding-right: 0;
            padding-left: 0;
        }

        .summary-item {
            margin: 6px 0;

            &:last-child {
                margin-top: 20px;
                border-top: 1px dashed ${defaultTheme.color_yellow_green};
                padding-top: 10px;
            }
        }
    }
`;

const CartSummary = ({ totalDisplayPrice, totalDiscountedPrice }) => {
    const { address } = useContext(AddressContext);
    const { setHistoryOrders } = useContext(OrderContext);
    const navigate = useNavigate();

    // handle order
    const handleOrder = async () => {
        if (!address) {
            toast.error('Vui lòng nhập địa chỉ giao hàng', {
                autoClose: 3000,
            });
            return;
        }

        if (!totalDisplayPrice || !totalDiscountedPrice) {
            toast.error('Vui lòng thêm sản phẩm vào giỏ hàng', {
                autoClose: 3000,
            });
            return;
        }

        console.log('handle order');
        try {
            const createOrderResponse = await orderApi.createOrder({
                province: address.province,
                district: address.district,
                ward: address.ward,
            });

            if (createOrderResponse.status === 201) {
                toast.success('Đặt hàng thành công', {
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
                // redirect to confirm page
                navigate(configs.roures.confirm);
            }
        } catch (error) {
            toast.error('Đặt hàng thất bại', {
                autoClose: 3000,
            });
        }
        console.log('address', address);
    };

    return (
        <CartSummaryWrapper>
            <ul className="summary-list">
                <li className="summary-item flex justify-between">
                    <span className="font-medium text-outerspace">Tổng số tiền:</span>
                    <span className="font-medium text-outerspace">{formatCurrency(totalDisplayPrice)}</span>
                </li>
                <li className="summary-item flex justify-between">
                    <span className="font-medium text-outerspace">Tổng phần trăm khuyến mãi:</span>
                    <span className="font-medium text-outerspace">
                        {(((totalDisplayPrice - totalDiscountedPrice) / totalDisplayPrice) * 100).toFixed(3)}%
                    </span>
                </li>
                <li className="summary-item flex justify-between">
                    <span className="font-medium text-outerspace">Tổng số tiền phải thanh toán:</span>
                    <span className="summary-item-value font-bold text-outerspace">
                        {formatCurrency(totalDiscountedPrice)}
                    </span>
                </li>
            </ul>
            <BaseButtonGreen type="submit" className="checkout-btn" onClick={handleOrder}>
                Đặt hàng
            </BaseButtonGreen>
        </CartSummaryWrapper>
    );
};

export default CartSummary;
