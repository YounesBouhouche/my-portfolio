import ProjectLayout from "../../layout/projects/ProjectLayout";
import useQueryFetch from "../../../hooks/useFetch";
import type { Project } from "../../../types/Project";
import LoadingContainer from "../../shared/LoadingContainer";
import { useEffect } from "react";

export default function Project({ name }: { name: string }) {
  const project = useQueryFetch<Project>(
    '/db/projects.json',
    'project-'+name,
    (data) => data.find((p: any) => p.route.toLowerCase() === name.toLowerCase())
  );
  useEffect(() => {
    console.log("Project: " + project[0]);
  }, [project]);
  return (
    <LoadingContainer
      data={project}
      children={(data) => data ?
        <ProjectLayout project={data} />
        : <div>Project not found</div>
      } />
  );
}