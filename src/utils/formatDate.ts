export function formatDate(date: string) {
  const dateNew = new Date(date);
  const formatDateString = dateNew.toLocaleString();
  return formatDateString;
}

export function mongoDateToBrowserDate(date: string) {
  try {
    const dateNew = new Date(date);
    return dateNew.toISOString().slice(0, 10);
  } catch (err) {
    return "";
  }
}
