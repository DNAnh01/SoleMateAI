import styled from 'styled-components';
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
            <BaseButtonGreen type="submit" className="checkout-btn">
                Đặt hàng
            </BaseButtonGreen>
        </CartSummaryWrapper>
    );
};

export default CartSummary;
