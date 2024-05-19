const { staticImages } = require('~/utils/images');

const orderData = [
    {
        id: 'order_1',
        order_no: '#5558760098',
        order_date: '2 June 2024 2:40 PM',
        status: 'Delivered',
        delivery_date: '8 June 2024',
        payment_method: 'Cash on Delivery',
        items: [
            {
                id: 'product_01',
                name: 'Nike Air Max 90 Essential',
                color: 'White',
                quantity: 1,
                price: 2300000,
                imgSource: staticImages.cart1,
            },
            {
                id: 'product_02',
                name: 'Nike Air Max 90 Essential',
                color: 'Yellow',
                quantity: 5,
                price: 2100000,
                imgSource: staticImages.cart2,
            },
            {
                id: 'product_03',
                name: 'Nike Air Max 90 Essential',
                color: 'Black',
                quantity: 10,
                price: 1900000,
                imgSource: staticImages.cart3,
            },
        ],
    },
    {
        id: 'order_2',
        order_no: '#8958360118',
        order_date: '2 June 2024 2:40 PM',
        status: 'inprogress',
        delivery_date: '12 August 2024',
        payment_method: 'Online Payment',
        items: [
            {
                id: 'product_01',
                name: 'Nike Air Max 90 Essential',
                color: 'White',
                quantity: 1,
                price: 2300000,
                imgSource: staticImages.cart1,
            },
            {
                id: 'product_02',
                name: 'Nike Air Max 90 Essential',
                color: 'Yellow',
                quantity: 5,
                price: 2100000,
                imgSource: staticImages.cart2,
            },
            {
                id: 'product_03',
                name: 'Nike Air Max 90 Essential',
                color: 'Black',
                quantity: 10,
                price: 1900000,
                imgSource: staticImages.cart3,
            },
        ],
    },
];

const socialLinksData = [
    {
        id: 'social_link_1',
        site_name: 'facebook',
        site_icon: 'bi bi-facebook',
        site_url: 'www.facbook.com',
    },
    {
        id: 'social_link_2',
        site_name: 'instagram',
        site_icon: 'bi bi-instagram',
        site_url: 'www.instagram.com',
    },
    {
        id: 'social_link_3',
        site_name: 'twitter',
        site_icon: 'bi bi-twitter',
        site_url: 'www.twitter.com',
    },
    {
        id: 'social_link_4',
        site_name: 'linkedin',
        site_icon: 'bi bi-linkedin',
        site_url: 'www.linkedin.com',
    },
];

const brandsData = [
    {
        id: 'brand-1',
        imgSource: staticImages.brand_adidas,
    },
    {
        id: 'brand-2',
        imgSource: staticImages.brand_nike,
    },
    {
        id: 'brand-3',
        imgSource: staticImages.brand_puma,
    },
    {
        id: 'brand-4',
        imgSource: staticImages.brand_reebok,
    },
];

const newArrivalData = [
    {
        id: 'new-arrival-1',
        imgSource: staticImages.shoe1,
        title: 'Knitted Joggers',
        price: 2000000,
        discountPercent: 10,
        brand: { name: 'Brand Name' },
        ratings: 4,
        halfRating: true,
        discountedPrice: 1800000,
    },
    {
        id: 'new-arrival-2',
        imgSource: staticImages.shoe2,
        title: 'Full Sleeve',
        price: 2000000,
        discountPercent: 15,
        brand: { name: 'Brand Name' },
        ratings: 5,
        halfRating: false,
        discountedPrice: 1700000,
    },
];
const productDescriptionTabHeads = [
    {
        id: 'tab-description',
        tabHead: 'tabDescription',
        tabText: 'Description',
        badgeValue: null,
        badgeColor: '',
    },
    {
        id: 'tab-comments',
        tabHead: 'tabComments',
        tabText: 'User Comments',
        badgeValue: 10,
        badgeColor: 'purple',
    },
    {
        id: 'tab-QNA',
        tabHead: 'tabQNA',
        tabText: 'Question & Answer',
        badgeValue: 4,
        badgeColor: 'outerspace',
    },
];
const ProductFilterList = [
    {
        id: 'prod_filter_1',
        title: 'Tops',
    },
    {
        id: 'prod_filter_2',
        title: 'Printed T-shirts',
    },
    {
        id: 'prod_filter_3',
        title: 'Plain T-shirts',
    },
    {
        id: 'prod_filter_4',
        title: 'Kurti',
    },
    {
        id: 'prod_filter_5',
        title: 'Boxers',
    },
    {
        id: 'prod_filter_6',
        title: 'Full sleeve T-shirts',
    },
    {
        id: 'prod_filter_7',
        title: 'Joggers',
    },
    {
        id: 'prod_filter_8',
        title: 'Payjamas',
    },
    {
        id: 'prod_filter_9',
        title: 'Jeans',
    },
];

