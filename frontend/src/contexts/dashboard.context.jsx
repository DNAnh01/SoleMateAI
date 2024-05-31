import { createContext, useState } from 'react';

export const getInitialDashboardContext = () => ({
    chartStatsByFilter: [],
    setChartStatsByFilter: () => null,
    totalStatsByFilter: {},
    setTotalStatsByFilter: () => null,
});

const initialDashboardContext = getInitialDashboardContext();

export const DashboardContext = createContext(initialDashboardContext);

export const DashboardProvider = ({ children, defaultValue = initialDashboardContext }) => {
    const [chartStatsByFilter, setChartStatsByFilter] = useState(defaultValue.chartStatsByFilter);
    const [totalStatsByFilter, setTotalStatsByFilter] = useState(defaultValue.totalStatsByFilter);
    return (
        <DashboardContext.Provider
            value={{
                chartStatsByFilter,
                setChartStatsByFilter,
                totalStatsByFilter,
                setTotalStatsByFilter,
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};
