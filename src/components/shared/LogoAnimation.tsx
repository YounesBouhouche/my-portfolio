import { useId } from "react";
import "./LogoAnimation.css";

const POLY2 = "523.6 338 268.5 679 183.5 679 437.5 338 523.6 338";
const POLY1 =
  "856.5 338 625.75 338 444.5 580 410.5 535 367.5 593 441.5 697 658.5 409 804.5 409 856.5 338";
const POLY3 = "335.5 428 292.5 486 185.51 338 271.5 338 335.5 428";

interface LogoAnimationProps {
  size?: number;
  className?: string;
}

export default function LogoAnimation({ size = 180, className = "" }: LogoAnimationProps) {
  const rawId = useId();
  const svgId = `lfc-${rawId.replace(/:/g, "")}`;

  return (
    <div className={`logo-animation ${className}`.trim()} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 1000 1000"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Animated logo"
        role="img"
      >
        <defs>
          <clipPath id={`${svgId}-clip2`}>
            <rect className="lfc-clip2-rect" x="183" y="-3" width="342" height="341" />
          </clipPath>
          <clipPath id={`${svgId}-clip13`}>
            <rect className="lfc-clip13-rect" x="-820" y="0" width="820" height="1000" />
          </clipPath>
          <clipPath id={`${svgId}-clip3`}>
            <rect className="lfc-clip3-rect" x="25" y="330" width="165" height="165" />
          </clipPath>
        </defs>

        <polygon points={POLY1} fill="var(--logo-ghost)" />
        <polygon points={POLY2} fill="var(--logo-ghost)" />
        <polygon points={POLY3} fill="var(--logo-ghost)" />

        <polygon points={POLY2} fill="var(--logo-fill)" clipPath={`url(#${svgId}-clip2)`} />
        <polygon points={POLY1} fill="var(--logo-fill)" clipPath={`url(#${svgId}-clip13)`} />
        <polygon points={POLY3} fill="var(--logo-fill)" clipPath={`url(#${svgId}-clip3)`} />
      </svg>
    </div>
  );
}
