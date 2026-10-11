import { redirect } from "next/navigation";

/**
 * Publications moved under the BDB Labs namespace. This stub keeps the
 * original inbound URL working.
 */
export default function LegacyPublicationsPage() {
  redirect("/bdb-labs/publications");
}
