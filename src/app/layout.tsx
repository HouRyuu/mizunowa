import type { Metadata } from "next";
import "./globals.css";
import { DiaSessionProvider } from "@/context/DiaSessionContext";

// 基本 metadata 设置
export const metadata: Metadata = {
    title: "MIZUNOWA",
    description: "そっと支えて、ずっと寄り添う",
    icons: {
        icon: "/favicon.ico",
    },
    manifest: "/site.webmanifest",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja">
        <head>
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
                rel="stylesheet"
            />
        </head>
        <body>
        <DiaSessionProvider>{children}</DiaSessionProvider>
        </body>
        </html>
    );
}