const StyleFilterList = [
    {
        id: 'style_filter_1',
        title: 'Classic',
    },
    {
        id: 'style_filter_2',
        title: 'Casual',
    },
    {
        id: 'style_filter_3',
        title: 'Business',
    },
    {
        id: 'style_filter_4',
        title: 'Sport',
    },
    {
        id: 'style_filter_5',
        title: 'Elegant',
    },
    {
        id: 'style_filter_6',
        title: 'Formal (evening)',
    },
];

const servicesData = [
    {
        id: 'service_1',
        icon: staticImages.card_icon,
        text: 'Secure Payment',
    },
    {
        id: 'service_2',
        icon: staticImages.size_icon,
        text: 'Size & fit',
    },
    {
        id: 'service_3',
        icon: staticImages.shipping_icon,
        text: 'Free Shipping',
    },
    {
        id: 'service_4',
        icon: staticImages.return_icon,
        text: 'Free Shipping & Returns',
    },
];

const sideMenuData = [
    {
        id: 'side-menu-1',
        menuLink: '/',
        menuText: 'Trang chủ',
        iconName: 'house',
    },
    {
        id: 'side-menu-2',
        menuLink: '/product',
        menuText: 'Sản phẩm',
        iconName: 'grid-fill',
    },
    {
        id: 'side-menu-4',
        menuLink: '/account',
        menuText: 'Tài khoản',
        iconName: 'person-fill',
    },
    {
        id: 'side-menu-5',
        menuLink: '/cart',
        menuText: 'Giỏ hàng',
        iconName: 'bag-check-fill',
    },
];

const cartItems = [
    {
        id: 'C001',
        title: 'Nike Air Max 90 Essential',
        color: 'Yellow',
        size: 'M',
        price: 2000000,
        quantity: 2,
        shipping: 0.0,
        imgSource: staticImages.cart1,
    },
    {
        id: 'C002',
        title: 'Nike Air Max 90 Essential',
        color: 'Blue',
        size: 'XL',
        price: 2000000,
        quantity: 5,
        shipping: 0.0,
        imgSource: staticImages.cart2,
    },
    {
        id: 'C003',
        title: 'Nike Air Max 90 Essential',
        color: 'Yellow',
        size: 'M',
        price: 2000000,
        quantity: 1,
        shipping: 5.0,
        imgSource: staticImages.cart3,
    },
];

const product_one = {
    id: 'product_01',
    title: 'Nike Air Max 90 Essential',
    previewImages: [
        {
            id: 'shoe1',
            imgSource: staticImages.shoe1,
        },
        {
            id: 'shoe2',
            imgSource: staticImages.shoe2,
        },
        {
            id: 'shoe3',
            imgSource: staticImages.shoe3,
        },
        {
            id: 'shoe4',
            imgSource: staticImages.shoe1,
        },
        {
            id: 'shoe5',
            imgSource: staticImages.shoe2,
        },
    ],
    rating: 4.5,
    comments_count: 120,
    sizes: ['38', '39', '40', '41', '42', '43'],
    colors: ['#3C4242', '#EDD146', '#EB84B0', '#9C1F35'],
    price: 2000000,
};

const cardsData = [
    {
        id: 'card_1',
        imgSource: staticImages.paypal,
    },
    {
        id: 'card_2',
        imgSource: staticImages.paypass,
    },
    {
        id: 'card_3',
        imgSource: staticImages.googlePay,
    },
    {
        id: 'card_4',
        imgSource: staticImages.visa,
    },
];

export {
    orderData,
    socialLinksData,
    brandsData,
    newArrivalData,
    productDescriptionTabHeads,
    ProductFilterList,
    StyleFilterList,
    servicesData,
    sideMenuData,
    cartItems,
    product_one,
    cardsData,
};
