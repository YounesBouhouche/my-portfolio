import { createFileRoute } from '@tanstack/react-router'
import Projects from '../components/routes/projects'

export const Route = createFileRoute('/projects')({
  component: Projects,
})
