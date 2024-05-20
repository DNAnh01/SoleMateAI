import { MdOutlineSpaceDashboard, MdOutlineAddShoppingCart } from 'react-icons/md';
import { TbMessageChatbot } from 'react-icons/tb';
import { LiaProductHunt } from 'react-icons/lia';
import { PiUserSoundLight } from 'react-icons/pi';
import { FaRegUser } from 'react-icons/fa6';

export const SideBarAdminList = [
    {
        url: '/admin/dashboard',
        label: 'Dashboard',
        icon: MdOutlineSpaceDashboard,
    },
    {
        url: '/admin/chatbot',
        label: 'ChatBot',
        icon: TbMessageChatbot,
    },
    {
        url: '/admin/order',
        label: 'Order',
        icon: MdOutlineAddShoppingCart,
    },
    {
        url: '/admin/product',
        label: 'Product',
        icon: LiaProductHunt,
    },
    {
        url: '/admin/promotion',
        label: 'Promotion',
        icon: PiUserSoundLight,
    },
    {
        url: '/admin/user',
        label: 'User',
        icon: FaRegUser,
    },
];
