import {Calendar, Grid, Tag} from "antd-mobile";
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
    const {setSessionId, setDiaDate} = useDiaSession();
    useEffect(() => {
        setSessionId(diaRecordStatusMap.get(curDate)?.sessionId);
        setDiaDate(new Date());
    }, []);
    return (
        <section
            className={'border-b border-gray-200'}>
            <Calendar
                selectionMode='single'
                min={diaDateRange.minDate}
                max={diaDateRange.maxDate}
                defaultValue={new Date()}
                onChange={date => {
                    setSessionId(diaRecordStatusMap.get(dayjs(date).format(timeFormats.compactDate))?.sessionId);
                    if (date) {
                        setDiaDate(date);
                    }
                }}
                renderLabel={date => {
                    const compactDate = dayjs(date).format(timeFormats.compactDate);
                    const recordStatus = diaRecordStatusMap.get(compactDate)?.status;
                    return typeof recordStatus === 'number' ? <Tag round color={compactDate === curDate ? 'warning' : statusColorMap.get(recordStatus)}/> : <></>;
                }}
            />
            <Grid columns={3} className='text-center'>
                <Grid.Item><Tag round color='success'/>透析済み</Grid.Item>
                <Grid.Item><Tag round color='warning'/>今日の透析</Grid.Item>
                <Grid.Item><Tag round color='primary'/>透析予約</Grid.Item>
            </Grid>
        </section>
    );
}