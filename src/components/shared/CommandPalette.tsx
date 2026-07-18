import { useState, useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/AppContext";
import { usePortfolioData } from "../../hooks/usePortfolioData";

interface Command {
  id: string;
  label: string;
  icon?: React.ReactNode;
  category: "Navigation" | "Appearance" | "Language" | "Copy" | "Projects";
  action: () => void;
}

export default function CommandPalette() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    commandPaletteOpen,
    closeCommandPalette,
    toggleTheme,
    setLocale,
  } = useAppContext();
  const { projects } = usePortfolioData();

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [commandPaletteOpen]);

  // Prevent background scroll when open
  useEffect(() => {
    if (commandPaletteOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [commandPaletteOpen]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
      closeCommandPalette();
    }, 1000);
  };

  // Define commands
  const baseCommands: Command[] = [
    {
      id: "nav-work",
      label: t("command.goWork", "Go to Work"),
      category: "Navigation",
      action: () => { navigate({ to: "/" }); closeCommandPalette(); },
    },
    {
      id: "nav-projects",
      label: t("command.goProjects", "Go to Projects"),
      category: "Navigation",
      action: () => { navigate({ to: "/projects", search: { q: "", stack: "", category: "", status: "" } }); closeCommandPalette(); },
    },
    {
      id: "nav-contact",
      label: t("command.goContact", "Go to Contact"),
      category: "Navigation",
      action: () => { navigate({ to: "/contact" }); closeCommandPalette(); },
    },
    {
      id: "app-theme",
      label: t("command.toggleTheme", "Toggle Theme"),
      category: "Appearance",
      action: () => { toggleTheme(); closeCommandPalette(); },
    },
    {
      id: "lang-en",
      label: t("command.switchEn", "Switch to English"),
      category: "Language",
      action: () => { setLocale("en"); closeCommandPalette(); },
    },
    {
      id: "lang-ar",
      label: t("command.switchAr", "Switch to Arabic"),
      category: "Language",
      action: () => { setLocale("ar"); closeCommandPalette(); },
    },
    {
      id: "copy-email",
      label: t("command.copyEmail", "Copy Email"),
      category: "Copy",
      action: () => handleCopy("y.bouhouche@esi-sba.dz", "copy-email"),
    },
    {
      id: "copy-github",
      label: t("command.copyGithub", "Copy GitHub Link"),
      category: "Copy",
      action: () => handleCopy("https://github.com/younesbouh05", "copy-github"),
    },
    {
      id: "copy-linkedin",
      label: t("command.copyLinkedin", "Copy LinkedIn Link"),
      category: "Copy",
      action: () => handleCopy("https://www.linkedin.com/in/younesbouh05", "copy-linkedin"),
    },
  ];

  // Add project search commands
  const projectCommands: Command[] = projects.map(p => ({
    id: `proj-${p.id}`,
    label: `Project: ${p.name}`,
    category: "Projects",
    action: () => {
      navigate({ to: "/projects/$project", params: { project: p.id.toString() } });
      closeCommandPalette();
    },
  }));

  const allCommands = [...baseCommands, ...projectCommands];

  // Filter commands
  const filteredCommands = allCommands.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  // Group commands by category
  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, Command[]>);

  // Flattened for keyboard nav
  const flattendItems = Object.values(groupedCommands).flat();

  // Reset selection on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(i => (i + 1) % flattendItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(i => (i - 1 + flattendItems.length) % flattendItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (flattendItems[selectedIndex]) {
        flattendItems[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeCommandPalette();
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('[aria-selected="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!commandPaletteOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
      onClick={closeCommandPalette}
    >
      <div
        className="w-full max-w-xl bg-[#111113] shadow-2xl chamfered-border overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center px-4 border-b border-gray-800">
          <span className="text-gray-500 mr-2">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none py-4 text-white outline-none font-mono text-sm placeholder-gray-600"
            placeholder={t("command.placeholder", "TYPE A COMMAND OR SEARCH...")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={closeCommandPalette}
            className="text-gray-500 hover:text-white px-2 font-mono text-xs"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[60vh] overflow-y-auto py-2">
          {flattendItems.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500 font-mono text-sm">
              {t("command.noResults", "No commands found.")}
            </div>
          ) : (
            Object.entries(groupedCommands).map(([category, items]) => (
              <div key={category} className="mb-4 last:mb-0">
                <div className="px-4 py-1 text-[0.65rem] font-mono text-gray-600 uppercase tracking-widest">
                  {category}
                </div>
                {items.map(cmd => {
                  const index = flattendItems.findIndex(i => i.id === cmd.id);
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={cmd.id}
                      className={`px-4 py-2.5 flex items-center justify-between cursor-pointer font-body text-sm ${isSelected ? "bg-primary/10 border-l-3 border-primary text-white" : "text-gray-300 border-l-2 border-transparent hover:bg-white/5"
                        }`}
                      onClick={() => cmd.action()}
                      onMouseEnter={() => setSelectedIndex(index)}
                      aria-selected={isSelected}
                    >
                      <span>{cmd.label}</span>
                      {copiedId === cmd.id && (
                        <span className="text-primary font-mono text-xs">{t("command.copied", "Copied!")}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
