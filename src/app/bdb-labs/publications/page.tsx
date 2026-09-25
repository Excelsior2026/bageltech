import { permanentRedirect } from "next/navigation";

// The research page is the full BDB Labs publication index.
export default function PublicationsPage() {
  permanentRedirect("/bdb-labs/research");
}
