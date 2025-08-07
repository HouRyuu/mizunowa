import {MedicationRecord, MedicationTiming} from "@/types/types";
import {Checkbox, CheckList, Collapse, ErrorBlock, Skeleton} from "antd-mobile";
import {FaceRecognitionOutline, FrownOutline} from "antd-mobile-icons";
import {useEffect, useState, useCallback, useMemo} from "react";
import {useDiaSession} from "@/context/DiaSessionContext";
import {saveMedicationRecord} from "@/lib/medicationApi";
import dayjs from "dayjs";
import {timingMap} from "@/constants/constants";

interface Props {
    medicationRecords?: Map<MedicationTiming, MedicationRecord[]>;
}

let curDate: Date;

// ✅ 服薬チェック状態を保存・キャンセルする処理（副作用）
const toggleDrug = async (
    checkedDrugs: string[],
    records: MedicationRecord[]
) => {
    for (const record of records) {
        const isChecked = checkedDrugs.includes(`${record.itemId}-${record.timing}`);
        const wasTaken = !!record.takenFlag;

        if (wasTaken !== isChecked) {
            record.takenFlag = isChecked;
            if (isChecked) record.takenDate = curDate;
            record.recordId = await saveMedicationRecord(record);
        }
    }
};

export default function DrugTabPanel({medicationRecords}: Props) {
    const [checkedMap, setCheckedMap] = useState<Partial<Record<MedicationTiming, string[]>>>({});
    const [loading, setLoading] = useState(true); // ✅ ローディング状態追加
    const {diaDate} = useDiaSession();
    curDate = diaDate ?? new Date();
    const isFuture = dayjs(curDate).isAfter(dayjs(), "day");

    // ✅ 服薬記録データが変化した時、チェック済み情報を初期化
    useEffect(() => {
        if (!medicationRecords) return;
        const initial: Partial<Record<MedicationTiming, string[]>> = {};
        medicationRecords.forEach((records, timing) => {
            initial[timing] = records
                .filter(r => !!r.takenFlag)
                .map(r => `${r.itemId}-${r.timing}`);
        });
        setCheckedMap(initial);
        setLoading(false); // ✅ データ準備完了後ローディング解除
    }, [medicationRecords]);

    // ✅ 服薬チェック・個別更新の共通処理
    const handleCheckChange = useCallback(
        async (
            timing: MedicationTiming,
            records: MedicationRecord[],
            value: string[] | boolean
        ) => {
            const newChecked = Array.isArray(value)
                ? value
                : value
                    ? records.map(r => `${r.itemId}-${r.timing}`)
                    : [];

            const updatedMap = {...checkedMap, [timing]: newChecked};
            setCheckedMap(updatedMap);
            await toggleDrug(newChecked, records);
        },
        [checkedMap]
    );

    const renderedPanels = useMemo(() => {
        // timingMapの順で表示
        return Array.from(timingMap.keys()).map(timing => {
            const records = medicationRecords?.get(timing);
            if (!records || records.length === 0) return null;
            const checkedList = checkedMap[timing] || [];
            const total = records.length;
            const checkedCount = checkedList.length;

            return (
                <Collapse.Panel
                    key={timing}
                    title={
                        <Checkbox
                            disabled={isFuture}
                            onClick={e => e.stopPropagation()}
                            indeterminate={checkedCount > 0 && checkedCount < total}
                            checked={checkedCount === total}
                            onChange={(e) => handleCheckChange(timing, records, e)}
                        >
                            {timingMap.get(timing)}
                        </Checkbox>
                    }
                >
                    <CheckList
                        multiple
                        readOnly={isFuture}
                        extra={active => active ? <FaceRecognitionOutline/> : <FrownOutline/>}
                        value={checkedList}
                        onChange={(value) => handleCheckChange(timing, records, value as string[])}
                    >
                        {records.map((record) => (
                            <CheckList.Item
                                key={`${record.itemId}-${timing}`}
                                value={`${record.itemId}-${timing}`}
                                description={`${record.frequency} ${record.dosage}`}
                                className="text-sm"
                            >
                                {record.medicationName}
                            </CheckList.Item>
                        ))}
                    </CheckList>
                </Collapse.Panel>
            );
        }).filter(Boolean);
    }, [medicationRecords, checkedMap, handleCheckChange]);

    if (loading) {
        return <Skeleton.Paragraph lineCount={4} animated className='p-2'/>;
    }

    if (!medicationRecords || !medicationRecords.size) {
        return <ErrorBlock
            status='empty'
            className='mt-10'
            style={{
                '--image-height': '150px',
            }}
            title='お薬はお休みです'
            description='あなたの健やかな一日を、静かに応援しています。'
        />;
    }

    return <Collapse className='p-2'>{renderedPanels}</Collapse>;
}
