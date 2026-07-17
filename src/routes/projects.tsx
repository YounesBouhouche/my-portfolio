import { createFileRoute } from '@tanstack/react-router'
import Projects from '../components/routes/projects'

export const Route = createFileRoute('/projects')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      q: (search.q as string) || '',
      stack: (search.stack as string) || '',
    }
  },
  component: Projects,
})
