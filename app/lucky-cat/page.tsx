"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type FurPatch = {
  color: string;
  dx: number;
  dy: number;
  r: number;
};

type CatPattern = {
  name: string;
  emoji: string;
  color: string;
  textColor: string;
  furBase: string;
  furPatches: FurPatch[];
  photo: string;
  genderTendency: string;
  personality: string;
  description: string;
};

const WIKIMEDIA_FILE_PATH = "https://commons.wikimedia.org/wiki/Special:FilePath";

const CAT_PATTERNS: CatPattern[] = [
  {
    name: "橘貓",
    emoji: "🧡",
    color: "#eda868",
    textColor: "#3a2e28",
    furBase: "#e5984a",
    furPatches: [],
    photo: `${WIKIMEDIA_FILE_PATH}/Orange_tabby_cat-932269.jpg?width=500`,
    genderTendency: "約 8 成為公貓",
    personality: "貪吃、親人、活潑、傻氣愛撒嬌",
    description:
      "俗稱「橘貓」，因毛色基因與性染色體連鎖，公貓比例明顯偏高。個性大多憨厚親人，江湖傳言「十貓九橘，十橘九胖」，超級愛吃又愛討摸。",
  },
  {
    name: "三花貓",
    emoji: "🌸",
    color: "#eba8b8",
    textColor: "#3a2e28",
    furBase: "#f7f0e4",
    furPatches: [
      { color: "#e2812e", dx: -0.4, dy: -0.3, r: 0.55 },
      { color: "#2b2320", dx: 0.4, dy: 0.35, r: 0.5 },
    ],
    photo: `${WIKIMEDIA_FILE_PATH}/Calico_cat_-_bright.jpg?width=500`,
    genderTendency: "幾乎都是母貓（公貓機率極低）",
    personality: "獨立有主見、警覺性高、認定的人會很黏",
    description:
      "白、黑、橘三色交雜的花色，因基因需要兩條 X 染色體才會出現，公貓機率大約三千分之一。對陌生人較謹慎，熟悉後會展現黏人的一面。",
  },
  {
    name: "玳瑁貓",
    emoji: "🔥",
    color: "#9c6b45",
    textColor: "#fffdf8",
    furBase: "#4a3120",
    furPatches: [{ color: "#c97a2e", dx: 0.4, dy: -0.3, r: 0.55 }],
    photo: `${WIKIMEDIA_FILE_PATH}/Tortoiseshell_cat_with_green_eyes.jpg?width=500`,
    genderTendency: "幾乎都是母貓",
    personality: "情緒豐富、個性強烈（俗稱 tortitude）、愛憎分明",
    description:
      "黑與橘交融但沒有白色斑塊，和三花貓一樣幾乎都是母貓。個性直接、自我意識強，是出了名「有個性」的花色。",
  },
  {
    name: "黑貓",
    emoji: "🖤",
    color: "#4a4038",
    textColor: "#fffdf8",
    furBase: "#2a2622",
    furPatches: [],
    photo: `${WIKIMEDIA_FILE_PATH}/A_Black_Cat.jpg?width=500`,
    genderTendency: "公母比例接近",
    personality: "神秘、獨立、忠誠，熟悉後會非常黏人",
    description:
      "許多文化中黑貓帶有神秘或幸運的象徵，實際個性因貓而異，普遍溫和親人，只是需要多一點時間建立信任感。",
  },
  {
    name: "白貓",
    emoji: "🤍",
    color: "#f3ecdd",
    textColor: "#3a2e28",
    furBase: "#f7f2e7",
    furPatches: [],
    photo: `${WIKIMEDIA_FILE_PATH}/White_Domestic_Shorthair_Cat.jpg?width=500`,
    genderTendency: "公母比例接近",
    personality: "優雅安靜、敏感細膩，部分藍眼白貓聽力較弱",
    description:
      "純白毛色較少見，個性溫和文靜。部分藍眼睛的白貓因基因關係天生聽力較弱，互動時可以多利用視覺與震動提示。",
  },
  {
    name: "賓士貓",
    emoji: "🎩",
    color: "#6b6156",
    textColor: "#fffdf8",
    furBase: "#f7f2e7",
    furPatches: [{ color: "#242019", dx: 0, dy: -0.55, r: 0.62 }],
    photo: `${WIKIMEDIA_FILE_PATH}/TUXEDO_CAT_BLACK_AND_WHITE.jpg?width=500`,
    genderTendency: "公母比例接近",
    personality: "聰明好奇、愛玩愛社交，鬼點子多常被稱小惡魔",
    description:
      "黑白分明的花紋像穿著西裝，因此得名「賓士貓」。個性活潑聰明、互動性強，很適合喜歡跟貓咪玩耍互動的新手貓奴。",
  },
  {
    name: "藍貓",
    emoji: "🩶",
    color: "#a79c8e",
    textColor: "#3a2e28",
    furBase: "#9a9088",
    furPatches: [],
    photo: `${WIKIMEDIA_FILE_PATH}/Russian_Blue_cat.jpg?width=500`,
    genderTendency: "公母比例接近",
    personality: "安靜穩重、獨立、情感內斂但深厚",
    description:
      "低調高雅的煙灰色系，個性沉穩不吵鬧，不算特別黏人，但一旦信任主人會展現深厚的情感依附。",
  },
  {
    name: "虎斑貓",
    emoji: "🐯",
    color: "#c08a46",
    textColor: "#3a2e28",
    furBase: "#b07a3e",
    furPatches: [
      { color: "#5a3d1f", dx: -0.3, dy: -0.55, r: 0.22 },
      { color: "#5a3d1f", dx: 0.3, dy: -0.55, r: 0.22 },
    ],
    photo: `${WIKIMEDIA_FILE_PATH}/Brown_Tabby_Cat.jpg?width=500`,
    genderTendency: "公母比例接近",
    personality: "活潑好動、好奇心旺盛、警覺性高、野性本能強",
    description:
      "最常見的花紋之一，額頭常有類似「M」字的紋路。個性活潑貪玩，好奇心強，保留較多野外貓咪的狩獵本能。",
  },
];

