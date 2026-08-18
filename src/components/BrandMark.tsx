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

const brandDetails: Record<BrandKey, { descriptor: string; monogram: string }> = {
  bageltech: {
    descriptor: "Governance and systems",
    monogram: "BT",
  },
  "bdb-labs": {
    descriptor: "Research",
    monogram: "BDB",
  },
  bpv: {
    descriptor: "Executive advisory",
    monogram: "BPV",
  },
};

export default function BrandMark({
  brand,
  variant = "light",
  size = "compact",
  className = "",
}: BrandMarkProps) {
  const details = brandDetails[brand];
  const classes = [styles.mark, styles[size], styles[variant], className].filter(Boolean).join(" ");

  return (
    <span className={classes} data-brand={brand} data-variant={variant}>
      {variant === "icon" ? (
        <span className={styles.monogram} aria-hidden="true">
          {details.monogram}
        </span>
      ) : (
        <>
          <span className={styles.name}>{brandNames[brand]}</span>
          <span className={styles.descriptor}>{details.descriptor}</span>
        </>
      )}
    </span>
  );
}
