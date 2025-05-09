'use client';

import {SwiperRef} from "antd-mobile/es/components/swiper/swiper";
import DialysisTabPanel from "@/components/dialysis/dialysisTabPanel";
import DrugTabPanel from "@/components/drug/drugTabPanel";
import DietTabPanel from "@/components/diet/dietTabPanel";
import {Swiper, TabBar} from "antd-mobile";
import {useRef, useState} from "react";
import "./style.css";
import {DialysisInfo} from "@/types/types";

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

interface Props {
    diaInfo?: DialysisInfo
}

/**
 * 情報タブコンテナ
 * @constructor
 */
export default function InfoTabs({diaInfo}: Props) {
    const swiperRef = useRef<SwiperRef>(null)
    const [activeIndex, setActiveIndex] = useState(0)

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
                    <DrugTabPanel/>
                </Swiper.Item>
                <Swiper.Item className="overflow-y-auto">
                    <DietTabPanel/>
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