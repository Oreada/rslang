export function getTodayDate() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const todayFormatted = `
    ${String(day).length === 1 ? `0${day}` : `${day}`}.${String(month).length === 1 ? `0${month}` : `${month}`}.${year}
    `;

    return todayFormatted;
}
