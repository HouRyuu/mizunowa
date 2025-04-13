import {Calendar, TabBar, Tag} from "antd-mobile";
import {recordStatusMap} from "@/types/mokData";
import dayjs from "dayjs";
import {dateFormat, statusColorMap} from "@/constants/constants";

const tabs = [
    {
        key: 'home',
        title: '透析',
        icon: <span className="material-symbols-outlined">home_health</span>,
    },
    {
        key: 'todo',
        title: '服薬',
        icon: <span className="material-symbols-outlined">Pill</span>,
    },
    {
        key: 'message',
        title: '飲食',
        icon: <span className="material-symbols-outlined">brunch_dining</span>,
    },
];

export default function DialysisCalendar() {
    return (
        <>
            <Calendar
                className={'border-b border-gray-200'}
                selectionMode='single'
                min={new Date('2021-01-01')}
                max={new Date('2025-12-31')}
                renderLabel={date => {
                    const recordStatus = recordStatusMap.get(dayjs(date).format(dateFormat));
                    return recordStatus ? <Tag round
                                               color={statusColorMap.get(recordStatus)}/> : <></>;
                }}
            />
            <TabBar className={'fixed bottom-0 w-full border-t border-gray-200'}>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
                ))}
            </TabBar>
        </>
    );
}