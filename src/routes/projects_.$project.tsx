import { createFileRoute } from '@tanstack/react-router'
import Project from '../components/routes/projects/project'

export const Route = createFileRoute('/projects_/$project')({
  component: () => <Project id={Route.useParams().project} />,
})
