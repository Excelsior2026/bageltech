import styles from "./BrandMark.module.css";
import { brandNames, type BrandKey } from "@/content/brand-tokens";

type BrandMarkVariant = "light" | "dark" | "icon" | "icon-dark";
type BrandMarkSize = "header" | "compact" | "hero" | "footer";

interface BrandMarkProps {
  brand: BrandKey;
  variant?: BrandMarkVariant;
  size?: BrandMarkSize;
  className?: string;
  priority?: boolean;
}

const brandSrc: Record<BrandKey, Record<BrandMarkVariant, string>> = {
  bageltech: {
    light: "/brand/bageltech/lockup-light.svg",
    dark: "/brand/bageltech/lockup-dark.svg",
    icon: "/brand/bageltech/icon.svg",
    "icon-dark": "/brand/bageltech/icon-dark.svg",
  },
  "bdb-labs": {
    light: "/brand/bdb-labs/lockup-light.svg",
    dark: "/brand/bdb-labs/lockup-dark.svg",
    icon: "/brand/bdb-labs/icon.svg",
    "icon-dark": "/brand/bdb-labs/icon-dark.svg",
  },
  bpv: {
    light: "/brand/bpv/lockup-light.svg",
    dark: "/brand/bpv/lockup-dark.svg",
    icon: "/brand/bpv/icon.svg",
    "icon-dark": "/brand/bpv/icon-dark.svg",
  },
};

export default function BrandMark({
  brand,
  variant = "light",
  size = "compact",
  className = "",
  priority = false,
}: BrandMarkProps) {
  const src = brandSrc[brand][variant];
  const alt = brandNames[brand];
  const variantClass = variant === "icon-dark" ? styles.icon : styles[variant];
  const classes = [styles.mark, styles[size], variantClass, className].filter(Boolean).join(" ");

  return (
    <span className={classes} data-brand={brand} data-variant={variant}>
      <img
        src={src}
        alt={alt}
        className={styles.img}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
      />
    </span>
  );
}
