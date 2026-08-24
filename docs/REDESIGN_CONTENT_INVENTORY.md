# Redesign Content Inventory

## Architecture Mapping

### BagelTech (Parent Company)
**Role:** Commercial front door, Products, Platforms, and general corporate identity.
- **Products:**
    - Electrical Contractor Platform (`/contractors`)
    - CogniScribe (Early access)
    - Contract Management Intelligence (Pilot)
- **Corporate:**
    - About (`/about`)
    - Contact (`/contact`)
    - Home (`/`)

### BDB Labs (R&D Arm)
**Role:** Research, incubation, foundations, AI governance, and prototypes.
- **Core R&D/Frameworks:**
    - ELEANOR (Governance Engine)
    - AIRA (AI-Induced Risk Audit)
    - Intelligence Pluralism (Doctrine)
    - Semantic Reward Collapse research
    - Routing Uncertainty research
- **Publications:**
    - All items in `src/content/publications.ts`
- **Research Page:**
    - `/research`
- **Publications Page:**
    - `/publications`

### Bagelle Parris Vargas (Services Arm)
**Role:** Executive advisory, modernization, and professional delivery.
- **Advisory Offers:**
    - Modernization and transformation oversight
    - ERP / PMO governance review
    - AI governance workshops
- **Services Page:**
    - `/advisory`
- **Professional Trail:**
    - Case Studies (`/case-studies`)

---

## Detailed Content Inventory

| Current Page | Current URL | Proposed Section | Proposed URL | Content Type | Owner | Recommendation | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Home | `/` | Corporate | `/` | Landing | BagelTech | Revise | New visual identity |
| About | `/about` | Corporate | `/about` | Info | BagelTech | Preserve | Update wording |
| Contact | `/contact` | Corporate | `/contact` | Form/Info | BagelTech | Preserve | |
| Products | `/products` | Products | `/products` | Catalog | BagelTech | Revise | Better integration |
| Contractor Platform | `/contractors` | Products | `/products/contractors` | Product | BagelTech | Preserve | Update URL |
| Research | `/research` | Research | `/bdb-labs/research` | Index | BDB Labs | Move | |
| Publications | `/publications` | Research | `/bdb-labs/publications` | Index | BDB Labs | Move | |
| Advisory | `/advisory` | Services | `/bpv/advisory` | Index | BPV | Move | |
| Case Studies | `/case-studies` | Services | `/bpv/case-studies` | Portfolio | BPV | Move | |
| Writing/Insights | `/writing/[slug]` | Insights | `/insights/[slug]` | Editorial | Mixed | Preserve | Categorize by owner |
| Repository | `/repository` | Research | `/bdb-labs/repository` | Archive | BDB Labs | Move | |
| BMO | `/bmo` | Other | `/bmo` | Easter Egg | BagelTech | Preserve | Keep as is |
| Dashboard | `/dashboard` | Internal | `/dashboard` | Tool | BagelTech | Preserve | Out of scope for redesign |

## Ambiguities
- **Case Studies:** Currently high-level. Need to confirm if some belong to BDB Labs (R&D success) or strictly BPV (Service delivery).
- **"Bagel's Corner" (`/bagels-corner`):** Not explicitly mapped. Likely personal notes/essays. Should stay under a personal or BDB Labs umbrella?
- **Repository:** Is this a technical codebase repository or a document repository? Mapping to BDB Labs for now.
