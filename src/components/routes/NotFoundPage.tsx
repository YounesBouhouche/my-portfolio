import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";

export default function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-52px)] bg-background flex flex-col pt-32 pb-20 px-6 items-center">
      
      <div className="max-w-2xl mx-auto w-full text-center mb-12">
        <h1 className="font-display text-8xl md:text-9xl mb-4 text-white leading-none">
          {t("notFound.title", "404")} <span className="text-primary">/</span>
        </h1>
        <p className="font-mono text-xs text-gray-500 tracking-[0.2em] uppercase">
          PROCESS_TERMINATED
        </p>
      </div>

      <div className="max-w-2xl mx-auto w-full">
        <div className="terminal-window chamfered-border">
          <div className="terminal-header bg-[#111113] border-b border-gray-800 px-4 py-3 flex items-center">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#28ca42]"></div>
            </div>
            <div className="mx-auto font-mono text-xs text-gray-500">root@younes-portfolio:~</div>
          </div>

          <div className="p-6 font-mono text-sm md:text-base leading-relaxed text-gray-400">
            <div className="mb-4 text-red-400">
              {">"} ERROR: {t("notFound.message", "The page you're looking for has been moved to /dev/null or never existed.")}
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate({ to: "/" })} 
                className="btn-primary"
              >
                {t("notFound.goHome", "cd ~/ (GO HOME)")}
              </button>
              <button 
                onClick={() => navigate({ to: "/projects", search: { q: "", stack: "" } })} 
                className="btn-ghost"
              >
                {t("notFound.goProjects", "ls projects/")}
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
