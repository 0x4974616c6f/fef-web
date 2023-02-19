function formatUTCDate(dateStr: string): string {
    const date = new Date(dateStr);

    const day = date.getUTCDate();
    const month = date.toLocaleString("pt-BR", { month: "long" });
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    const amOrPm = hours < 12 ? "AM" : "PM";
    const hours12 = hours % 12 || 12;

    return `${day} de ${month} de ${year} ${hours12}:${minutes}:${seconds} ${amOrPm}`;
}



export default formatUTCDate;