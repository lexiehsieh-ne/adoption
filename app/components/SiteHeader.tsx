import Link from "next/link";
import { CatMark } from "./CatMark";

const NAV_LINKS = [
  { href: "/", label: "首頁" },
  { href: "/cat-behavior", label: "貓咪習性" },
  { href: "/cat-mistakes", label: "常見錯誤" },
  { href: "/lucky-cat", label: "好運喵抽籤" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-soft text-gold">
            <CatMark className="h-5 w-5" />
          </span>
          <span className="text-lg font-black text-foreground">浪貓送養</span>
        </Link>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-medium text-foreground/70">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
