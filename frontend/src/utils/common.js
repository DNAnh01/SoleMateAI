export const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export const colors = [
    '#FF5733', // Red-Orange
    '#33FF57', // Lime Green
    '#3357FF', // Blue
    '#F3FF33', // Yellow
    '#9933FF', // Purple
    '#FF33A6', // Pink
    '#33FFF3', // Cyan
    '#FF5733', // Red-Orange (duplicate for demonstration)
    '#8D33FF', // Violet
    '#FF8D33', // Orange
    '#33FF8D', // Mint Green
    '#5733FF', // Indigo
    '#FF3385', // Hot Pink
    '#FF5733', // Red-Orange (duplicate for demonstration)
    '#33A6FF', // Sky Blue
    '#FF3333', // Red
    '#33FF33', // Green
    '#3333FF', // Navy Blue
    '#FFFF33', // Lemon Yellow
    '#FF33FF', // Magenta
];

export const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};

export const convertISOToDateTime = (isoString) => {
    const date = new Date(isoString);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    const formattedDate = `${hours}:${minutes}:${seconds} - ${month}/${day}/${year}`;

    return formattedDate;
};

export const convertToTargetTimestamp = (inputDate) => {
    const initialDate = new Date(inputDate);

    return initialDate.toISOString();
};
