import { permanentRedirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n";

// Permanent (308) redirect so search engines consolidate on /ru.
export default function RootPage() {
  permanentRedirect(`/${defaultLocale}`);
}
