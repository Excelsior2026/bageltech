import { permanentRedirect } from "next/navigation";

export default function LegacyPublicationsPage() {
  permanentRedirect("/bdb-labs/research");
}
