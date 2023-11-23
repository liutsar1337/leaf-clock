export default function timestampToHHMM(timestamp) {
    const dateObject = new Date(timestamp);
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}