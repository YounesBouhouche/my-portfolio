export interface Project {
  id: string;
  route: string;
  name: string;
  description: string;
  heroImage: string;
  image: string;
  screenshots: string[];
  technologies: string[];
  requirements: string[];
  lastUpdated: string;
  features: string[];
  downloadLink?: string;
  githubLink?: string;
  liveDemoLink?: string;
  category: string;
  completed: boolean;
}