function drawCatHead(
  ctx: CanvasRenderingContext2D,
  r: number,
  furBase: string,
  patches: FurPatch[],
) {
  ctx.fillStyle = furBase;

  ctx.beginPath();
  ctx.moveTo(-r * 0.9, -r * 0.3);
  ctx.lineTo(-r * 1.3, -r * 1.3);
  ctx.lineTo(-r * 0.3, -r * 0.9);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(r * 0.9, -r * 0.3);
  ctx.lineTo(r * 1.3, -r * 1.3);
  ctx.lineTo(r * 0.3, -r * 0.9);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#fffdf8";
  ctx.lineWidth = 1.4;
  ctx.stroke();

  patches.forEach((patch) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = patch.color;
    ctx.beginPath();
    ctx.arc(patch.dx * r, patch.dy * r, patch.r * r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  ctx.fillStyle = "#20180f";
  ctx.beginPath();
  ctx.arc(-r * 0.35, r * 0.1, r * 0.12, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(r * 0.35, r * 0.1, r * 0.12, 0, Math.PI * 2);
  ctx.fill();
}

const CANVAS_SIZE = 380;
const SPIN_DURATION_MS = 4500;

export default function LuckyCatPage() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<CatPattern | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const center = CANVAS_SIZE / 2;
    const radius = center - 8;
    const segAngle = (Math.PI * 2) / CAT_PATTERNS.length;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    CAT_PATTERNS.forEach((pattern, i) => {
      const start = -Math.PI / 2 + i * segAngle;
      const end = start + segAngle;

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, start, end);
      ctx.closePath();
      ctx.fillStyle = pattern.color;
      ctx.fill();
      ctx.strokeStyle = "#fffdf8";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(start + segAngle / 2);

      ctx.save();
      ctx.translate(radius * 0.36, 0);
      drawCatHead(ctx, 15, pattern.furBase, pattern.furPatches);
      ctx.restore();

      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillStyle = pattern.textColor;
      ctx.font = "600 16px sans-serif";
      ctx.fillText(pattern.name, radius - 10, 0);
      ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(center, center, 14, 0, Math.PI * 2);
    ctx.fillStyle = "#fffdf8";
    ctx.fill();
    ctx.strokeStyle = "#e0a53c";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, []);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  const handleDraw = () => {
    if (spinning) return;

    setResult(null);
    setSpinning(true);

    const segAngleDeg = 360 / CAT_PATTERNS.length;
    const resultIndex = Math.floor(Math.random() * CAT_PATTERNS.length);
    const jitter = (Math.random() - 0.5) * segAngleDeg * 0.6;
    const targetAngle = resultIndex * segAngleDeg + segAngleDeg / 2 + jitter;
    const desiredMod = (360 - targetAngle + 360) % 360;
    const currentMod = ((rotation % 360) + 360) % 360;
    const delta = (desiredMod - currentMod + 360) % 360;
    const extraSpins = 6;
    const newRotation = rotation + extraSpins * 360 + delta;

    setRotation(newRotation);

    window.setTimeout(() => {
      setSpinning(false);
      setResult(CAT_PATTERNS[resultIndex]);
    }, SPIN_DURATION_MS);
  };

  return (
    <div className="flex flex-1 flex-col items-center bg-background px-6 py-12">
      <div className="w-full max-w-4xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blush-soft px-4 py-1.5 text-sm font-medium text-foreground">
            🔮 好運喵抽籤
          </span>
          <h1 className="mt-4 text-3xl font-black text-foreground sm:text-4xl">
            今天的幸運喵
          </h1>
          <p className="mt-2 font-script text-3xl text-sage">
            喵喵籤詩
          </p>
          <p className="mt-3 text-foreground/70">
            轉動轉盤，隨機抽出今天的幸運貓花色
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-8">
          <div
            className="relative mx-auto w-full"
            style={{ maxWidth: CANVAS_SIZE, aspectRatio: "1 / 1" }}
          >
            <div
              className="absolute left-1/2 z-10 -translate-x-1/2"
              style={{
                top: -14,
                width: 0,
                height: 0,
                borderLeft: "12px solid transparent",
                borderRight: "12px solid transparent",
                borderTop: "20px solid #3a2e28",
              }}
            />
            <canvas
              ref={canvasRef}
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: spinning
                  ? `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.17, 0.67, 0.16, 0.99)`
                  : "none",
              }}
              className="h-full w-full rounded-full shadow-lg"
            />
          </div>

          <button
            onClick={handleDraw}
            disabled={spinning}
            className="h-12 w-40 rounded-full bg-gold text-base font-bold text-foreground transition-colors hover:bg-gold/80 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {spinning ? "抽籤中…" : "開始抽籤"}
          </button>

          {result && (
            <div className="w-full max-w-md rounded-3xl border border-line bg-card p-6 text-center shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result.photo}
                alt={result.name}
                className="mx-auto h-28 w-28 rounded-full border-4 border-background object-cover shadow-md"
              />
              <p className="mt-3 text-2xl font-black text-foreground">
                {result.name}
              </p>
              <p className="text-[11px] text-foreground/40">
                圖片來源：Wikimedia Commons
              </p>
              <dl className="mt-4 space-y-2 text-left text-sm">
                <div>
                  <dt className="font-medium text-foreground/50">
                    性別傾向
                  </dt>
                  <dd className="text-foreground/80">
                    {result.genderTendency}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground/50">
                    特殊個性
                  </dt>
                  <dd className="text-foreground/80">
                    {result.personality}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground/50">
                    小介紹
                  </dt>
                  <dd className="leading-6 text-foreground/80">
                    {result.description}
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
