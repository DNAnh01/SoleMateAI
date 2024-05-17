import { staticImages } from "../utils/images";

const navMenuData = [
  {
    id: "nav-menu-1",
    menuLink: "/",
    menuText: "Shop",
  },
  {
    id: "nav-menu-2",
    menuLink: "/",
    menuText: "Men",
  },
  {
    id: "nav-menu-3",
    menuLink: "/",
    menuText: "Women",
  },
  {
    id: "nav-menu-4",
    menuLink: "/",
    menuText: "Combos",
  },
  {
    id: "nav-menu-5",
    menuLink: "/",
    menuText: "Fashion",
  },
];

const sideMenuData = [
  {
    id: "side-menu-1",
    menuLink: "/",
    menuText: "Trang chủ",
    iconName: "house",
  },
  {
    id: "side-menu-2",
    menuLink: "/product",
    menuText: "Sản phẩm",
    iconName: "grid-fill",
  },
  {
    id: "side-menu-4",
    menuLink: "/account",
    menuText: "Tài khoản",
    iconName: "person-fill",
  },
  {
    id: "side-menu-5",
    menuLink: "/cart",
    menuText: "Giỏ hàng",
    iconName: "bag-check-fill",
  },
];




const newArrivalData = [
  {
    id: "new-arrival-1",
    imgSource: staticImages.product1,
    title: "Knitted Joggers",
    price: 2000000,
    discountPercent: 10,
    brand: { name: "Brand Name" },
    ratings: 4,
    halfRating: true,
    discountedPrice: 1800000,
  },
  {
    id: "new-arrival-2",
    imgSource: staticImages.product2,
    title: "Full Sleeve",
    price: 2000000,
    discountPercent: 15,
    brand: { name: "Brand Name" },
    ratings: 5,
    halfRating: false,
    discountedPrice: 1700000,
  },
];



const products = [
  {
    id: 1,
    imgSource: staticImages.product1,
    title: "Active wear",
    brand: "Jhanvi’s Brand",
    price: 123.0,
  },
  {
    id: 2,
    imgSource: staticImages.product2,
    title: "Shirts",
    brand: "Jhanvi’s Brand",
    price: 123.0,
  },
  {
    id: 3,
    imgSource: staticImages.product3,
    title: "Shirts",
    brand: "Jhanvi’s Brand",
    price: 123.0,
  },
  {
    id: 4,
    imgSource: staticImages.product4,
    title: "Shirts",
    brand: "Jhanvi’s Brand",
    price: 123.0,
  },
  {
    id: 5,
    imgSource: staticImages.product5,
    title: "Shirts",
    brand: "Jhanvi’s Brand",
    price: 123.0,
  },
  {
    id: 6,
    imgSource: staticImages.product6,
    title: "Printed T-Shirts",
    brand: "Jhanvi’s Brand",
    price: 123.0,
  },
  {
    id: 7,
    imgSource: staticImages.product7,
    title: "Plain T-Shirts",
    brand: "Jhanvi’s Brand",
    price: 123.0,
  },
  {
    id: 8,
    imgSource: staticImages.product8,
    title: "Polo T-Shirt",
    brand: "Jhanvi’s Brand",
    price: 123.0,
  },
  {
    id: 9,
    imgSource: staticImages.product9,
    title: "Hoddies & Sweatshirt",
    brand: "Jhanvi’s Brand",
    price: 123.0,
  },
  {
    id: 10,
    imgSource: staticImages.product10,
    title: "Jeans",
    brand: "Jhanvi’s Brand",
    price: 123.0,
  },
  {
    id: 11,
    imgSource: staticImages.product11,
    title: "Boxers",
    brand: "Jhanvi’s Brand",
    price: 123.0,
  },
  {
    id: 12,
    imgSource: staticImages.product12,
    title: "Shirts",
    brand: "Jhanvi’s Brand",
    price: 123.0,
  },
  {
    id: 13,
    imgSource: staticImages.product13,
    title: "Shirts",
    brand: "Jhanvi’s Brand",
    price: 123.0,
  },
  {
    id: 14,
    imgSource: staticImages.product14,
    title: "Shirts",
    brand: "Jhanvi’s Brand",
    price: 123.0,
  },
  {
    id: 15,
    imgSource: staticImages.product15,
    title: "Shirts",
    brand: "Jhanvi’s Brand",
    price: 123.0,
  },
  {
    id: 16,
    imgSource: staticImages.product16,
    title: "Shirts",
    brand: "Jhanvi’s Brand",
    price: 123.0,
  },
  {
    id: 17,
    imgSource: staticImages.product17,
    title: "Printed T-Shirts",
    brand: "Jhanvi’s Brand",
    price: 123.0,
  },
  {
    id: 18,
    imgSource: staticImages.product18,
    title: "Plain T-Shirts",
    brand: "Jhanvi’s Brand",
    price: 123.0,
  },
  {
    id: 19,
    imgSource: staticImages.product19,
    title: "Polo T-Shirt",
    brand: "Jhanvi’s Brand",
    price: 123.0,
  },
];

