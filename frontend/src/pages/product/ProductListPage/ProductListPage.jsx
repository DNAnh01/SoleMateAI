import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Container } from '~/styles/styles';
import Breadcrumb from '~/components/common/Breadcrumb';
import ProductList from '~/components/product/ProductList';
import ProductFilter from '~/components/product/ProductFilter';
import Pagination from '~/components/common/Pagination';
import { AppContext } from '~/contexts/app.context';
import { breakpoints, defaultTheme } from '~/styles/themes/default';
import { getMinMaxDiscountedPrice } from '~/utils/helper';

const ProductsContent = styled.div`
    display: grid;
    grid-template-columns: 320px auto;
    margin: 20px 0;

    @media (max-width: ${breakpoints.xl}) {
        grid-template-columns: 260px auto;
    }

    @media (max-width: ${breakpoints.lg}) {
        grid-template-columns: 100%;
        row-gap: 24px;
    }
`;

const ProductsContentLeft = styled.div`
    border: 1px solid ${defaultTheme.color_gray};
    border-radius: 12px;
    box-shadow: ${defaultTheme.color_dim_gray} 0 10px 50px;
    overflow: hidden;

    @media (max-width: ${breakpoints.lg}) {
        display: grid;
    }
`;

const ProductsContentRight = styled.div`
    padding: 16px 40px;

    @media (max-width: ${breakpoints.lg}) {
        padding-left: 12px;
        padding-right: 12px;
    }

    @media (max-width: ${breakpoints.sm}) {
        padding-left: 0;
        padding-right: 0;
    }

    .product-card-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
        gap: 20px;
    }

    .product-card {
        padding-left: 0;
        padding-right: 0;
    }
`;

const ProductListPage = () => {
    const breadcrumbItems = [
        { label: 'Home', link: '/' },
        { label: 'Products', link: '' },
    ];
    const { products } = useContext(AppContext);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const currentProducts = products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

    return (
        <main className="page-py-spacing">
            <Container>
                <Breadcrumb items={breadcrumbItems} />
                <ProductsContent className="grid items-start">
                    <ProductsContentLeft>
                        <ProductFilter products={products} />
                    </ProductsContentLeft>
                    <ProductsContentRight>
                        <ProductList products={currentProducts} />
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </ProductsContentRight>
                </ProductsContent>
            </Container>
        </main>
    );
};

export default ProductListPage;
