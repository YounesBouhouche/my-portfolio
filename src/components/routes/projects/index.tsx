import { Outlet, useNavigate, useSearch } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { usePortfolioData } from "../../../hooks/usePortfolioData";
import { useScrollReveal } from "../../../hooks/useScrollReveal";
import ProjectCard from "../../shared/ProjectCard";
import ProjectCarousel from "../../shared/ProjectCarousel";
import LoadingContainer from "../../shared/LoadingContainer";
import { useMemo, useState } from "react";
import "./Projects.css";

export default function Projects() {
  const { t } = useTranslation();
  const { projects, lastFetched, isLoading, error, rateLimited, refresh } = usePortfolioData();
  const search = useSearch({ from: '/projects' });
  const navigate = useNavigate({ from: '/projects' });

  // Mobile sidebar toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Search state from URL
  const searchTerm = search.q || "";
  const selectedStacks = search.stack ? search.stack.split(",").filter(Boolean) : [];
  const selectedCategory = search.category || "All";
  const selectedStatus = search.status || "All";

  const handleSearchChange = (val: string) => {
    navigate({ search: (prev) => ({ ...prev, q: val }), resetScroll: false });
  };

  const toggleStack = (stack: string) => {
    const newStacks = selectedStacks.includes(stack)
      ? selectedStacks.filter((s) => s !== stack)
      : [...selectedStacks, stack];

    navigate({ search: (prev) => ({ ...prev, stack: newStacks.join(",") }), resetScroll: false });
  };

  const setCategory = (cat: string) => {
    navigate({ search: (prev) => ({ ...prev, category: cat === "All" ? "" : cat }), resetScroll: false });
  };

  const setStatus = (status: string) => {
    navigate({ search: (prev) => ({ ...prev, status: status === "All" ? "" : status }), resetScroll: false });
  };

  const clearFilters = () => {
    navigate({ search: { q: "", stack: "", category: "", status: "" }, resetScroll: false });
  };

  // Extract unique data for filters
  const allStacks = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => p.technologies?.forEach(t => set.add(t)));
    return Array.from(set).sort();
  }, [projects]);

  const allCategories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => p.category && set.add(p.category));
    return ["All", ...Array.from(set).sort()];
  }, [projects]);

  const statuses = ["All", "Completed", "In Progress", "Upcoming"];

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = !searchTerm ||
        (p.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (p.description?.toLowerCase() || "").includes(searchTerm.toLowerCase());

      const matchesStack = selectedStacks.length === 0 ||
        selectedStacks.every((s) => p.technologies?.includes(s));

      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;

      let matchesStatus = true;
      if (selectedStatus !== "All") {
        const isUpcoming = !p.releaseDate || new Date(p.releaseDate) > new Date();
        if (selectedStatus === "Upcoming") matchesStatus = isUpcoming;
        else if (selectedStatus === "Completed") matchesStatus = p.completed === true && !isUpcoming;
        else if (selectedStatus === "In Progress") matchesStatus = p.completed === false && !isUpcoming;
      }

      return matchesSearch && matchesStack && matchesCategory && matchesStatus;
    });
  }, [projects, searchTerm, selectedStacks, selectedCategory, selectedStatus]);

  const featuredProjects = useMemo(() => projects.filter(p => p.featured), [projects]);

  const headerRef = useScrollReveal<HTMLElement>();
  const filterRef = useScrollReveal<HTMLElement>();
  const gridRef = useScrollReveal<HTMLDivElement>({ stagger: true });

  const formatTime = (ms: number) => {
    const d = new Date(ms);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const activeFiltersCount =
    (searchTerm ? 1 : 0) +
    (selectedCategory !== "All" ? 1 : 0) +
    (selectedStatus !== "All" ? 1 : 0) +
    selectedStacks.length;

  const filtersContent = (
    <div className="pa-sidebar-content">
      <div className="pa-search-wrapper mb-8">
        <svg className="pa-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="Search query..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pa-search-input"
        />
      </div>

      <div className="pa-filter-section mb-6">
        <span className="pa-filter-label">Category</span>
        <div className="pa-filter-grid">
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`pa-filter-btn ${selectedCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="pa-filter-section mb-6">
        <span className="pa-filter-label">Status</span>
        <div className="pa-filter-grid">
          {statuses.map(stat => (
            <button
              key={stat}
              onClick={() => setStatus(stat)}
              className={`pa-filter-btn ${selectedStatus === stat ? "active" : ""}`}
            >
              {stat}
            </button>
          ))}
        </div>
      </div>

      {allStacks.length > 0 && (
        <div className="pa-filter-section mb-8">
          <span className="pa-filter-label">Stack</span>
          <div className="pa-filter-chips">
            {allStacks.map(stack => (
              <button
                key={stack}
                onClick={() => toggleStack(stack)}
                className={`pa-filter-chip ${selectedStacks.includes(stack) ? "active" : ""}`}
              >
                {stack}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeFiltersCount > 0 && (
        <button onClick={clearFilters} className="pa-clear-btn w-full">
          {t("projects.clearFilters", "CLEAR ALL FILTERS")}
        </button>
      )}
    </div>
  );

  return (
    <div className="projects-page-wrapper">
      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="pa-header reveal-ready" ref={headerRef}>
        <h1 className="pa-title">
          {t("projects.title", "PROJECTS")}<span className="text-primary">.</span>
        </h1>
        <p className="pa-subtitle">
          {t("projects.subtitle", "A comprehensive archive of my work, side projects, open-source contributions, and technical experiments.")}
        </p>
      </header>

      {/* ── Featured Carousel ───────────────────────────────────── */}
      {featuredProjects.length > 0 && (
        <section className="pa-featured-section">
          <LoadingContainer data={[projects.length > 0 ? projects : null, error, isLoading && projects.length === 0]} size={120}>
            {() => (
              <div className="pa-carousel-wrapper">
                <ProjectCarousel projects={featuredProjects} />
              </div>
            )}
          </LoadingContainer>
        </section>
      )}

      {/* ── Main Content Layout ─────────────────────────────────── */}
      <div className="pa-main-layout">

        {/* Desktop Sidebar */}
        <aside className="pa-sidebar reveal-ready" ref={filterRef}>
          <div className="pa-sidebar-sticky chamfered-large-shape">
            {filtersContent}
          </div>
        </aside>

        {/* All Projects Grid */}
        <section className="pa-content">
          <div className="flex justify-between items-center mb-6">
            <h2 className="pa-results-title">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'}
            </h2>
            <button
              className="pa-mobile-filter-btn"
              onClick={() => setMobileFilterOpen(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              FILTERS {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
          </div>

          <LoadingContainer data={[projects.length > 0 ? projects : null, error, isLoading && projects.length === 0]} size={180}>
            {() => (
              <>
                {filteredProjects.length > 0 ? (
                  <div className="pa-grid reveal-stagger" ref={gridRef}>
                    {filteredProjects.map((project, idx) => (
                      <div key={project.id} className="reveal-ready h-full">
                        <ProjectCard project={project} index={idx + 1} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="pa-empty-state">
                    <div className="pa-empty-icon">¯\_(ツ)_/¯</div>
                    <div className="pa-empty-text">{t("projects.noResults", "NO PROJECTS FOUND")}</div>
                    <button onClick={clearFilters} className="btn-ghost">
                      {t("projects.clearFilters", "CLEAR FILTERS")}
                    </button>
                  </div>
                )}
              </>
            )}
          </LoadingContainer>
        </section>

      </div>

      {/* ── Mobile Filter Drawer ────────────────────────────────── */}
      {mobileFilterOpen && (
        <div
          className="pa-drawer-backdrop"
          onClick={() => setMobileFilterOpen(false)}
        >
          <aside
            className="pa-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pa-drawer-header">
              <span className="pa-drawer-title">Filters</span>
              <button
                className="pa-drawer-close"
                onClick={() => setMobileFilterOpen(false)}
              >✕</button>
            </div>
            <div className="pa-drawer-body">
              {filtersContent}
            </div>
          </aside>
        </div>
      )}

      {/* ── Floating Action Button (Refresh) ────────────────────── */}
      {lastFetched && (
        <button
          className={`pa-fab ${rateLimited ? "rate-limited" : ""}`}
          onClick={refresh}
          disabled={isLoading}
          aria-label="Refresh data"
        >
          <div className="pa-fab-text">
            <span className="pa-fab-label">Last Sync</span>
            <span className="pa-fab-time">{formatTime(lastFetched)}</span>
          </div>
          <div className={`pa-fab-icon ${isLoading ? "spinning" : ""}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
          </div>
        </button>
      )}

      <Outlet />
    </div>
  );
}
