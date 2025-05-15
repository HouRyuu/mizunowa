import {Temperature} from "@/types/types";
import {Line} from "@ant-design/plots";
import dayjs from "dayjs";
import {timeFormats} from "@/constants/constants";

/**
 * 体温図表
 * @param temps 体温
 * @constructor
 */
export default function TempChat({temps = []}: { temps: Temperature[] | undefined }) {
    const config = {
        data: temps.map(temp => {
            return {
                measureAt: dayjs(temp.measureAt).format(timeFormats.time),
                temperature: temp.temperature,
                type: '体温',
            }
        }),
        xField: 'measureAt',
        yField: 'temperature',
        colorField: 'type',
        style: {
            lineWidth: 2,
        },
        height: 200, // 控制图表高度，适合移动端
    };
    return <Line {...config} />;
}