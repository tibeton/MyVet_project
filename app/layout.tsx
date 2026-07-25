import "./globals.css";
import "@astryxdesign/core/astryx.css";

// Root pass-through. The real <html>/<body> live in app/[locale]/layout.tsx so
// the `lang` attribute follows the active locale (ru / uz / en).
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
