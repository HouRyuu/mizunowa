import {BloodPressure} from "@/types/types";
import dayjs from "dayjs";
import {timeFormats} from "@/constants/constants";
import {DualAxes} from "@ant-design/plots";

interface Props {
    bps?: BloodPressure[];
}

/**
 * バイタル図表
 * @param bps 血圧
 * @constructor
 */
export default function VitalChat({bps = []}: Props) {
    const bloodPressures: { measureAt: string; bp: number; type: string; }[] = [];
    let maxBpTotal = 0;
    const pulses = bps.map(({measureAt, systolicBp, diastolicBp, pulse}) => {
        const measureAtStr = dayjs(measureAt).format(timeFormats.time);
        if (systolicBp + diastolicBp > maxBpTotal) {
            maxBpTotal = systolicBp + diastolicBp;
        }
        bloodPressures.push({
            measureAt: measureAtStr,
            bp: diastolicBp,
            type: '収縮',
        });
        bloodPressures.push({
            measureAt: measureAtStr,
            bp: systolicBp,
            type: '拡張',
        });
        return {
            measureAt: measureAtStr,
            pulse,
        }
    });
    const config = {
        xField: 'measureAt',
        legend: {
            color: {
                itemMarker: 'round',
                itemMarkerSize: 14,
                position: 'bottom',
            },
        },
        children: [
            {
                data: bloodPressures,
                type: 'interval',
                yField: 'bp',
                stack: true,
                colorField: 'type',
                style: {maxWidth: 36},
                label: {position: 'inside'},
                scale: {y: {domainMax: maxBpTotal}},
                interaction: {
                    elementHighlight: {background: true},
                },
            },
            {
                data: pulses,
                type: 'line',
                yField: 'pulse',
                colorField: () => '脈拍',
                style: {lineWidth: 2},
                axis: {y: {position: 'right'}},
                interaction: {
                    tooltip: {
                        crosshairs: false,
                        marker: false,
                    },
                },
            },
        ],
        theme: {category10: ['#F4A49E', '#FACDAA', '#EE7B91', '#E85285', '#BE408C', '#BE408C']},
        height: 330,
    };
    return <DualAxes {...config} />;
}