import {DialysisInfo, RecordStatus} from "@/types/types";
import {diaStatus} from "@/constants/constants";

export const recordStatusMap: Map<string, RecordStatus> = new Map([
    ['20250403', 'normal'],
    ['20250408', 'abnormal'],
    ['20250410', 'active'],
]);

export const mockDialysisInfo: DialysisInfo | null = {
    reservedAt: new Date('2025-04-18T08:30:00'),
    arrivedAt: new Date('2025-04-18T08:25:00'),
    startedAt: new Date('2025-04-18T08:45:00'),
    endAt: new Date('2025-04-18T12:45:00'),
    expDiaMin: 240,

    status: diaStatus.weighedAfter,

    reception: '中央受付',
    room: '第2透析室',
    scale: '2番',
    bed: 'B-05',

    nurse: '鈴木 看護師',
    doctor: '佐藤 医師',
    technician: '山田 技師',

    weightBefore: 71.2,
    dryWeight: 69.0,
    weightAfter: 69.1,
    ufTarget: 2.2,
    ufActual: 1.4,
}/* null*/;