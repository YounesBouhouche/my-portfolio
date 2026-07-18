import { useEffect, useState } from "react";
import type { Skill } from "../../types/Skill";
import { useTranslation } from "react-i18next";

interface SkillGanttChartProps {
  category: string;
  skills: Skill[];
  onSkillClick?: (skill: Skill) => void;
}

export default function SkillGanttChart({ category, skills, onSkillClick }: SkillGanttChartProps) {
  const { t } = useTranslation();
  return (
    <div className="bg-[#0f0f11] shadow-xl chamfered-border p-6 md:p-8 mb-8">
      <h3 className="text-lg font-heading font-bold text-white mb-6 border-l-2 border-primary pl-4 tracking-wide uppercase">
        {t("skills." + category)}
      </h3>
      <div className="space-y-5">
        {skills.map((skill, index) => {
          const [progress, setProgress] = useState(0);

          useEffect(() => {
            const timer = setTimeout(() => {
              setProgress(skill.level);
            }, 150 + index * 50);
            return () => clearTimeout(timer);
          }, [skill.level, index]);

          const getLevelText = (level: number) => {
            if (level >= 90) return "expert";
            if (level >= 70) return "advanced";
            if (level >= 50) return "intermediate";
            return "beginner";
          };

          const hasResources = skill.resources && skill.resources.length > 0;

          return (
            <div
              key={skill.name}
              className={`flex flex-col md:flex-row md:items-center gap-2 md:gap-6 group ${hasResources ? "cursor-pointer" : ""
                }`}
              onClick={() => hasResources && onSkillClick?.(skill)}
            >
              {/* Skill Label */}
              <div className="w-36 shrink-0 flex items-center gap-3">
                {skill.icon && (
                  <div className="w-6 h-6 flex items-center justify-center bg-white/5 p-1 chamfered-border-sm shrink-0">
                    <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
                <span className="font-heading font-semibold text-gray-400 group-hover:text-white transition-colors text-sm md:text-base">
                  {skill.name}
                </span>
              </div>

              {/* Gantt Bar (Chamfered Container) */}
              <div className="flex-grow h-6 bg-white/5 relative chamfered flex items-center">
                {/* Progress bar inside (also chamfered!) */}
                <div
                  className="h-full transition-all duration-1000 ease-out absolute left-0 top-0 chamfered"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${skill.primaryColor || '#0088C1'} 0%, ${skill.secondaryColor || '#00b4d8'} 100%)`,
                    opacity: 0.85
                  }}
                />

                {/* Level label overlaid on the bar */}
                <span className="absolute left-3 font-mono text-[0.6rem] md:text-xs text-white font-bold tracking-wider z-10 select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {t("skills." + getLevelText(skill.level))}
                </span>
              </div>

              {/* Percentage Indicator */}
              <div className="w-16 text-right font-mono text-xs md:text-sm text-gray-500 group-hover:text-primary transition-colors shrink-0">
                {skill.level}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
