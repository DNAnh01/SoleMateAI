import React, { useContext, useEffect, useState } from 'react';
import { ProductFilterContext } from '~/contexts/productFilter.context';

const Color = ({ uniqueColors }) => {
    const { setColors } = useContext(ProductFilterContext);
    const [activeColors, setActiveColors] = useState([]);

    const handleChange = (color_name) => {
        if (activeColors.includes(color_name)) {
            setActiveColors(activeColors.filter((color) => color !== color_name));
        } else {
            setActiveColors([...activeColors, color_name]);
        }
    };
    useEffect(() => {
        setColors(activeColors);
    }, [activeColors, setColors]);

    return (
        <>
            {uniqueColors.map((color) => (
                <div
                    key={color.color_name}
                    className={`colors-item text-center flex flex-col justify-center items-center
                    ${activeColors.includes(color.color_name) ? 'active' : ''}
                `}
                    onClick={() => handleChange(color.color_name)}
                >
                    <input type="checkbox" onChange={() => {}} value={color.color_name} name={color.color_name} />
                    <span style={{ backgroundColor: color.hex_value }}></span>
                </div>
            ))}
        </>
    );
};

export default Color;
