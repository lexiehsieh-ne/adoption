"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { CatMark } from "./CatMark";

const NAV_LINKS = [
  { href: "/cat-behavior", label: "貓咪習性" },
  { href: "/cat-mistakes", label: "常見錯誤" },
  { href: "/lucky-cat", label: "好運喵抽籤" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-soft text-gold">
            <CatMark className="h-5 w-5" />
          </span>
          <span className="text-lg font-black text-foreground">浪貓送養</span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium text-foreground/70 sm:flex">
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

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "關閉選單" : "開啟選單"}
          aria-expanded={menuOpen}
          className="flex h-9 w-9 items-center justify-center rounded-full text-foreground sm:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-line bg-background px-6 py-3 sm:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-2 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-blush-soft hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
