import styled from 'styled-components';
import PropTypes from 'prop-types';
import { breakpoints } from '~/styles/themes/default';
import CartItem from '~/components/cart/CartItem';
import Icons from '~/components/common/Icons/Icons';
import { useContext, useState } from 'react';
import cartAPI from '~/apis/cart.api';
import { toast } from 'react-toastify';
import { CartContext } from '~/contexts/cart.context';

const ScrollbarXWrapper = styled.div`
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: grey;
    }
`;

const CartTableWrapper = styled.table`
    border-collapse: collapse;
    min-width: 680px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;

    thead {
        th {
            height: 48px;
            padding-left: 16px;
            padding-right: 16px;
            letter-spacing: 0.03em;
            position: sticky;
            top: 0;
            z-index: 1;

            @media (max-width: ${breakpoints.lg}) {
                padding: 16px 12px;
            }

            @media (max-width: ${breakpoints.xs}) {
                padding: 10px;
            }
        }
    }

    tbody {
        td {
            padding: 24px 16px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.08);

            @media (max-width: ${breakpoints.lg}) {
                padding: 16px 12px;
            }

            @media (max-width: ${breakpoints.xs}) {
                padding: 10px 6px;
            }
        }
    }
`;

const CartTable = ({ cartItems }) => {
    const { setCart, setTotalCartItem } = useContext(CartContext);
    const [selectedItems, setSelectedItems] = useState([]);
    console.log('selectedItems', selectedItems);
    const handleSelectCartItem = (shoeId, isSelected) => {
        if (isSelected) {
            setSelectedItems((prevSelectedItems) => [...prevSelectedItems, shoeId]);
        } else {
            setSelectedItems((prevSelectedItems) => prevSelectedItems.filter((id) => id !== shoeId));
        }
    };

    const handleBulkDelete = async () => {
        if (selectedItems.length === 0) {
            toast.warning('Không có sản phẩm nào được chọn.', {
                position: 'top-center',
                autoClose: 3000,
            });
            return;
        }

        try {
            const response = await cartAPI.removeMultipleCartItem(selectedItems);
            console.log('selectedItems', selectedItems);
            console.log('response', response.data);

            if (response.status === 200) {
                toast.success('Xóa sản phẩm thành công!', {
                    position: 'top-center',
                    autoClose: 3000,
                });
                try {
                    const cartResponse = await cartAPI.getAllCartItem();
                    setCart(cartResponse.data);
                    setTotalCartItem(cartResponse.data.total_item);
                } catch (error) {}
            } else {
                toast.error('Có lỗi xảy ra khi xóa sản phẩm.', {
                    position: 'top-center',
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error('Error deleting cart items:', error);
            toast.error('Có lỗi xảy ra khi xóa sản phẩm, vui lòng thử lại sau.', {
                position: 'top-center',
                autoClose: 3000,
            });
        }
    };

    const CART_TABLE_HEADS = ['Chi tiết sản phẩm', 'Giá gốc', 'Giá khuyến mãi', 'Số lượng', 'Tổng phụ'];

    return (
        <ScrollbarXWrapper>
            <CartTableWrapper className="w-full">
                <thead>
                    <tr className="text-start">
                        {CART_TABLE_HEADS.map((column, index) => (
                            <th
                                key={index}
                                className={`bg-outerspace text-white font-semibold capitalize text-base ${
                                    index === CART_TABLE_HEADS.length - 1 ? ' text-center' : ''
                                }`}
                            >
                                {column}
                            </th>
                        ))}
                        <th className="bg-outerspace text-white font-semibold capitalize text-base">
                            <Icons
                                icon="removeCartItem"
                                width={20}
                                height={20}
                                color="#fff"
                                onClick={handleBulkDelete}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((cartItem) => (
                        <CartItem key={cartItem.id} cartItem={cartItem} onSelectCartItem={handleSelectCartItem} />
                    ))}
                </tbody>
            </CartTableWrapper>
        </ScrollbarXWrapper>
    );
};

CartTable.propTypes = {
    cartItems: PropTypes.array.isRequired,
};

export default CartTable;
