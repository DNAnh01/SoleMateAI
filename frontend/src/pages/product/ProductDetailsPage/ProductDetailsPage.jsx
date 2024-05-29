import styled from 'styled-components';
import { Container } from '~/styles/styles';
import Breadcrumb from '~/components/common/Breadcrumb';
import { BaseButtonGreen } from '~/styles/button';
import { breakpoints, defaultTheme } from '~/styles/themes/default';
import { useContext, useEffect, useState } from 'react';
import productApi from '~/apis/product.api';
import ProductSimilar from '~/components/product/ProductSimilar';
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { currencyFormat } from '~/utils/helper';
import Icons from '~/components/common/Icons/Icons';
import { CartContext } from '~/contexts/cart.context';
import cartAPI from '~/apis/cart.api';
import { toast } from 'react-toastify';
import useAppStore from '~/store';

const DetailsScreenWrapper = styled.main`
    margin: 40px 0;
`;

const DetailsContent = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;

    @media (max-width: ${breakpoints.xl}) {
        gap: 24px;
        grid-template-columns: 3fr 2fr;
    }

    @media (max-width: ${breakpoints.lg}) {
        grid-template-columns: 100%;
    }

    img {
        padding: 20px;
        width: 100%;
        height: auto;
    }
`;

const ProductDetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 24px;
    height: auto;

    @media (max-width: ${breakpoints.sm}) {
        padding: 16px;
    }

    @media (max-width: ${breakpoints.xs}) {
        padding: 12px;
    }

    .prod-title {
        margin-bottom: 10px;
    }
    .rating-and-comments {
        display: flex;
        column-gap: 16px;
        margin-bottom: 20px;
    }
    .prod-rating {
        display: flex;
        column-gap: 10px;
    }
    .prod-comments {
        display: flex;
        column-gap: 10px;
    }
    .prod-add-btn {
        display: flex;
        min-width: 160px;
        column-gap: 8px;
        &-text {
            margin-top: 2px;
        }
    }

    .btn-and-price {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 36px;
        column-gap: 16px;
        row-gap: 10px;

        @media (max-width: ${breakpoints.sm}) {
            margin-top: 24px;
        }

        .prod-price {
            font-size: 16px;
            font-weight: bold;
            color: ${defaultTheme.color_black};
            text-decoration: line-through;
            align-self: flex-start;
        }

        .prod-discounted-price {
            margin-left: 6px;
            font-size: 20px;
            font-weight: bold;
            color: ${defaultTheme.color_red};
            align-self: flex-end;
        }
    }
`;

const ProductSizeWrapper = styled.div`
    margin-top: 24px;

    .prod-size-top {
        display: flex;
        gap: 20px;
    }
    .prod-size-list {
        display: flex;
        gap: 12px;
        margin-top: 16px;
        @media (max-width: ${breakpoints.sm}) {
            gap: 8px;
        }
    }

    .prod-size-item {
        position: relative;
        height: 38px;
        width: 38px;
        cursor: pointer;

        @media (max-width: ${breakpoints.sm}) {
            width: 32px;
            height: 32px;
        }

        input {
            position: absolute;
            top: 0;
            left: 0;
            width: 38px;
            height: 38px;
            opacity: 0;
            cursor: pointer;

            @media (max-width: ${breakpoints.sm}) {
                width: 32px;
                height: 32px;
            }

            &:checked + span {
                color: ${defaultTheme.color_white};
                background-color: ${defaultTheme.color_outerspace};
                border-color: ${defaultTheme.color_outerspace};
            }
        }

        span {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            border-radius: 8px;
            border: 1.5px solid ${defaultTheme.color_silver};
            text-transform: uppercase;

            @media (max-width: ${breakpoints.sm}) {
                width: 32px;
                height: 32px;
            }
        }
    }
`;

const ProductColorWrapper = styled.div`
    margin-top: 32px;

    @media (max-width: ${breakpoints.sm}) {
        margin-top: 24px;
    }

    .prod-colors-top {
        margin-bottom: 16px;
    }

    .prod-colors-list {
        display: flex;
        column-gap: 12px;
    }

    .prod-colors-item {
        position: relative;
        width: 22px;
        height: 22px;
        transition: ${defaultTheme.default_transition};

        &:hover {
            transform: scale(0.9);
        }

        input {
            position: absolute;
            top: 0;
            left: 0;
            width: 22px;
            height: 22px;
            opacity: 0;
            cursor: pointer;

            &:checked + span {
                outline: 1px solid ${defaultTheme.color_gray};
                outline-offset: 3px;
            }
        }

        .prod-colorbox {
            border-radius: 100%;
            width: 22px;
            height: 22px;
            display: inline-block;
        }
    }
`;

const ReviewsWrapper = styled.div`
    margin-top: 40px;

    .review-item {
        display: flex;
        padding: 20px;
        border-bottom: 1px solid ${defaultTheme.color_silver};

        &:hover {
            background-color: ${defaultTheme.color_lightgray};
        }

        .review-avatar {
            width: 50px;
            height: 50px;
            margin-right: 16px;
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }

        .review-content {
            flex: 1;
            .review-header {
                display: flex;
                align-items: center;
                margin-bottom: 4px;
                .review-user {
                    font-weight: bold;
                    margin-right: 8px;
                }
                .review-rating {
                    display: flex;
                    color: ${defaultTheme.color_yellow};
                    margin-left: auto;
                }
            }
            .review-comment {
                margin-bottom: 8px;
            }
            .review-hearts {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                color: ${defaultTheme.color_red};
                p {
                    margin-left: 4px;
                    line-height: 1;
                }
            }
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

const SmallStar = styled(FaStar)`
    margin-right: 2px;
    transition: transform 0.5s ease-in-out;
    font-size: 14px;

    &:hover {
        transform: scale(1.2);
    }
