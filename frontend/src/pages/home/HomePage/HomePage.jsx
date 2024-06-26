import styled from 'styled-components';
import Hero from '~/components/home/Hero';
import Catalog from '~/components/home/Catalog';
import Brands from '~/components/home/Brands';
import { useContext, useState } from 'react';
import Pagination from '~/components/common/Pagination';
import { AppContext } from '~/contexts/app.context';

const HomePageWrapper = styled.main``;

const HomePage = () => {
    const { products, latestProducts } = useContext(AppContext);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const currentProducts = products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

    return (
        <HomePageWrapper>
            <Hero />
            <Brands />
            {/*<TopProductList title={'Sản phẩm mới nhất'} /> */}
            <Catalog catalogTitle={'Các sản phẩm mới nhất'} products={latestProducts} />
            <Catalog catalogTitle={'Các sản phẩm'} products={currentProducts} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </HomePageWrapper>
    );
};

export default HomePage;
