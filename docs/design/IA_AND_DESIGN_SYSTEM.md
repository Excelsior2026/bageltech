# BagelTech IA & Design System

## 1. Information Architecture (IA)

The navigation focuses on the company entity and its capabilities rather than individual project silos.

### Primary Navigation Map
- **BagelTech** (Home `/`) $\rightarrow$ Parent Company, Vision, High-level Architecture.
- **Research** (`/bdb-labs`) $\rightarrow$ BDB Labs: R&D, Foundations, Publications, Prototypes.
- **Services** (`/bpv`) $\rightarrow$ Bagelle Parris Vargas: Advisory, Delivery, Case Studies.
- **Systems** (`/products`) $\rightarrow$ Commercial evidence, Applied platforms.
- **Writing** (`/insights`) $\rightarrow$ Index of all intellectual work (Essays, Insights, Reports).
- **About** (`/about`) $\rightarrow$ Corporate identity and team.

### Homepage Sequence (The "Narrative Flow")
1. **Hero:** Intellectual identity statement.
2. **The Architecture:** 3-column/grid visualization of BagelTech $\rightarrow$ BDB Labs $\rightarrow$ BPV.
3. **Capability Evidence (What We Build):** Curated groupings of systems (AI Governance, Enterprise Systems, etc.).
4. **Intellectual Engine (Research/Ideas):** Featured work from BDB Labs (ELEANOR, AIRA).
5. **The Archive (Writing):** Latest intellectual outputs.
6. **Global Footer:** Architecture reinforcement & legal.

---

## 2. Design System (Lightweight / Editorial)

The aesthetic is "Technical Intellectualism": high contrast, generous white space, precise borders, and restrained color use.

### Visual Principles
- **Confidence through Restraint:** No gradients, no generic shadows, no rounded-corner "pills" unless functional.
- **Editorial Grid:** Use of borders (1px) to separate sections rather than background color shifts.
- **Typography:** 
    - *Headings:* Sophisticated Serif or High-Contrast Sans (e.g., Inter/Georgia mix) for authority.
    - *Body:* Monospace for technical details; clean Sans for reading.

### Color Palette (derived from brand-tokens.ts)
- **Base:** `paper50` (#F7F5F1) as primary background; `ink950` (#081426) as primary text.
- **Accents:** 
    - **BagelTech:** `bagelGold` (#D4A94D) - Used sparingly for primary highlights.
    - **BDB Labs:** `labsPurple` (#8B4FE0) - For R&D markers.
    - **BPV:** `bpvGold` (#C9A45A) - For advisory markers.
- **Borders:** `paper100` (#EEEAE3) or thin `ink900` for structure.

### Components
- **The "Architecture Card":** A stark, bordered box with a small brand icon, a clear role (e.g., "Research & Development"), and a concise summary.
- **The "Evidence Tile":** A technical grid item. No images unless they are diagrams/screenshots. Focused on *Problem* $\rightarrow$ *Approach*.
- **The "Writing Entry":** An editorial list item: `Date | Category | Title | Excerpt`. High density, minimal ornament.

---

## 3. Curated Capability Groupings (What We Build)

Based on repository content, we group evidence into these "Capability Pillars":

| Pillar | Evidence / Projects |
| :--- | :--- |
| **AI Governance & Alignment** | ELEANOR, Constitutional AI, Jurisprudential Governance |
| **AI Safety & Evaluation** | AIRA (Risk Audit), Semantic Reward Collapse, Routing Uncertainty |
| **Enterprise Systems** | Electrical Contractor Platform, Contract Management Intelligence |
| **Modernization & Delivery** | ERP/PMO Oversight, Transformation Advisory |
| **Applied Technology** | CogniScribe |
