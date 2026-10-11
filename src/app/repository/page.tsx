import { redirect } from "next/navigation";

/**
 * The document repository moved under the BDB Labs namespace. This stub keeps
 * the original inbound URL working.
 */
export default function LegacyRepositoryPage() {
  redirect("/bdb-labs/repository");
}
