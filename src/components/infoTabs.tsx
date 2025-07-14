'use client';

import {SwiperRef} from "antd-mobile/es/components/swiper/swiper";
import DialysisTabPanel from "@/components/dialysis/dialysisTabPanel";
import DrugTabPanel from "@/components/drug/drugTabPanel";
import DietTabPanel from "@/components/diet/dietTabPanel";
import {Swiper, TabBar} from "antd-mobile";
import {useEffect, useRef, useState} from "react";
import "./style.css";
import {DialysisInfo, DietRecord, MedicationRecord, MedicationTiming} from "@/types/types";
import {useDiaSession} from "@/context/DiaSessionContext";
import {fetchDiaInfo} from "@/lib/dialysisApi";
import {fetchMedicationRecordsByDate} from "@/lib/medicationApi";
import {fetchDietRecordsByDate} from "@/lib/dietApi";

const tabItems = [
    {
        key: 'dialysis',
        title: '透析',
        icon: <span className="material-symbols-outlined">home_health</span>,
    },
    {
        key: 'drug',
        title: '服薬',
        icon: <span className="material-symbols-outlined">Pill</span>,
    },
    {
        key: 'diet',
        title: '飲食',
        icon: <span className="material-symbols-outlined">brunch_dining</span>,
    },
];

/**
 * 表示透析情報、服薬記録、飲食記録のタブを切り替える
 * @constructor
 */
export default function InfoTabs() {
    const swiperRef = useRef<SwiperRef>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const {sessionId, diaDate} = useDiaSession();
    const [diaInfo, setDiaInfo] = useState<DialysisInfo | undefined>(undefined);
    const [medicationRecords, setMedicationRecords] = useState<Map<MedicationTiming, MedicationRecord[]> | undefined>(undefined);
    const [dietRecords, setDietRecords] = useState<DietRecord[]>([]);
    useEffect(() => {
        if (!diaDate) {
            return;
        }
        (async () => {
            setDiaInfo(sessionId ? await fetchDiaInfo(sessionId) : undefined);
            setMedicationRecords(await fetchMedicationRecordsByDate(diaDate));
            setDietRecords(await fetchDietRecordsByDate(diaDate));
        })();
    }, [sessionId, diaDate]);
    return (
        <section className="flex-1 flex flex-col overflow-hidden">
            <Swiper
                className="flex-1 max-h-full"
                direction='horizontal'
                loop
                indicator={() => null}
                ref={swiperRef}
                defaultIndex={activeIndex}
                onIndexChange={index => {
                    setActiveIndex(index)
                }}
            >
                <Swiper.Item className="overflow-y-auto dialysis-tab">
                    <DialysisTabPanel diaInfo={diaInfo}/>
                </Swiper.Item>
                <Swiper.Item className="overflow-y-auto">
                    <DrugTabPanel medicationRecords={medicationRecords}/>
                </Swiper.Item>
                <Swiper.Item className="overflow-y-auto">
                    <DietTabPanel dietRecords={dietRecords}/>
                </Swiper.Item>
            </Swiper>
            <TabBar
                className={'border-t border-gray-200'}
                activeKey={tabItems[activeIndex].key}
                onChange={key => {
                    const index = tabItems.findIndex(item => item.key === key)
                    setActiveIndex(index)
                    swiperRef.current?.swipeTo(index)
                }}
            >
                {tabItems.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
                ))}
            </TabBar>
        </section>
    );
}