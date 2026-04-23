export const brandTokens = {
  colors: {
    ink950: "#081426",
    ink900: "#0E223D",
    paper50: "#F7F5F1",
    paper100: "#EEEAE3",

    bagelGold: "#D4A94D",
    bagelGoldDark: "#A87B22",
    bagelTeal: "#25D6C8",
    bagelTealSoft: "#7FEAE1",
    bagelNavy: "#0A2747",

    labsViolet: "#A06BFF",
    labsPurple: "#8B4FE0",
    labsBlue: "#4D7CFF",
    labsLilac: "#D8C4FF",
    labsNavy: "#14254A",

    bpvGold: "#C9A45A",
    bpvIvory: "#F4F0E8",
    bpvNavy: "#0C1930",
    bpvCharcoal: "#213047",
  },
} as const;

export type BrandKey = "bageltech" | "bdb-labs" | "bpv";

export const brandNames: Record<BrandKey, string> = {
  bageltech: "BagelTech",
  "bdb-labs": "BDB Labs",
  bpv: "Bagelle Parris Vargas",
};
