import {Calendar, Tag} from "antd-mobile";
import dayjs from "dayjs";
import {timeFormats, statusColorMap} from "@/constants/constants";
import {DialysisDateRange, DiaRec} from "@/types/types";
import {useDiaSession} from "@/context/DiaSessionContext";
import {useEffect} from "react";

interface Props {
    diaDateRange: DialysisDateRange;
    diaRecordStatusMap: Map<string, DiaRec>;
}

/**
 * 透析カレンダー
 * @constructor
 */
export default function DialysisCalendar({diaDateRange, diaRecordStatusMap}: Props) {
    const curDate = dayjs(new Date()).format(timeFormats.compactDate);
    const {setSessionId} = useDiaSession();
    useEffect(() => {
        setSessionId(diaRecordStatusMap.get(curDate)?.sessionId);
    }, []);
    return (
        <>
            <Calendar
                className={'border-b border-gray-200'}
                selectionMode='single'
                min={diaDateRange.minDate}
                max={diaDateRange.maxDate}
                defaultValue={new Date()}
                onChange={date => setSessionId(diaRecordStatusMap.get(dayjs(date).format(timeFormats.compactDate))?.sessionId)}
                renderLabel={date => {
                    const compactDate = dayjs(date).format(timeFormats.compactDate);
                    const recordStatus = diaRecordStatusMap.get(compactDate)?.status;
                    return recordStatus ? <Tag round color={compactDate === curDate ? 'warning' : statusColorMap.get(recordStatus)}/> : <></>;
                }}
            />
        </>
    );
}