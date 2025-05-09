'use client'

import {useEffect, useState} from 'react';
import {ConfigProvider, DotLoading} from "antd-mobile";
import jaJP from "antd-mobile/es/locales/ja-JP";
import DialysisCalendar from "@/components/calendar/DialysisCalendar";
import Header from "@/components/Header";
import InfoTabs from "@/components/infoTabs";
import {timeFormats} from "@/constants/constants";
import {DialysisDateRange, DialysisInfo, DiaRec} from "@/types/types";
import dayjs from "dayjs";
import {fetchDiaDateRange, fetchDiaInfo, fetchDiaRecordStatusMap} from "@/lib/dialysisApi";

export default function Home() {
    // 定义 state 用于存储透析日期范围和记录状态
    const [diaDateRange, setDiaDateRange] = useState<DialysisDateRange | null>(null);
    const [diaRecordStatusMap, setDiaRecordStatusMap] = useState<Map<string, DiaRec> | null>(null);
    const [diaDate, setDiaDate] = useState<Date>(new Date());
    const diaDateStr = dayjs(diaDate).format(timeFormats.compactDate);
    const [diaInfo, setDiaInfo] = useState<DialysisInfo | undefined>(undefined);
    // 在组件加载时获取 diaDateRange 和 diaRecordStatusMap
    useEffect(() => {
        const getData = async () => {
            const dateRange = await fetchDiaDateRange();
            setDiaDateRange(dateRange);

            const recordStatusMap = await fetchDiaRecordStatusMap(dateRange);
            setDiaRecordStatusMap(recordStatusMap);
        };

        getData();
    }, []); // 空数组意味着此 useEffect 只会在组件首次加载时执行一次

    // 监听 diaDate 和 diaRecordStatusMap 的变化，重新获取 diaInfo
    useEffect(() => {
        if (diaRecordStatusMap) {
            const getDiaInfo = async () => {
                setDiaInfo(diaRecordStatusMap.has(diaDateStr)
                    ? await fetchDiaInfo(diaRecordStatusMap.get(diaDateStr)?.sessionId)
                    : undefined);
            };

            getDiaInfo();
        }
    }, [diaDate, diaRecordStatusMap]);
    if (!diaDateRange || !diaRecordStatusMap) {
        return <DotLoading/>;
    }
    return (
        <ConfigProvider
            locale={jaJP}>
            <div className="flex flex-col h-screen">
                <Header/>
                <DialysisCalendar
                    diaDateRange={diaDateRange}
                    diaRecordStatusMap={diaRecordStatusMap}
                    changeDiaDate={setDiaDate}/>
                <InfoTabs
                    diaInfo={diaInfo}/>
            </div>
        </ConfigProvider>
    );
}
