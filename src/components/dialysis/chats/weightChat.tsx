import {DialysisInfo} from "@/types/types";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import dayjs from "dayjs";
import {timeFormats} from "@/constants/constants";

/**
 * 体重図表
 * @param diaInfo 透析記録
 * @constructor
 */
export default function WeightChat({diaInfo}: { diaInfo: DialysisInfo }) {
    const data = [
        {
            category: `目標${dayjs(diaInfo.weightBeforeAt).format(timeFormats.time)}`,
            体重: diaInfo.dryWeight,
            除水量: diaInfo.ufTarget,
        },
        {
            category: `実際${dayjs(diaInfo.weightAfterAt).format(timeFormats.time)}`,
            体重: diaInfo.weightAfter,
            除水量: diaInfo.ufActual,
        },
    ];

    return <ResponsiveContainer width="100%" height={200} className="bg-white">
        <BarChart data={data}>
            <Legend verticalAlign="top" align="right" iconType="rect"
                    formatter={(value) => value === '体重' ? `${value}(㎏)` : `${value}(ℓ)`}
            />
            <CartesianGrid strokeDasharray="5 5" vertical={false}/>
            <XAxis dataKey="category" axisLine={false}/>
            <YAxis axisLine={false}/>
            <Tooltip contentStyle={{borderRadius: 6}}/>
            <Bar
                dataKey="体重"
                fill="rgb(255,144,31)"
                barSize={36}
                label={{fill: '#fff'}}
                unit='㎏'
            />
            <Bar
                dataKey="除水量"
                fill="rgb(22,119,255)"
                barSize={36}
                label={{fill: '#fff'}}
                minPointSize={12}
                unit='ℓ'
            />
        </BarChart>
    </ResponsiveContainer>;
}