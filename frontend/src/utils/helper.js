export function currencyFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function getFormattedDate(date) {
    let formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0];
}