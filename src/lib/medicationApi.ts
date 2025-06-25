import {patientId, timeFormats} from "@/constants/constants";
import dayjs from "dayjs";
import {MedicationRecord, MedicationTiming} from "@/types/types";
import {fetchClient} from "@/lib/fetchClient";

const baseUrl = '/medication';
/**
 * 服薬記録を登録または更新する
 */
export const saveMedicationRecord = async (record: MedicationRecord) => {
    return await fetchClient<number>(baseUrl, {
        method: 'POST',
        parse: 'text',
        body: JSON.stringify({
            itemId: record.itemId,
            takenFlag: record.takenFlag,
            timing: record.timing,
            recordId: record.recordId,
            takenDate: record.takenDate || dayjs(record.takenDate).format(timeFormats.dashedDate),
        })
    });
}

/**
 * 指定患者・日付の服薬記録を取得
 */
export const fetchMedicationRecordsByDate = async (takenDate: Date): Promise<Map<MedicationTiming, MedicationRecord[]>> => {
    const dateStr = dayjs(takenDate).format(timeFormats.dashedDate);
    const raw = await fetchClient<MedicationRecord[]>(`${baseUrl}/list/${patientId}/${dateStr}`);
    return raw.reduce((acc, cur) => {
        if (!acc.has(cur.timing)) {
            acc.set(cur.timing, []);
        }
        acc.get(cur.timing)!.push(cur);
        return acc;
    }, new Map<MedicationTiming, MedicationRecord[]>());
};