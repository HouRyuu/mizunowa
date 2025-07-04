'use client'

import {Card, List, Skeleton, Space} from "antd-mobile";
import {useEffect, useState} from "react";
import {DialysisInfo} from "@/types/types";
import {useParams} from "next/navigation";
import {fetchDiaDetail} from "@/lib/dialysisApi";
import dayjs from "dayjs";
import {timeFormats} from "@/constants/constants";
import VitalChat from "@/components/dialysis/chats/vitalChat";
import TempChat from "@/components/dialysis/chats/tempChat";
import WeightChat from "@/components/dialysis/chats/weightChat";
import {ClockCircleFill, FilterOutline, FireFill, HeartFill, LocationFill, TeamFill} from "antd-mobile-icons";
import {getTimeView} from "@/utils/timeUtil";


export default function Page() {
    const [diaInfo, setDiaInfo] = useState<DialysisInfo | undefined>(undefined);
    const {sessionId} = useParams();
    useEffect(() => {
        if (typeof sessionId !== 'string') return;
        (async () => setDiaInfo(await fetchDiaDetail(Number(sessionId))))();
    }, [sessionId]);
    return (
        diaInfo ?
            <main className='min-h-screen p-4 diaInfo-page'>
                <Space direction='vertical' className='w-full'>
                    <Card className="bg-[var(--adm-color-border)]"
                          icon={<LocationFill fontSize='var(--adm-font-size-7)'/>} title="基本情報">
                        <List>
                            <List.Item
                                prefix="予約日時">{dayjs(diaInfo.reservationTime).format(timeFormats.slashDatetime)}</List.Item>
                            <List.Item prefix="受付">{diaInfo.counterLocation}{diaInfo.counterName}</List.Item>
                            <List.Item prefix="病棟">{diaInfo.wardName}</List.Item>
                            <List.Item prefix="体重計">{diaInfo.scaleName}</List.Item>
                            <List.Item prefix="ベッド">{diaInfo.bedNumber}</List.Item>
                        </List>
                    </Card>
                    <Card icon={<ClockCircleFill fontSize='var(--adm-font-size-7)'/>}
                          title="透析スケジュール">
                        <List>
                            <List.Item prefix="予定時間">{getTimeView(diaInfo.expDiaMin)}</List.Item>
                            <List.Item prefix="到着">{dayjs(diaInfo.arrivedAt).format(timeFormats.time)}</List.Item>
                            <List.Item prefix="開始">{dayjs(diaInfo.startedAt).format(timeFormats.time)}</List.Item>
                            <List.Item prefix="終了">{dayjs(diaInfo.endAt).format(timeFormats.time)}</List.Item>
                            <List.Item prefix="ステータス">終了</List.Item>
                        </List>
                    </Card>
                    <Card icon={<TeamFill fontSize='var(--adm-font-size-7)'/>}
                          title="担当者">
                        <List>
                            <List.Item prefix="医師">{diaInfo.doctorName}</List.Item>
                            <List.Item prefix="技師">{diaInfo.technicianName}</List.Item>
                            <List.Item prefix="看護師">{diaInfo.nurseName}</List.Item>
                        </List>
                    </Card>
                    <Card icon={<FilterOutline fontSize='var(--adm-font-size-7)'/>}
                          title="体重・除水">
                        <WeightChat diaInfo={diaInfo}/>
                    </Card>
                    <Card icon={<HeartFill fontSize='var(--adm-font-size-7)'/>}
                          title="バイタル情報">
                        <VitalChat bps={diaInfo.bps}/>
                    </Card>
                    <Card icon={<FireFill fontSize='var(--adm-font-size-7)'/>} title="体温">
                        <TempChat temps={diaInfo.temps}/>
                    </Card>
                </Space>
            </main>
            :
            <Skeleton.Paragraph className='p-5' lineCount={5} animated/>
    )
};