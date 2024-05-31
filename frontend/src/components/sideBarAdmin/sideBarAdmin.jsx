import { NavLink, Link } from 'react-router-dom';
import { SideBarAdminList } from './sideBarAdmin.const';
import { SideBarWrapper } from './sideBarAdmin.style';
import images from '~/assets/images';
const SideBarAdmin = () => {
    return (
        <SideBarWrapper>
            <div className="flex gap-2 items-center px-2 mt-1">
                <Link to={'/'} className="inline-block">
                    <img src={images.logo} alt="logo" className="w-14 h-14" />
                </Link>
                <h1 className="font-semibold text-xl">Sole Mate AI</h1>
            </div>
            <div>
                <ul className="flex flex-col gap-2 px-1 mt-4">
                    {SideBarAdminList.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <li className="w-full" key={index}>
                                <NavLink
                                    to={item.url}
                                    className={({ isActive }) =>
                                        isActive
                                            ? `w-full inline-block transition bg-green-200 px-2 py-3 border-l-4 border-green-500`
                                            : 'w-full inline-block transition hover:bg-green-200 px-2 py-3 hover:border-l-4 hover:border-green-500'
                                    }
                                >
                                    <div className="flex items-center gap-2">
                                        <Icon fontSize={28} />
                                        <span className="text-xl font-medium">{item.label}</span>
                                    </div>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </SideBarWrapper>
    );
};

export default SideBarAdmin;
