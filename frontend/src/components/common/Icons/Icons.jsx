import React from 'react';
import PropTypes from 'prop-types';

import {
    AddProductIcon,
    ArrowIcon,
    BasketIcon,
    CalendarIcon,
    CartIcon,
    ClosedEyeIcon,
    CogIcon,
    CustomersIcon,
    DashboardIcon,
    DowntrendIcon,
    EyeIcon,
    FacebookIcon,
    GoogleIcon,
    GridIcon,
    HeartIcon,
    HistoryOrderIcon,
    InstagramIcon,
    ListIcon,
    LoadingIcon,
    OptionsIcon,
    OrdersIcon,
    PlayIcon,
    ProductsIcon,
    ReturnIcon,
    SearchIcon,
    SellPhoneLinkIcon,
    ShippingIcon,
    SignOutIcon,
    SizeIcon,
    StatsIcon,
    TasksIcon,
    UptrendIcon,
    UsdIcon,
    UserIcon,
} from '~/assets/icons';

const Icons = (props) => {
    const components = {
        historyOrder: HistoryOrderIcon,
        loading: LoadingIcon,
        calendar: CalendarIcon,
        sellPhoneLink: SellPhoneLinkIcon,
        products: ProductsIcon,
        orders: OrdersIcon,
        customersIcon: CustomersIcon,
        addProduct: AddProductIcon,
        arrow: ArrowIcon,
        basket: BasketIcon,
        cog: CogIcon,
        dashboard: DashboardIcon,
        uptrend: UptrendIcon,
        downtrend: DowntrendIcon,
        eye: EyeIcon,
        closedEye: ClosedEyeIcon,
        grid: GridIcon,
        list: ListIcon,
        options: OptionsIcon,
        search: SearchIcon,
        stats: StatsIcon,
        tasks: TasksIcon,
        usd: UsdIcon,
        user: UserIcon,
        google: GoogleIcon,
        facebook: FacebookIcon,
        instagram: InstagramIcon,
        cart: CartIcon,
        heart: HeartIcon,
        signOut: SignOutIcon,
        size: SizeIcon,
        shipping: ShippingIcon,
        return: ReturnIcon,
        play: PlayIcon,
    };

    const IconComponent = components[props.icon];

    return <IconComponent ref={props.ref} {...props} />;
};

Icons.propTypes = {
    props: PropTypes.shape({
        icon: PropTypes.string.isRequired,
        width: PropTypes.number,
        height: PropTypes.number,
        color: PropTypes.string,
        onClick: PropTypes.func,
        className: PropTypes.string,
        iconRef: PropTypes.object,
    }),
};
Icons.defaultProps = {
    icon: 'heart',
    size: 24,
    color: '#a9aba7',
};

export default Icons;
