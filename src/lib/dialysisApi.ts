import {baseUrl, patientId, timeFormats} from "@/constants/constants";
import dayjs from "dayjs";
import {DialysisDateRange, DialysisInfo, DiaRec} from "@/types/types";
import {fetchClient} from "@/lib/fetchClient";

/**
 * 透析記録の期間を取得する
 * @returns 最小日付と最大日付
 */
export const fetchDiaDateRange = async (): Promise<DialysisDateRange> => {
    const url = `${baseUrl}${patientId}/dateRange`;
    const raw = await fetchClient<{ minDate: string; maxDate: string }>(url);
    return {
        minDate: new Date(raw.minDate),
        maxDate: new Date(raw.maxDate),
    };
};

/**
 * 指定期間内の透析記録ステータスを取得する
 * @param dialysisDateRange - 最小日付と最大日付
 * @returns 日付をキーとする透析記録マップ
 */
export const fetchDiaRecordStatusMap = async (
    dialysisDateRange: { minDate: Date; maxDate: Date }
): Promise<Map<string, DiaRec>> => {
    const min = dayjs(dialysisDateRange.minDate).format(timeFormats.dashedDate);
    const max = dayjs(dialysisDateRange.maxDate).format(timeFormats.dashedDate);
    const url = `${baseUrl}${patientId}/dateRange/${min}/${max}/records`;

    const raw = await fetchClient<DiaRec[]>(url);
    return new Map<string, DiaRec>(raw.map((row) => [dayjs(row.sessionDate).format(timeFormats.compactDate), row]));
};

/**
 * セッションIDを指定して透析記録の詳細情報を取得する
 * @param sessionId - セッションID
 * @returns 詳細な透析記録データ
 */
export const fetchDiaInfo = async (sessionId: number | undefined): Promise<DialysisInfo> => {
    if (sessionId === undefined) throw new Error("セッションIDが未指定です");
    const url = `${baseUrl}${sessionId}/record`;
    const raw = await fetchClient<DialysisInfo>(url);

    setDiaTime(raw);
    return raw;
};

/**
 * セッションIDを指定して透析記録の詳細情報を取得する
 * @param sessionId - セッションID
 * @returns 詳細な透析記録データ
 */
export const fetchDiaDetail = async (sessionId: number): Promise<DialysisInfo> => {
    const raw = await fetchClient<DialysisInfo>(`${baseUrl}${sessionId}/detail`);

    setDiaTime(raw);
    return raw;
};

// 時刻を Date 型に変換
const setDiaTime = (raw: DialysisInfo) => {
    const sessionDate = raw.sessionDate;
    raw.arrivedAt = raw.arrivedAt && new Date(`${sessionDate} ${raw.arrivedAt}`);
    raw.endAt = raw.endAt && new Date(`${sessionDate} ${raw.endAt}`);
    raw.reservationTime = new Date(`${raw.reservationTime}`);
    raw.sessionDate = new Date(`${sessionDate}`);
    raw.startedAt = raw.startedAt && new Date(`${sessionDate} ${raw.startedAt}`);
    raw.weightAfterAt = raw.weightAfterAt && new Date(`${sessionDate} ${raw.weightAfterAt}`);
    raw.weightBeforeAt = raw.weightBeforeAt && new Date(`${sessionDate} ${raw.weightBeforeAt}`);
    raw.bps?.forEach(bp => bp.measureAt = new Date(`${sessionDate} ${bp.measureAt}`));
    raw.temps?.forEach(temp => temp.measureAt = new Date(`${sessionDate} ${temp.measureAt}`));
}