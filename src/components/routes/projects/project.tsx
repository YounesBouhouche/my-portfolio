import ProjectLayout from "../../layout/projects/ProjectLayout";
import { usePortfolioData } from "../../../hooks/usePortfolioData";
import NotFoundPage from "../NotFoundPage";
import { useAppContext } from "../../../context/AppContext";

export default function Project({ name }: { name: string }) {
  const { projects, isLoading } = usePortfolioData();
  const { cardTransition } = useAppContext();
  
  // Find project by route (case-insensitive)
  const project = projects.find(p => p.route.toLowerCase() === name.toLowerCase());

  // Wait a bit if we're in the middle of a card transition
  const isEntering = cardTransition.active && cardTransition.projectId === name;

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center font-mono text-gray-500">LOADING...</div>;
  }

  if (!project) {
    return <NotFoundPage />;
  }

  return (
    <div className={isEntering ? "page-enter" : ""}>
      <ProjectLayout project={project} />
    </div>
  );
}