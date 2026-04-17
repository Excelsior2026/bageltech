export type OverviewTile = {
  href: string
  title: string
  subtitle: string
  CTA?: string
}

export const OVERVIEW_TILES: OverviewTile[] = [
  { href: "/case-studies", title: "Case Studies", subtitle: "Real deployments and outcomes", CTA: "View all" },
  { href: "/publications", title: "Publications", subtitle: "Formal papers and frameworks", CTA: "View all" },
  { href: "/bmo", title: "BMO", subtitle: "Beagle Mischief Office", CTA: "Enter" },
]
