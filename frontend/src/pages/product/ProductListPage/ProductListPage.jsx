import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Container } from '~/styles/styles';
import Breadcrumb from '~/components/common/Breadcrumb';
import ProductList from '~/components/product/ProductList';
import ProductFilter from '~/components/product/ProductFilter';
import Pagination from '~/components/common/Pagination';
import { breakpoints, defaultTheme } from '~/styles/themes/default';
import { ProductFilterContext } from '~/contexts/productFilter.context';
import useAppStore from '~/store';

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
    const { products } = useAppStore();

    const { brands, minRange, maxRange, colors, sizes } = useContext(ProductFilterContext);
    const filteredProducts = products.filter((product) => {
        // Check if the product's brand is in the selected brands or if no brands are selected
        const isBrandSelected = brands.length === 0 || brands.includes(product?.brand?.brand_name);

        // Check if the product's price is within the selected price range
        const isWithinPriceRange = product?.discounted_price >= minRange && product?.discounted_price <= maxRange;

        // Check if the product's color is in the selected colors or if no colors are selected
        const isColorSelected = colors.length === 0 || colors.includes(product?.color?.color_name);

        // Check if the product's size is in the selected sizes or if no sizes are selected
        const isSizeSelected = sizes.length === 0 || sizes.includes(product?.size?.size_number);

        // A product passes the filter if it meets all the above conditions
        return isBrandSelected && isWithinPriceRange && isColorSelected && isSizeSelected;
    });

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const currentProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

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
