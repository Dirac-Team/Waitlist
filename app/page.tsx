"use client";

import { useState, useEffect, FormEvent } from "react";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/waitlist")
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch(() => {});
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setCount(data.count);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error);
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  return (
    <>
      <p className="fixed top-6 left-6 text-sm font-medium tracking-widest text-white/60 uppercase z-50">
        Dirac
      </p>

      <HeroGeometric
        badge="Launching March 2026"
        title1="Email is"
        title2="Busy Work"
      >
        <div className="flex flex-col items-center gap-6 mt-1">
          <p className="text-base sm:text-lg text-white/40 leading-relaxed font-light tracking-wide max-w-lg mx-auto px-4">
            So we made <span className="text-white/90 font-medium">Dirac</span>: One{" "}
            <span className="text-white/80 font-medium">intelligent inbox</span> that{" "}
            <span className="text-white/80 font-normal">reads</span>,{" "}
            <span className="text-white/80 font-normal">writes</span>, and{" "}
            <span className="text-white/80 font-normal">sorts</span> for you.
          </p>

          {status === "success" ? (
            <div className="flex items-center gap-2 rounded-full bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] px-6 py-4">
              <svg
                className="w-5 h-5 text-emerald-400 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-white/90 text-sm sm:text-base">{message}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="flex items-center gap-2 rounded-full bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] p-1.5 pl-5 focus-within:border-white/20 transition-colors">
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  required
                  className="flex-1 bg-transparent text-white text-sm sm:text-base placeholder:text-white/25 outline-none min-w-0"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="shrink-0 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 disabled:opacity-50 transition-colors"
                >
                  {status === "loading" ? "..." : "Get early access"}
                </button>
              </div>
              {status === "error" && (
                <p className="text-red-400 text-sm mt-2 pl-5">{message}</p>
              )}
            </form>
          )}

          <p className="text-sm text-white/30">
            {count !== null && count > 0
              ? `${count} ${count === 1 ? "person" : "people"} ahead of you`
              : "Join the waitlist for early access"}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-2 text-sm text-white/30 mt-2">
            <span>Unified inbox</span>
            <span className="text-white/15">·</span>
            <span>AI that writes like you</span>
            <span className="text-white/15">·</span>
            <span>Catch up fast</span>
          </div>
        </div>
      </HeroGeometric>

    </>
  );
}
