import React from 'react';

const Price = ({ handleChange, uniqueMinRangeInitial, uniqueMaxRangeInitial, minRange, maxRange }) => {
    const calculateRangePosition = (value, max) => {
        return (value / max) * 100 + '%';
    };
    return (
        <>
            <div className="range-slider">
                <span
                    className="range-selected h-full bg-sea-green"
                    style={{
                        left: calculateRangePosition(uniqueMinRangeInitial, uniqueMaxRangeInitial),
                        right: calculateRangePosition(
                            uniqueMaxRangeInitial - uniqueMaxRangeInitial,
                            uniqueMaxRangeInitial,
                        ),
                    }}
                ></span>
            </div>
            <div className="range-input">
                <input
                    type="range"
                    className="min w-full"
                    min={uniqueMinRangeInitial}
                    max={uniqueMaxRangeInitial}
                    value={minRange}
                    step="10"
                    name="min"
                    onChange={handleChange}
                />
                <input
                    type="range"
                    className="min w-full"
                    min={uniqueMinRangeInitial}
                    max={uniqueMaxRangeInitial}
                    value={maxRange}
                    step="10"
                    name="max"
                    onChange={handleChange}
                />
            </div>
            <div className="range-price w-full flex items-center">
                <input type="number" className="text-center" name="min" value={minRange} onChange={handleChange} />
                <input type="number" className="text-center" name="max" value={maxRange} onChange={handleChange} />
            </div>
        </>
    );
};

export default Price;
