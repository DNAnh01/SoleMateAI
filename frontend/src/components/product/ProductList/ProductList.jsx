import styled from 'styled-components';
import ProductItem from '~/components/product/ProductItem';
import { PropTypes } from 'prop-types';
import { breakpoints } from '~/styles/themes/default';
import { useContext } from 'react';
import { AppContext } from '~/contexts/app.context';

const ProductListWrapper = styled.div`
    column-gap: 20px;
    row-gap: 40px;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));

    @media (max-width: ${breakpoints.sm}) {
        gap: 12px;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
`;

const ProductList = () => {
    const { products } = useContext(AppContext);
    return (
        <ProductListWrapper className="grid">
            {products?.map((product) => {
                return <ProductItem key={product.id} product={product} />;
            })}
        </ProductListWrapper>
    );
};

export default ProductList;

ProductList.propTypes = {
    products: PropTypes.array,
};
