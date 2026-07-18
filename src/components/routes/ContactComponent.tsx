import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../hooks/useScrollReveal";

type Step = "NAME" | "EMAIL" | "MESSAGE" | "SUBMITTING" | "SUCCESS" | "ERROR";

interface HistoryLine {
  prompt: string;
  answer?: string;
  isError?: boolean;
}

const socials = [
  {
    label: "GitHub",
    handle: "YounesBouhouche",
    url: "https://github.com/YounesBouhouche",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    handle: "younesbouh05",
    url: "https://www.linkedin.com/in/younesbouh05",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    handle: "@younesb_05",
    url: "https://twitter.com/younesb_05",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Email",
    handle: "y.bouhouche@esi-sba.dz",
    url: "mailto:y.bouhouche@esi-sba.dz",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
];

export default function ContactComponent() {
  const { t } = useTranslation();

  const prompts = {
    prompt1: t("contact.prompt1"),
    prompt2: t("contact.prompt2"),
    prompt3: t("contact.prompt3"),
    sending: t("contact.sending"),
    success: t("contact.success"),
    errorEmail: t("contact.errorEmail"),
    errorNetwork: t("contact.errorNetwork"),
    errorMissing: t("contact.errorMissing"),
  };

  // Scroll reveals
  const leftColRef = useScrollReveal<HTMLDivElement>();
  const rightColRef = useScrollReveal<HTMLDivElement>();

  // Terminal form state
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<Step>("NAME");
  const [history, setHistory] = useState<HistoryLine[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleTerminalClick = () => {
    if (step !== "SUBMITTING" && step !== "SUCCESS") inputRef.current?.focus();
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, step]);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const submitForm = async (finalData: typeof formData) => {
    setStep("SUBMITTING");
    setHistory(prev => [...prev, { prompt: prompts.sending }]);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY, ...finalData }),
      });
      if (res.ok) {
        setStep("SUCCESS");
        setHistory(prev => [...prev, { prompt: prompts.success }]);
      } else throw new Error("Network error");
    } catch {
      setStep("ERROR");
      setHistory(prev => [...prev, { prompt: prompts.errorNetwork, isError: true }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter" || e.shiftKey) return;
    e.preventDefault();
    const val = inputValue.trim();

    if (!val && step !== "MESSAGE") {
      setHistory(prev => [...prev, { prompt: "✗ THIS FIELD IS REQUIRED.", isError: true }]);
      return;
    }
    if (step === "NAME") {
      setHistory(prev => [...prev, { prompt: prompts.prompt1, answer: val }]);
      setFormData(prev => ({ ...prev, name: val }));
      setInputValue(""); setStep("EMAIL");
    } else if (step === "EMAIL") {
      if (!validateEmail(val)) {
        setHistory(prev => [...prev, { prompt: prompts.errorEmail, isError: true }]);
        return;
      }
      setHistory(prev => [...prev, { prompt: prompts.prompt2, answer: val }]);
      setFormData(prev => ({ ...prev, email: val }));
      setInputValue(""); setStep("MESSAGE");
    } else if (step === "MESSAGE") {
      if (!val) {
        setHistory(prev => [...prev, { prompt: prompts.errorMissing, isError: true }]);
        return;
      }
      setHistory(prev => [...prev, { prompt: prompts.prompt3, answer: val }]);
      const finalData = { ...formData, message: val };
      setFormData(finalData);
      setInputValue("");
      submitForm(finalData);
    }
  };

  const getPrompt = () => {
    if (step === "NAME") return prompts.prompt1;
    if (step === "EMAIL") return prompts.prompt2;
    if (step === "MESSAGE") return prompts.prompt3;
    return "";
  };

  const resetForm = () => {
    setStep("NAME"); setHistory([]); setFormData({ name: "", email: "", message: "" }); setInputValue("");
    setTimeout(() => inputRef.current?.focus(), 10);
  };

  return (
    <div className="min-h-screen bg-background pt-28 md:pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── LEFT COLUMN: Title + Social Links ─────── */}
          <div className="reveal-ready" ref={leftColRef}>

            {/* Title */}
            <h1 className="font-display text-[14vw] md:text-[5rem] lg:text-[6.5rem] leading-[0.85] tracking-tight text-white mb-6">
              {t("contact.title", "CONTACT")}<span className="text-primary">.</span>
            </h1>

            <p className="font-body text-gray-500 leading-relaxed mb-12 max-w-sm text-base">
              {t("contact.subtitle", "")}
            </p>

            {/* Social Links — chamfered cards */}
            <div className="space-y-3" dir="ltr">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target={s.url.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group flex items-center gap-5 bg-[#0f0f11] chamfered-border p-4 no-underline relative overflow-hidden"
                  style={{ '--chamfer-border-color': 'rgba(255,255,255,0.06)', '--chamfer-border-color-focus': 'var(--color-primary)' } as React.CSSProperties}
                >
                  {/* Slide-to-fill background */}
                  <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full bg-primary/10 transition-all duration-300 ease-out z-0" />

                  {/* Icon box */}
                  <div className="w-11 h-11 bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-300 chamfered shrink-0 relative z-10">
                    {s.icon}
                  </div>

                  {/* Label */}
                  <div className="flex flex-col min-w-0 relative z-10">
                    <span className="font-heading text-xs text-gray-600 uppercase tracking-widest mb-0.5">
                      {s.label}
                    </span>
                    <span className="font-mono text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                      {s.handle}
                    </span>
                  </div>

                  {/* Arrow indicator */}
                  <div className="ml-auto text-gray-700 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 shrink-0 relative z-10">
                    →
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN: Terminal Form ─────────── */}
          <div className="reveal-ready" ref={rightColRef}>
            <div
              className="terminal-window flex flex-col chamfered-border cursor-text"
              style={{ height: "520px" }}
              onClick={handleTerminalClick}
            >
              {/* Terminal header bar */}
              <div className="terminal-header bg-[#111113] border-b border-white/5 px-4 py-3 flex items-center shrink-0">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28ca42]" />
                </div>
                <div className="mx-auto font-mono text-xs text-gray-600">
                  root@younes-portfolio:~ — contact
                </div>
              </div>

              {/* Terminal body */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-5 font-mono text-sm leading-relaxed"
              >
                {/* Welcome message */}
                {history.length === 0 && (
                  <div className="text-gray-600 mb-6 text-xs">
                    {t("contact.welcome1")}
                    <br />
                    {t("contact.welcome2")}
                  </div>
                )}

                {/* History */}
                {history.map((line, idx) => (
                  <div key={idx} className="mb-4">
                    <div className={line.isError ? "text-red-400" : "text-gray-500"}>
                      {line.prompt}
                    </div>
                    {line.answer && (
                      <div className="text-primary mt-1 pl-4">{line.answer}</div>
                    )}
                  </div>
                ))}

                {/* Active prompt + input */}
                {(step === "NAME" || step === "EMAIL" || step === "MESSAGE") && (
                  <div className="mb-4">
                    <div className="text-gray-500">{getPrompt()}</div>
                    <div className="flex items-center text-primary mt-1 pl-4 gap-1 relative">
                      <span className="text-gray-600 mr-1">$</span>
                      {step === "MESSAGE" ? (
                        <textarea
                          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                          value={inputValue}
                          onChange={e => setInputValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="bg-transparent border-none outline-none text-primary w-full resize-none flex-1 min-h-[1.5em] overflow-hidden"
                          rows={1}
                          autoFocus
                        />
                      ) : (
                        <input
                          ref={inputRef as React.RefObject<HTMLInputElement>}
                          type={step === "EMAIL" ? "email" : "text"}
                          value={inputValue}
                          onChange={e => setInputValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="bg-transparent border-none outline-none text-primary w-full flex-1"
                          autoFocus
                          autoComplete="off"
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Error actions */}
                {step === "ERROR" && (
                  <div className="mt-6 flex gap-4">
                    <button onClick={resetForm} className="btn-primary text-xs py-2 px-4">RETRY</button>
                  </div>
                )}

                {/* Success actions */}
                {step === "SUCCESS" && (
                  <div className="mt-6 flex gap-4">
                    <button onClick={() => window.location.href = "/"} className="btn-ghost text-xs py-2 px-4">
                      {t("contact.goHome")}
                    </button>
                  </div>
                )}

                <div className="h-4" />
              </div>

              {/* Step indicator bar */}
              <div className="border-t border-white/5 bg-[#0d0d0f] px-4 py-2 flex items-center gap-3 shrink-0">
                {(["NAME", "EMAIL", "MESSAGE"] as Step[]).map((s) => {
                  const sIdx = ["NAME", "EMAIL", "MESSAGE"].indexOf(s);
                  const currIdx = ["NAME", "EMAIL", "MESSAGE"].indexOf(step as string);
                  return (
                    <div key={s} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 chamfered transition-colors duration-300 ${step === s ? "bg-primary" :
                        currIdx > sIdx ? "bg-primary/40" : "bg-white/10"
                        }`} />
                      <span className={`font-mono text-[0.6rem] uppercase tracking-widest transition-colors duration-300 ${step === s ? "text-primary" : "text-gray-700"
                        }`}>
                        {String(currIdx + 1).padStart(2, "0")}/{t("contact." + s.toLowerCase()).toUpperCase()}
                      </span>
                    </div>
                  );
                })}
                <div className="ml-auto font-mono text-[0.6rem] text-gray-700">
                  {t("contact.press_enter")}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
