# BagelTech Website

Company website built with Next.js.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Publish an article

1. Create a new file in `content/articles/<slug>.md`.
2. Add frontmatter:

```md
---
title: "Your title"
date: "YYYY-MM-DD"
summary: "One sentence summary"
author: "Your name"
---
```

3. Write markdown content below.
4. Article appears automatically at `/insights` and `/insights/<slug>`.

## Bagel's Corner content

Add playful notes to `content/bagel-notes/<slug>.md` with this frontmatter:

```md
---
title: "Note title"
date: "YYYY-MM-DD"
summary: "Short summary"
---
```

They are automatically listed at `/bagels-corner` and available at `/bagels-corner/notes/<slug>`.
