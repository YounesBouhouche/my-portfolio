import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// ─── Identity States Config ──────────────────────────────────────────────────
interface TypewriterStateConfig {
  firstWordKey: string;
  secondWordKey: string;
  prefixKey: string;
  primary: string;
  primaryDim: string;
  primaryGlow: string;
}

const STATES_CONFIG: TypewriterStateConfig[] = [
  {
    firstWordKey: "hero.typewriter.state0.firstWord",
    secondWordKey: "hero.typewriter.state0.secondWord",
    prefixKey: "hero.typewriter.state0.prefix",
    primary: "#0088C1",
    primaryDim: "rgba(0, 136, 193, 0.15)",
    primaryGlow: "rgba(0, 136, 193, 0.3)",
  },
  {
    firstWordKey: "hero.typewriter.state1.firstWord",
    secondWordKey: "hero.typewriter.state1.secondWord",
    prefixKey: "hero.typewriter.state1.prefix",
    primary: "#38a755",
    primaryDim: "rgba(56, 167, 85, 0.15)",
    primaryGlow: "rgba(56, 167, 85, 0.3)",
  },
  {
    firstWordKey: "hero.typewriter.state2.firstWord",
    secondWordKey: "hero.typewriter.state2.secondWord",
    prefixKey: "hero.typewriter.state2.prefix",
    primary: "#00d8ff",
    primaryDim: "rgba(0, 216, 255, 0.15)",
    primaryGlow: "rgba(0, 216, 255, 0.3)",
  },
  {
    firstWordKey: "hero.typewriter.state3.firstWord",
    secondWordKey: "hero.typewriter.state3.secondWord",
    prefixKey: "hero.typewriter.state3.prefix",
    primary: "#ff3225",
    primaryDim: "rgba(255, 50, 37, 0.15)",
    primaryGlow: "rgba(255, 50, 37, 0.3)",
  },
];

// ─── Timing (ms) ─────────────────────────────────────────────────────────────
const TYPE_SPEED = 80;
const ERASE_SPEED = 40;
const PAUSE_AFTER_TYPED = 2200;
const GAP_BEFORE_NEXT = 300;

// ─── Phase ───────────────────────────────────────────────────────────────────
type Phase =
  | "typing-first"
  | "typing-second"
  | "pause"
  | "erasing-second"
  | "erasing-first"
  | "gap";

// ─── Hook ─────────────────────────────────────────────────────────────────────
export interface TypewriterResult {
  displayedFirst: string;
  displayedSecond: string;
  prefix: string;
  /** true when typing is fully complete — gates the underline animation */
  isTypingComplete: boolean;
  /** which word the cursor is currently active on */
  cursorOn: "first" | "second" | "none";
  /** Current state's color values — apply these as inline CSS vars on the hero
   *  section element so they are scoped to the hero only, not the whole page. */
  colors: {
    primary: string;
    primaryDim: string;
    primaryGlow: string;
  };
}

export function useTypewriter(): TypewriterResult {
  const { t } = useTranslation();
  const [stateIndex, setStateIndex] = useState(0);
  // Pre-populate state0 defaults so the h1 has content on first paint (LCP fix).
  // The language-switch effect below resets these if the locale differs.
  const [displayedFirst, setDisplayedFirst] = useState("YOUNES");
  const [displayedSecond, setDisplayedSecond] = useState("BOUHOUCHE.");
  const [phase, setPhase] = useState<Phase>("pause");

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const config = STATES_CONFIG[stateIndex];

  // Resolve translated strings reactively
  const current = {
    firstWord: t(config.firstWordKey),
    secondWord: t(config.secondWordKey),
    prefix: t(config.prefixKey),
    primary: config.primary,
    primaryDim: config.primaryDim,
    primaryGlow: config.primaryGlow,
  };

  // Reset/Restart typing animation if language switches and values change
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDisplayedFirst("");
    setDisplayedSecond("");
    setPhase("typing-first");
  }, [current.firstWord, current.secondWord]);

  useEffect(() => {
    const schedule = (fn: () => void, delay: number) => {
      timeoutRef.current = setTimeout(fn, delay);
    };

    const tick = () => {
      switch (phase) {
        // ── Type the first word ──────────────────────────────────────────────
        case "typing-first": {
          setDisplayedFirst((prev) => {
            const next = current.firstWord.slice(0, prev.length + 1);
            if (next === current.firstWord) {
              schedule(() => setPhase("typing-second"), TYPE_SPEED);
            } else {
              schedule(tick, TYPE_SPEED);
            }
            return next;
          });
          break;
        }

        // ── Type the second word ─────────────────────────────────────────────
        case "typing-second": {
          setDisplayedSecond((prev) => {
            const next = current.secondWord.slice(0, prev.length + 1);
            if (next === current.secondWord) {
              schedule(() => setPhase("pause"), TYPE_SPEED);
            } else {
              schedule(tick, TYPE_SPEED);
            }
            return next;
          });
          break;
        }

        // ── Pause while fully typed ──────────────────────────────────────────
        case "pause": {
          schedule(() => setPhase("erasing-second"), PAUSE_AFTER_TYPED);
          break;
        }

        // ── Erase the second word ────────────────────────────────────────────
        case "erasing-second": {
          setDisplayedSecond((prev) => {
            const next = prev.slice(0, -1);
            if (next.length === 0) {
              schedule(() => setPhase("erasing-first"), ERASE_SPEED);
            } else {
              schedule(tick, ERASE_SPEED);
            }
            return next;
          });
          break;
        }

        // ── Erase the first word ─────────────────────────────────────────────
        case "erasing-first": {
          setDisplayedFirst((prev) => {
            const next = prev.slice(0, -1);
            if (next.length === 0) {
              schedule(() => setPhase("gap"), ERASE_SPEED);
            } else {
              schedule(tick, ERASE_SPEED);
            }
            return next;
          });
          break;
        }

        // ── Brief gap then advance to the next state ─────────────────────────
        case "gap": {
          schedule(() => {
            setStateIndex((i) => (i + 1) % STATES_CONFIG.length);
            setPhase("typing-first");
          }, GAP_BEFORE_NEXT);
          break;
        }
      }
    };

    tick();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, stateIndex, current.firstWord, current.secondWord]);

  const isTypingComplete = phase === "pause";

  const cursorOn: TypewriterResult["cursorOn"] =
    phase === "typing-first" || phase === "erasing-first"
      ? "first"
      : phase === "typing-second" || phase === "erasing-second"
        ? "second"
        : "none";

  return {
    displayedFirst,
    displayedSecond,
    prefix: current.prefix,
    isTypingComplete,
    cursorOn,
    colors: {
      primary: current.primary,
      primaryDim: current.primaryDim,
      primaryGlow: current.primaryGlow,
    },
  };
}
