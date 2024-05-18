import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { commonCardStyles } from '~/styles/card';
import { breakpoints } from '~/styles/themes/default';

const ProductCardWrapper = styled(Link)`
    ${commonCardStyles}
    @media(max-width: ${breakpoints.sm}) {
        padding-left: 0;
        padding-right: 0;
    }

    .product-img {
        height: 393px;
        position: relative;

        @media (max-width: ${breakpoints.sm}) {
            height: 320px;
        }
    }
`;

const ProductItem = ({ product }) => {
    return (
        <ProductCardWrapper key={product.id} to="/product/details">
            <div className="product-img">
                <img className="object-fit-cover" src={product?.image_url} alt="" />
            </div>
            <div className="product-info">
                <p className="font-bold">{product?.shoe_name}</p>
                <div className="flex items-center justify-between text-sm font-medium">
                    <span className="text-gray">{product?.brand?.brand_name}</span>
                    <span className="text-outerspace font-bold">${product?.discounted_price}</span>
                </div>
            </div>
        </ProductCardWrapper>
    );
};

export default ProductItem;

ProductItem.propTypes = {
    product: PropTypes.object,
};
