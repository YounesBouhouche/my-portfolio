import LogoAnimation from "./LogoAnimation";
import "./LoadingOverlay.css";

interface LoadingOverlayProps {
  visible: boolean;
  size?: number;
}

export default function LoadingOverlay({ visible, size = 200 }: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <div className="loading-overlay" role="status" aria-live="polite" aria-label="Loading">
      <LogoAnimation size={size} />
    </div>
  );
}
