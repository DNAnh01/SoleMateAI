import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HeaderWrapper, PathLocation } from './headerAdmin.style';
import { defaultTheme } from '~/styles/themes/default';
import Icons from '../common/Icons/Icons';
import Calendar from '../admin/Calendar';
import { useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { format, parse } from 'date-fns';
import { DashboardContext } from '~/contexts/dashboard.context';
import dashboardApi from '~/apis/dashboard.api';
import useAppStore from '~/store';

const HeaderAdmin = () => {
    const location = useLocation();
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedTime, setSelectedTime] = useState(format(new Date(), 'dd/MM/yyyy'));
    const { setChartStatsByFilter, setTotalStatsByFilter } = useContext(DashboardContext);
    const { accessToken, profile } = useAppStore();
    const toggleCalendar = () => {
        setShowCalendar((prevShowCalendar) => !prevShowCalendar);
    };

    const handleDateChange = (date) => {
        setSelectedTime(date);
        setShowCalendar(false);
    };

    useEffect(() => {
        let isMounted = true;
        if (location.pathname.split('/').pop() === 'dashboard' && accessToken && profile?.role_name === 'admin') {
            const selectedDate = selectedTime.length === 7 ? `01/${selectedTime}` : selectedTime;
            const parsedDate = parse(selectedDate, 'dd/MM/yyyy', new Date());
            const formattedDate =
                selectedTime.length === 7 ? format(parsedDate, 'yyyy-MM') : format(parsedDate, 'yyyy-MM-dd');

            if (formattedDate.length === 7 && isMounted) {
                try {
                    const fetchChartStatsByMonth = async () => {
                        const response = await dashboardApi.fetchChartStatsByMonth({ month: formattedDate });
                        if (isMounted) {
                            setChartStatsByFilter(response.data);
                        }
                    };
                    fetchChartStatsByMonth();
                    const fetchTotalStatsByMonth = async () => {
                        const response = await dashboardApi.fetchTotalStatsByMonth({ month: formattedDate });
                        if (isMounted) {
                            setTotalStatsByFilter(response.data);
                        }
                    };
                    fetchTotalStatsByMonth();
                } catch (error) {
                    console.log('error', error);
                }
            }

            if (formattedDate.length === 10 && isMounted) {
                try {
                    const fetchChartStatsByDay = async () => {
                        const response = await dashboardApi.fetchChartStatsByDay({ day: formattedDate });
                        if (isMounted) {
                            setChartStatsByFilter(response.data);
                        }
                    };
                    fetchChartStatsByDay();
                    const fetchTotalStatsByDay = async () => {
                        const response = await dashboardApi.fetchTotalStatsByDay({ day: formattedDate });
                        if (isMounted) {
                            setTotalStatsByFilter(response.data);
                        }
                    };
                    fetchTotalStatsByDay();
                } catch (error) {
                    console.log('error', error);
                }
            }
        }

        return () => {
            isMounted = false;
        };
    }, [location.pathname, selectedTime, accessToken, profile, setChartStatsByFilter, setTotalStatsByFilter]);

    const pathname = location.pathname.slice(1).split('/');
    return (
        <HeaderWrapper>
            <h1 className="font-semibold" style={{ color: defaultTheme.color_dim_gray }}>
                {pathname.map((item, index) => {
                    const to = `/${pathname.slice(0, index + 1).join('/')}`;
                    return (
                        <span key={index}>
                            <Link to={to}>
                                <PathLocation>{item}</PathLocation>
                            </Link>
                            {index < pathname.length - 1 && '/ '}
                        </span>
                    );
                })}
            </h1>
            <div className="flex items-center justify-center">
                <span className="mr-3">{selectedTime}</span>
                <HeadlessTippy
                    interactive
                    visible={showCalendar}
                    onClickOutside={() => setShowCalendar(false)}
                    render={() => (
                        <div className="mr-4">
                            <Calendar selectedTimeCurrent={selectedTime} setSelectedTimeCurrent={handleDateChange} />
                        </div>
                    )}
                    placement="bottom-end"
                >
                    <div>
                        <Icons
                            icon="calendar"
                            className="mr-4 cursor-pointer"
                            width={20}
                            height={20}
                            color={defaultTheme.color_dim_gray}
                            onClick={toggleCalendar}
                        />
                    </div>
                </HeadlessTippy>
            </div>
        </HeaderWrapper>
    );
};

export default HeaderAdmin;
