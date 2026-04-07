export type OverviewTile = {
  href: string
  title: string
  subtitle: string
  CTA?: string
}

export const OVERVIEW_TILES: OverviewTile[] = [
  { href: "/case-studies", title: "Case Studies", subtitle: "Real deployments and outcomes", CTA: "View all" },
  { href: "/research", title: "Research", subtitle: "Publications and insights", CTA: "View all" },
  { href: "/bagel", title: "Bagel Easter Egg", subtitle: "A playful interactive experience", CTA: "Enter" },
]
