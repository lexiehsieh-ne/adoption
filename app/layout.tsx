import type { Metadata } from "next";
import { Baloo_2, Ma_Shan_Zheng, Noto_Sans_TC } from "next/font/google";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import "./globals.css";

const notoSansTC = Noto_Sans_TC({
  variable: "--font-body",
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

const baloo2 = Baloo_2({
  variable: "--font-display",
  weight: ["600", "700", "800"],
  subsets: ["latin"],
});

const maShanZheng = Ma_Shan_Zheng({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "浪貓送養",
  description: "認識這對玳瑁小姊妹，也來看看貓咪習性、飼養常見錯誤與好運喵抽籤。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${notoSansTC.variable} ${baloo2.variable} ${maShanZheng.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
