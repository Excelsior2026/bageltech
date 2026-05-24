import type { RepositoryDocument } from "@/content/document-repository";

const DB_NAME = "bageltech-document-repository";
const DB_VERSION = 1;
const STORE_NAME = "documents";

export type RepositoryUploadRecord = RepositoryDocument & {
  file: Blob;
};

type RepositoryUploadInput = Omit<
  RepositoryDocument,
  "id" | "addedAt" | "origin" | "fileName" | "fileType" | "fileSize"
>;

function ensureIndexedDb() {
  if (typeof indexedDB === "undefined") {
    throw new Error("Document storage is not available in this browser.");
  }
}

function openDb(): Promise<IDBDatabase> {
  ensureIndexedDb();

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("visibility", "visibility", { unique: false });
        store.createIndex("workstream", "workstream", { unique: false });
        store.createIndex("kind", "kind", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Unable to open document storage."));
  });
}

async function withStore<T>(
  mode: IDBTransactionMode,
  callback: (store: IDBObjectStore) => IDBRequest<T> | void,
): Promise<T> {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, mode);
    const store = transaction.objectStore(STORE_NAME);
    const request = callback(store);
    let result: T | undefined;

    if (request) {
      request.onsuccess = () => {
        result = request.result;
      };
      request.onerror = () => reject(request.error ?? new Error("Document storage request failed."));
    }

    transaction.oncomplete = () => {
      db.close();
      resolve(result as T);
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error ?? new Error("Document storage transaction failed."));
    };
    transaction.onabort = () => {
      db.close();
      reject(transaction.error ?? new Error("Document storage transaction was aborted."));
    };
  });
}

export async function listUploadedDocuments(): Promise<RepositoryUploadRecord[]> {
  const documents = await withStore<RepositoryUploadRecord[]>("readonly", (store) => store.getAll());

  return documents.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
}

export async function saveUploadedDocument(
  input: RepositoryUploadInput,
  file: File,
): Promise<RepositoryUploadRecord> {
  const now = new Date().toISOString();
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? `upload-${crypto.randomUUID()}`
      : `upload-${Date.now()}`;

  const record: RepositoryUploadRecord = {
    ...input,
    id,
    addedAt: now,
    origin: "upload",
    fileName: file.name,
    fileType: file.type || "application/octet-stream",
    fileSize: file.size,
    file,
  };

  await withStore("readwrite", (store) => store.put(record));

  return record;
}

export async function deleteUploadedDocument(id: string): Promise<void> {
  await withStore("readwrite", (store) => store.delete(id));
}

export async function getUploadedDocument(id: string): Promise<RepositoryUploadRecord | undefined> {
  return withStore<RepositoryUploadRecord | undefined>("readonly", (store) => store.get(id));
}

export function formatFileSize(size?: number) {
  if (typeof size !== "number") return "External";

  if (size === 0) return "0 KB";

  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}
