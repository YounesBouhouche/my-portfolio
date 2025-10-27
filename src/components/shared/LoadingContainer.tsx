
interface LoadingContainerProps<T> {
  data: [T|null, string|null, boolean];
  className?: string;
  children: (data: T) => React.ReactNode;
}

export default function LoadingContainer<T>(
  { data, className, children }: LoadingContainerProps<T>
) {
  const [ fetchedData, error, isFetching ] = data;

  if (isFetching) {
    return (
      <div className={`flex items-center justify-center h-[300px] p-8 w-full ${className}`}>
        <div className="relative">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-transparent animate-spin"></div>
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-gray-700/30"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="175.92"
                strokeDashoffset="44"
                className="animate-spin origin-center"
                style={{
                  animationDuration: '1.5s',
                  animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  animationIterationCount: 'infinite'
                }}
              />
              
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#aeea2a" stopOpacity="1" />
                  <stop offset="50%" stopColor="#aeea2a" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#aeea2a" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Inner pulse effect */}
            <div className="absolute inset-2 rounded-full bg-primary/10 animate-pulse"></div>
            
          </div>
          
          {/* Loading text */}
          <div className="mt-4 text-center">
            <p className="text-sm font-medium text-gray-300 animate-pulse">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center h-[300px] w-full p-8 ${className}`}>
        <svg 
          className="w-12 h-12 text-red-600 mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
          >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        <div className="text-center">
          <p className="text-lg font-medium text-red-600 mb-2">Error</p>
          <p className="text-sm text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return children(fetchedData!);
}