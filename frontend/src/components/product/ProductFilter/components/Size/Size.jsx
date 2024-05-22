import React from 'react';

const Size = ({ handleChange, uniqueSizes }) => {
    return (
        <>
            {uniqueSizes.map((size) => (
                <div className="sizes-item text-sm font-semibold text-outerspace w-full">
                    <input type="radio" onChange={handleChange} value={size?.size_number} name={size?.size_number} />
                    <span className="flex items-center justify-center uppercase">{size?.size_number}</span>
                </div>
            ))}
        </>
    );
};

export default Size;
