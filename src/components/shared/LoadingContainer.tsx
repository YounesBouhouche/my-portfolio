import "./LoadingContainer.css";

interface LoadingContainerProps<T> {
  data: [T | null, string | null, boolean];
  className?: string;
  children: (data: T) => React.ReactNode;
}

export default function LoadingContainer<T>({
  data,
  className,
  children,
}: LoadingContainerProps<T>) {
  const [fetchedData, error, isFetching] = data;

  if (isFetching) {
    return (
      <div className={`loading-container ${className || ""}`}>
        <div className="loader-bar-container">
          <div className="loader-bar"></div>
        </div>
        <div className="loading-text">system_initializing</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`loading-container ${className || ""}`}>
        <div className="error-container">
          <div className="text-red-500 font-mono text-xl mb-2 font-bold">
            SYSTEM FAILURE
          </div>
          <div className="text-gray-400 font-mono text-sm max-w-sm">
            {error}
          </div>
          <div
            className="mt-4 px-4 py-2 border border-red-500/30 text-red-400 text-xs hover:bg-red-500/10 cursor-pointer transition-colors"
            onClick={() => window.location.reload()}
          >
            RETRY_SEQUENCE
          </div>
        </div>
      </div>
    );
  }

  return children(fetchedData!);
}
