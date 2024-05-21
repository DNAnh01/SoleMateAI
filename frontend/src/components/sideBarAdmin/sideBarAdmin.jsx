import { NavLink } from 'react-router-dom';
import { SideBarAdminList } from './sideBarAdmin.const';
import { SideBarWrapper } from './sideBarAdmin.style';
import { staticImages } from '~/utils/images';
const SideBarAdmin = () => {
    return (
        <SideBarWrapper>
            <div className="flex gap-2 items-center px-2">
                <img src={staticImages.logo} alt="logo" className="w-16 h-16" />
                <h1 className="font-semibold text-3xl">Sole Mate AI</h1>
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
                                            ? 'w-full inline-block transition bg-red-200 px-2 py-3 border-l-4 border-red-500'
                                            : 'w-full inline-block transition hover:bg-red-200 px-2 py-3 hover:border-l-4 hover:border-red-500'
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
