import { createFileRoute } from '@tanstack/react-router'
import ContactComponent from '../components/routes/ContactComponent'

export const Route = createFileRoute('/contact')({
  component: ContactComponent,
})