import LogoAnimation from "./LogoAnimation";
import "./LoadingContainer.css";
import "./LoadingOverlay.css";

interface LoadingContainerProps<T> {
  data: [T | null, string | null, boolean];
  className?: string;
  size?: number;
  fullscreen?: boolean;
  children: (data: T) => React.ReactNode;
}

export default function LoadingContainer<T>({
  data,
  className,
  size = 180,
  fullscreen = false,
  children,
}: LoadingContainerProps<T>) {
  const [fetchedData, error, isFetching] = data;

  if (isFetching) {
    if (fullscreen) {
      return (
        <div className="loading-overlay" role="status" aria-label="Loading">
          <LogoAnimation size={size} />
        </div>
      );
    }

    return (
      <div className={`loading-container ${className || ""}`}>
        <LogoAnimation size={size} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`loading-container ${className || ""}`}>
        <div className="error-container chamfered-border">
          <div className="text-red-500 font-mono text-xl mb-2 font-bold">
            SYSTEM FAILURE
          </div>
          <div className="text-gray-400 font-mono text-sm max-w-sm">
            {error}
          </div>
          <div
            className="mt-4 px-4 py-2 text-red-400 text-xs hover:bg-red-500/10 cursor-pointer transition-colors chamfered-border-sm"
            style={{ '--chamfer-border-color': 'rgba(239, 68, 68, 0.3)' } as React.CSSProperties}
            onClick={() => window.location.reload()}
          >
            RETRY_SEQUENCE
          </div>
        </div>
      </div>
    );
  }

  return <>{children(fetchedData!)}</>;
}
