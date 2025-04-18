import {Calendar, Tag} from "antd-mobile";
import {recordStatusMap} from "@/mock/mockData";
import dayjs from "dayjs";
import {timeFormats, statusColorMap} from "@/constants/constants";

export default function DialysisCalendar() {
    return (
        <>
            <Calendar
                className={'border-b border-gray-200'}
                selectionMode='single'
                min={new Date('2021-01-01')}
                max={new Date('2025-12-31')}
                renderLabel={date => {
                    const recordStatus = recordStatusMap.get(dayjs(date).format(timeFormats.date));
                    return recordStatus ? <Tag round
                                               color={statusColorMap.get(recordStatus)}/> : <></>;
                }}
            />
        </>
    );
}