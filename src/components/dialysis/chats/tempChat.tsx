import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend} from "recharts";
import dayjs from "dayjs";
import {timeFormats} from "@/constants/constants";
import {Temperature} from "@/types/types";

export default function TempChat({temps = []}: { temps: Temperature[] | undefined }) {
    // データ整形
    const chartData = temps.map(temp => ({
        measureAt: dayjs(temp.measureAt).format(timeFormats.time),
        体温: temp.temperature,
    }));

    return (
        <ResponsiveContainer width="100%" height={200} className="bg-white">
            <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="5 5" vertical={false}/>
                <XAxis dataKey="measureAt" axisLine={false}/>
                <YAxis axisLine={false}/>
                <Tooltip contentStyle={{borderRadius: 6}}/>
                <Legend verticalAlign="top" align="right" iconType="line"
                        formatter={(value) => `${value}(℃)`}/>
                <Line
                    type="monotone"
                    dataKey="体温"
                    stroke="rgb(255,144,31)"
                    strokeWidth={2}
                    dot
                    unit="℃"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}