export const currencyFormat = (amount) => {
    if (typeof amount !== 'number') return '';

    return amount.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
};

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
