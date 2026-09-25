import { permanentRedirect } from "next/navigation";

export default function LegacyAdvisoryPage() {
  permanentRedirect("/bpv/advisory");
}
