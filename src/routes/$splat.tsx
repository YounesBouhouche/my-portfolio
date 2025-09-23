import { createFileRoute } from '@tanstack/react-router'
import NotFoundPage from '../components/routes/NotFoundPage'

export const Route = createFileRoute('/$splat')({
  component: NotFoundPage,
})