const mensCatalog = [...products.slice(4, 11), products[1]];



const brandsData = [
  {
    id: "brand-1",
    imgSource: staticImages.brandAdidas,
  },
  {
    id: "brand-2",
    imgSource: staticImages.brandNike,
  },
  {
    id: "brand-3",
    imgSource: staticImages.brandPuma,
  },
  {
    id: "brand-4",
    imgSource: staticImages.brandVans,
  },
  {
    id: "brand-5",
    imgSource: staticImages.brandReebok,
  },
];


const footerData = [
  {
    id: "f_need_help",
    title: "Cần Trợ Giúp",
    links: [
      { text: "Liên Hệ Chúng Tôi", url: "/contact" },
      { text: "Theo Dõi Đơn Hàng", url: "/track_order" },
      { text: "Trả Hàng & Hoàn Tiền", url: "/returns_refunds" },
      { text: "Câu Hỏi Thường Gặp", url: "/faqs" },
    ],
  },
  {
    id: "f_company",
    title: "Công Ty",
    links: [
      { text: "Về Chúng Tôi", url: "/contact" },
      { text: "Sole Mate AI", url: "/blog" },
      { text: "Hợp Tác", url: "/collaboration" },
      { text: "Truyền Thông", url: "/media" },
    ],
  },
  {
    id: "f_more_info",
    title: "Thông Tin Thêm",
    links: [
      { text: "Điều Khoản và Điều Kiện", url: "/tac" },
      { text: "Chính Sách Bảo Mật", url: "/privacy" },
      { text: "Chính Sách Giao Hàng", url: "/shipping" },
    ],
  },
  {
    id: "f_location",
    title: "Địa Chỉ",
    lists: [
      { text: "donguyenanhgithub@gmail.com" },
      { text: "Hòa Khánh Bắc, Đà Nẵng" },
      { text: "Điện Thoại: +000 999 8888" },
    ],
  },
];


const cartItems = [
  {
    id: "C001",
    title: "Blue Flower Print Crop Top",
    color: "Yellow",
    size: "M",
    price: 29.0,
    quantity: 2,
    shipping: 0.0,
    imgSource: staticImages.cart1,
  },
  {
    id: "C002",
    title: "Blue Flower Print Crop Top",
    color: "Blue",
    size: "XL",
    price: 199.0,
    quantity: 5,
    shipping: 0.0,
    imgSource: staticImages.cart2,
  },
  {
    id: "C003",
    title: "Blue Flower Print Crop Top",
    color: "Yellow",
    size: "M",
    price: 123.0,
    quantity: 1,
    shipping: 5.0,
    imgSource: staticImages.cart3,
  },
];

const ProductFilterList = [
  {
    id: "prod_filter_1",
    title: "Tops",
  },
  {
    id: "prod_filter_2",
    title: "Printed T-shirts",
  },
  {
    id: "prod_filter_3",
    title: "Plain T-shirts",
  },
  {
    id: "prod_filter_4",
    title: "Kurti",
  },
  {
    id: "prod_filter_5",
    title: "Boxers",
  },
  {
    id: "prod_filter_6",
    title: "Full sleeve T-shirts",
  },
  {
    id: "prod_filter_7",
    title: "Joggers",
  },
  {
    id: "prod_filter_8",
    title: "Payjamas",
  },
  {
    id: "prod_filter_9",
    title: "Jeans",
  },
];

const StyleFilterList = [
  {
    id: "style_filter_1",
    title: "Classic",
  },
  {
    id: "style_filter_2",
    title: "Casual",
  },
  {
    id: "style_filter_3",
    title: "Business",
  },
  {
    id: "style_filter_4",
    title: "Sport",
  },
  {
    id: "style_filter_5",
    title: "Elegant",
  },
  {
    id: "style_filter_6",
    title: "Formal (evening)",
  },
];

const pricingData = [
  {
    id: "pricing_1",
    name: "Pick Any 4- Womens Plain T-shirt Combo",
    price: 19,
  },
  {
    id: "pricing_2",
    name: "Pick Any 4- Plain Womens Boxer Combo",
    price: 18,
  },
  {
    id: "pricing_3",
    name: "Multicolor Checkered Long Casual Shirts for Women",
    price: 16.7,
  },
  {
    id: "pricing_4",
    name: "Pick Any 4 - Women Plain Full Sleeve T-shirt Combo",
    price: 12,
  },
  {
    id: "pricing_5",
    name: "Pick Any 2: Plain Boxy Casual Shirts for Women Combo",
    price: 9.8,
  },
  {
    id: "pricing_6",
    name: "Jade Black Narrow Cut Flexible Women Jeggings",
    price: 15,
  },
  {
    id: "pricing_7",
    name: "Mustard-yellow Solid Straight-Fit Women Pant",
    price: 6.7,
  },
  {
    id: "pricing_8",
    name: "Pista Green Solid Boxy Casual Shirts for Women",
    price: 9,
  },
];

