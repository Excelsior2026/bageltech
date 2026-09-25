import { permanentRedirect } from "next/navigation";

export default function LegacyWritingPage() {
  permanentRedirect("/insights");
}
