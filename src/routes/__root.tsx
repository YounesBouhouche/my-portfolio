import { createRootRoute } from '@tanstack/react-router'
import App from '../App'
import NotFoundPage from '../components/routes/NotFoundPage'

export const Route = createRootRoute({
  component: App,
  notFoundComponent: () => <NotFoundPage />,
  errorComponent: ({ error }) => (
    <div className="min-h-[calc(100vh-52px)] bg-background flex flex-col pt-32 pb-20 px-6 items-center">
      <div className="max-w-2xl mx-auto w-full text-center mb-12">
        <h1 className="font-display text-5xl md:text-7xl mb-4 text-red-500 leading-none">
          SYSTEM FAILURE <span className="text-primary">/</span>
        </h1>
        <p className="font-mono text-xs text-gray-500 tracking-[0.2em] uppercase">
          FATAL_EXCEPTION
        </p>
      </div>
      <div 
        className="max-w-2xl mx-auto w-full terminal-window chamfered-border"
        style={{ '--chamfer-border-color': 'rgba(127, 29, 29, 0.5)' } as React.CSSProperties}
      >
        <div className="terminal-header bg-[#111113] border-b border-red-900/50 px-4 py-3 flex items-center">
          <div className="mx-auto font-mono text-xs text-red-400">root@younes-portfolio:~ ERROR</div>
        </div>
        <div className="p-6 font-mono text-sm leading-relaxed text-red-400 break-words">
          {error.message || 'An unexpected error occurred.'}
        </div>
      </div>
    </div>
  ),
})