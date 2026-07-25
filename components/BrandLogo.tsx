/* eslint-disable @next/next/no-img-element */

// The brand logo is a multi-path SVG, so we render it as an <img> rather than
// inlining it. Variants: horizontal / vertical wordmarks, and the compact
// "mark" (Logo.svg) used in the site header.
export default function BrandLogo({
  className,
  variant = "horizontal",
}: {
  className?: string;
  variant?: "horizontal" | "vertical" | "mark";
}) {
  const src =
    variant === "vertical"
      ? "/Logo_vertical.svg"
      : variant === "mark"
        ? "/Logo.svg"
        : "/Logo_horizontal.svg";
  return <img src={src} alt="MyVet" className={className} draggable={false} />;
}
