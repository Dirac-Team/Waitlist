"use client";

import { useState, useEffect, FormEvent } from "react";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { motion, AnimatePresence } from "framer-motion";

type Step = "email" | "questions" | "submitting" | "success" | "error";

const REPLY_PCT_OPTIONS = ["< 20%", "20–50%", "50%+"] as const;

const FRUSTRATION_OPTIONS = [
  "Too much noise — I can't find what actually matters",
  "I drop balls — I miss replies I should have sent",
  "Writing takes too long — I know what to say but it's slow",
  "I lose track of commitments — people said they'd do things and I forget",
] as const;

const PROFESSIONAL_ROLE_OPTIONS = [
  "Agency owner",
  "Consumer-app founder",
  "Creator",
  "Startup founder",
  "Operator / executive",
  "Engineer",
  "Other",
] as const;

const INBOX_ROLE_OPTIONS = [
  "Mostly receiving information to review or archive (receipts, updates, reports)",
  "Mostly coordinating — people need responses from me",
  "About equal",
] as const;

const COST_OPTIONS = [
  "Minor inconvenience",
  "Could damage a relationship or lose trust",
  "Could directly cost money or lose a deal",
] as const;

const EMAIL_TYPE_OPTIONS = [
  "Receipts, invoices, order confirmations",
  "Customer messages or support",
  "Investor / partner updates",
  "Team coordination",
  "Automated notifications (GitHub, monitoring, etc.)",
  "Newsletters / content",
  "Cold outreach / recruiting",
] as const;

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
      className={`px-3.5 py-1.5 rounded-full text-sm border text-left transition-all cursor-pointer ${
        selected
          ? "bg-white/[0.12] border-white/30 text-white/90"
          : "bg-white/[0.04] border-white/[0.08] text-white/40 hover:bg-white/[0.07] hover:text-white/60"
      }`}
    >
      {label}
    </button>
  );
}

function OptionRow({
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
      className={`w-full text-left rounded-xl border px-3.5 py-2.5 text-sm leading-snug transition-all ${
        selected
          ? "bg-white/[0.1] border-white/25 text-white/90"
          : "bg-white/[0.03] border-white/[0.08] text-white/50 hover:border-white/15 hover:text-white/70"
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

  const [replyPct, setReplyPct] = useState("");
  const [frustration, setFrustration] = useState("");
  const [professionalRole, setProfessionalRole] = useState("");
  const [inboxRole, setInboxRole] = useState("");
  const [costOfMiss, setCostOfMiss] = useState("");
  const [emailTypes, setEmailTypes] = useState<string[]>([]);

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

  function toggleEmailType(opt: string) {
    setEmailTypes((prev) =>
      prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
    );
  }

  const surveyComplete =
    replyPct &&
    frustration &&
    professionalRole &&
    inboxRole &&
    costOfMiss &&
    emailTypes.length > 0;

  async function handleSurveySubmit() {
    if (!surveyComplete) return;
    setStep("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          reply_pct: replyPct,
          frustration,
          professional_role: professionalRole,
          inbox_role: inboxRole,
          cost_of_miss: costOfMiss,
          email_types: emailTypes,
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
                className="w-full max-w-lg max-h-[min(70vh,520px)] overflow-y-auto rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] px-5 py-5 sm:px-6 flex flex-col gap-5"
              >
                <p className="text-white/50 text-xs uppercase tracking-widest text-center shrink-0">
                  Six quick questions
                </p>

                <div className="flex flex-col gap-2 shrink-0">
                  <p className="text-white/70 text-sm font-medium">
                    On a typical day, roughly what % of your emails require a reply from you?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {REPLY_PCT_OPTIONS.map((opt) => (
                      <Chip
                        key={opt}
                        label={opt}
                        selected={replyPct === opt}
                        onClick={() => setReplyPct(opt)}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <p className="text-white/70 text-sm font-medium">
                    What&apos;s your biggest email frustration? Pick one:
                  </p>
                  <div className="flex flex-col gap-2">
                    {FRUSTRATION_OPTIONS.map((opt) => (
                      <OptionRow
                        key={opt}
                        label={opt}
                        selected={frustration === opt}
                        onClick={() => setFrustration(opt)}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <p className="text-white/70 text-sm font-medium">
                    Which best describes your role?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PROFESSIONAL_ROLE_OPTIONS.map((opt) => (
                      <Chip
                        key={opt}
                        label={opt}
                        selected={professionalRole === opt}
                        onClick={() => setProfessionalRole(opt)}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <p className="text-white/70 text-sm font-medium">
                    Which best describes your inbox role?
                  </p>
                  <div className="flex flex-col gap-2">
                    {INBOX_ROLE_OPTIONS.map((opt) => (
                      <OptionRow
                        key={opt}
                        label={opt}
                        selected={inboxRole === opt}
                        onClick={() => setInboxRole(opt)}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <p className="text-white/70 text-sm font-medium">
                    What&apos;s the cost of missing an important email?
                  </p>
                  <div className="flex flex-col gap-2">
                    {COST_OPTIONS.map((opt) => (
                      <OptionRow
                        key={opt}
                        label={opt}
                        selected={costOfMiss === opt}
                        onClick={() => setCostOfMiss(opt)}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <p className="text-white/70 text-sm font-medium">
                    Which types of email dominate your inbox? (select all that apply)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {EMAIL_TYPE_OPTIONS.map((opt) => (
                      <Chip
                        key={opt}
                        label={opt}
                        selected={emailTypes.includes(opt)}
                        onClick={() => toggleEmailType(opt)}
                      />
                    ))}
                  </div>
                </div>

                {step === "error" && (
                  <p className="text-red-400 text-sm text-center">{message}</p>
                )}

                <button
                  type="button"
                  onClick={handleSurveySubmit}
                  disabled={step === "submitting" || !surveyComplete}
                  className="w-full py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors mt-1 shrink-0"
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
                    Continue
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
