import {Calendar, Tag} from "antd-mobile";
import dayjs from "dayjs";
import {timeFormats, statusColorMap} from "@/constants/constants";
import {DialysisDateRange, DiaRec} from "@/types/types";

interface Props {
    diaDateRange: DialysisDateRange;
    diaRecordStatusMap: Map<string, DiaRec>;
    changeDiaDate: Function;
}

/**
 * 透析カレンダー
 * @constructor
 */
export default function DialysisCalendar({diaDateRange, diaRecordStatusMap, changeDiaDate}: Props) {
    const curDate = dayjs(new Date()).format(timeFormats.compactDate);
    return (
        <>
            <Calendar
                className={'border-b border-gray-200'}
                selectionMode='single'
                min={diaDateRange.minDate}
                max={diaDateRange.maxDate}
                defaultValue={new Date()}
                onChange={date => changeDiaDate(date)}
                renderLabel={date => {
                    const compactDate = dayjs(date).format(timeFormats.compactDate);
                    const recordStatus = diaRecordStatusMap.get(compactDate)?.status;
                    return recordStatus ? <Tag round color={compactDate === curDate ? 'warning' : statusColorMap.get(recordStatus)}/> : <></>;
                }}
            />
        </>
    );
}