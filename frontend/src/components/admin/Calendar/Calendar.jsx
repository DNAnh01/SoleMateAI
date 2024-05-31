import React, { useEffect, useState } from 'react';
import { startOfMonth, endOfMonth, differenceInDays, format, sub, add, setDate, parse } from 'date-fns';
import styled, { css } from 'styled-components';
import { defaultTheme } from '~/styles/themes/default';
import vi from 'date-fns/locale/vi';

const Container = styled.div`
    width: 20rem;
    border-top: 1px solid ${defaultTheme.color_gray};
    border-left: 1px solid ${defaultTheme.color_gray};
    background: ${defaultTheme.color_white};
    z-index: 1000000;
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const Title = styled.div`
    grid-column: span 3;
    font-size: 1rem;
    cursor: pointer;
`;

const DaysOfWeek = styled.div`
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
`;

const CellContainer = styled.div`
    font-family: ${defaultTheme.font_family_inter};
    height: 1.4rem;
    border-bottom: 1px solid ${defaultTheme.color_gray};
    border-right: 1px solid ${defaultTheme.color_gray};
    font-size: 1rem;
    transition: background-color 0.1s ease;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: ${defaultTheme.color_silver};
    }

    ${({ active }) =>
        active &&
        css`
            background: ${defaultTheme.color_yellow_green};
            color: ${defaultTheme.color_white};
            cursor: default;
        `}
`;

const Cell = ({ onClick, active = false, children }) => {
    return (
        <CellContainer onClick={active ? undefined : onClick} active={active}>
            {children}
        </CellContainer>
    );
};

const daysOfWeek = ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7'];

const Calendar = ({ selectedTimeCurrent, setSelectedTimeCurrent }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [activeCell, setActiveCell] = useState(null);

    useEffect(() => {
        const date = parse(
            selectedTimeCurrent,
            selectedTimeCurrent.length === 7 ? 'MM/yyyy' : 'dd/MM/yyyy',
            currentDate,
        );
        setActiveCell(date.getDate());
        setCurrentDate(date);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTimeCurrent]);

    const startDate = startOfMonth(currentDate);
    const endDate = endOfMonth(currentDate);
    const numDays = differenceInDays(endDate, startDate) + 1;
    const prefixDays = startDate.getDay();
    const suffixDays = 6 - endDate.getDay();

    const prevMonth = () => setCurrentDate(sub(currentDate, { months: 1 }));
    const nextMonth = () => setCurrentDate(add(currentDate, { months: 1 }));
    const prevYear = () => setCurrentDate(sub(currentDate, { years: 1 }));
    const nextYear = () => setCurrentDate(add(currentDate, { years: 1 }));

    const handleClickDate = (ipDate) => {
        const date = setDate(currentDate, ipDate);
        const dateString = format(date, 'dd/MM/yyyy');
        setSelectedTimeCurrent(dateString);
        setActiveCell(ipDate);
    };

    const handleClickMonthTitle = () => {
        const dateString = format(currentDate, 'MM/yyyy');
        setSelectedTimeCurrent(dateString);
        setActiveCell(null);
    };

    return (
        <Container>
            <Content>
                <Cell onClick={prevYear}>{'<<'}</Cell>
                <Cell onClick={prevMonth}>{'<'}</Cell>
                <Title onClick={handleClickMonthTitle}>{format(currentDate, 'LLLL yyyy', { locale: vi })}</Title>
                <Cell onClick={nextMonth}>{'>'}</Cell>
                <Cell onClick={nextYear}>{'>>'}</Cell>
                {daysOfWeek.map((day) => (
                    <Cell key={day}>{day}</Cell>
                ))}
                {Array.from({ length: prefixDays }).map((_, index) => (
                    <Cell key={index} />
                ))}
                {Array.from({ length: numDays }).map((_, index) => {
                    const date = index + 1;
                    return (
                        <Cell key={index} active={activeCell === date} onClick={() => handleClickDate(date)}>
                            {date}
                        </Cell>
                    );
                })}
                {Array.from({ length: suffixDays }).map((_, index) => (
                    <Cell key={index} />
                ))}
            </Content>
        </Container>
    );
};

export default Calendar;
