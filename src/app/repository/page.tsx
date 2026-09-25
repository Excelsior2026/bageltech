import { permanentRedirect } from "next/navigation";

export default function LegacyRepositoryPage() {
  permanentRedirect("/bdb-labs/repository");
}
