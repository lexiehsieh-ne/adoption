import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { MapPin, MessageCircle, PawPrint } from "lucide-react";
import { Ribbon } from "./components/Ribbon";
import { Polaroid } from "./components/Polaroid";
import { PhotoCarousel } from "./components/PhotoCarousel";
import { VideoPreview } from "./components/VideoPreview";
import { ShareButton } from "./components/ShareButton";

function fileExists(name: string) {
  return fs.existsSync(
    path.join(process.cwd(), "public", "images", name),
  );
}

const FEATURES = [
  {
    number: "01",
    href: "/cat-behavior",
    emoji: "🐾",
    title: "貓咪習性介紹",
    description: "了解貓咪的作息、磨爪、理毛與肢體語言，養貓前先懂貓。",
  },
  {
    number: "02",
    href: "/cat-mistakes",
    emoji: "⚠️",
    title: "飼養常見錯誤",
    description: "新手最容易踩的雷，提早避開讓貓咪住得更健康快樂。",
  },
  {
    number: "03",
    href: "/lucky-cat",
    emoji: "🔮",
    title: "好運喵抽籤",
    description: "隨機抽出一款貓咪花色，看看今天的幸運貓長什麼樣子。",
  },
];

const TRAITS = [
  "血檢過關",
  "第一劑預防針已完成",
  "體內外驅蟲已完成",
  "精神好、食慾佳，會自己使用貓砂",
  "姊妹感情超好，會互相梳毛、抱著睡覺",
];

const ADOPTION_NOTES = [
  "年滿 25 歲，收入穩定",
  "需施打晶片疫苗及絕育",
  "接受家訪",
  "需配合定期追蹤近況",
  "需簽署認養同意書",
];

const NOT_ACCEPTED = ["情侶、套房恕不考慮", "不配合家訪、不做防護者恕不考慮"];

