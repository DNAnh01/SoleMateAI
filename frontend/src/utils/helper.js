export function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export const formatCurrency = (amount) => {
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
