import ProjectLayout from "../../layout/projects/ProjectLayout";
import { usePortfolioData } from "../../../hooks/usePortfolioData";
import NotFoundPage from "../NotFoundPage";
import { useAppContext } from "../../../context/AppContext";
import LoadingContainer from "../../shared/LoadingContainer";

export default function Project({ id }: { id: string }) {
  const { projects, isLoading, error } = usePortfolioData();
  const { cardTransition } = useAppContext();

  // Find project by route (case-insensitive)
  const project = projects.find(p => p.id.toString() === id.toString());

  // Wait a bit if we're in the middle of a card transition
  const isEntering = cardTransition.active && cardTransition.projectId === id;

  return (
    <LoadingContainer
      data={[project || null, error, isLoading]}
      className="min-h-screen bg-background"
      size={280}
      fullscreen
    >
      {(data) => {
        if (!data) return <NotFoundPage />;
        return (
          <div className={isEntering ? "page-enter" : ""}>
            <ProjectLayout project={data} />
          </div>
        );
      }}
    </LoadingContainer>
  );
}