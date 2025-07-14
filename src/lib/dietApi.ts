import {patientId, timeFormats} from "@/constants/constants";
import dayjs from "dayjs";
import {DietRecord} from "@/types/types";
import {fetchClient} from "@/lib/fetchClient";

const baseUrl = '/diet';
/**
 * 食事記録を登録または更新する
 */
export const saveDietRecord = async (record: DietRecord) => {
    await fetchClient<number>(baseUrl, {
        method: 'POST',
        body: JSON.stringify({
            patientId: patientId,
            dietDate: record.dietDate || dayjs(record.dietDate).format(timeFormats.dashedDate),
            meal: record.meal,
            foods: record.foods,
        })
    });
}

/**
 * 指定患者・日付の食事記録を取得
 */
export const fetchDietRecordsByDate = async (dietDate: Date) => {
    const dateStr = dayjs(dietDate).format(timeFormats.dashedDate);
    return await fetchClient<DietRecord[]>(`${baseUrl}/list/${patientId}/${dateStr}`);
};