"use client";

import { useState } from "react";
import { QUESTIONS } from "@/lib/data";
import { computeUserVector, findNearestFood } from "@/lib/scoring";

type Phase = "intro" | "quiz" | "result";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<ReturnType<typeof findNearestFood> | null>(null);
  const [prefix, setPrefix] = useState("");
  const [copied, setCopied] = useState(false);

  async function shareResult() {
    const url = window.location.href;
    const text = `我测出来是${prefix ? prefix : ""}${result?.name}！反正都是垃圾食品，你是哪种美味的垃圾呢？`;
    if (navigator.share) {
      await navigator.share({ title: "假如你是一种垃圾食品", text, url });
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
          <p className="text-xs text-gray-400">测试结果仅供娱乐 · 图片由豆包AI生成 · 作者@西葫芦爆炒鸡蛋</p>
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
      <main className="min-h-screen flex flex-col items-center bg-yellow-50 p-8 pt-12">
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
    const descParagraphs = result.description.split("\n");
    const kcalPercent = Math.round((result.kcal / 767) * 100);

    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-8">
        <div className="max-w-md w-full space-y-6">

          {/* 结果卡片 */}
          <div className="bg-amber-50 border border-orange-300 rounded-3xl px-6 pt-8 pb-5 space-y-4">
            <p className="text-center text-xs text-orange-300 tracking-widest">假如你是一种垃圾食品</p>
            <img
              src={`/images/${result.id}.png`}
              alt={result.name}
              className="w-36 h-36 object-contain mx-auto block"
            />
            <div className="text-center">
              {prefix ? (
                <h2 className="text-3xl font-bold text-gray-800">
                  <span className="text-orange-400">{prefix}</span>{result.name}
                </h2>
              ) : (
                <h2 className="text-3xl font-bold text-gray-800">{result.name}</h2>
              )}
            </div>
            <div className="space-y-2">
              {descParagraphs.map((p, i) => (
                <p key={i} className="text-sm font-semibold text-gray-800 leading-relaxed">{p}</p>
              ))}
            </div>
            <div className="bg-white rounded-2xl px-4 py-3 space-y-2">
              <p className="text-xs text-gray-400 tracking-widest">热量现实核查</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-semibold text-gray-800">{result.kcal} <span className="text-xs font-normal text-gray-400">kcal</span></p>
                  <p className="text-xs text-gray-600 mt-0.5">{result.portion}</p>
                </div>
                <p className="text-xs text-gray-600 text-right leading-snug max-w-[160px] whitespace-pre-line">{result.calorieCompare}</p>
              </div>
              <div className="h-1 bg-orange-100 rounded-full">
                <div className="h-1 bg-orange-400 rounded-full" style={{ width: `${Math.min(kcalPercent, 100)}%` }} />
              </div>
            </div>
            {/* 截图钩子 */}
            <div className="pt-1 border-t border-orange-100 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">测你的结果 → cihulu.store</p>
                <p className="text-xs text-gray-400">@西葫芦爆炒鸡蛋</p>
              </div>
              <p className="text-xs text-gray-300">测试结果仅供娱乐 · 图片由豆包AI生成</p>
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
              onClick={shareResult}
              className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-sm transition"
            >
              {copied ? "链接已复制！" : "分享"}
            </button>
            <button
              onClick={restart}
              className="bg-white hover:bg-orange-50 border border-orange-200 text-gray-500 font-bold py-3 px-8 rounded-full text-sm transition"
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
