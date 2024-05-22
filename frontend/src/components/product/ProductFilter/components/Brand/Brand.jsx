import React, { useContext, useEffect, useState } from 'react';
import { ProductFilterContext } from '~/contexts/productFilter.context';

const Brand = ({ uniqueBrands }) => {
    const [activeBrands, setActiveBrands] = useState([]);
    const { setBrands } = useContext(ProductFilterContext);
    const handleChange = (brand_name) => {
        if (activeBrands.includes(brand_name)) {
            setActiveBrands(activeBrands.filter((brand) => brand !== brand_name));
        } else {
            setActiveBrands([...activeBrands, brand_name]);
        }
    };
    useEffect(() => {
        setBrands(activeBrands);
    }, [activeBrands, setBrands]);

    return (
        <>
            {uniqueBrands.map((brand) => (
                <div
                    key={brand.brand_name}
                    className={`brands-item text-center flex flex-col justify-center items-center
                    ${activeBrands.includes(brand.brand_name) ? 'active' : ''}
                `}
                    onClick={() => handleChange(brand.brand_name)}
                >
                    <input type="checkbox" onChange={() => {}} value={brand.brand_name} name={brand.brand_name} />
                    <img src={brand.brand_logo} alt={brand.brand_name} />
                </div>
            ))}
        </>
    );
};

export default Brand;
