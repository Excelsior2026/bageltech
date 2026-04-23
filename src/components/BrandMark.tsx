import Image from "next/image";
import styles from "./BrandMark.module.css";
import { brandNames, type BrandKey } from "@/content/brand-tokens";

type BrandMarkVariant = "light" | "dark" | "icon";
type BrandMarkSize = "header" | "compact" | "hero" | "footer";

interface BrandMarkProps {
  brand: BrandKey;
  variant?: BrandMarkVariant;
  size?: BrandMarkSize;
  className?: string;
  priority?: boolean;
}

const dimensions: Record<BrandMarkVariant, { width: number; height: number }> = {
  light: { width: 360, height: 92 },
  dark: { width: 360, height: 92 },
  icon: { width: 92, height: 92 },
};

function fileForVariant(variant: BrandMarkVariant) {
  if (variant === "icon") return "icon.svg";
  return `lockup-${variant}.svg`;
}

export default function BrandMark({
  brand,
  variant = "light",
  size = "compact",
  className = "",
  priority = false,
}: BrandMarkProps) {
  const { width, height } = dimensions[variant];

  return (
    <span className={`${styles.mark} ${styles[size]} ${className}`} data-brand={brand} data-variant={variant}>
      <Image
        src={`/brand/${brand}/${fileForVariant(variant)}`}
        alt={`${brandNames[brand]} logo`}
        width={width}
        height={height}
        priority={priority}
      />
    </span>
  );
}
