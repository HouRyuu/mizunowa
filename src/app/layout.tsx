import type {Metadata} from "next";
import "./globals.css";
import {DiaSessionProvider} from "@/context/DiaSessionContext";

export const metadata: Metadata = {
    title: "MIZUNOWA",
    description: "そっと支えて、ずっと寄り添う",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
        <head>
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
                rel="stylesheet"
            />
        </head>
        <body>
        <DiaSessionProvider>
            {children}
        </DiaSessionProvider>
        </body>
        </html>
    );
}
