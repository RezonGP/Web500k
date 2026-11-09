export type CategoryType =
  | "KEY VISUAL"
  | "PACKAGING DESIGN"
  | "BRANDING"
  | "TYPOGRAPHIC"
  | "CAMPAIGN";

export type CategoryFilter = "ALL" | CategoryType;

export interface Credit {
  role: string;
  name: string;
}

export interface Project {
  id: string;
  title: string;
  year: string;
  client: string;
  category: CategoryType;
  categoryLabel: string;
  image: string;
  stills: string[];
  description: string;
  concept: string;
  roles: string[];
  credits: Credit[];
}

export interface CategoryMeta {
  subtitle: string;
  intro: string;
  heroButton: string;
}

