import { PUBLICATIONS } from "./publications";

export type RepositoryDocumentKind =
  | "Article"
  | "Research paper"
  | "White paper"
  | "Specification"
  | "Report"
  | "Case material"
  | "Dataset"
  | "Note";

export type RepositoryWorkstream = "BagelTech" | "BDB Labs" | "Bagelle Parris Vargas";

export type RepositoryVisibility = "public" | "private";

export type RepositoryOrigin = "curated" | "upload";

export interface RepositoryDocument {
  id: string;
  title: string;
  abstract: string;
  kind: RepositoryDocumentKind;
  workstream: RepositoryWorkstream;
  authors: string[];
  topics: string[];
  publishedAt: string;
  addedAt: string;
  sourceName: string;
  sourceUrl?: string;
  fileName?: string;
  fileType?: string;
  fileSize?: number;
  visibility: RepositoryVisibility;
  origin: RepositoryOrigin;
  featured?: boolean;
}

const publicationKind: Record<string, RepositoryDocumentKind> = {
  Research: "Research paper",
  Framework: "White paper",
  Specification: "Specification",
  Essay: "Article",
  Report: "Report",
};

export const DOCUMENT_KIND_OPTIONS: RepositoryDocumentKind[] = [
  "Article",
  "Research paper",
  "White paper",
  "Specification",
  "Report",
  "Case material",
  "Dataset",
  "Note",
];

export const REPOSITORY_WORKSTREAM_OPTIONS: RepositoryWorkstream[] = [
  "BagelTech",
  "BDB Labs",
  "Bagelle Parris Vargas",
];

export const CURATED_REPOSITORY_DOCUMENTS: RepositoryDocument[] = PUBLICATIONS.map((publication) => ({
  id: `curated-${publication.slug}`,
  title: publication.title,
  abstract: publication.summary,
  kind: publicationKind[publication.category] ?? "Article",
  workstream: publication.workstream,
  authors: ["William Parris"],
  topics: publication.tags,
  publishedAt: publication.publishedAt,
  addedAt: publication.publishedAt,
  sourceName: publication.source,
  sourceUrl: publication.sourceUrl,
  visibility: "public",
  origin: "curated",
  featured: publication.featured,
}));
