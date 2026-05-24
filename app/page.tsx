"use client";

import { useState } from "react";

const examples = [
  "What is blockchain?",
  "Why do airplanes stay in the sky?",
  "What is machine learning?",
  "Why does the moon have phases?",
];

const tones = ["Simple", "Fun", "Professional"] as const;
const levels = ["5 years old", "Teenager", "University student"] as const;
const themes = ["light", "dark"] as const;

type Theme = (typeof themes)[number];

export default function Home() {
  const [input, setInput] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [easyAnalogy, setEasyAnalogy] = useState("");
  const [tone, setTone] = useState<(typeof tones)[number]>("Simple");
  const [level, setLevel] = useState<(typeof levels)[number]>("5 years old");
  const [theme, setTheme] = useState<Theme>("light");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const themeClasses =
    theme === "light"
      ? {
          page: "bg-slate-50 text-slate-900",
          shell: "border-slate-200 bg-white shadow-xl shadow-slate-200/60",
          muted: "text-slate-600",
          soft: "bg-slate-50/80",
          card: "border-slate-200 bg-white",
          input:
            "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-cyan-500",
          button: "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
          chip: "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100",
          outline: "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
          outputMuted: "text-slate-600",
          outputText: "text-slate-700",
          subtleBorder: "border-slate-200",
        }
      : {
          page: "bg-slate-950 text-slate-100",
          shell: "border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur",
          muted: "text-slate-300",
          soft: "bg-slate-900/70",
          card: "border-white/10 bg-white/5",
          input:
            "border-white/10 bg-slate-950/70 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400/50",
          button: "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10",
          chip: "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10",
          outline: "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10",
          outputMuted: "text-slate-400",
          outputText: "text-slate-200",
          subtleBorder: "border-white/10",
        };

  const handleExplain = async () => {
    if (!input.trim()) return;

    setSubmitted(true);
    setIsLoading(true);
    setAiResult("");
    setEasyAnalogy("");

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: input,
          tone,
          level,
        }),
      });

      const data = await response.json();

      setAiResult(data.result || "");
      setEasyAnalogy(data.analogy || "");
    } catch (error) {
      console.error(error);
      setAiResult("Something went wrong while generating the explanation.");
      setEasyAnalogy("");
    }

    setIsLoading(false);
  };

  const handleExample = (example: string) => {
    setInput(example);
    setSubmitted(false);
    setAiResult("");
    setEasyAnalogy("");
  };

  return (
    <main className={`min-h-screen ${themeClasses.page}`}>
      <div className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid w-full gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section
            className={`relative overflow-hidden rounded-3xl border p-6 md:p-8 ${themeClasses.shell}`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10`}
            />
            <div className="relative">
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${
                    theme === "light"
                      ? "border-cyan-500/20 bg-cyan-500/10 text-cyan-800"
                      : "border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
                  }`}
                >
                  Explain Like I’m 5
                </span>

                <button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className={`rounded-full border px-3 py-2 text-xs font-medium transition active:scale-[0.99] ${themeClasses.outline}`}
                  aria-label="Toggle theme"
                >
                  {theme === "light" ? "Dark mode" : "Bright mode"}
                </button>
              </div>

              <h1
                className={`mt-4 text-3xl font-bold tracking-tight sm:text-5xl ${
                  theme === "light" ? "text-slate-950" : "text-white"
                }`}
              >
                Turn hard ideas into simple words.
              </h1>

              <p className={`mt-4 max-w-xl text-sm leading-6 sm:text-base ${themeClasses.muted}`}>
                Just a cheat sheet to get simple explanations and easy analogies for complex topics ASAP. Powered by <b>Groq’s LLMs</b> and <b>Llama 3.3</b>. 
                <br></br><br></br>
                Developed by jasontan0649
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {tones.map((item) => (
                  <button
                    key={item}
                    onClick={() => setTone(item)}
                    className={`rounded-2xl border px-4 py-3 text-sm font-medium transition active:scale-[0.99] ${
                      tone === item
                        ? theme === "light"
                          ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-800"
                          : "border-cyan-400/60 bg-cyan-400/15 text-cyan-100"
                        : themeClasses.button
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {levels.map((item) => (
                  <button
                    key={item}
                    onClick={() => setLevel(item)}
                    className={`rounded-2xl border px-4 py-3 text-sm font-medium transition active:scale-[0.99] ${
                      level === item
                        ? theme === "light"
                          ? "border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-800"
                          : "border-fuchsia-400/60 bg-fuchsia-400/15 text-fuchsia-100"
                        : themeClasses.button
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div
                className={`mt-6 rounded-3xl border p-4 shadow-lg shadow-black/10 sm:p-5 ${themeClasses.soft} ${themeClasses.subtleBorder}`}
              >
                <label
                  htmlFor="input"
                  className={`mb-2 block text-sm font-medium ${
                    theme === "light" ? "text-slate-800" : "text-slate-200"
                  }`}
                >
                  Paste text or type your question
                </label>

                <textarea
                  id="input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Example: What is blockchain?"
                  className={`min-h-36 w-full resize-none rounded-2xl border p-4 text-sm outline-none ring-0 ${themeClasses.input}`}
                />

                <div className="mt-3 flex flex-wrap gap-2">
                  {examples.map((example) => (
                    <button
                      key={example}
                      onClick={() => handleExample(example)}
                      className={`rounded-full border px-3 py-2 text-xs transition ${themeClasses.chip}`}
                    >
                      {example}
                    </button>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={handleExplain}
                    disabled={!input.trim() || isLoading}
                    className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isLoading ? "Explaining..." : "Explain it simply"}
                  </button>

                  <button
                    onClick={() => {
                      setInput("");
                      setSubmitted(false);
                      setAiResult("");
                      setEasyAnalogy("");
                    }}
                    className={`inline-flex items-center justify-center rounded-2xl border px-5 py-3 text-sm font-medium transition ${themeClasses.outline}`}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className={`rounded-3xl border p-6 md:p-8 ${themeClasses.shell}`}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className={`text-xl font-semibold ${theme === "light" ? "text-slate-950" : "text-white"}`}>
                  Output
                </h2>
                <p className={`mt-1 text-sm ${themeClasses.outputMuted}`}>
                  A clean preview of the explanation.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {!submitted ? (
                <div
                  className={`rounded-3xl border border-dashed p-6 ${
                    theme === "light"
                      ? "border-slate-300 bg-slate-50 text-slate-500"
                      : "border-white/15 bg-white/5 text-slate-400"
                  }`}
                >
                  Your explanation will appear here.
                </div>
              ) : isLoading ? (
                <div className={`space-y-3 rounded-3xl border p-6 ${themeClasses.card}`}>
                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200/70" />
                  <div className="h-4 w-full animate-pulse rounded bg-slate-200/70" />
                  <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200/70" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200/70" />
                </div>
              ) : (
                <>
                  <article
                    className={`rounded-3xl border p-5 ${
                      theme === "light"
                        ? "border-cyan-200 bg-cyan-50"
                        : "border-cyan-400/15 bg-cyan-400/5"
                    }`}
                  >
                    <h3
                      className={`text-sm font-semibold ${
                        theme === "light" ? "text-cyan-800" : "text-cyan-200"
                      }`}
                    >
                      Main idea
                    </h3>
                    <p className={`mt-2 text-sm leading-6 ${themeClasses.outputText}`}>
                      {aiResult}
                    </p>
                  </article>

                  <article
                    className={`rounded-3xl border p-5 ${
                      theme === "light"
                        ? "border-fuchsia-200 bg-fuchsia-50"
                        : "border-fuchsia-400/15 bg-fuchsia-400/5"
                    }`}
                  >
                    <h3
                      className={`text-sm font-semibold ${
                        theme === "light" ? "text-fuchsia-800" : "text-fuchsia-200"
                      }`}
                    >
                      Easy analogy
                    </h3>
                    <p className={`mt-2 text-sm leading-6 ${themeClasses.outputText}`}>
                      {easyAnalogy}
                    </p>
                  </article>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}