export function formatDate(date: string) {
    const dateNew = new Date(date)
    const formatDateString = dateNew.toLocaleString()
    return formatDateString
}