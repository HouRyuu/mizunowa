import {BloodPressure} from "@/types/types";
import dayjs from "dayjs";
import {timeFormats} from "@/constants/constants";
import {ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid} from "recharts";

interface Props {
    bps?: BloodPressure[];
}

/**
 * バイタル図表
 * @param bps 血圧
 * @constructor
 */
export default function VitalChat({bps = []}: Props) {
    // データ整形
    const chartData = bps.map(({measureAt, systolicBp, diastolicBp, pulse}) => ({
        measureAt: dayjs(measureAt).format(timeFormats.time),
        収縮: diastolicBp,
        拡張: systolicBp,
        脈拍: pulse,
    }));

    // 最大値計算（Y軸スケール用）
    const maxBpTotal = Math.max(
        ...bps.map(({systolicBp, diastolicBp}) => systolicBp + diastolicBp + 10),
        0
    );

    return (
        <ResponsiveContainer width="100%" height={200} className="bg-white">
            <ComposedChart data={chartData}>
                <Legend verticalAlign="top" align="right" iconType="rect"/>
                <CartesianGrid strokeDasharray="5 5" vertical={false}/>
                <XAxis dataKey="measureAt" axisLine={false}/>
                <YAxis yAxisId="left" domain={[0, maxBpTotal]} axisLine={false}/>
                <YAxis yAxisId="right" orientation="right" axisLine={false}/>
                <Tooltip contentStyle={{borderRadius: 6}}/>
                <Bar yAxisId="left" dataKey="収縮" stackId="a" fill="rgb(0,181,120)" barSize={24} label={{fill: '#fff'}}/>
                <Bar yAxisId="left" dataKey="拡張" stackId="a" fill="rgb(255,144,31)" barSize={24} label={{fill: '#fff'}}/>
                <Line yAxisId="right" type="monotone" dataKey="脈拍" stroke="rgb(22,119,255)" strokeWidth={2} dot/>
            </ComposedChart>
        </ResponsiveContainer>
    );
}