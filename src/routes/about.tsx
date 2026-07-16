import { createFileRoute } from '@tanstack/react-router'
import AboutPage from '../components/routes/about/AboutPage'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})
