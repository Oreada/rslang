export function getTodayDate() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const d = `${String(day).length === 1 ? `0${day}` : `${day}`}`;
    const m = `${String(month).length === 1 ? `0${month}` : `${month}`}`;

    const todayFormatted = `${d}.${m}.${year}`;

    return todayFormatted;
}
