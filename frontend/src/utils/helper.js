export const currencyFormat = (amount) => {
    if (typeof amount !== 'number') return '';

    return amount.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
};

export function extractProductId(message) {
    console.log('message:', message);
    /*
    "Thông tin về giày: 
    Tên giày: Nike Air Max 90 Essential,    
    Thương hiệu: Nike,    
    Kích thước: 43,
    Màu sắc: Yellow,
    Giá bán: 1600000.0,
    Chương trình khuyến mãi: Mùa Hè Sale cùng Sole Mate AI,
    Ngày bắt đầu chương trình khuyến mãi: 01-06-2024,
    Ngày kết thúc chương trình khuyến mãi: 31-08-2024,
    Phần trăm khuyến mãi: 20

    [http://localhost:3000/product/1f2ecb93-1297-41b2-9ace-ba845bf5bc83]"
    */
    try {
        const messageText = message.message_text.trim();

        const urlPattern = /http:\/\/[^\s]+/g;
        const urls = messageText.match(urlPattern);

        if (!urls || urls.length === 0) {
            console.error('No URL found in the message.');
            return null;
        }

        const productUrl = urls.find((url) => url.includes('/product/'));

        if (!productUrl) {
            console.error('No product URL found in the message.');
            return null;
        }

        let productId = productUrl.split('/').slice(-1)[0];
        productId = productId.replace(/[^a-zA-Z0-9\-]/g, '');
        console.log('productId:', productId);
        return productId;
    } catch (error) {
        console.error('Error extracting product ID:', error);
        return null;
    }
}

export function getFormattedDate(date) {
    let formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0];
}

export function convertOrderStatus(status) {
    switch (status) {
        case 'ORDER-PLACED':
            return 'Đã đặt';
        case 'ORDER-CANCELLED':
            return 'Đã hủy';
        case 'ORDER-SHIPPING':
            return 'Đang giao';
        case 'ORDER-DELIVERED':
            return 'Đã hoàn thành';
        default:
            return status;
    }
}

export function getUniqueProperties(products) {
    const colorMap = new Map();
    const brandMap = new Map();
    const sizeSet = new Set();
    const uniqueSizes = [];
    let minPrice = Infinity;
    let maxPrice = -Infinity;

    products.forEach((product) => {
        // color
        const color = product.color;
        if (!colorMap.has(color.color_name)) {
            colorMap.set(color.color_name, color.hex_value);
        }
        // brand
        const brand = product.brand;
        if (!brandMap.has(brand.brand_name)) {
            brandMap.set(brand.brand_name, brand.brand_logo);
        }
        // size
        const sizeNumber = product.size.size_number;
        if (!sizeSet.has(sizeNumber)) {
            sizeSet.add(sizeNumber);
            uniqueSizes.push({ size_number: sizeNumber });
        }
        // min discounted price
        if (product.discounted_price < minPrice) {
            minPrice = product.discounted_price;
        }
        // max discounted price
        if (product.discounted_price > maxPrice) {
            maxPrice = product.discounted_price;
        }
    });
    const uniqueColors = Array.from(colorMap, ([color_name, hex_value]) => ({ color_name, hex_value }));
    const uniqueBrands = Array.from(brandMap, ([brand_name, brand_logo]) => ({ brand_name, brand_logo }));
    return { uniqueColors, uniqueBrands, uniqueSizes, minPrice, maxPrice };
}
