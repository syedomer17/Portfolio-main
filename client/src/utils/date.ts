export function formatDateDDMMYYYY(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB"); // DD/MM/YYYY
}
