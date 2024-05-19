import { useState } from 'react';
import {
    ColorsFilter,
    FilterTitle,
    FilterWrap,
    PriceFilter,
    ProductCategoryFilter,
    SizesFilter,
} from '~/styles/filter';
// import { ProductFilterList } from '~/data/data.mock';
import { products } from '~/data/data.api.productlist';
import { staticImages } from '~/utils/images';

const ProductFilter = () => {
    const [isProductFilterOpen, setProductFilterOpen] = useState(true);
    const [isPriceFilterOpen, setPriceFilterOpen] = useState(true);
    const [isColorFilterOpen, setColorFilterOpen] = useState(true);
    const [isSizeFilterOpen, setSizeFilterOpen] = useState(true);
    const [isStyleFilterOpen, setStyleFilterOpen] = useState(true);

    const toggleFilter = (filter) => {
        switch (filter) {
            case 'product':
                setProductFilterOpen(!isProductFilterOpen);
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
            case 'style':
                setStyleFilterOpen(!isStyleFilterOpen);
                break;
            default:
                break;
        }
    };

    const rangeMin = 100;
    const [minRange, setMinRange] = useState(300);
    const [maxRange, setMaxRange] = useState(700);

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

    const calculateRangePosition = (value, max) => {
        return (value / max) * 100 + '%';
    };

    return (
        <>
            <ProductCategoryFilter>
                <FilterTitle
                    className="filter-title flex items-center justify-between"
                    onClick={() => toggleFilter('product')}
                >
                    <p className="filter-title-text text-gray text-base font-semibold text-lg">Thương hiệu</p>
                    <span className={`text-gray text-xxl filter-title-icon ${!isProductFilterOpen ? 'rotate' : ''}`}>
                        <i className="bi bi-filter"></i>
                    </span>
                </FilterTitle>
                <FilterWrap className={`${!isProductFilterOpen ? 'hide' : 'show'}`}>
                    {products?.map((product) => {
                        return (
                            <div className="product-filter-item" key={product.id}>
                                <button
                                    type="button"
                                    className="filter-item-head w-full flex items-center justify-between"
                                >
                                    <span className="filter-head-title text-base text-gray font-semibold">
                                        {product?.brand?.brand_name}
                                    </span>
                                    <span className="filter-head-icon text-gray">
                                        <i className="bi bi-chevron-right"></i>
                                    </span>
                                </button>
                            </div>
                        );
                    })}
                </FilterWrap>
            </ProductCategoryFilter>

            <PriceFilter>
                <FilterTitle
                    className="filter-title flex items-center justify-between"
                    onClick={() => toggleFilter('price')}
                >
                    <p className="filter-title-text text-gray text-base font-semibold text-lg">Giá</p>
                    <span className={`text-gray text-xl filter-title-icon ${!isPriceFilterOpen ? 'rotate' : ''}`}>
                        <i className="bi bi-chevron-up"></i>
                    </span>
                </FilterTitle>
                <FilterWrap className={`range filter-wrap ${!isPriceFilterOpen ? 'hide' : 'show'}`}>
                    <div className="range-slider">
                        <span
                            className="range-selected h-full bg-sea-green"
                            style={{
                                left: calculateRangePosition(minRange, 2000000),
                                right: calculateRangePosition(2000000 - maxRange, 2000000),
                            }}
                        ></span>
                    </div>
                    <div className="range-input">
                        <input
                            type="range"
                            className="min w-full"
                            min="0"
                            max="2000000"
                            value={minRange}
                            step="10"
                            name="min"
                            onChange={handleInputChange}
                        />
                        <input
                            type="range"
                            className="min w-full"
                            min="0"
                            max="2000000"
                            value={maxRange}
                            step="10"
                            name="max"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="range-price w-full flex items-center">
                        <input
                            type="number"
                            className="text-center"
                            name="min"
                            value={minRange}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            className="text-center"
                            name="max"
                            value={maxRange}
                            onChange={handleInputChange}
                        />
                    </div>
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
                        <div className="colors-item text-center flex flex-col justify-center items-center">
                            <input type="checkbox" />
                            <img src={staticImages.color1} alt="" />
                        </div>
                        <div className="colors-item text-center flex flex-col justify-center items-center">
                            <input type="checkbox" />
                            <img src={staticImages.color2} alt="" />
                        </div>
                        <div className="colors-item text-center flex flex-col justify-center items-center">
                            <input type="checkbox" />
                            <img src={staticImages.color3} alt="" />
                        </div>
                        <div className="colors-item text-center flex flex-col justify-center items-center">
                            <input type="checkbox" />
                            <img src={staticImages.color4} alt="" />
                        </div>
                        <div className="colors-item text-center flex flex-col justify-center items-center">
                            <input type="checkbox" />
                            <img src={staticImages.color5} alt="" />
                        </div>
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
                        <div className="sizes-item text-sm font-semibold text-outerspace w-full">
                            <input type="checkbox" />
                            <span className="flex items-center justify-center uppercase">38</span>
                        </div>
                        <div className="sizes-item text-sm font-semibold text-outerspace w-full">
                            <input type="checkbox" />
                            <span className="flex items-center justify-center uppercase">39</span>
                        </div>
                        <div className="sizes-item text-sm font-semibold text-outerspace w-full">
                            <input type="checkbox" />
                            <span className="flex items-center justify-center uppercase">40</span>
                        </div>
                        <div className="sizes-item text-sm font-semibold text-outerspace w-full">
                            <input type="checkbox" />
                            <span className="flex items-center justify-center uppercase">41</span>
                        </div>
                        <div className="sizes-item text-sm font-semibold text-outerspace w-full">
                            <input type="checkbox" />
                            <span className="flex items-center justify-center uppercase">42</span>
                        </div>
                        <div className="sizes-item text-sm font-semibold text-outerspace w-full">
                            <input type="checkbox" />
                            <span className="flex items-center justify-center uppercase">43</span>
                        </div>
                    </div>
                </FilterWrap>
            </SizesFilter>
        </>
    );
};

export default ProductFilter;
