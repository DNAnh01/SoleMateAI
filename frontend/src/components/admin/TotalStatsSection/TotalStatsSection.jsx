import React, { useContext } from 'react';
import styled from 'styled-components';
import { breakpoints, defaultTheme } from '~/styles/themes/default';
import Card from '../Card';
import Icons from '~/components/common/Icons/Icons';
import { currencyFormat } from '~/utils/helper';
import { DashboardContext } from '~/contexts/dashboard.context';

const GridContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0.4rem;

    @media (max-width: ${breakpoints.md}) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: ${breakpoints.sm}) {
        grid-template-columns: 1fr;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 1.2rem;
    color: ${(props) => props.color || defaultTheme.color_black};
`;

const TotalStatsSection = () => {
    const { totalStatsByFilter } = useContext(DashboardContext);
    const responseData = totalStatsByFilter;
    const transformData = {
        revenue_cost: {
            title: 'Tổng doanh thu',
            icon: 'uptrend',
            value: responseData?.revenue_cost || 0,
            color: defaultTheme.color_blue,
        },
        profit_cost: {
            title: 'Tổng lợi nhuận',
            icon: 'profit',
            value: responseData?.profit_cost || 0,
            color: defaultTheme.color_yellow_green,
        },
        warehouse_cost: {
            title: 'Tổng chi phí kho',
            icon: 'warehouse',
            value: responseData?.warehouse_cost || 0,
            color: defaultTheme.color_yellow,
        },
        total_items_sold: {
            title: 'Tổng số sản phẩm bán được',
            icon: 'total_items',
            value: responseData?.total_items_sold || 0,
            color: defaultTheme.color_red,
        },
    };
    return (
        <GridContainer>
            {Object.entries(transformData).map(([key, { title, icon, value, color }]) => (
                <Card
                    key={key}
                    headline={title}
                    children={
                        <ContentWrapper color={color}>
                            <Icons icon={icon} width={30} className="mr-2" color={color} />
                            {icon !== 'total_items' ? currencyFormat(value) : value}
                        </ContentWrapper>
                    }
                />
            ))}
        </GridContainer>
    );
};

export default TotalStatsSection;
