import {DialysisStatus, DiaStatus, MedicationTiming} from "@/types/types";

export const apiBaseUrl: string = 'http://lpc-4223:8080';

export const timeFormats = {
    compactDate: 'YYYYMMDD',
    dashedDate: 'YYYY-MM-DD',
    slashDate: 'YYYY/MM/DD',
    slashDatetime: 'YYYY/MM/DD HH:mm',
    time: 'HH:mm',
};
/**
 * カレンダー用状態と対応するタグの色
 */
export const statusColorMap: Map<DialysisStatus, string> = new Map([
    [4, 'success'],
    [0, 'warning'],
    [-1, 'primary'],
]);
/**
 * 透析状態
 */
export const diaStatus: DiaStatus = {
    reserved: -1,          // 予約済
    checkedIn: 0,          // 受付完了
    weighedBefore: 1,      // 前体重測定済
    dialyzing: 2,          // 透析中
    dialysisDone: 3,       // 透析完了
    weighedAfter: 4        // 後体重測定済
}

export const patientId = 10001;

export const timingMap: Map<MedicationTiming, string> = new Map([
    ['AM', '朝'],
    ['NOON', '昼'],
    ['PM', '夕'],
    ['BED', '就寝前'],
    ['OTHR', 'その他'],
]);
