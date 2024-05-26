import React, { useContext, useEffect, useState } from 'react';
import { ProductFilterContext } from '~/contexts/productFilter.context';

const Size = ({ uniqueSizes }) => {
    const { setSizes } = useContext(ProductFilterContext);
    const [activeSizes, setActiveSizes] = useState([]);

    const handleChange = (size_number) => {
        if (activeSizes.includes(size_number)) {
            setActiveSizes(activeSizes.filter((size) => size !== size_number));
        } else {
            setActiveSizes([...activeSizes, size_number]);
        }
    };
    useEffect(() => {
        setSizes(activeSizes);
    }, [activeSizes, setSizes]);

    return (
        <>
            {uniqueSizes.map((size) => (
                <div
                    key={size.size_number}
                    className={`sizes-item text-sm font-semibold text-outerspace w-full ${
                        activeSizes.includes(size.size_number) ? 'active' : ''
                    }`}
                    onClick={() => handleChange(size.size_number)}
                >
                    <input type="checkbox" value={size.size_number} name={size.size_number} />
                    <span className="flex items-center justify-center uppercase">{size.size_number}</span>
                </div>
            ))}
        </>
    );
};

export default Size;
