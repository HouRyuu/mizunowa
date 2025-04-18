import {DiaStatus, RecordStatus} from "@/types/types";

export const timeFormats = {
    date: 'YYYYMMDD',
    datetime: 'YYYY/MM/DD HH:mm',
};

export const statusColorMap: Map<RecordStatus, string> = new Map([
    ['normal', 'success'],
    ['abnormal', 'warning'],
    ['active', 'primary'],
]);

export const diaStatus: DiaStatus = {
    reserved: -1,          // 予約済
    checkedIn: 0,          // 受付完了
    weighedBefore: 1,      // 前体重測定済
    dialyzing: 2,          // 透析中
    dialysisDone: 3,       // 透析完了
    weighedAfter: 4        // 後体重測定済
}