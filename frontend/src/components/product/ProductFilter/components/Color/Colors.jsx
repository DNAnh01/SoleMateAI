import React from 'react';

const Color = ({ handleChange, uniqueColors }) => {
    return (
        <>
            {uniqueColors.map((color) => (
                <div className="colors-item text-center flex flex-col justify-center items-center">
                    <input type="radio" onChange={handleChange} value={color?.color_name} name={color?.color_name} />
                    <span style={{ backgroundColor: color?.hex_value }}></span>
                </div>
            ))}
        </>
    );
};

export default Color;
