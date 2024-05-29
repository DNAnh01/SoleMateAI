import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { currencyFormat } from '~/utils/helper';
import { breakpoints, defaultTheme } from '~/styles/themes/default';
import { FaStar } from 'react-icons/fa';
import { useContext } from 'react';
import { CartContext } from '~/contexts/cart.context';
import cartAPI from '~/apis/cart.api';
import { toast } from 'react-toastify';
import useAppStore from '~/store';

const getColor = (rating, index) => {
    if (rating >= index) {
        return defaultTheme.color_yellow;
    } else if (rating >= index - 0.5) {
        return defaultTheme.color_yellow;
    } else {
        return defaultTheme.color_white;
    }
};

const ProductCardWrapper = styled.div`
    width: 280px;
    display: flex;
    flex-direction: column;
    border-radius: 25px;
    box-shadow: 0 2px 7px 1px ${defaultTheme.color_black};
    background-color: ${defaultTheme.color_jet};
    color: ${defaultTheme.color_white};
    position: relative;
    cursor: pointer;
    text-decoration: none;
    overflow: hidden;
    margin: 20px;
    transition: 0.5s ease-in-out;

    &:hover::before {
        clip-path: circle(300px at 80% -20%);
    }

    &:hover .product-image {
        transform: rotate(45deg);
    }

    &:hover .product-content {
        transform: translateY(-20px);
    }

    &:hover .add-to-cart {
        opacity: 1;
        transform: translateY(0);
    }

    @media (max-width: ${breakpoints.sm}) {
        width: 100%;
    }

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${(props) => props.circleColor};
        clip-path: circle(0px at 80% 20%);
        transition: clip-path 0.5s ease-in-out;
    }
`;

const ProductImageWrapper = styled.div`
    width: 100%;
    height: 200px;
    padding-top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    @media (max-width: ${breakpoints.sm}) {
        height: 260px;
    }
`;

const ProductImage = styled.img`
    width: auto;
    height: 100%;
    transition: transform 0.5s ease-in-out;
`;

const ProductContent = styled.div`
    padding: 15px;
    transition: transform 0.5s ease-in-out;
    flex: 1;

    .product-name {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .brand-quantity {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin-bottom: 10px;

        .brand-logo {
            width: 60px;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            object-fit: cover;
            background-color: ${defaultTheme.color_white};
            padding: 5px;
            border-radius: 8px;
        }

        .quantity {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
        }
    }

    .prices {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin-bottom: 10px;
        padding-bottom: 10px;

        .price {
            font-size: 14px;
            text-decoration: line-through;
            color: ${defaultTheme.color_white};
        }

        .discounted-price {
            font-size: 16px;
            color: ${defaultTheme.color_red};
        }
    }
`;

const Star = styled(FaStar)`
    margin-right: 2px;
    transition: transform 0.5s ease-in-out;

    &:hover {
        transform: scale(1.5);
    }
`;

const Size = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    font-size: 14px;
    font-weight: bold;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    color: ${defaultTheme.color_white};
    margin-right: 5px;
    &:hover {
        transform: scale(1.5);
    }
`;
const SizeWrapper = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
`;

const RatingWrapper = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
`;

const Rating = ({ rating }) => {
    return (
        <RatingWrapper>
            {[1, 2, 3, 4, 5].map((index) => (
                <Star key={index} color={getColor(rating, index)} size="20px" />
            ))}
        </RatingWrapper>
    );
};

const AddToCartButton = styled.button`
    position: absolute;
    bottom: 13px;
    left: 50%;
    transform: translateX(-50%) translateY(50px);
    opacity: 0;
    background-color: ${defaultTheme.color_yellow_green};
    color: ${defaultTheme.color_white};
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 10px;
    font-weight: bold;
    cursor: pointer;
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;

    &:hover {
        background-color: ${defaultTheme.color_yellow};
        color: ${defaultTheme.color_white};
    }
`;

const ProductItem = ({ product }) => {
    const { accessToken } = useAppStore();
    const { setCart, setTotalCartItem } = useContext(CartContext);
    const navigate = useNavigate();

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        if (accessToken) {
            try {
                const res = await cartAPI.addCartItem({ shoeId: product.id, quantity: 1 });
                if (res.status === 200) {
                    toast.success('Thêm vào giỏ hàng thành công', {
                        position: 'top-center',
                        autoClose: 2000,
                    });

                    const cart = await cartAPI.getAllCartItem();
                    setCart(cart.data);
                    setTotalCartItem(cart.data.total_item);
                }
            } catch (error) {
                toast.error('Thêm vào giỏ hàng thất bại');
                console.log(error);
            }
        } else {
            toast.error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng', {
                position: 'top-center',
                autoClose: 2000,
            });
        }
    };

    const handleCardClick = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <ProductCardWrapper onClick={handleCardClick} circleColor={product.color.hex_value}>
            <Rating rating={product.avg_rating} />
            <SizeWrapper>
                <Size key={product?.size?.size_number} color={product?.color.hex_value}>
                    {product?.size.size_number}
                </Size>
            </SizeWrapper>
            <ProductImageWrapper>
                <ProductImage className="product-image" src={product.image_url} alt={product.shoe_name} />
            </ProductImageWrapper>
            <ProductContent className="product-content">
                <p className="product-name">{product.shoe_name}</p>
                <div className="brand-quantity">
                    <img className="brand-logo" src={product.brand.brand_logo} alt={product.brand.brand_name} />
                    <p className="quantity">Số lượng: {product.quantity_in_stock}</p>
                </div>
                <div className="prices">
                    <p className="price">{currencyFormat(product.display_price)}</p>
                    <p className="discounted-price">{currencyFormat(product.discounted_price)}</p>
                </div>
            </ProductContent>
            <AddToCartButton className="add-to-cart" onClick={handleAddToCart}>
                Thêm giỏ hàng
            </AddToCartButton>
        </ProductCardWrapper>
    );
};

export default ProductItem;
