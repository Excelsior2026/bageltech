"use client";

import { useEffect, useMemo, useState } from "react";
import type { RepositoryDocument } from "@/content/document-repository";
import { DOCUMENT_KIND_OPTIONS, REPOSITORY_WORKSTREAM_OPTIONS } from "@/content/document-repository";
import { formatFileSize, getUploadedDocument, listUploadedDocuments } from "@/lib/repository-storage";
import styles from "@/components/Marketing.module.css";

interface RepositoryBrowserProps {
  curatedDocuments: RepositoryDocument[];
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(value),
  );
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function searchableText(document: RepositoryDocument) {
  return normalize(
    [
      document.title,
      document.abstract,
      document.kind,
      document.workstream,
      document.sourceName,
      ...document.authors,
      ...document.topics,
    ].join(" "),
  );
}

export default function RepositoryBrowser({ curatedDocuments }: RepositoryBrowserProps) {
  const [uploadedDocuments, setUploadedDocuments] = useState<RepositoryDocument[]>([]);
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("All");
  const [workstream, setWorkstream] = useState("All");
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    listUploadedDocuments()
      .then((documents) => {
        if (mounted) {
          setUploadedDocuments(documents.filter((document) => document.visibility === "public"));
        }
      })
      .catch(() => {
        if (mounted) {
          setUploadedDocuments([]);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const documents = useMemo(
    () => [...curatedDocuments, ...uploadedDocuments],
    [curatedDocuments, uploadedDocuments],
  );

  const filteredDocuments = useMemo(() => {
    const normalizedQuery = normalize(query);

    return documents.filter((document) => {
      const matchesQuery = !normalizedQuery || searchableText(document).includes(normalizedQuery);
      const matchesKind = kind === "All" || document.kind === kind;
      const matchesWorkstream = workstream === "All" || document.workstream === workstream;

      return matchesQuery && matchesKind && matchesWorkstream;
    });
  }, [documents, kind, query, workstream]);

  async function openDocument(document: RepositoryDocument) {
    setError("");

    if (document.origin !== "upload" && document.sourceUrl) {
      window.open(document.sourceUrl, "_blank", "noopener,noreferrer");
      return;
    }

    try {
      const record = await getUploadedDocument(document.id);

      if (!record) {
        setError("This local document is no longer available in the browser repository.");
        return;
      }

      const fileUrl = URL.createObjectURL(record.file);
      window.open(fileUrl, "_blank", "noopener,noreferrer");
      window.setTimeout(() => URL.revokeObjectURL(fileUrl), 30_000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to open this document.");
    }
  }

  return (
    <div className={styles.repositoryWorkspace}>
      <div className={styles.repositoryFilters} aria-label="Repository filters">
        <label>
          <span>Search</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Title, topic, author, source"
            type="search"
          />
        </label>

        <label>
          <span>Type</span>
          <select value={kind} onChange={(event) => setKind(event.target.value)}>
            <option>All</option>
            {DOCUMENT_KIND_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Workstream</span>
          <select value={workstream} onChange={(event) => setWorkstream(event.target.value)}>
            <option>All</option>
            {REPOSITORY_WORKSTREAM_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.repositorySummary}>
        <span>{filteredDocuments.length} documents</span>
        <span>{uploadedDocuments.length} local uploads</span>
      </div>

      {error ? <p className={styles.repositoryError}>{error}</p> : null}

      <div className={styles.repositoryList}>
        {filteredDocuments.length === 0 ? (
          <div className={styles.repositoryEmpty}>No matching documents.</div>
        ) : (
          filteredDocuments.map((document) => (
            <article className={styles.repositoryItem} key={document.id}>
              <div>
                <p className={styles.meta}>
                  <span>{formatDate(document.publishedAt)}</span>
                  <span>{document.kind}</span>
                  <span>{document.workstream}</span>
                </p>
                <h2>{document.title}</h2>
                <p>{document.abstract}</p>
                <div className={styles.tagRow}>
                  {document.topics.map((topic) => (
                    <span className={styles.tag} key={topic}>
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.repositoryMetaPanel}>
                <p>{document.authors.join(", ")}</p>
                <p>{document.sourceName}</p>
                <p>{formatFileSize(document.fileSize)}</p>
                <button className={styles.repositoryAction} type="button" onClick={() => openDocument(document)}>
                  Open
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
