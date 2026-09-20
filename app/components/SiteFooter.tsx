import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";
import { CatMark } from "./CatMark";

const NAV_LINKS = [
  { href: "/cat-behavior", label: "貓咪習性" },
  { href: "/cat-mistakes", label: "常見錯誤" },
  { href: "/lucky-cat", label: "好運喵抽籤" },
];

const CONTACT_LINKS = [
  {
    href: "https://www.facebook.com/peng.lan.hui.988785",
    label: "FB 私訊：彭蘭慧",
    icon: MessageCircle,
  },
  { href: "#", label: "台北市松山區", icon: MapPin },
];

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background/10 text-gold-soft">
              <CatMark className="h-5 w-5" />
            </span>
            <span className="text-lg font-black">浪貓送養</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-6 text-background/70">
            用文字與行動，陪牠們找到回家的路。
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-background/50">網站導覽</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-background/80 transition-colors hover:text-background"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-background/50">聯絡我們</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={CONTACT_LINKS[0].href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-background/80 transition-colors hover:text-background"
              >
                <MessageCircle className="h-4 w-4" />
                {CONTACT_LINKS[0].label}
              </a>
            </li>
            <li className="flex items-center gap-2 text-background/80">
              <MapPin className="h-4 w-4" />
              {CONTACT_LINKS[1].label}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10 px-6 py-5 text-center text-xs text-background/50">
        © 2026 浪貓送養．本站為個人送養資訊分享
      </div>
    </footer>
  );
}
