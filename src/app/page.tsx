'use client';
import {ConfigProvider} from "antd-mobile";
import jaJP from "antd-mobile/es/locales/ja-JP";
import DialysisCalendar from "@/components/calendar/DialysisCalendar";
import Header from "@/components/Header";

export default function Home() {
  return (
    <ConfigProvider locale={jaJP}>
        <Header />
        <DialysisCalendar />
    </ConfigProvider>
  );
}
