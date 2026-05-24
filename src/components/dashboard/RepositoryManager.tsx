"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  DOCUMENT_KIND_OPTIONS,
  REPOSITORY_WORKSTREAM_OPTIONS,
  type RepositoryDocumentKind,
  type RepositoryVisibility,
  type RepositoryWorkstream,
} from "@/content/document-repository";
import {
  deleteUploadedDocument,
  formatFileSize,
  listUploadedDocuments,
  saveUploadedDocument,
  type RepositoryUploadRecord,
} from "@/lib/repository-storage";

function today() {
  return new Date().toISOString().slice(0, 10);
}

function cleanFileTitle(fileName: string) {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(
    new Date(value),
  );
}

const initialForm = {
  title: "",
  abstract: "",
  kind: "Research paper" as RepositoryDocumentKind,
  workstream: "BDB Labs" as RepositoryWorkstream,
  authors: "William Parris",
  topics: "AI governance, evidence",
  publishedAt: today(),
  sourceName: "Uploaded file",
  sourceUrl: "",
  visibility: "public" as RepositoryVisibility,
};

export default function RepositoryManager() {
  const [documents, setDocuments] = useState<RepositoryUploadRecord[]>([]);
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState<File | null>(null);
  const [query, setQuery] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");

  useEffect(() => {
    listUploadedDocuments()
      .then(setDocuments)
      .catch((e) => setError(e instanceof Error ? e.message : "Unable to load repository documents."));
  }, []);

  const filteredDocuments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return documents;

    return documents.filter((document) =>
      [
        document.title,
        document.abstract,
        document.kind,
        document.workstream,
        document.sourceName,
        ...document.authors,
        ...document.topics,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [documents, query]);

  const publicCount = documents.filter((document) => document.visibility === "public").length;
  const privateCount = documents.length - publicCount;
  const totalSize = documents.reduce((sum, document) => sum + (document.fileSize ?? 0), 0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSaved("");

    if (!file) {
      setError("Choose a document before saving.");
      return;
    }

    if (!form.title.trim()) {
      setError("Add a title before saving.");
      return;
    }

    setSaving(true);

    try {
      const record = await saveUploadedDocument(
        {
          title: form.title.trim(),
          abstract: form.abstract.trim() || "Uploaded repository document.",
          kind: form.kind,
          workstream: form.workstream,
          authors: splitList(form.authors),
          topics: splitList(form.topics),
          publishedAt: form.publishedAt,
          sourceName: form.sourceName.trim() || "Uploaded file",
          sourceUrl: form.sourceUrl.trim() || undefined,
          visibility: form.visibility,
        },
        file,
      );

      setDocuments((current) => [record, ...current]);
      setForm({ ...initialForm, publishedAt: today() });
      setFile(null);
      setSaved(`${record.title} saved to the repository.`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to save this document.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setError("");
    setSaved("");

    try {
      await deleteUploadedDocument(id);
      setDocuments((current) => current.filter((document) => document.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to delete this document.");
    }
  }

  function openUploadedFile(document: RepositoryUploadRecord) {
    const url = URL.createObjectURL(document.file);
    window.open(url, "_blank", "noopener,noreferrer");
    window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
  }

  return (
    <div>
      <div className="dash-page-header">
        <h1 className="dash-page-title">Document repository</h1>
        <p className="dash-page-sub">Upload articles, papers, specifications, and source documents.</p>
      </div>

      {error ? <div className="dash-error">{error}</div> : null}
      {saved ? <div className="dash-success">{saved}</div> : null}

      <div className="dash-stat-grid">
        <div className="dash-stat">
          <div className="dash-stat-value blue">{documents.length}</div>
          <div className="dash-stat-label">Local documents</div>
        </div>
        <div className="dash-stat">
          <div className="dash-stat-value green">{publicCount}</div>
          <div className="dash-stat-label">Public</div>
        </div>
        <div className="dash-stat">
          <div className="dash-stat-value amber">{privateCount}</div>
          <div className="dash-stat-label">Private</div>
        </div>
        <div className="dash-stat">
          <div className="dash-stat-value">{formatFileSize(totalSize)}</div>
          <div className="dash-stat-label">Stored size</div>
        </div>
      </div>

      <div className="dash-repository-layout">
        <form className="dash-panel dash-repository-form" onSubmit={handleSubmit}>
          <div>
            <p className="dash-section-title">New document</p>
            <label className="dash-field">
              <span>File</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt,.md,.rtf,.csv,.xlsx,.ppt,.pptx,application/pdf"
                onChange={(event) => {
                  const selectedFile = event.target.files?.[0] ?? null;
                  setFile(selectedFile);

                  if (selectedFile && !form.title) {
                    setForm((current) => ({ ...current, title: cleanFileTitle(selectedFile.name) }));
                  }
                }}
              />
            </label>
            {file ? (
              <p className="dash-file-note">
                {file.name} - {formatFileSize(file.size)}
              </p>
            ) : null}
          </div>

          <label className="dash-field">
            <span>Title</span>
            <input
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              placeholder="Document title"
            />
          </label>

          <label className="dash-field">
            <span>Abstract</span>
            <textarea
              value={form.abstract}
              onChange={(event) => setForm({ ...form, abstract: event.target.value })}
              placeholder="Brief summary for scanning and search"
              rows={4}
            />
          </label>

          <div className="dash-form-grid">
            <label className="dash-field">
              <span>Type</span>
              <select
                value={form.kind}
                onChange={(event) => setForm({ ...form, kind: event.target.value as RepositoryDocumentKind })}
              >
                {DOCUMENT_KIND_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>

            <label className="dash-field">
              <span>Workstream</span>
              <select
                value={form.workstream}
                onChange={(event) => setForm({ ...form, workstream: event.target.value as RepositoryWorkstream })}
              >
                {REPOSITORY_WORKSTREAM_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="dash-form-grid">
            <label className="dash-field">
              <span>Authors</span>
              <input
                value={form.authors}
                onChange={(event) => setForm({ ...form, authors: event.target.value })}
                placeholder="Comma-separated names"
              />
            </label>

            <label className="dash-field">
              <span>Topics</span>
              <input
                value={form.topics}
                onChange={(event) => setForm({ ...form, topics: event.target.value })}
                placeholder="Comma-separated topics"
              />
            </label>
          </div>

          <div className="dash-form-grid">
            <label className="dash-field">
              <span>Publication date</span>
              <input
                value={form.publishedAt}
                onChange={(event) => setForm({ ...form, publishedAt: event.target.value })}
                type="date"
              />
            </label>

            <label className="dash-field">
              <span>Visibility</span>
              <select
                value={form.visibility}
                onChange={(event) => setForm({ ...form, visibility: event.target.value as RepositoryVisibility })}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </label>
          </div>

          <div className="dash-form-grid">
            <label className="dash-field">
              <span>Source label</span>
              <input
                value={form.sourceName}
                onChange={(event) => setForm({ ...form, sourceName: event.target.value })}
                placeholder="Uploaded file, Zenodo, ORCID"
              />
            </label>

            <label className="dash-field">
              <span>Source URL</span>
              <input
                value={form.sourceUrl}
                onChange={(event) => setForm({ ...form, sourceUrl: event.target.value })}
                placeholder="Optional DOI or canonical link"
                type="url"
              />
            </label>
          </div>

          <button className="btn btn-blue" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save document"}
          </button>
        </form>

        <section className="dash-panel">
          <div className="dash-repository-list-header">
            <p className="dash-section-title">Uploaded documents</p>
            <input
              className="dash-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search repository"
              type="search"
            />
          </div>

          {filteredDocuments.length === 0 ? (
            <div className="dash-empty">No uploaded documents yet.</div>
          ) : (
            <div className="dash-document-list">
              {filteredDocuments.map((document) => (
                <article className="dash-document-item" key={document.id}>
                  <div>
                    <div className="dash-document-meta">
                      <span>{document.kind}</span>
                      <span>{document.workstream}</span>
                      <span>{formatDate(document.publishedAt)}</span>
                    </div>
                    <h2>{document.title}</h2>
                    <p>{document.abstract}</p>
                    <div className="dash-document-tags">
                      {document.topics.map((topic) => (
                        <span className="badge badge-gray" key={topic}>
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="dash-document-actions">
                    <span className={`badge ${document.visibility === "public" ? "badge-green" : "badge-amber"}`}>
                      {document.visibility}
                    </span>
                    <button className="btn btn-ghost" type="button" onClick={() => openUploadedFile(document)}>
                      Open
                    </button>
                    <button className="btn btn-red" type="button" onClick={() => handleDelete(document.id)}>
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
