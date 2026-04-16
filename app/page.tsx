"use client";

import { useState, useRef } from "react";
import { QUESTIONS } from "@/lib/data";
import { computeUserVector, findNearestFood } from "@/lib/scoring";

type Phase = "intro" | "quiz" | "result";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<ReturnType<typeof findNearestFood> | null>(null);
  const [prefix, setPrefix] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  async function captureCard(): Promise<Blob> {
    const { toBlob } = await import("html-to-image");
    const blob = await toBlob(cardRef.current!, {
      pixelRatio: 2,
      skipFonts: false,
      fetchRequestInit: { cache: "no-cache" },
    });
    return blob!;
  }

  async function saveImage() {
    if (!cardRef.current) return;
    const blob = await captureCard();
    const link = document.createElement("a");
    link.download = `${result?.name ?? "result"}.png`;
    link.href = URL.createObjectURL(blob);
    link.click();
  }

  async function shareResult() {
    if (!cardRef.current) return;
    const blob = await captureCard();
    const file = new File([blob], `${result?.name ?? "result"}.png`, { type: "image/png" });
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: `我是${prefix ? prefix + "的" : ""}${result?.name}` });
    } else {
      const link = document.createElement("a");
      link.download = file.name;
      link.href = URL.createObjectURL(blob);
      link.click();
    }
  }

  function handleAnswer(optionIndex: number) {
    const question = QUESTIONS[current];
    const newAnswers = { ...answers, [question.id]: optionIndex };
    setAnswers(newAnswers);

    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      const vector = computeUserVector(newAnswers);
      const food = findNearestFood(vector);
      setResult(food);
      setPhase("result");
    }
  }

  function restart() {
    setPhase("intro");
    setCurrent(0);
    setAnswers({});
    setResult(null);
    setPrefix("");
  }

  if (phase === "intro") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-8">
        <div className="max-w-md text-center space-y-6">
          <div className="text-6xl">🍟</div>
          <h1 className="text-3xl font-bold text-gray-800">
            假如你是一种垃圾食品
          </h1>
          <p className="text-gray-500 text-lg">
            反正都是垃圾食品，你是哪种美味的垃圾呢？
          </p>
          <button
            onClick={() => setPhase("quiz")}
            className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg transition"
          >
            开始测试 →
          </button>
        </div>
      </main>
    );
  }

  if (phase === "quiz") {
    const question = QUESTIONS[current];
    const progress = ((current + 1) / QUESTIONS.length) * 100;

    function handleBack() {
      const prevQuestion = QUESTIONS[current - 1];
      const newAnswers = { ...answers };
      delete newAnswers[prevQuestion.id];
      setAnswers(newAnswers);
      setCurrent(current - 1);
    }

    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-8">
        <div className="max-w-lg w-full space-y-6">
          <div className="flex items-center gap-3">
            {current > 0 && (
              <button
                onClick={handleBack}
                className="text-gray-400 hover:text-gray-600 transition text-sm"
              >
                ← 上一题
              </button>
            )}
            <div className="flex-1 bg-orange-100 rounded-full h-2">
              <div
                className="bg-orange-400 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-400 shrink-0">
              {current + 1} / {QUESTIONS.length}
            </p>
          </div>

          <h2 className="text-xl font-bold text-gray-800 leading-snug">
            {question.text}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="w-full text-left bg-white hover:bg-orange-50 border border-orange-200 hover:border-orange-400 rounded-2xl px-5 py-4 text-gray-700 transition"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (phase === "result" && result) {
    const descParagraphs = result.description.split("\n\n");
    const kcalPercent = Math.round((result.kcal / 767) * 100);

    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-8">
        <div className="max-w-md w-full space-y-6">

          {/* 分享卡片 —— 全部 inline style，截图用 */}
          <div ref={cardRef} style={{
            background: "#fefce8",
            borderRadius: 24,
            padding: "28px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            border: "1px solid #fed7aa",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif",
            width: 400,
            boxSizing: "border-box",
          }}>
            <p style={{ textAlign: "center", fontSize: 11, color: "#fdba74", letterSpacing: "0.12em", margin: 0 }}>假如你是一种垃圾食品</p>
            <img
              src={`/images/${result.id}.png`}
              alt={result.name}
              crossOrigin="anonymous"
              style={{ width: 120, height: 120, objectFit: "contain", margin: "0 auto", display: "block", flexShrink: 0 }}
            />
            <div style={{ textAlign: "center" }}>
              {prefix ? (
                <h2 style={{ fontSize: 28, fontWeight: 700, color: "#1f2937", margin: 0 }}>
                  <span style={{ color: "#fb923c" }}>{prefix}</span>{result.name}
                </h2>
              ) : (
                <h2 style={{ fontSize: 28, fontWeight: 700, color: "#1f2937", margin: 0 }}>{result.name}</h2>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {descParagraphs.map((p, i) => (
                <p key={i} style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#1f2937", lineHeight: 1.7 }}>{p}</p>
              ))}
            </div>
            <div style={{ background: "#fff", borderRadius: 16, padding: "10px 14px", display: "flex", flexDirection: "column", gap: 7, flexShrink: 0 }}>
              <p style={{ margin: 0, fontSize: 10, color: "#9ca3af", letterSpacing: "0.1em" }}>热量现实核查</p>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                <div>
                  <p style={{ margin: 0, fontSize: 22, fontWeight: 600, color: "#1f2937" }}>
                    {result.kcal} <span style={{ fontSize: 11, fontWeight: 400, color: "#9ca3af" }}>kcal</span>
                  </p>
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: "#374151" }}>{result.portion}</p>
                </div>
                <p style={{ margin: 0, fontSize: 11, color: "#374151", textAlign: "right", lineHeight: 1.6, maxWidth: 160 }}>{result.calorieCompare}</p>
              </div>
              <div style={{ height: 4, background: "#ffedd5", borderRadius: 9999 }}>
                <div style={{ height: 4, background: "#fb923c", borderRadius: 9999, width: `${Math.min(kcalPercent, 100)}%` }} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ margin: 0, fontSize: 10, color: "#d1d5db" }}>测试结果仅供娱乐 · 图片由豆包AI生成</p>
              <p style={{ margin: 0, fontSize: 10, color: "#d1d5db" }}>@西葫芦</p>
            </div>
          </div>

          {/* 自定义前缀 */}
          <div className="flex items-center gap-2 justify-center">
            <span className="text-sm text-gray-400">我是</span>
            <input
              type="text"
              value={prefix}
              onChange={e => setPrefix(e.target.value)}
              placeholder="某口味/某品牌/不知名…"
              className="border-b border-orange-300 bg-transparent text-sm text-gray-700 placeholder-gray-300 outline-none px-1 py-0.5 w-44 text-center"
            />
            <span className="text-sm text-gray-400">{result.name}</span>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={saveImage}
              className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-full text-sm transition"
            >
              保存图片
            </button>
            <button
              onClick={shareResult}
              className="bg-white hover:bg-orange-50 border border-orange-300 text-orange-500 font-bold py-3 px-6 rounded-full text-sm transition"
            >
              分享
            </button>
            <button
              onClick={restart}
              className="bg-white hover:bg-orange-50 border border-orange-200 text-gray-500 font-bold py-3 px-6 rounded-full text-sm transition"
            >
              再测一次
            </button>
          </div>
        </div>
      </main>
    );
  }

  return null;
}
