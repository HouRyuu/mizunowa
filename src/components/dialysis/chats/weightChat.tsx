import {DialysisInfo} from "@/types/types";
import {Column} from "@ant-design/plots";

/**
 * 体重図表
 * @param diaInfo 透析記録
 * @constructor
 */
export default function WeightChat({diaInfo}: { diaInfo: DialysisInfo }) {
    /*const config = {
        data: [{
            type: '予定',
            体重: diaInfo.dryWeight,
            uf: diaInfo.ufTarget,
        }, {
            type: '実際',
            体重: diaInfo.weightAfter,
            uf: diaInfo.ufActual,
        },],
        height: 200,
        xField: 'type',
        yField: '体重',
        colorField: 'uf',
        stack: true,
        axis: {
            y: {labelFormatter: '~s'},
            x: {
                labelSpacing: 4,
                style: {
                    labelTransform: 'rotate(90)',
                },
            },
        },
    };
    return <Bar {...config} />;*/
    const data = [
        {
            category: '目標',
            type: '体重',
            value: diaInfo.dryWeight,
        },
        {
            category: '目標',
            type: '除水量',
            value: diaInfo.ufTarget,
        },
        {
            category: '実際',
            type: '体重',
            value: diaInfo.weightAfter,
        },
        {
            category: '実際',
            type: '除水量',
            value: diaInfo.ufActual,
        },
    ];

    const config = {
        data,
        height:200,
        isGroup: false,        // 不分组
        isStack: true,         // 堆叠
        xField: 'category',
        yField: 'value',
        seriesField: 'type',   // 体重 or 除水量
        tooltip: {
            items: [
                (item: { type: string; value: number; }) => {
                    return ({
                        // color: data[index].type === '体重' ? 'red' : 'blue', // 指定 item 的颜色
                        name: item.type, // 指定 item 的名字
                        value: `${item.value}${item.type === '体重' ? '㎏' : 'ℓ'}`,
                    })
                },
            ]
        },
    };
    return <Column {...config} />;
}