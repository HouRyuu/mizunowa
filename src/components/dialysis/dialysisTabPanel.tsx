import {Button, ErrorBlock, Space, Steps} from "antd-mobile";
import {Step} from "antd-mobile/es/components/steps/step";
import dayjs from "dayjs";
import {diaStatus, timeFormats} from "@/constants/constants";
import {getTimeView} from "@/utils/timeUtil";
import {DialysisInfo} from "@/types/types";
import {LinkOutline} from "antd-mobile-icons";
import Link from "next/link";

interface Props {
    diaInfo?: DialysisInfo
}

/**
 * 透析一覧コンポーネント
 * @param diaInfo 透析情報
 * @constructor
 */
export default function DialysisTabPanel({diaInfo}: Props) {
    return (
        diaInfo ?
            <Steps
                className="mt-5"
                direction="vertical"
                current={diaInfo.status > diaStatus.dialyzing ? diaInfo.status - 1 : diaInfo.status}>
                <Step
                    title="受付・入室"
                    description={
                        <ul>
                            {
                                diaInfo.status === diaStatus.reserved ?
                                    <>
                                        <li><strong className="text-black">{dayjs(diaInfo.reservationTime).format(timeFormats.slashDatetime)}</strong>のご来院をお待ちしております。
                                        </li>
                                        <li>ご到着後は<strong className="text-black">{diaInfo.counterLocation}の{diaInfo.counterName}カウンター</strong>にお越しください。</li>
                                    </>
                                    :
                                    <>
                                        <li>{dayjs(diaInfo.arrivedAt).format(timeFormats.slashDatetime)} 受付が完了しました。</li>
                                        <li>本日の担当者:{diaInfo.doctorName}(医師)、{diaInfo.technicianName}(技士)、{diaInfo.nurseName}(看護師)</li>
                                    </>
                            }
                        </ul>
                    }
                />
                <Step
                    title="体重測定"
                    description={
                        <ul>
                            {
                                diaInfo.status < diaStatus.weighedBefore ?
                                    <>
                                        <li><strong className="text-black">{diaInfo.scaleLocation}の{diaInfo.scaleName}体重計</strong>で体重を測定してください。</li>
                                        <li>靴を脱いでから、体重計にお乗りください。</li>
                                    </>
                                    :
                                    <>
                                        <li><strong className="text-black">透析前体重:{diaInfo.weightBefore}kg 予定除水量:{diaInfo.ufTarget}ℓ</strong></li>
                                        <li>※ 除水量はドライウェイトとの差から算出された目安です。</li>
                                    </>
                            }
                        </ul>
                    }
                />
                <Step
                    title="透析"
                    status={diaInfo.status < diaStatus.dialyzing ? 'wait' : diaInfo.status < diaStatus.dialysisDone ? 'process' : 'finish'}
                    description={
                        <ul>
                            {
                                diaInfo.status < diaStatus.dialyzing ?
                                    <>
                                        <li><strong className="text-black">透析予定時間：{getTimeView(diaInfo.expDiaMin)}</strong></li>
                                        <li><strong className="text-black">{diaInfo.wardName}内の{diaInfo.bedNumber}ベッド</strong>で透析をお受けください。</li>
                                        <li>スタッフがご案内いたしますので、そのままお待ちください。</li>
                                    </>
                                    :
                                    <>
                                        <li><strong className="text-black">透析場所：{diaInfo.wardName}内の{diaInfo.bedNumber}ベッド</strong></li>
                                        <li>
                                            <strong className="text-black mr-4">透析予定時間：{getTimeView(diaInfo.expDiaMin)}</strong>
                                            <strong className="text-black">
                                                経過時間：{getTimeView(
                                                dayjs(diaInfo.status < diaStatus.dialysisDone ? new Date() : diaInfo.endAt)
                                                    .diff(diaInfo.startedAt, 'minutes')
                                            )}</strong>
                                        </li>
                                        <li>気になることがあれば、いつでもお知らせください。</li>
                                    </>
                            }
                        </ul>
                    }
                />
                <Step
                    title="体重測定"
                    description={
                        <ul>
                            {
                                diaInfo.status < diaStatus.weighedAfter ?
                                    <li>透析後は、<strong className="text-black">{diaInfo.scaleLocation}の{diaInfo.scaleName}の体重計</strong>で再度体重を測定してください。</li>
                                    :
                                    <>
                                        <li><strong className="text-black">透析後体重:{diaInfo.weightAfter}kg 実除水量:{diaInfo.ufActual}ℓ</strong></li>
                                        <li>透析お疲れさまでした。体調に気をつけて、ゆっくりお休みください。</li>
                                        <li className='mt-2'>
                                            <Link href={`/dialysis/${diaInfo.sessionId}`}>
                                                <Button shape='rounded' color='primary' size='mini' fill='outline'>
                                                    <Space className='align-bottom'>
                                                        <LinkOutline fontSize='1rem'/>
                                                        <span>透析記録</span>
                                                    </Space>
                                                </Button>
                                            </Link>
                                        </li>
                                    </>
                            }
                        </ul>
                    }
                />
            </Steps>
            :
            <ErrorBlock
                status='empty'
                className='mt-20'
                style={{
                    '--image-height': '150px',
                }}
                title='本日は透析のご予約がありません'
                description='あなたの穏やかな毎日を、ここからそっと見守っています。'
            />
    );
};