import styled from 'styled-components';
import Hero from '~/components/home/Hero';
// import TopProductList from '~/components/home/TopProductList';
import Catalog from '~/components/home/Catalog';
import { products } from '~/data/data.api.productlist';
import Brands from '~/components/home/Brands';

const HomePageWrapper = styled.main``;

const HomePage = () => {
    const dataCatalog = [...products.slice(4, 11), products[1]];
    return (
        <HomePageWrapper>
            <Hero />
            <Brands />
            {/*<TopProductList title={'Sản phẩm mới'} />
    <TopProductList title={'Sản phẩm bán chạy'} />*/}
            <Catalog catalogTitle={'Các sản phẩm'} products={dataCatalog} />
        </HomePageWrapper>
    );
};

export default HomePage;
