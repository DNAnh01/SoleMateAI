import { createContext, useState } from 'react';

export const getInitialProductFilterContext = () => ({
    brands: [],
    setBrands: () => null,
    minRange: Infinity,
    setMinRange: () => null,
    maxRange: -Infinity,
    setMaxRange: () => null,
    colors: [],
    setColors: () => null,
    sizes: [],
    setSizes: () => null,
});

const initialProductFilterContext = getInitialProductFilterContext();

export const ProductFilterContext = createContext(initialProductFilterContext);

export const ProductFilterProvider = ({ children, defaultValue = initialProductFilterContext }) => {
    const [brands, setBrands] = useState(defaultValue.brands);
    const [minRange, setMinRange] = useState(defaultValue.minRange);
    const [maxRange, setMaxRange] = useState(defaultValue.maxRange);
    const [colors, setColors] = useState(defaultValue.colors);
    const [sizes, setSizes] = useState(defaultValue.sizes);

    return (
        <ProductFilterContext.Provider
            value={{
                brands,
                setBrands,
                minRange,
                setMinRange,
                maxRange,
                setMaxRange,
                colors,
                setColors,
                sizes,
                setSizes,
            }}
        >
            {children}
        </ProductFilterContext.Provider>
    );
};
