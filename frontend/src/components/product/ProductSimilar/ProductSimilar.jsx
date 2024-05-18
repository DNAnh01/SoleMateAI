import { products } from '~/data/data.api.productlist';
import { Section } from '~/styles/styles';
import Title from '~/components/common/Title';
import ProductList from '~/components/product/ProductList';

const ProductSimilar = () => {
    return (
        <Section>
            <Title titleText={'Similar Products'} />
            <ProductList products={products.slice(0, 4)} />
        </Section>
    );
};

export default ProductSimilar;