const servicesData = [
  {
    id: "service_1",
    icon: staticImages.card_icon,
    text: "Secure Payment",
  },
  {
    id: "service_2",
    icon: staticImages.size_icon,
    text: "Size & fit",
  },
  {
    id: "service_3",
    icon: staticImages.shipping_icon,
    text: "Free Shipping",
  },
  {
    id: "service_4",
    icon: staticImages.return_icon,
    text: "Free Shipping & Returns",
  },
];

const product_one = {
  id: "product_01",
  title: "Raven Hoodie With Black Colored Design",
  previewImages: [
    {
      id: "preview1",
      imgSource: staticImages.preview1,
    },
    {
      id: "preview2",
      imgSource: staticImages.preview2,
    },
    {
      id: "preview3",
      imgSource: staticImages.preview3,
    },
    {
      id: "preview4",
      imgSource: staticImages.preview1,
    },
    {
      id: "preview5",
      imgSource: staticImages.preview2,
    },
  ],
  rating: 3.5,
  comments_count: 120,
  sizes: ["xs", "s", "m", "l", "xl"],
  colors: ["#3C4242", "#EDD146", "#EB84B0", "#9C1F35"],
  price: 63.0,
};

const productDescriptionTabHeads = [
  {
    id: "tab-description",
    tabHead: "tabDescription",
    tabText: "Description",
    badgeValue: null,
    badgeColor: "",
  },
  {
    id: "tab-comments",
    tabHead: "tabComments",
    tabText: "User Comments",
    badgeValue: 10,
    badgeColor: "purple",
  },
  {
    id: "tab-QNA",
    tabHead: "tabQNA",
    tabText: "Question & Answer",
    badgeValue: 4,
    badgeColor: "outerspace",
  },
];

const orderData = [
  {
    id: "order_1",
    order_no: "#5558760098",
    order_date: "2 June 2023 2:40 PM",
    status: "Delivered",
    delivery_date: "8 June 2023",
    payment_method: "Cash on Delivery",
    items: [
      {
        id: "product_01",
        name: "Printed white coat",
        color: "White",
        quantity: 1,
        price: 23,
        imgSource: staticImages.cart1,
      },
      {
        id: "product_02",
        name: "Stretchy jumper for women",
        color: "Maroon",
        quantity: 5,
        price: 21,
        imgSource: staticImages.cart2,
      },
      {
        id: "product_03",
        name: "Black Color Hoodie",
        color: "Black",
        quantity: 10,
        price: 90,
        imgSource: staticImages.cart3,
      },
    ],
  },
  {
    id: "order_2",
    order_no: "#8958360118",
    order_date: "2 June 2023 2:40 PM",
    status: "inprogress",
    delivery_date: "12 August 2023",
    payment_method: "Online Payment",
    items: [
      {
        id: "product_04",
        name: "Stretchy jumper for women",
        color: "Maroon",
        quantity: 5,
        price: 21,
        imgSource: staticImages.cart2,
      },
      {
        id: "product_05",
        name: "Printed white coat",
        color: "White",
        quantity: 1,
        price: 23,
        imgSource: staticImages.cart1,
      },
      {
        id: "product_08",
        name: "Black Color Hoodie",
        color: "Black",
        quantity: 10,
        price: 90,
        imgSource: staticImages.cart3,
      },
    ],
  },
];


const recentViewedData = products.slice(0, 4);

const cardsData = [
  {
    id: "card_1",
    imgSource: staticImages.paypal,
  },
  {
    id: "card_2",
    imgSource: staticImages.paypass,
  },
  {
    id: "card_3",
    imgSource: staticImages.googlePay,
  },
  {
    id: "card_4",
    imgSource: staticImages.visa,
  },
];

const socialLinksData = [
  {
    id: "social_link_1",
    site_name: "facebook",
    site_icon: "bi bi-facebook",
    site_url: "www.facbook.com",
  },
  {
    id: "social_link_2",
    site_name: "instagram",
    site_icon: "bi bi-instagram",
    site_url: "www.instagram.com",
  },
  {
    id: "social_link_3",
    site_name: "twitter",
    site_icon: "bi bi-twitter",
    site_url: "www.twitter.com",
  },
  {
    id: "social_link_4",
    site_name: "linkedin",
    site_icon: "bi bi-linkedin",
    site_url: "www.linkedin.com",
  },
];

export {
  products,
  cartItems,
  sideMenuData,
  navMenuData,
  mensCatalog,
  brandsData,
  newArrivalData,
  footerData,
  ProductFilterList,
  StyleFilterList,
  pricingData,
  servicesData,
  product_one,
  productDescriptionTabHeads,
  orderData,
  recentViewedData,
  cardsData,
  socialLinksData,
};
