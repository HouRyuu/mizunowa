import {Steps} from "antd-mobile";
import {Step} from "antd-mobile/es/components/steps/step";
import {mockDialysisInfo} from "@/mock/mockData";
import dayjs from "dayjs";
import {diaStatus, timeFormats} from "@/constants/constants";
import {getTimeView} from "@/utils/timeUtil";

export default function DialysisTabPanel() {
    return (<Steps direction="vertical"
                   current={mockDialysisInfo.status > diaStatus.dialyzing ? mockDialysisInfo.status - 1 : mockDialysisInfo.status}>
            <Step
                title="受付・入室"
                description={
                    <ul>
                        {
                            mockDialysisInfo.status === diaStatus.reserved ?
                                <>
                                    <li><strong className="text-black">{dayjs(mockDialysisInfo.reservedAt).format(timeFormats.datetime)}</strong>のご来院をお待ちしております。</li>
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
                                    <li>靴を脱いでからご乗車ください。</li>
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
                        <li><strong className="text-black">透析予定時間：{getTimeView(mockDialysisInfo.remainingMin)}</strong></li>
                        {
                            mockDialysisInfo.status < diaStatus.dialyzing ?
                                <>
                                    <li><strong className="text-black">{mockDialysisInfo.room}内の{mockDialysisInfo.bed}ベッド</strong>で透析をお受けください。</li>
                                    <li>スタッフがご案内いたしますので、そのままお待ちください。</li>
                                </>
                                :
                                <>
                                    <li>{mockDialysisInfo.room}内の{mockDialysisInfo.bed}ベッド</li>
                                    <li>経過時間：{getTimeView(dayjs(mockDialysisInfo.startedAt).diff(mockDialysisInfo.endsAt, 'minutes'))}</li>
                                </>
                        }
                    </ul>
                }
            />
            <Step
                title="体重測定・退出"
                description={
                    <ul>
                        {
                            mockDialysisInfo.status < diaStatus.weighedAfter ?
                                <li>透析後は、<strong className="text-black">{mockDialysisInfo.scale}の体重計</strong>で再度体重を測定してください。</li>
                                :
                                <li>透析前体重:{mockDialysisInfo.weightBefore}kg 除水量:{mockDialysisInfo.ufTarget}ℓ</li>
                        }
                    </ul>
                }
            />
        </Steps>
    );
};