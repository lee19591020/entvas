export const timestampToDate = (timestamp: number) => {
    const date = new Date(timestamp);

    const readable = date.toLocaleString("en-US", {
    timeZone: process.env.NEXT_PUBLIC_TIMEZONE as  string,
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    });
    return readable;
}
