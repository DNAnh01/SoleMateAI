import styled from 'styled-components';
import PropTypes from 'prop-types';
import { breakpoints, defaultTheme } from '~/styles/themes/default';
import { currencyFormat } from '~/utils/helper';
import Icons from '~/components/common/Icons/Icons';
import { useContext, useState } from 'react';
import { CartContext } from '~/contexts/cart.context';
import cartAPI from '~/apis/cart.api';
import { toast } from 'react-toastify';
import useAppStore from '~/store';

const CartTableRowWrapper = styled.tr`
    .cart-tbl {
        &-prod {
            grid-template-columns: 80px auto;
            column-gap: 12px;

            @media (max-width: ${breakpoints.xl}) {
                grid-template-columns: 60px auto;
            }
        }

        &-qty {
            .qty-inc-btn,
            .qty-dec-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
                border-radius: 2px;

                &:hover {
                    border-color: ${defaultTheme.color_yellow_green};
                    background-color: ${defaultTheme.color_yellow_green};
                    color: ${defaultTheme.color_white};
                }
            }

            .qty-value {
                width: 40px;
                height: 24px;
            }
        }
    }

    .cart-prod-info {
        p {
            margin-right: 8px;
            span {
                margin-right: 4px;
            }
        }
    }

    .cart-prod-img {
        width: 80px;
        height: 80px;
        overflow: hidden;
        border-radius: 8px;

        @media (max-width: ${breakpoints.xl}) {
            width: 60px;
            height: 60px;
        }
    }
    .prod-colorbox {
        border-radius: 100%;
        width: 16px;
        height: 16px;
        display: inline-block;
    }
`;

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
    appearance: none;
    width: 20px;
    height: 20px;
    background-color: ${(props) =>
        props.checked ? `${defaultTheme.color_yellow_green}` : `${defaultTheme.color_white}`};
    border: 1px solid ${defaultTheme.color_gray};
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s, box-shadow 0.2s;
    position: relative;

    &:checked {
        background-color: ${defaultTheme.color_yellow_green};
        &::after {
            content: '✔';
            color: ${defaultTheme.color_white};
            font-size: 14px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    &:hover {
        box-shadow: 0 0 0 2px ${defaultTheme.color_black_04};
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px ${defaultTheme.color_dark_slate_blue};
    }
`;

const CartItem = ({ cartItem, onSelectCartItem }) => {
    const { setIsLoadingAPI } = useAppStore();
    const { setCart, setTotalCartItem } = useContext(CartContext);
    const [checked, setChecked] = useState(false);
    const handleMinusClick = async () => {
        try {
            if (cartItem.quantity > 1) {
                setIsLoadingAPI(true);
                const response = await cartAPI.addCartItem({
                    shoeId: cartItem.shoe_id,
                    quantity: -1, // Decrease by 1
                });
                if (response.status === 200) {
                    const cartRes = await cartAPI.getAllCartItem();
                    setCart(cartRes.data);
                    setTotalCartItem(cartRes.data.total_item);
                }
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra, vui lòng thử lại sau', {
                position: 'top-center',
                autoClose: 3000,
            });
        } finally {
            setIsLoadingAPI(false);
        }
    };

    const handlePlusClick = async () => {
        try {
            setIsLoadingAPI(true);
            const response = await cartAPI.addCartItem({
                shoeId: cartItem.shoe_id,
                quantity: 1, // Increase by 1
            });
            if (response.status === 200) {
                const cartRes = await cartAPI.getAllCartItem();
                setCart(cartRes.data);
                setTotalCartItem(cartRes.data.total_item);
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra, vui lòng thử lại sau', {
                position: 'top-center',
                autoClose: 3000,
            });
        } finally {
            setIsLoadingAPI(false);
        }
    };

    const handleSelect = (e) => {
        setChecked(e.target.checked);
        onSelectCartItem(cartItem.shoe_id, e.target.checked);
    };

    return (
        <CartTableRowWrapper key={cartItem.id}>
            <td>
                <div className="cart-tbl-prod grid">
                    <div className="cart-prod-img">
                        <img src={cartItem?.shoe?.image_url} className="w-full h-full" alt="" />
                    </div>
                    <div className="cart-prod-info">
                        <h4 className="text-base">{cartItem?.shoe?.description}</h4>
                        <p className="text-sm text-gray inline-flex">
                            <span className="font-semibold">Màu sắc: </span>
                            <span
                                className="prod-colorbox"
                                style={{ background: cartItem?.shoe?.color?.hex_value }}
                            ></span>
                        </p>
                        <p className="text-sm text-gray inline-flex">
                            <span className="font-semibold">Kích cỡ:</span> {cartItem?.shoe?.size?.size_number}
                        </p>
                    </div>
                </div>
            </td>
            <td>
                <span className="text-lg font-bold text-outerspace">
                    {currencyFormat(cartItem?.shoe?.display_price)}
                </span>
            </td>
            <td>
                <span className="text-lg font-bold text-outerspace">
                    {currencyFormat(cartItem?.shoe?.discounted_price)}
                </span>
            </td>
            <td>
                <div className="cart-tbl-qty flex items-center">
                    <button className="qty-dec-btn" onClick={handleMinusClick}>
                        <Icons icon="minus" width={20} height={20} color={defaultTheme.color_black_04} />
                    </button>
                    <span className="qty-value inline-flex items-center justify-center font-medium text-outerspace">
                        {cartItem?.quantity}
                    </span>
                    <button className="qty-inc-btn" onClick={handlePlusClick}>
                        <Icons icon="plus" width={20} height={20} color={defaultTheme.color_black_04} />
                    </button>
                </div>
            </td>
            <td>
                <span className="text-lg font-bold text-outerspace">{currencyFormat(cartItem?.discounted_price)}</span>
            </td>
            <td>
                <StyledCheckbox checked={checked} onChange={handleSelect} />
            </td>
        </CartTableRowWrapper>
    );
};

CartItem.propTypes = {
    cartItem: PropTypes.object.isRequired,
    onSelectCartItem: PropTypes.func.isRequired,
};

export default CartItem;
