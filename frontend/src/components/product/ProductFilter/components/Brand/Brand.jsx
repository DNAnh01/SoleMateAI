import React from 'react';

const Brand = ({ handleChange, uniqueBrands }) => {
    return (
        <>
            {uniqueBrands.map((brand) => (
                <div className="brands-item text-center flex flex-col justify-center items-center">
                    <input type="radio" onChange={handleChange} value={brand?.brand_name} name={brand?.brand_name} />
                    <img src={brand?.brand_logo} alt={brand?.brand_name} />
                </div>
            ))}
        </>
    );
};

export default Brand;
