'use client'

import "../globals.css";
import {NavBar} from "antd-mobile";
import {useRouter} from "next/navigation";

/**
 * 透析記録レイアウト
 * @param children 透析記録ページ
 * @constructor
 */
export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    return (
        <>
            <header className='border-b border-gray-200'>
                <NavBar onBack={() => router.push('/')}>透析記録</NavBar>
            </header>
            {children}
        </>
    );
}
