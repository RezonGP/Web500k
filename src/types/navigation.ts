export type NavSection = "works" | "about" | "directors" | "contact";

export type ViewMode = "slider" | "grid";

export interface NavItem {
  id: string;
  label: string;
  sub: string;
  preview: string;
}
