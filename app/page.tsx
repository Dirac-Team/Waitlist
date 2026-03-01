"use client";

import { useState, useEffect, FormEvent } from "react";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { motion, AnimatePresence } from "framer-motion";

type Step = "email" | "questions" | "submitting" | "success" | "error";

const HEARD_OPTIONS = [
  "Word of mouth",
  "Twitter / X",
  "LinkedIn",
  "Reddit",
  "Search engine",
  "Other",
];

const APP_OPTIONS = [
  "Gmail",
  "Outlook",
  "Apple Mail",
  "Instagram",
  "WhatsApp",
  "iMessage",
  "Slack",
  "Other",
];

const ROLE_OPTIONS = [
  "Student",
  "Founder / Executive",
  "Sales / Marketing",
  "Engineer",
  "Operations",
  "Other",
];

function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-sm border transition-all cursor-pointer ${
        selected
          ? "bg-white/[0.12] border-white/30 text-white/90"
          : "bg-white/[0.04] border-white/[0.08] text-white/40 hover:bg-white/[0.07] hover:text-white/60"
      }`}
    >
      {label}
    </button>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<Step>("email");
  const [message, setMessage] = useState("");
  const [count, setCount] = useState<number | null>(null);

  const [heardFrom, setHeardFrom] = useState("");
  const [messagingApps, setMessagingApps] = useState<string[]>([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    fetch("/api/waitlist")
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch(() => {});
  }, []);

  function handleEmailSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStep("questions");
  }

  function toggleApp(app: string) {
    setMessagingApps((prev) =>
      prev.includes(app) ? prev.filter((a) => a !== app) : [...prev, app]
    );
  }

  async function handleSurveySubmit() {
    setStep("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          heard_from: heardFrom,
          messaging_apps: messagingApps.join(", "),
          role,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setCount(data.count);
        setStep("success");
      } else {
        setMessage(data.error);
        setStep("error");
      }
    } catch {
      setMessage("Something went wrong. Try again.");
      setStep("error");
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

          <AnimatePresence mode="wait">
            {step === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2 rounded-full bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] px-6 py-4"
              >
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
              </motion.div>
            ) : step === "questions" || step === "submitting" || step === "error" ? (
              <motion.div
                key="questions"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="w-full max-w-md rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] px-6 py-5 flex flex-col gap-5"
              >
                <p className="text-white/50 text-xs uppercase tracking-widest text-center">
                  A few quick questions
                </p>

                {/* Q1 */}
                <div className="flex flex-col gap-2">
                  <p className="text-white/70 text-sm font-medium">
                    How did you hear about Dirac?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {HEARD_OPTIONS.map((opt) => (
                      <Chip
                        key={opt}
                        label={opt}
                        selected={heardFrom === opt}
                        onClick={() => setHeardFrom(opt)}
                      />
                    ))}
                  </div>
                </div>

                {/* Q2 */}
                <div className="flex flex-col gap-2">
                  <p className="text-white/70 text-sm font-medium">
                    Which apps do you use for messaging?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {APP_OPTIONS.map((opt) => (
                      <Chip
                        key={opt}
                        label={opt}
                        selected={messagingApps.includes(opt)}
                        onClick={() => toggleApp(opt)}
                      />
                    ))}
                  </div>
                </div>

                {/* Q3 */}
                <div className="flex flex-col gap-2">
                  <p className="text-white/70 text-sm font-medium">
                    What best describes your role?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ROLE_OPTIONS.map((opt) => (
                      <Chip
                        key={opt}
                        label={opt}
                        selected={role === opt}
                        onClick={() => setRole(opt)}
                      />
                    ))}
                  </div>
                </div>

                {step === "error" && (
                  <p className="text-red-400 text-sm text-center">{message}</p>
                )}

                <button
                  onClick={handleSurveySubmit}
                  disabled={step === "submitting"}
                  className="w-full py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 disabled:opacity-50 transition-colors mt-1"
                >
                  {step === "submitting" ? "..." : "Join waitlist →"}
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="email"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                onSubmit={handleEmailSubmit}
                className="w-full max-w-md"
              >
                <div className="flex items-center gap-2 rounded-full bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] p-1.5 pl-5 focus-within:border-white/20 transition-colors">
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-transparent text-white text-sm sm:text-base placeholder:text-white/25 outline-none min-w-0"
                  />
                  <button
                    type="submit"
                    className="shrink-0 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
                  >
                    Get early access
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

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
