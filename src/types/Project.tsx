export interface ExtraLink {
  label: string;
  url: string;
}

export interface ProjectContent {
  problem: string;
  approach: string;
  outcome: string;
}

export interface Project {
  // Core (existing fields, preserved)
  priority: number;
  id: string | number;
  route: string;
  name: string;
  description: string;
  heroImage: string;
  image: string;
  screenshots: string[];
  technologies: string[];
  requirements?: string[];
  lastUpdated: string;
  features: string[];
  downloadLink?: string;
  githubLink?: string;
  liveDemoLink?: string;
  category: string;
  completed: boolean;
  date: string;
  releaseDate?: string;

  // New fields (§9 portfolio config schema)
  repo?: string;             // "owner/repo" for GitHub API enrichment
  featured?: boolean;       // Show as large featured card
  order?: number;           // Sort order override
  overrideDescription?: string; // Override the GitHub/local description
  extraLinks?: ExtraLink[]; // Additional links (case study, live demo, etc.)
  content?: ProjectContent; // Detail page narrative sections

  // GitHub API enrichment (populated at runtime)
  stargazers_count?: number;
  primary_language?: string;
  pushed_at?: string;
  html_url?: string;
  statsUnavailable?: boolean; // true when GitHub API call failed for this repo
}
