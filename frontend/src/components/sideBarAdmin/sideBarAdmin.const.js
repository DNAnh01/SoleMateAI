import { MdOutlineSpaceDashboard, MdOutlineAddShoppingCart } from 'react-icons/md';
import { TbMessageChatbot } from 'react-icons/tb';
import { LiaProductHunt } from 'react-icons/lia';
import { PiUserSoundLight } from 'react-icons/pi';
import { FaRegUser } from 'react-icons/fa6';

export const SideBarAdminList = [
    {
        url: '/admin/dashboard',
        label: 'Thống kê',
        icon: MdOutlineSpaceDashboard,
    },
    {
        url: '/admin/chatbot',
        label: 'Chatbot',
        icon: TbMessageChatbot,
    },
    {
        url: '/admin/order',
        label: 'Đơn hàng',
        icon: MdOutlineAddShoppingCart,
    },
    {
        url: '/admin/product',
        label: 'Sản phẩm',
        icon: LiaProductHunt,
    },
    {
        url: '/admin/promotion',
        label: 'Khuyến mãi',
        icon: PiUserSoundLight,
    },
    {
        url: '/admin/user',
        label: 'Người dùng',
        icon: FaRegUser,
    },
];
