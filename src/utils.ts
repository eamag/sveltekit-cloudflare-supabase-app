export function unixTimestampToTime(timestamp: string): string {
    const intTimestamp = parseInt(timestamp);
    return new Date(intTimestamp * 1000).toLocaleDateString('en-Gb');
}