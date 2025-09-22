import { createFileRoute } from '@tanstack/react-router'
import HomeComponent from '../components/routes/home/HomeComponent'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})