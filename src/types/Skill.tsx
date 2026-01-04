export interface Skill {
  name: string;
  level: number;
  primaryColor: string;
  secondaryColor: string;
  icon: string;
  category?: string;
  resources?: { label: string; url: string }[];
}
