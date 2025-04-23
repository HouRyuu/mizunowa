/**
 * 分を「x時間y分」のフォーマットに
 * @param minutes
 */
export const getTimeView = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    return `${hours > 0 ? `${hours}時間` : ''}${minutes % 60 > 0 ? `${minutes % 60}分` : ''}`;
}