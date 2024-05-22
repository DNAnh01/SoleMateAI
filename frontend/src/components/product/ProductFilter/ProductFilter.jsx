import { useContext, useEffect, useState } from 'react';
import { BrandsFilter, ColorsFilter, FilterTitle, FilterWrap, PriceFilter, SizesFilter } from '~/styles/filter';
import Color from './components/Color';
import Brand from './components/Brand';
import Price from './components/Price';
import Size from './components/Size';
import { getUniqueProperties } from '~/utils/helper';
import useDebounce from '~/hooks';
import { ProductFilterContext } from '~/contexts/productFilter.context';

const ProductFilter = ({ products }) => {
    const { setMinRange: updateMinRange } = useContext(ProductFilterContext);
    const { setMaxRange: updateMaxRange } = useContext(ProductFilterContext);

    const [isBrandFilterOpen, setBrandFilterOpen] = useState(true);
    const [isPriceFilterOpen, setPriceFilterOpen] = useState(true);
    const [isColorFilterOpen, setColorFilterOpen] = useState(true);
    const [isSizeFilterOpen, setSizeFilterOpen] = useState(true);

    const { uniqueColors, uniqueBrands, uniqueSizes, minPrice, maxPrice } = getUniqueProperties(products);
    const uniqueMinRangeInitial = minPrice - 100000;
    const uniqueMaxRangeInitial = maxPrice + 100000;

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

    const rangeMin = 1000;
    const [minRange, setMinRange] = useState(uniqueMinRangeInitial);
    const [maxRange, setMaxRange] = useState(uniqueMaxRangeInitial);

    const handleInputChange = (e) => {
        const inputName = e.target.name;
        const inputValue = parseInt(e.target.value);

        if (inputName === 'min') {
            setMinRange(inputValue);
        } else if (inputName === 'max') {
            setMaxRange(inputValue);
        }
    };

    const debouncedMinRange = useDebounce(minRange, 1000);
    const debouncedMaxRange = useDebounce(maxRange, 1000);

    useEffect(() => {
        if (maxRange - debouncedMinRange < rangeMin) {
            setMaxRange(debouncedMinRange + rangeMin);
        }
    }, [debouncedMinRange, maxRange, rangeMin]);

    useEffect(() => {
        if (debouncedMaxRange - minRange < rangeMin) {
            setMinRange(debouncedMaxRange - rangeMin);
        }
    }, [debouncedMaxRange, minRange, rangeMin]);

    useEffect(() => {
        updateMinRange(minRange);
        updateMaxRange(maxRange);
        console.log('minRange', minRange);
        console.log('maxRange', maxRange);
    }, [minRange, maxRange, updateMinRange, updateMaxRange]);

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
                        <Brand uniqueBrands={uniqueBrands} />
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
                        <Color uniqueColors={uniqueColors} />
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
                        <Size uniqueSizes={uniqueSizes} />
                    </div>
                </FilterWrap>
            </SizesFilter>
        </>
    );
};

export default ProductFilter;
