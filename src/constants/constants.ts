import {RecordStatus} from "@/types/types";

export const dateFormat = 'YYYYMMDD';

export const statusColorMap: Map<RecordStatus, string> = new Map([
    ['normal', 'success'],
    ['abnormal', 'warning'],
    ['active', 'primary'],
]);