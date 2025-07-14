'use client'

import {useEffect, useState} from 'react';
import {ConfigProvider, SpinLoading} from "antd-mobile";
import jaJP from "antd-mobile/es/locales/ja-JP";
import DialysisCalendar from "@/components/calendar/DialysisCalendar";
import Header from "@/components/header";
import InfoTabs from "@/components/infoTabs";
import {DialysisDateRange, DiaRec,} from "@/types/types";
import {fetchDiaDateRange, fetchDiaRecordStatusMap} from "@/lib/dialysisApi";

export default function Home() {
    // 定义 state 用于存储透析日期范围和记录状态
    const [diaDateRange, setDiaDateRange] = useState<DialysisDateRange | undefined>(undefined);
    const [diaRecordStatusMap, setDiaRecordStatusMap] = useState<Map<string, DiaRec> | undefined>(undefined);
    // 在组件加载时获取 diaDateRange 和 diaRecordStatusMap
    useEffect(() => {
        (async () => {
            const dateRange = await fetchDiaDateRange();
            setDiaDateRange(dateRange);

            const recordStatusMap = await fetchDiaRecordStatusMap(dateRange);
            setDiaRecordStatusMap(recordStatusMap);
        })();
    }, []); // 空数组意味着此 useEffect 只会在组件首次加载时执行一次
    if (!diaDateRange || !diaRecordStatusMap) {
        return <div className="fixed inset-0 flex items-center justify-center">
            <SpinLoading color='currentColor' style={{'--size': '48px'}}/>
        </div>;
    }
    return (
        <ConfigProvider locale={jaJP}>
            <div className="flex flex-col h-screen">
                <Header/>
                <DialysisCalendar
                    diaDateRange={diaDateRange}
                    diaRecordStatusMap={diaRecordStatusMap}/>
                <InfoTabs/>
            </div>
        </ConfigProvider>
    );
}