export default function Home() {
  const heroPhoto = fileExists("cat.png") ? "cat.png" : "sister.jpg";
  const aboutPhoto = fileExists("sister3.jpg") ? "sister3.jpg" : "older.jpg";
  const dailyVideos = [
    { file: "play.mp4", caption: "一起玩耍" },
    { file: "touch.mp4", caption: "討摸互動" },
    { file: "drink.mp4", caption: "喝水時間" },
  ].filter((video) => fileExists(video.file));

  const gallery = [
    "young.jpg",
    "older.jpg",
    "sister.jpg",
    "older2.jpg",
    "sister3.jpg",
    "older3.jpg",
    "sister2.jpg",
    "young2.jpg",
  ]
    .filter((file) => fileExists(file))
    .map((file) => `/images/${file}`);

  return (
    <div className="flex flex-1 flex-col bg-background">
      {/* Hero */}
      <section className="mx-auto grid w-full max-w-5xl gap-16 px-6 pb-20 pt-16 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="flex items-center gap-3 text-blush">
            <span aria-hidden>♡</span>
            <span className="font-script text-2xl">兩隻小玳瑁</span>
            <span aria-hidden>♡</span>
          </div>

          <h1 className="mt-3 text-5xl font-black leading-[1.05] text-foreground sm:text-6xl">
            正在尋找
            <br />
            <span className="text-blush">永遠的家</span>
          </h1>

          <Ribbon className="mt-6">領養．陪伴．拯救一個生命</Ribbon>

          <p className="mt-6 max-w-md leading-7 text-foreground/70">
            兩隻玳瑁女生，約 3 個月大，血檢過關、疫苗驅蟲都已完成，健康活潑、食慾佳，姊妹感情超好，希望能找到願意長期照顧、給牠們一個安穩家庭的貓奴。
          </p>

          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gold-soft px-4 py-1.5 text-sm font-bold text-foreground">
            ⭐ 雙貓優先領養，姊妹一起帶走更安心
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#adopt"
              className="rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background transition-opacity hover:opacity-90"
            >
              認養須知
            </a>
            <Link
              href="/cat-behavior"
              className="rounded-full border-2 border-foreground/20 bg-card px-6 py-3 text-sm font-bold text-foreground transition-colors hover:border-foreground/40"
            >
              先了解貓咪習性
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <Polaroid
            src={`/images/${heroPhoto}`}
            alt="玳瑁小姊妹與手繪插畫"
            className="aspect-[4/3] w-full rotate-2"
          />
          <div className="absolute -right-3 -top-3 z-10 flex h-20 w-20 rotate-6 flex-col items-center justify-center rounded-full border-4 border-dashed border-background bg-foreground text-center text-background shadow-lg sm:-right-6 sm:-top-6 sm:h-24 sm:w-24">
            <span className="text-[10px] font-bold leading-tight sm:text-[11px]">年齡</span>
            <span className="text-xs font-black leading-tight sm:text-sm">約 3 個月</span>
          </div>
        </div>
      </section>

      {/* About us */}
      <section className="border-y border-line bg-card/60">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Ribbon>🐾 關於我們</Ribbon>
            <h2 className="mt-5 text-2xl font-black text-foreground sm:text-3xl">
              玳瑁貓是開盲盒，越長只會越驚艷！
            </h2>
            <p className="mt-3 max-w-lg text-foreground/70">
              很多人對玳瑁有偏見，但養過的都知道，玳瑁根本是「驚喜包」！小時候看似低調，長大毛色亮起來真的美爆，而且性格超級黏人又聰明，完全是貓界隱藏版極品。兩隻從小一起長大，會互相幫忙梳毛、打鬧、抱在一起睡覺——很適合新手雙貓家庭，一起帶走能大幅減少分離焦慮，主人上班也不用擔心牠們孤單。
            </p>

            <ul className="mt-6 space-y-3">
              {TRAITS.map((trait) => (
                <li
                  key={trait}
                  className="flex items-center gap-3 text-foreground/80"
                >
                  <PawPrint className="h-4 w-4 shrink-0 text-blush" />
                  {trait}
                </li>
              ))}
            </ul>
          </div>

          <Polaroid
            src={`/images/${aboutPhoto}`}
            alt="玳瑁小貓"
            className="mx-auto w-full max-w-xs -rotate-2"
          />
        </div>
      </section>

      {/* Extended reading */}
      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <Ribbon>📖 延伸閱讀</Ribbon>
        <h2 className="mt-5 text-2xl font-black text-foreground sm:text-3xl">
          養貓之前，先逛逛這三個單元
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="group flex flex-col gap-3 rounded-3xl border border-line bg-card p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gold font-display text-sm font-bold text-gold">
                  {feature.number}
                </span>
                <span className="text-3xl">{feature.emoji}</span>
              </div>
              <span className="text-lg font-extrabold text-foreground">
                {feature.title}
              </span>
              <span className="text-sm leading-6 text-foreground/70">
                {feature.description}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Daily life videos */}
      {dailyVideos.length > 0 && (
        <section className="mx-auto w-full max-w-5xl px-6 py-16">
          <Ribbon>🎬 日常花絮</Ribbon>
          <h2 className="mt-5 text-2xl font-black text-foreground sm:text-3xl">
            看看牠們平常在做什麼
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {dailyVideos.map((video) => (
              <VideoPreview
                key={video.file}
                src={`/images/${video.file}`}
                caption={video.caption}
              />
            ))}
          </div>
        </section>
      )}

      {/* Photo gallery */}
      {gallery.length > 0 && (
        <section className="w-full py-16">
          <div className="mx-auto max-w-5xl px-6">
            <Ribbon>📸 貓咪寫真區</Ribbon>
            <h2 className="mt-5 text-2xl font-black text-foreground sm:text-3xl">
              越看越心動
            </h2>
          </div>

          <div className="mt-8">
            <PhotoCarousel photos={gallery} />
          </div>
        </section>
      )}

      {/* Adoption preference */}
      <section id="adopt" className="border-y border-line bg-card/60">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <Ribbon>📋 認養須知</Ribbon>
          <h2 className="mt-5 text-2xl font-black text-foreground sm:text-3xl">
            在決定認養之前
          </h2>

          <div className="mt-6 max-w-2xl rounded-2xl border-2 border-dashed border-foreground/25 bg-background p-6 text-sm leading-7 text-foreground/80">
            我們希望找到願意負責任的認養人，能給牠們一輩子的愛與安全感。請務必確定自己已經準備好，願意承擔長期照顧的責任，再考慮認養。
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {ADOPTION_NOTES.map((note) => (
              <li
                key={note}
                className="flex items-start gap-3 rounded-2xl border border-line bg-card p-5 text-sm leading-6 text-foreground/80"
              >
                <PawPrint className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {note}
              </li>
            ))}
          </ul>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-dashed border-foreground/25 bg-background px-5 py-2 text-sm font-bold text-foreground">
            🏠 我們值得一個安全、不放養的室內家
          </div>

          <ul className="mt-6 flex flex-wrap gap-3">
            {NOT_ACCEPTED.map((note) => (
              <li
                key={note}
                className="flex items-center gap-2 rounded-full bg-blush-soft px-4 py-2 text-sm font-medium text-foreground"
              >
                🈲 {note}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact bar */}
      <section className="bg-foreground text-background">
        <div className="mx-auto grid max-w-5xl gap-8 divide-y divide-background/15 px-6 py-10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="flex items-center gap-4 pt-6 first:pt-0 sm:justify-center sm:pt-0">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-background/10">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-background/60">地點</p>
              <p className="font-bold">台北市松山區</p>
            </div>
          </div>
          <div className="flex items-center gap-4 pt-6 sm:justify-center sm:pt-0">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-background/10">
              <MessageCircle className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-background/60">聯絡方式</p>
              <a
                href="https://www.facebook.com/peng.lan.hui.988785"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline-offset-2 hover:underline"
              >
                FB 私訊：彭蘭慧
              </a>
            </div>
          </div>
          <div className="flex items-center pt-6 sm:justify-center sm:pt-0">
            <ShareButton />
          </div>
        </div>
      </section>
    </div>
  );
}
