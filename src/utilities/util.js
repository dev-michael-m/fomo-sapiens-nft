export const FormatDropTimer = (date = new Date()) => {
    try {
        const month = date.getMonth() + 1
        return `12d ${date.getHours().toString().padStart(2,'0')}h ${date.getMinutes().toString().padStart(2,'0')}m ${date.getSeconds().toString().padStart(2,'0')}s`;
    } catch (error) {
        console.error(error);
        return '';
    }
}