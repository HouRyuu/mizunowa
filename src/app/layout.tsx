import type {Metadata} from "next";
import "./globals.css";

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
        {children}
        </body>
        </html>
    );
}
