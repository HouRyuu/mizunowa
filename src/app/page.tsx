'use client';
import {ConfigProvider} from "antd-mobile";
import jaJP from "antd-mobile/es/locales/ja-JP";
import DialysisCalendar from "@/components/calendar/DialysisCalendar";
import Header from "@/components/Header";
import InfoTabs from "@/components/infoTabs";

export default function Home() {
    return (
        <ConfigProvider
            locale={jaJP}>
            <div className="flex flex-col h-screen">
                <Header/>
                <DialysisCalendar/>
                <InfoTabs/>
            </div>
        </ConfigProvider>
    );
}
