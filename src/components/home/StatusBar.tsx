import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";

export default function StatusBar() {
  const { theme } = useAppContext();
  const [scroll, setScroll] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState("");

  // Update scroll
  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format: HH:MM:SS
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");
      
      // Get timezone offset in hours (e.g., -03 or +01)
      const offsetMinutes = now.getTimezoneOffset();
      const offsetHours = -Math.round(offsetMinutes / 60);
      const sign = offsetHours >= 0 ? "+" : "-";
      const formattedOffset = `${sign}${String(Math.abs(offsetHours)).padStart(2, "0")}`;

      setTime(`${hh}:${mm}:${ss} ${formattedOffset}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Active section logic based on scroll position could be added here, 
  // but for the hero status bar, we'll keep it simple as "01 — WORK".
  const activeSection = "01 — WORK";

  return (
    <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md z-40 hidden md:flex items-center justify-between px-6 py-2 font-mono text-[0.65rem] text-gray-500 tracking-wider">
      <div className="flex items-center gap-6">
        <div>SCRL {scroll.toFixed(2)}</div>
        <div>CRSR {cursor.x.toFixed(3)}.{cursor.y.toFixed(3)}</div>
      </div>
      
      <div className="font-bold text-gray-300">
        {activeSection}
      </div>
      
      <div className="flex items-center gap-6 text-right">
        <div className="flex items-center gap-2 uppercase">
          THEME <span className="w-2 h-2 inline-block bg-primary"></span> {theme === "dark" ? "#0088C1" : "#FFFFFF"}
        </div>
        <div>{time}</div>
      </div>
    </div>
  );
}
