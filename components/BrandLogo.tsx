/* eslint-disable @next/next/no-img-element */

// The brand logo is a multi-path CorelDRAW SVG, so we render it as an <img>
// rather than inlining it. Variant switches between horizontal / vertical.
export default function BrandLogo({
  className,
  variant = "horizontal",
}: {
  className?: string;
  variant?: "horizontal" | "vertical";
}) {
  const src =
    variant === "vertical" ? "/Logo_vertical.svg" : "/Logo_horizontal.svg";
  return <img src={src} alt="MyVet" className={className} draggable={false} />;
}
