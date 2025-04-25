import {ErrorBlock, Steps} from "antd-mobile";
import {Step} from "antd-mobile/es/components/steps/step";
import {mockDialysisInfo} from "@/mock/mockData";
import dayjs from "dayjs";
import {diaStatus, timeFormats} from "@/constants/constants";
import {getTimeView} from "@/utils/timeUtil";

export default function DialysisTabPanel() {
    return (
        mockDialysisInfo ?
            <Steps
                className="mt-5"
                direction="vertical"
                current={mockDialysisInfo.status > diaStatus.dialyzing ? mockDialysisInfo.status - 1 : mockDialysisInfo.status}>
                <Step
                    title="受付・入室"
                    description={
                        <ul>
                            {
                                mockDialysisInfo.status === diaStatus.reserved ?
                                    <>
                                        <li><strong className="text-black">{dayjs(mockDialysisInfo.reservedAt).format(timeFormats.datetime)}</strong>のご来院をお待ちしております。
                                        </li>
                                        <li>ご到着後は<strong className="text-black">{mockDialysisInfo.reception}の受付カウンター</strong>にお越しください。
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li>{dayjs(mockDialysisInfo.arrivedAt).format(timeFormats.datetime)} 受付が完了しました。</li>
                                        <li>本日の担当者:{mockDialysisInfo.doctor}、{mockDialysisInfo.technician}、{mockDialysisInfo.nurse}</li>
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
                                mockDialysisInfo.status < diaStatus.weighedBefore ?
                                    <>
                                        <li><strong className="text-black">{mockDialysisInfo.scale}の体重計</strong>で体重を測定してください。</li>
                                        <li>靴を脱いでから、体重計にお乗りください。</li>
                                    </>
                                    :
                                    <>
                                        <li><strong className="text-black">透析前体重:{mockDialysisInfo.weightBefore}kg 予定除水量:{mockDialysisInfo.ufTarget}ℓ</strong></li>
                                        <li>※ 除水量はドライウェイトとの差から算出された目安です。</li>
                                    </>
                            }
                        </ul>
                    }
                />
                <Step
                    title="透析"
                    status={mockDialysisInfo.status < diaStatus.dialyzing ? 'wait' : mockDialysisInfo.status < diaStatus.dialysisDone ? 'process' : 'finish'}
                    description={
                        <ul>
                            {
                                mockDialysisInfo.status < diaStatus.dialyzing ?
                                    <>
                                        <li><strong className="text-black">透析予定時間：{getTimeView(mockDialysisInfo.remainingMin)}</strong></li>
                                        <li><strong className="text-black">{mockDialysisInfo.room}内の{mockDialysisInfo.bed}ベッド</strong>で透析をお受けください。</li>
                                        <li>スタッフがご案内いたしますので、そのままお待ちください。</li>
                                    </>
                                    :
                                    <>
                                        <li><strong className="text-black">透析場所：{mockDialysisInfo.room}内の{mockDialysisInfo.bed}ベッド</strong></li>
                                        <li>
                                            <strong className="text-black mr-4">透析予定時間：{getTimeView(mockDialysisInfo.remainingMin)}</strong>
                                            <strong className="text-black">
                                                経過時間：{getTimeView(
                                                dayjs(mockDialysisInfo.status < diaStatus.dialysisDone ? new Date() : mockDialysisInfo.endsAt)
                                                    .diff(mockDialysisInfo.startedAt, 'minutes')
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
                                mockDialysisInfo.status < diaStatus.weighedAfter ?
                                    <li>透析後は、<strong className="text-black">{mockDialysisInfo.scale}の体重計</strong>で再度体重を測定してください。</li>
                                    :
                                    <>
                                        <li><strong className="text-black">透析後体重:{mockDialysisInfo.weightAfter}kg 実除水量:{mockDialysisInfo.ufTarget}ℓ</strong></li>
                                        <li>透析お疲れさまでした。体調に気をつけて、ゆっくりお休みください。</li>
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