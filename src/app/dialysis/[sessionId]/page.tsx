'use client'

import {Card, List, Modal, Skeleton, Space} from "antd-mobile";
import {useEffect, useState} from "react";
import {DialysisInfo} from "@/types/types";
import {useParams} from "next/navigation";
import {fetchDiaDetail} from "@/lib/dialysisApi";
import dayjs from "dayjs";
import {diaStatusMap, timeFormats} from "@/constants/constants";
import VitalChat from "@/components/dialysis/chats/vitalChat";
import TempChat from "@/components/dialysis/chats/tempChat";
import WeightChat from "@/components/dialysis/chats/weightChat";
import {getTimeView} from "@/utils/timeUtil";


export default function Page() {
    const [diaInfo, setDiaInfo] = useState<DialysisInfo | undefined>(undefined);
    const [modalVisible, setModalVisible] = useState(false)
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
                          icon={<span className="material-symbols-outlined">medical_information</span>} title="基本情報">
                        <List>
                            <List.Item
                                prefix="予約日時">{dayjs(diaInfo.reservationTime).format(timeFormats.slashDatetime)}</List.Item>
                            <List.Item prefix="受付">{diaInfo.counterLocation}{diaInfo.counterName}</List.Item>
                            <List.Item prefix="病棟">{diaInfo.wardName}</List.Item>
                            <List.Item prefix="体重計">{diaInfo.scaleName}</List.Item>
                            <List.Item prefix="ベッド">{diaInfo.bedNumber}</List.Item>
                            <List.Item prefix="透析装置">{diaInfo.machineName}</List.Item>
                            <List.Item prefix="透析方式">
                                <Modal
                                    visible={modalVisible}
                                    content={diaInfo.diaTypeDescription}
                                    closeOnMaskClick
                                    onClose={() => setModalVisible(false)}
                                />
                                <span onClick={() => {
                                    setModalVisible(true)
                                }}>
                                    {diaInfo.diaTypeName} <span className="material-symbols-outlined align-middl">info</span>
                                </span>
                            </List.Item>
                        </List>
                    </Card>
                    <Card icon={<span className="material-symbols-outlined">nest_clock_farsight_analog</span>}
                          title="透析スケジュール">
                        <List>
                            <List.Item prefix="予定時間">{getTimeView(diaInfo.expDiaMin)}</List.Item>
                            <List.Item prefix="到着">{dayjs(diaInfo.arrivedAt).format(timeFormats.time)}</List.Item>
                            <List.Item prefix="開始">{dayjs(diaInfo.startedAt).format(timeFormats.time)}</List.Item>
                            <List.Item prefix="終了">{dayjs(diaInfo.endAt).format(timeFormats.time)}</List.Item>
                            <List.Item prefix="ステータス">{diaStatusMap.get(diaInfo.status)}</List.Item>
                        </List>
                    </Card>
                    <Card icon={<span className="material-symbols-outlined">groups_3</span>}
                          title="担当者">
                        <List>
                            <List.Item prefix="医師">{diaInfo.doctorName}</List.Item>
                            <List.Item prefix="技師">{diaInfo.technicianName}</List.Item>
                            <List.Item prefix="看護師">{diaInfo.nurseName}</List.Item>
                        </List>
                    </Card>
                    <Card icon={<span className="material-symbols-outlined">nephrology</span>}
                          title="体重・除水">
                        <WeightChat diaInfo={diaInfo}/>
                    </Card>
                    <Card icon={<span className="material-symbols-outlined">cardiology</span>}
                          title="バイタル情報">
                        <VitalChat bps={diaInfo.bps}/>
                    </Card>
                    <Card icon={<span className="material-symbols-outlined">thermostat</span>} title="体温">
                        <TempChat temps={diaInfo.temps}/>
                    </Card>
                </Space>
            </main>
            :
            <Skeleton.Paragraph className='p-5' lineCount={5} animated/>
    )
};