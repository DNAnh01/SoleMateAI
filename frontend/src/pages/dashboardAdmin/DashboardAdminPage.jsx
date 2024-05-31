import React from 'react';
import styled from 'styled-components';
import Card from '~/components/admin/Card';
import ChartStatsSection from '~/components/admin/ChartStatsSection';
import TotalStatsSection from '~/components/admin/TotalStatsSection';

import { breakpoints, defaultTheme } from '~/styles/themes/default';

const GridContainer = styled.div`
    height: 100%;
    display: grid;
    grid-template-areas:
        'section1'
        'section1'
        'section2'
        'section2'
        'section2'
        'section2'
        'section2'
        'section2'
        'section2'
        'section2'
        'section2'
        'section2';
    grid-template-rows: repeat(12, 1fr);
    grid-template-columns: 1fr;
    grid-gap: 0.4rem;

    @media (max-width: ${breakpoints.lg}) {
        grid-template-areas:
            'section1'
            'section1'
            'section2'
            'section2'
            'section2'
            'section2'
            'section2'
            'section2';
        grid-template-rows: repeat(8, 1fr);
        grid-gap: 0.2rem;
    }

    @media (max-width: ${breakpoints.md}) {
        grid-template-areas:
            'section1'
            'section2'
            'section2'
            'section2';
        grid-template-rows: repeat(4, 1fr);
        grid-gap: 0.2rem;
    }
`;

const Section = styled.div`
    border: 2px solid ${defaultTheme.color_silver};
    border-radius: 6px;
    box-shadow: 4px 4px 4px 1px ${defaultTheme.color_jet};
`;

const DashboardAdminPage = () => {
    return (
        <GridContainer className="pb-3">
            <Section style={{ gridArea: 'section1' }}>
                <TotalStatsSection />
            </Section>
            <Section style={{ gridArea: 'section2' }}>
                <Card headline={'Biểu đồ thống kê'} children={<ChartStatsSection />} />
            </Section>
        </GridContainer>
    );
};

export default DashboardAdminPage;
