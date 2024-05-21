import { Link, useLocation } from 'react-router-dom';
import { HeaderWrapper, PathLocation } from './headerAdmin.style';
import { formatDate } from '~/utils/common';

const HeaderAdmin = () => {
    const location = useLocation();
    const pathname = location.pathname.slice(1).split('/');
    const today = new Date();
    return (
        <HeaderWrapper>
            <h1 className="font-semibold text-sky-500 ">
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
            <div>
                <h1 className="text-xl font-semibold italic mr-6">{formatDate(today)}</h1>
            </div>
        </HeaderWrapper>
    );
};

export default HeaderAdmin;
