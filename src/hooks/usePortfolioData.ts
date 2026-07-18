import { useState, useEffect, useCallback } from 'react';
import type { Project } from '../types/Project';

// ─── Constants ──────────────────────────────────────────────────────────────

const CACHE_KEY = 'portfolio_projects_cache';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

// Config URL: use env var in production, fall back to local JSON in dev
const CONFIG_URL =
  import.meta.env.VITE_PORTFOLIO_CONFIG_URL || '/db/projects.json';

const GITHUB_API = 'https://api.github.com/repos';

// ─── Cache helpers ──────────────────────────────────────────────────────────

interface CacheEntry {
  projects: Project[];
  fetchedAt: number;
}

function readCache(): CacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CacheEntry;
  } catch {
    return null;
  }
}

function writeCache(projects: Project[]): void {
  try {
    const entry: CacheEntry = { projects, fetchedAt: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // localStorage may be full — ignore silently
  }
}

function isCacheFresh(entry: CacheEntry): boolean {
  return Date.now() - entry.fetchedAt < CACHE_TTL_MS;
}

// ─── GitHub enrichment ──────────────────────────────────────────────────────

async function enrichWithGitHub(project: Project): Promise<Project> {
  if (!project.repo) return project;

  try {
    const res = await fetch(`${GITHUB_API}/${project.repo}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(import.meta.env.VITE_GITHUB_TOKEN
          ? { Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}` }
          : {}),
      },
    });

    if (res.status === 403) {
      return { ...project, statsUnavailable: true };
    }

    if (res.status === 404) {
      return { ...project, statsUnavailable: true };
    }

    if (!res.ok) {
      return { ...project, statsUnavailable: true };
    }

    const data = await res.json();
    console.log("Github data", data);

    return {
      ...project,
      id: data.id,
      name: project.name ?? data.name,
      stargazers_count: data.stargazers_count,
      primary_language: data.language,
      lastUpdated: data.pushed_at,
      date: data.created_at,
      releaseDate: project.releaseDate ?? data.created_at,
      description: data.description,
      githubLink: data.html_url,
      html_url: data.html_url,
      statsUnavailable: false,
    };
  } catch {
    return { ...project, statsUnavailable: true };
  }
}

// ─── Main fetch function ─────────────────────────────────────────────────────

async function fetchProjects(): Promise<Project[]> {
  let configData: Project[];

  // 1. Fetch the config
  try {
    const res = await fetch(CONFIG_URL);
    if (!res.ok) throw new Error(`Config fetch failed: ${res.status}`);
    configData = (await res.json()).projects;
    if (!Array.isArray(configData)) throw new Error('Config is not an array');
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : 'Failed to load project configuration'
    );
  }

  // 2. Sort by order/priority
  const sorted = [...configData].sort(
    (a, b) => (a.order ?? a.priority ?? 0) - (b.order ?? b.priority ?? 0)
  );

  // 3. Enrich with GitHub API (concurrently, but tolerate individual failures)
  const enriched = await Promise.all(sorted.map(enrichWithGitHub));

  return enriched;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export interface UsePortfolioDataReturn {
  projects: Project[];
  lastFetched: number | null;
  isLoading: boolean;
  error: string | null;
  rateLimited: boolean;
  refresh: () => void;
}

export function usePortfolioData(): UsePortfolioDataReturn {
  const [projects, setProjects] = useState<Project[]>([]);
  const [lastFetched, setLastFetched] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState(false);
  const [forceRefresh, setForceRefresh] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      // Check cache (skip on manual refresh: forceRefresh > 0)
      if (forceRefresh === 0) {
        const cached = readCache();
        if (cached && isCacheFresh(cached)) {
          if (!cancelled) {
            setProjects(cached.projects);
            setLastFetched(cached.fetchedAt);
            setIsLoading(false);
          }
          return;
        }
      }

      try {
        const data = await fetchProjects();
        if (cancelled) return;

        // Check if any project hit rate limit
        console.log("Data: ", data);

        const hasRateLimit = data.some(
          (p) => p.statsUnavailable && p.repo
        );
        setRateLimited(hasRateLimit);

        writeCache(data);
        setProjects(data);
        setLastFetched(Date.now());
      } catch (err) {
        if (cancelled) return;

        const msg = err instanceof Error ? err.message : 'Unknown error';
        setError(msg);

        // Fall back to cache even if stale
        const cached = readCache();
        if (cached) {
          setProjects(cached.projects);
          setLastFetched(cached.fetchedAt);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [forceRefresh]);

  const refresh = useCallback(() => {
    setForceRefresh((n) => n + 1);
  }, []);

  return { projects, lastFetched, isLoading, error, rateLimited, refresh };
}
