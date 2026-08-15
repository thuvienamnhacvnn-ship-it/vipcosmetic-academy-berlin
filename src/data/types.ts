export type LText = { de: string; vi: string; en?: string };

export type DepartmentId =
  | "lashes"
  | "nails"
  | "skin"
  | "feet"
  | "pmu"
  | "makeup"
  | "hair"
  | "advanced"
  | "nisv"
  | "trainer";

export type Course = {
  id: string;
  slug: string;
  department: DepartmentId;
  title: LText;
  summary: LText;
  description: LText;
  duration: LText;
  level: LText;
  format: LText;
  funding: Array<"bildungsgutschein" | "private" | "nisv">;
  priceFrom?: number;
  modules: LText[];
  outcomes: LText[];
  featured?: boolean;
  published?: boolean;
};

export type Department = {
  id: DepartmentId;
  title: LText;
  teaser: LText;
  body: LText;
};