`;

const RatingWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const getColor = (rating, index) => {
    return index <= rating ? 'gold' : 'gray';
};

const Rating = ({ rating }) => {
    return (
        <RatingWrapper>
            {[1, 2, 3, 4, 5].map((index) => (
                <Star key={index} color={getColor(rating, index)} size="20px" />
            ))}
        </RatingWrapper>
    );
};

const SmallRating = ({ rating }) => {
    return (
        <RatingWrapper>
            {[1, 2, 3, 4, 5].map((index) => (
                <SmallStar key={index} color={getColor(rating, index)} />
            ))}
        </RatingWrapper>
    );
};

const ProductDetailsPage = () => {
    const { accessToken } = useAppStore();
    const { setCart, setTotalCartItem } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [brandName, setBrandName] = useState('');
    const { id } = useParams();

    const handleAddToCart = async () => {
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
            toast.error('Vui lòng đăng nhập để thêm vào giỏ hàng', {
                position: 'top-center',
                autoClose: 2000,
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await productApi.getById(id);
                if (response.status === 200) {
                    setProduct(response.data);
                    setBrandName(response.data.brand.brand_name);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    if (!product) return null;

    const breadcrumbItems = [
        { label: 'Shop', link: '' },
        { label: product.brand.brand_name, link: '' },
        { label: product.shoe_name, link: '' },
    ];

    return (
        <DetailsScreenWrapper>
            <Container>
                <Breadcrumb items={breadcrumbItems} />
                <DetailsContent className="grid">
                    <img src={product.image_url} alt={product.shoe_name} />
                    <ProductDetailsWrapper>
                        <h2 className="prod-title">{product.shoe_name}</h2>
                        <div className="flex items-center rating-and-comments flex-wrap">
                            <div className="prod-rating flex items-center">
                                <Rating rating={product.avg_rating} />
                                <span className="text-gray text-xs">{product.avg_rating}</span>
                            </div>
                            <div className="prod-comments flex items-start">
                                <span className="prod-comment-icon text-gray">
                                    <i className="bi bi-chat-left-text"></i>
                                </span>
                                <span className="prod-comment-text text-sm text-gray">
                                    {product.reviews.length} bình luận
                                </span>
                            </div>
                        </div>
                        <div className="prod-description">
                            <p className="text-lg font-semibold text-outerspace">Mô tả</p>
                            <p>{product.description}</p>
                        </div>
                        <ProductSizeWrapper>
                            <div className="prod-size-top flex items-center flex-wrap">
                                <p className="text-lg font-semibold text-outerspace">Kích thước</p>
                            </div>
                            <div className="prod-size-list flex items-center">
                                <div className="prod-size-item">
                                    <input type="radio" name="size" checked />
                                    <span className="flex items-center justify-center font-medium text-outerspace text-sm">
                                        {product.size.size_number}
                                    </span>
                                </div>
                            </div>
                        </ProductSizeWrapper>
                        <ProductColorWrapper>
                            <div className="prod-colors-top flex items-center flex-wrap">
                                <p className="text-lg font-semibold text-outerspace">Màu sắc</p>
                            </div>
                            <div className="prod-colors-list flex items-center">
                                <div className="prod-colors-item">
                                    <input type="radio" name="colors" checked />
                                    <span
                                        className="prod-colorbox"
                                        style={{ background: product.color.hex_value }}
                                    ></span>
                                </div>
                            </div>
                        </ProductColorWrapper>
                        <div className="btn-and-price flex items-center flex-wrap justify-center">
                            <div className="prod-colors-top flex items-center flex-wrap">
                                <p className="text-lg font-semibold text-outerspace">Giá cả</p>
                            </div>
                            <div>
                                <span className="prod-price">{currencyFormat(product.display_price)}</span>
                                <span className="prod-discounted-price">
                                    {currencyFormat(product.discounted_price)}
                                </span>
                            </div>
                            <BaseButtonGreen className="prod-add-btn" onClick={handleAddToCart}>
                                <span className="prod-add-btn-icon">
                                    <Icons icon="cart" width={20} height={20} color={defaultTheme.color_white} />
                                </span>
                                <span className="prod-add-btn-text">Thêm vào giỏ hàng</span>
                            </BaseButtonGreen>
                        </div>
                    </ProductDetailsWrapper>
                </DetailsContent>
                <ReviewsWrapper>
                    <h3>Bình luận</h3>
                    {product.reviews.map((review, index) => (
                        <div key={index} className="review-item">
                            <div className="review-avatar">
                                <img src={review.user.avatar_url} alt={review.user.display_name} />
                            </div>
                            <div className="review-content">
                                <div className="review-header">
                                    <div className="review-user">{review.user.display_name}</div>
                                    <div className="review-rating">
                                        <SmallRating rating={review.rating} />
                                    </div>
                                </div>
                                <div className="review-comment">{review.comment}</div>
                                <div className="review-hearts">
                                    <Icons icon="heart" width={20} height={20} color={defaultTheme.color_red} />{' '}
                                    <p>{review.heart_count}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </ReviewsWrapper>
                <ProductSimilar brandName={brandName} />
            </Container>
        </DetailsScreenWrapper>
    );
};

export default ProductDetailsPage;
