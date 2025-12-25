import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText =
    "The page you are looking for has been moved to /dev/null or never existed in this dimension.";

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  return (
    <div className="notfound-container">
      <div className="scanline"></div>

      <div className="notfound-content">
        <div className="error-code animate-pulse-slow">404</div>

        <div className="notfound-actions-container">
          <div className="terminal-window terminal-404">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="terminal-button close"></span>
                <span className="terminal-button minimize"></span>
                <span className="terminal-button maximize"></span>
              </div>
              <span className="terminal-title">runtime-error.log</span>
            </div>
            <div className="terminal-body p-6 font-mono text-sm leading-relaxed">
              <div className="flex gap-2 mb-4">
                <span className="text-primary">$</span>
                <span className="text-white">fetch --url current_path</span>
              </div>
              <div className="text-red-400 mb-4">
                [ERROR] 404: Resource Not Found
              </div>
              <div className="text-gray-400">
                <span className="text-primary">{"> "}</span>
                {displayedText}
                <span className="animate-pulse text-primary">_</span>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-2 text-xs text-gray-500">
                <div>
                  LOCATION:{" "}
                  {typeof window !== "undefined"
                    ? window.location.pathname
                    : "unknown"}
                </div>
                <div>TIMESTAMP: {new Date().toISOString()}</div>
                <div>STATUS: CRITICAL_FAILURE</div>
              </div>
            </div>
          </div>

          <div className="notfound-buttons">
            <Link to="/" className="terminal-button-link group">
              <span>cd ~/ (Go Home)</span>
            </Link>

            <Link to="/projects" className="terminal-button-link group">
              <span>ls projects/</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
