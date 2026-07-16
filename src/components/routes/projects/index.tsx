import { Outlet, useNavigate, useSearch } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { usePortfolioData } from "../../../hooks/usePortfolioData";
import { useScrollReveal } from "../../../hooks/useScrollReveal";
import LargeProjectCard from "../../shared/LargeProjectCard";
import ProjectCard from "../../shared/ProjectCard";
import { useMemo } from "react";

export default function Projects() {
  const { t } = useTranslation();
  const { projects, lastFetched, isLoading, rateLimited, refresh } = usePortfolioData();
  const search = useSearch({ from: '/projects' });
  const navigate = useNavigate({ from: '/projects' });

  // Search state from URL
  const searchTerm = search.q || "";
  const selectedStacks = search.stack ? search.stack.split(",").filter(Boolean) : [];

  const handleSearchChange = (val: string) => {
    navigate({ search: (prev) => ({ ...prev, q: val }) });
  };

  const toggleStack = (stack: string) => {
    const newStacks = selectedStacks.includes(stack)
      ? selectedStacks.filter((s) => s !== stack)
      : [...selectedStacks, stack];
    
    navigate({ search: (prev) => ({ ...prev, stack: newStacks.join(",") }) });
  };

  const clearFilters = () => {
    navigate({ search: { q: "", stack: "" } });
  };

  // Collect all unique tech stacks
  const allStacks = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => p.technologies?.forEach(t => set.add(t)));
    return Array.from(set).sort();
  }, [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Name or desc fuzzy search (simple substring match)
      const matchesSearch = !searchTerm || 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Multi-select stack filter (must contain ALL selected stacks)
      const matchesStack = selectedStacks.length === 0 ||
        selectedStacks.every((s) => p.technologies?.includes(s));

      return matchesSearch && matchesStack;
    });
  }, [projects, searchTerm, selectedStacks]);

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const regularProjects = filteredProjects.filter(p => !p.featured);

  const headerRef = useScrollReveal<HTMLDivElement>();
  const sidebarRef = useScrollReveal<HTMLDivElement>();
  const featuredRef = useScrollReveal<HTMLDivElement>({ stagger: true });
  const gridRef = useScrollReveal<HTMLDivElement>({ stagger: true });

  const formatTime = (ms: number) => {
    const d = new Date(ms);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <div className="min-h-screen bg-background text-white pt-28 md:pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* New Hero Section */}
          <div className="mb-16 reveal-ready" ref={headerRef}>
            <p className="font-mono text-[0.65rem] tracking-[0.25em] text-primary uppercase mb-4">
              PORTFOLIO_ARCHIVE
            </p>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-6">
              <h1 className="font-display text-[14vw] md:text-[5rem] lg:text-[6.5rem] leading-[0.85] tracking-tight text-white m-0">
                {t("projects.title", "PROJECTS")}<span className="text-primary">.</span>
              </h1>
              
              {/* Cache status / refresh */}
              {lastFetched && (
                <div className="flex items-center gap-4 font-mono text-[0.65rem] text-gray-500 bg-[#0f0f11] chamfered-border px-4 py-2 shrink-0">
                  {rateLimited && (
                    <span className="text-yellow-500 mr-2 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></span>
                      {t("projects.rateLimitWarning", "API RATE LIMIT")}
                    </span>
                  )}
                  <span>{t("projects.lastUpdated", "LAST SYNC")}: {formatTime(lastFetched)}</span>
                  <button 
                    onClick={refresh}
                    className="hover:text-primary transition-colors flex items-center gap-1 ml-2"
                    disabled={isLoading}
                  >
                    {isLoading ? "..." : t("projects.refresh", "REFRESH")}
                  </button>
                </div>
              )}
            </div>
            <p className="font-body text-gray-500 leading-relaxed max-w-2xl text-base">
              {t("projects.subtitle", "A comprehensive archive of my work, side projects, open-source contributions, and technical experiments.")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 items-start">
            
            {/* Sidebar Controls */}
            <div className="lg:col-span-1 space-y-8 reveal-ready lg:sticky lg:top-32" ref={sidebarRef}>
              
              {/* Search */}
              <div>
                <h3 className="font-heading text-sm text-gray-300 uppercase tracking-widest mb-4">Search</h3>
                <div className="relative chamfered-border">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-sm z-10">{'>'}</span>
                  <input
                    type="text"
                    placeholder="Search query..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full bg-[#111113] text-white pl-10 pr-4 py-3 focus:outline-none transition-colors font-mono text-sm placeholder-gray-600 border-none"
                  />
                </div>
              </div>

              {/* Stack Filter */}
              <div>
                <h3 className="font-heading text-sm text-gray-300 uppercase tracking-widest mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {allStacks.map((stack) => {
                    const isActive = selectedStacks.includes(stack);
                    return (
                      <button
                        key={stack}
                        onClick={() => toggleStack(stack)}
                        className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors chamfered border-none ${
                          isActive 
                            ? "bg-primary text-white" 
                            : "bg-[#111113] text-gray-500 hover:text-white hover:bg-[#1a1a1e]"
                        }`}
                      >
                        {stack}
                      </button>
                    );
                  })}
                </div>
                {selectedStacks.length > 0 && (
                  <button onClick={clearFilters} className="mt-4 font-mono text-[0.65rem] text-gray-500 hover:text-primary uppercase tracking-widest">
                    [ Clear Filters ]
                  </button>
                )}
              </div>
            </div>

            {/* Main Content: Projects Grid */}
            <div className="lg:col-span-3 min-h-[50vh]">
              {/* Loading State */}
              {isLoading && projects.length === 0 ? (
                <div className="py-20 text-center font-mono text-sm text-gray-500">
                  LOADING_PROJECTS...
                </div>
              ) : (
                <div className="space-y-16">
                  {/* Featured Projects (Large Cards) */}
                  {featuredProjects.length > 0 && (
                    <div className="space-y-8 reveal-stagger" ref={featuredRef}>
                      {featuredProjects.map((project, idx) => (
                        <div key={project.route || project.id} className="reveal-ready">
                          <LargeProjectCard
                            title={project.name}
                            description={project.overrideDescription || project.description}
                            imageUrl={project.heroImage}
                            projectUrl={`/projects/${project.route}`}
                            pictureInLeft={idx % 2 === 0}
                            releaseDate={project.releaseDate}
                            technologies={project.technologies}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Regular Projects (Node Cards Grid) */}
                  {regularProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal-stagger" ref={gridRef}>
                      {regularProjects.map((project) => (
                        <div key={project.route || project.id} className="reveal-ready h-full">
                          <ProjectCard project={project} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Empty State */
                    filteredProjects.length === 0 && (
                      <div className="text-center py-24 border border-dashed border-gray-800 bg-[#111113]/50 chamfered">
                        <div className="text-gray-600 font-mono mb-4 text-4xl">¯\_(ツ)_/¯</div>
                        <p className="text-gray-400 font-mono text-sm uppercase tracking-widest mb-6">
                          {t("projects.noResults", "NO PROJECTS FOUND")}
                        </p>
                        <button onClick={clearFilters} className="btn-ghost">
                          {t("projects.clearFilters", "CLEAR FILTERS")}
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
