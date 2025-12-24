import { useState, useEffect } from "react";
import "./SkillCard.css";

interface SkillCardProps {
  name: string;
  level: number;
  delay?: number;
  primaryColor?: string;
  secondaryColor?: string;
  icon?: string;
  image?: string;
}

export default function SkillCard({
  name,
  level,
  delay = 0,
  primaryColor = "#3b82f6",
  secondaryColor = "#60a5fa",
  icon,
}: SkillCardProps) {
  const [animatedLevel, setAnimatedLevel] = useState(0);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Animate level counter
      const levelInterval = setInterval(() => {
        setAnimatedLevel((prev) => {
          if (prev >= level) {
            clearInterval(levelInterval);
            return level;
          }
          return prev + 1;
        });
      }, 30);

      // Animate progress bar
      const progressTimer = setTimeout(() => {
        setAnimatedProgress(level);
      }, 200);

      return () => {
        clearInterval(levelInterval);
        clearTimeout(progressTimer);
      };
    }, delay);

    return () => clearTimeout(timer);
  }, [level, delay]);

  // Helper function to convert hex color to RGB values
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : "0, 255, 65";
  };

  const getLeveltext = (level: number) => {
    if (level >= 90) return "Expert";
    if (level >= 70) return "Advanced";
    if (level >= 50) return "Intermediate";
    if (level >= 30) return "Beginner";
    return "Novice";
  };

  return (
    <div
      className="skill-card"
      data-delay={delay}
      style={
        {
          "--primary-color": primaryColor,
          "--secondary-color": secondaryColor,
          "--primary-rgb": hexToRgb(primaryColor),
          "--secondary-rgb": hexToRgb(secondaryColor),
        } as React.CSSProperties
      }
    >
      <div className="skill-header">
        <div className="skill-icon">
          <img src={icon} />
        </div>
        <div className="skill-info">
          <h3 className="skill-name">{name}</h3>
          <div className="skill-level">
            Level: <span className="level-number">{getLeveltext(level)}</span>
          </div>
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-track">
          <div
            className="progress-bar"
            style={{ width: `${animatedProgress}%` }}
          ></div>
        </div>
        <div className="progress-text">{animatedLevel}%</div>
      </div>
    </div>
  );
}
