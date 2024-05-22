import { useState } from 'react';
import { BrandsFilter, ColorsFilter, FilterTitle, FilterWrap, PriceFilter, SizesFilter } from '~/styles/filter';
import Color from './components/Color';
import Brand from './components/Brand';
import Price from './components/Price';
import Size from './components/Size';
import { getUniqueProperties } from '~/utils/helper';

const ProductFilter = ({ products }) => {
    const [isBrandFilterOpen, setBrandFilterOpen] = useState(false);
    const [isPriceFilterOpen, setPriceFilterOpen] = useState(false);
    const [isColorFilterOpen, setColorFilterOpen] = useState(false);
    const [isSizeFilterOpen, setSizeFilterOpen] = useState(false);

    const { uniqueColors, uniqueBrands, uniqueSizes, minPrice, maxPrice } = getUniqueProperties(products);
    const uniqueMinRangeInitial = minPrice;
    const uniqueMaxRangeInitial = maxPrice;

    const toggleFilter = (filter) => {
        switch (filter) {
            case 'brand':
                setBrandFilterOpen(!isBrandFilterOpen);
                break;
            case 'price':
                setPriceFilterOpen(!isPriceFilterOpen);
                break;
            case 'color':
                setColorFilterOpen(!isColorFilterOpen);
                break;
            case 'size':
                setSizeFilterOpen(!isSizeFilterOpen);
                break;
            default:
                break;
        }
    };

    const rangeMin = 100000;
    const [minRange, setMinRange] = useState(uniqueMinRangeInitial + 100000);
    const [maxRange, setMaxRange] = useState(uniqueMaxRangeInitial - 100000);

    const handleInputChange = (e) => {
        const inputName = e.target.name;
        const inputValue = parseInt(e.target.value);

        if (inputName === 'min') {
            setMinRange(inputValue);
            if (maxRange - inputValue < rangeMin) {
                setMaxRange(inputValue + rangeMin);
            }
        } else if (inputName === 'max') {
            setMaxRange(inputValue);
            if (inputValue - minRange < rangeMin) {
                setMinRange(inputValue - rangeMin);
            }
        }
    };

    return (
        <>
            <BrandsFilter>
                <FilterTitle
                    className="filter-title flex items-center justify-between"
                    onClick={() => toggleFilter('brand')}
                >
                    <p className="filter-title-text text-gray text-base font-semibold text-lg">Thương hiệu</p>
                    <span className={`text-gray text-xxl filter-title-icon ${!isBrandFilterOpen ? 'rotate' : ''}`}>
                        <i className="bi bi-filter"></i>
                    </span>
                </FilterTitle>
                <FilterWrap className={`${!isBrandFilterOpen ? 'hide' : 'show'}`}>
                    <div className="brands-list grid">
                        <Brand handleChange={() => {}} uniqueBrands={uniqueBrands} />
                    </div>
                </FilterWrap>
            </BrandsFilter>

            <PriceFilter>
                <FilterTitle
                    className="filter-title flex items-center justify-between"
                    onClick={() => toggleFilter('price')}
                >
                    <p className="filter-title-text text-gray text-base font-semibold text-lg">Giá cả</p>
                    <span className={`text-gray text-xl filter-title-icon ${!isPriceFilterOpen ? 'rotate' : ''}`}>
                        <i className="bi bi-chevron-up"></i>
                    </span>
                </FilterTitle>
                <FilterWrap className={`range filter-wrap ${!isPriceFilterOpen ? 'hide' : 'show'}`}>
                    <Price
                        handleChange={handleInputChange}
                        uniqueMinRangeInitial={uniqueMinRangeInitial}
                        uniqueMaxRangeInitial={uniqueMaxRangeInitial}
                        minRange={minRange}
                        maxRange={maxRange}
                    />
                </FilterWrap>
            </PriceFilter>

            <ColorsFilter>
                <FilterTitle className="flex items-center justify-between" onClick={() => toggleFilter('color')}>
                    <p className="filter-title-text text-gray text-base font-semibold text-lg">Màu sắc</p>
                    <span className={`text-gray text-xl filter-title-icon ${!isColorFilterOpen ? 'rotate' : ''}`}>
                        <i className="bi bi-chevron-up"></i>
                    </span>
                </FilterTitle>
                <FilterWrap className={`${!isColorFilterOpen ? 'hide' : 'show'}`}>
                    <div className="colors-list grid">
                        <Color handleChange={() => {}} uniqueColors={uniqueColors} />
                    </div>
                </FilterWrap>
            </ColorsFilter>
            <SizesFilter>
                <FilterTitle className="flex items-center justify-between" onClick={() => toggleFilter('size')}>
                    <p className="filter-title-text text-gray text-base font-semibold text-lg">Kích cỡ</p>
                    <span className={`text-gray text-xl filter-title-icon ${!isSizeFilterOpen ? 'rotate' : ''}`}>
                        <i className="bi bi-chevron-up"></i>
                    </span>
                </FilterTitle>
                <FilterWrap className={`${!isSizeFilterOpen ? 'hide' : 'show'}`}>
                    <div className="sizes-list grid text-center justify-center">
                        <Size handleChange={() => {}} uniqueSizes={uniqueSizes} />
                    </div>
                </FilterWrap>
            </SizesFilter>
        </>
    );
};

export default ProductFilter;
