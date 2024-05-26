import { Section } from '~/styles/styles';
import Title from '~/components/common/Title';
import ProductList from '~/components/product/ProductList';
import useAppStore from '~/store';

const ProductSimilar = ({ brandName }) => {
    const { products } = useAppStore();
    // filter products to get similar products
    const similarProducts = products.filter((product) => product?.brand?.brand_name === brandName);
    return (
        <Section>
            <Title titleText={'Sản phẩm tương tự'} />
            <ProductList products={similarProducts.slice(0, 4)} />
        </Section>
    );
};

export default ProductSimilar;
