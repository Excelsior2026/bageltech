import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
const exists = (path) => existsSync(join(root, path));

function sourceFiles(dir, extensions) {
  const found = [];
  for (const entry of readdirSync(join(root, dir), { withFileTypes: true })) {
    const relativePath = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      found.push(...sourceFiles(relativePath, extensions));
    } else if (extensions.some((extension) => entry.name.endsWith(extension))) {
      found.push(relativePath);
    }
  }
  return found;
}

/** Resolve an App Router file path, including route groups and dynamic segments. */
function hasRoute(dir, segments, depth = 0) {
  if (depth > 12) return false;
  const entries = readdirSync(join(root, dir), { withFileTypes: true });

  if (segments.length === 0) {
    if (exists(join(dir, "page.tsx")) || exists(join(dir, "route.ts"))) return true;
    return entries.some(
      (entry) =>
        entry.isDirectory() &&
        entry.name.startsWith("(") &&
        entry.name.endsWith(")") &&
        hasRoute(`${dir}/${entry.name}`, segments, depth + 1),
    );
  }

  const [segment, ...rest] = segments;
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    const child = `${dir}/${name}`;

    // Route groups do not consume a URL segment.
    if (name.startsWith("(") && name.endsWith(")")) {
      if (hasRoute(child, segments, depth + 1)) return true;
      continue;
    }

    if (name === segment || (name.startsWith("[") && name.endsWith("]"))) {
      if (hasRoute(child, rest, depth + 1)) return true;
    }
  }
  return false;
}

function routeExists(href) {
  const pathname = href.split(/[?#]/, 1)[0];
  if (!pathname.startsWith("/")) return true;
  return hasRoute("src/app", pathname.split("/").filter(Boolean));
}

function frontmatterField(raw, key) {
  return raw.match(new RegExp(`^${key}:\\s*"([^"]+)"`, "m"))?.[1];
}

function articleSources() {
  const dir = join(root, "content", "articles");
  return readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = readFileSync(join(dir, file), "utf8");
      const derived = file
        .replace(/\.md$/, "")
        .replace(/^\d+[_-]/, "")
        .replace(/_/g, "-")
        .toLowerCase();

      return {
        file,
        raw,
        slug: frontmatterField(raw, "slug") ?? derived,
        status: frontmatterField(raw, "status") ?? "published",
      };
    });
}

test("one frontmatter registry drives every published article", () => {
  const sources = articleSources();
  const published = sources.filter((source) => source.status === "published");
  const drafts = sources.filter((source) => source.status === "draft");

  assert.equal(sources.length, 13, "all article files should be accounted for");
  assert.equal(published.length, 12, "the published index should contain twelve articles");
  assert.deepEqual(
    drafts.map((source) => source.file),
    ["governance-at-execution.md"],
    "the unapproved orphan article must be explicitly excluded",
  );

  const slugs = published.map((source) => source.slug);
  assert.equal(new Set(slugs).size, slugs.length, "published slugs must be unique");

  for (const source of published) {
    assert.match(source.slug, /^[a-z0-9-]+$/, `${source.file} needs a URL-safe canonical slug`);
    for (const field of ["title", "date", "summary", "author", "category", "excerpt"]) {
      assert.ok(frontmatterField(source.raw, field), `${source.file} should declare ${field}`);
    }
    assert.ok(frontmatterField(source.raw, "tags"), `${source.file} should declare tags`);
    assert.ok(
      ["BDB Labs", "BagelTech", "Bagelle Parris Vargas"].includes(frontmatterField(source.raw, "workstream")),
      `${source.file} should declare a valid workstream`,
    );
  }

  const articles = read("src/lib/articles.ts");
  const writing = read("src/content/writing.ts");
  assert.match(articles, /filter\(\(article\) => article\.status === "published"\)/);
  assert.match(writing, /getAllArticles\(\)/);
  assert.doesNotMatch(writing, /"\/writing\//);
});

test("alias article URLs are redirected to canonical frontmatter slugs", () => {
  const loader = read("src/lib/articles.ts");
  const route = read("src/app/insights/[slug]/page.tsx");
  const proxy = read("src/proxy.ts");

  assert.match(loader, /export function canonicalSlug/);
  assert.match(loader, /export function derivedSlug/);
  assert.match(loader, /export function legacySlug/);
  assert.match(loader, /getCanonicalSlug/, "route should resolve aliases to a canonical slug");

  assert.match(route, /getCanonicalSlug\(slug\)/);
  assert.match(route, /if \(canonical !== slug\) permanentRedirect\(`\/insights\/\$\{canonical\}`\)/);
  assert.match(route, /alternates: \{ canonical \}/);
  assert.match(route, /application\/ld\+json/);

  assert.match(proxy, /"\/writing": "\/insights"/);
  assert.match(proxy, /\["\/writing\/", "\/insights\/"\]/);
  assert.match(proxy, /NextResponse\.redirect\(buildTarget\(exact\), 308\)/);
  assert.equal(exists("src/app/middleware.ts"), false, "Next.js 16 must not use app/middleware.ts");
});

test("every literal internal link and redirect target resolves to a real route", () => {
  const files = [
    ...sourceFiles("src/app", [".tsx"]),
    ...sourceFiles("src/components", [".tsx"]),
    ...sourceFiles("src/content", [".ts"]),
  ];

  const targets = new Set();
  for (const file of files) {
    const source = read(file);
    for (const match of source.matchAll(/\b(?:href|sourceUrl)\s*[=:]\s*["']([^"']+)["']/g)) {
      targets.add(match[1]);
    }
    for (const match of source.matchAll(/\b(?:permanentRedirect|redirect)\(\s*["']([^"']+)["']\s*\)/g)) {
      targets.add(match[1]);
    }
  }

  const internal = [...targets].filter((href) => href.startsWith("/") && !href.includes("${"));
  assert.ok(internal.length > 10, "the site should declare a meaningful internal link set");

  for (const href of internal) {
    assert.ok(routeExists(href), `${href} should resolve to a page or route handler`);
  }

  assert.ok(!internal.includes("/writing"), "public source must not link through the retired /writing path");
});

test("legacy redirect stubs point directly at canonical destinations", () => {
  assert.match(read("src/app/bdb-labs/repository/page.tsx"), /permanentRedirect\("\/insights"\)/);
  assert.match(read("src/app/bpv/case-studies/page.tsx"), /permanentRedirect\("\/bpv\/advisory"\)/);
});

test("sitemap contains only indexable public routes", () => {
  const sitemap = read("src/app/sitemap.ts");
  const block = sitemap.slice(
    sitemap.indexOf("const STATIC_PAGES"),
    sitemap.indexOf("export default function sitemap"),
  );
  const paths = [...block.matchAll(/path:\s*"([^"]+)"/g)].map((match) => match[1]);

  assert.match(sitemap, /const SITE_URL = "https:\/\/www\.bageltech\.net"/);
  assert.match(sitemap, /getAllArticles\(\)/, "published articles should be generated from frontmatter");
  assert.match(sitemap, /getAllBagelNotes\(\)/, "published notes should be generated from their registry");

  for (const path of [
    "/",
    "/about",
    "/products",
    "/insights",
    "/contact",
    "/bdb-labs/research",
    "/bdb-labs/publications",
    "/bpv/advisory",
    "/contractors",
    "/bagels-corner",
    "/bmo",
  ]) {
    assert.ok(paths.includes(path), `${path} should be in the sitemap`);
    assert.ok(routeExists(path), `${path} should also resolve to a route`);
  }

  for (const path of ["/privacy", "/terms", "/security", "/accessibility", "/get-started", "/dashboard", "/writing"]) {
    assert.ok(!sitemap.includes(`path: "${path}"`), `${path} must not be in the sitemap`);
  }
});

test("robots excludes private surfaces and advertises the sitemap", () => {
  const robots = read("src/app/robots.ts");
  assert.match(robots, /allow: "\/"/);
  assert.match(robots, /sitemap: `\$\{SITE_URL\}\/sitemap\.xml`/);

  for (const path of [
    "/api/",
    "/dashboard",
    "/dashboard/",
    "/get-started",
    "/contractors/privacy",
    "/contractors/terms",
  ]) {
    assert.ok(robots.includes(`"${path}"`), `${path} should be disallowed`);
  }

  // Footer-linked placeholders must stay crawlable so their noindex can be read.
  for (const path of ["/privacy", "/terms", "/security", "/accessibility"]) {
    assert.ok(!robots.includes(`"${path}"`), `${path} should not be disallowed`);
  }
});

test("indexable routes declare canonical URLs and titles are not double branded", () => {
  const layout = read("src/app/layout.tsx");
  assert.match(layout, /metadataBase: new URL\("https:\/\/www\.bageltech\.net"\)/);
  assert.doesNotMatch(layout, /canonical:/, "root layout must not leak a canonical to pages without one");

  const staticCanonicals = [
    ["src/app/page.tsx", "/"],
    ["src/app/about/page.tsx", "/about"],
    ["src/app/products/page.tsx", "/products"],
    ["src/app/insights/page.tsx", "/insights"],
    ["src/app/contact/page.tsx", "/contact"],
    ["src/app/bdb-labs/research/page.tsx", "/bdb-labs/research"],
    ["src/app/bdb-labs/publications/page.tsx", "/bdb-labs/publications"],
    ["src/app/bpv/advisory/page.tsx", "/bpv/advisory"],
    ["src/app/contractors/page.tsx", "/contractors"],
    ["src/app/bagels-corner/page.tsx", "/bagels-corner"],
    ["src/app/bmo/page.tsx", "/bmo"],
  ];

  for (const [file, path] of staticCanonicals) {
    assert.ok(read(file).includes(`canonical: "${path}"`), `${file} should declare canonical ${path}`);
  }

  assert.match(
    read("src/app/page.tsx"),
    /title:\s*\{\s*absolute:\s*"BagelTech \| Technology & Intelligence"\s*\}/,
    "homepage title must include the brand without relying on a same-segment template",
  );

  for (const [file, title] of [
    ["src/app/bdb-labs/research/page.tsx", "Research | BDB Labs | BagelTech"],
    ["src/app/bdb-labs/publications/page.tsx", "Publications | BDB Labs | BagelTech"],
    ["src/app/bpv/advisory/page.tsx", "Advisory | Bagelle Parris Vargas | BagelTech"],
  ]) {
    const source = read(file);
    assert.ok(source.includes(`title: { absolute: "${title}" }`), `${file} should use an absolute branded title`);
    assert.ok(source.includes(`title: "${title}"`), `${file} should make og:title match the rendered title`);
  }

  assert.match(read("src/app/insights/[slug]/page.tsx"), /const canonical = `\/insights\/\$\{article\.slug\}`/);
  assert.match(read("src/app/insights/[slug]/page.tsx"), /alternates: \{ canonical \}/);
  assert.match(
    read("src/app/bagels-corner/notes/[slug]/page.tsx"),
    /const canonical = `\/bagels-corner\/notes\/\$\{note\.slug\}`/,
  );

  for (const file of [
    ...sourceFiles("src/app", [".tsx"]),
    ...sourceFiles("src/components", [".tsx"]),
    ...sourceFiles("src/content", [".ts"]),
  ]) {
    const source = read(file);
    for (const match of source.matchAll(/\btitle:\s*(["'])([^"']*\| BagelTech)\1/g)) {
      const [, quote, title] = match;
      assert.ok(
        source.includes(`title: { absolute: ${quote}${title}${quote} }`),
        `${file} should only use the branded title "${title}" as an absolute page title`,
      );
    }
  }
});

test("private and draft surfaces are noindex", () => {
  const noindexSources = [
    "src/app/dashboard/layout.tsx",
    "src/app/get-started/page.tsx",
    "src/app/contractors/privacy/page.tsx",
    "src/app/contractors/terms/page.tsx",
    "src/app/privacy/page.tsx",
    "src/app/terms/page.tsx",
    "src/app/security/page.tsx",
    "src/app/accessibility/page.tsx",
  ];

  for (const file of noindexSources) {
    assert.match(read(file), /index:\s*false/, `${file} should be noindex`);
  }
});

test("site-wide legal destinations are honest placeholders", () => {
  const footer = read("src/components/Footer.tsx");
  const pairs = [...footer.matchAll(/<Link href="([^"]+)">([^<]+)<\/Link>/g)].map((match) => ({
    href: match[1],
    label: match[2].trim(),
  }));

  for (const [href, label] of [
    ["/privacy", "Privacy Policy"],
    ["/terms", "Terms of Use"],
    ["/security", "Security"],
    ["/accessibility", "Accessibility"],
  ]) {
    assert.ok(
      pairs.some((pair) => pair.href === href && pair.label === label),
      `footer should map ${label} to ${href}`,
    );
  }

  assert.doesNotMatch(footer, /Careers|Press|https:\/\/x\.com|\/contractors\/privacy|\/contractors\/terms/);

  for (const route of ["/privacy", "/terms", "/security", "/accessibility"]) {
    const file = `src/app${route}/page.tsx`;
    assert.equal(exists(file), true, `${route} should exist`);
    assert.match(read(file), /LegalPlaceholder/, `${route} should use the review shell`);
  }
  assert.match(
    read("src/components/LegalPlaceholder.tsx"),
    /Requires human and legal review before publication/,
  );
});

test("product registry uses controlled maturity and consistent public fields", () => {
  const site = read("src/content/site.ts");
  const union = site.match(/export type ProductMaturity =\s*([\s\S]*?);/)?.[1] ?? "";
  for (const value of [
    "research",
    "prototype",
    "active-development",
    "pilot",
    "limited-availability",
    "commercially-available",
  ]) {
    assert.ok(union.includes(`"${value}"`), `maturity vocabulary should include ${value}`);
  }

  const start = site.indexOf("export const PRODUCTS");
  const end = site.indexOf("/** A short, scannable subset");
  const products = site.slice(start, end);
  const values = (key) => [...products.matchAll(new RegExp(`\\b${key}:\\s*"([^"]+)"`, "g"))].map((m) => m[1]);

  for (const key of ["id", "slug", "name", "statusLabel", "maturity"]) {
    assert.equal(values(key).length, 6, `${key} should be declared once for each product`);
  }
  for (const key of ["id", "slug", "name"]) {
    const found = values(key);
    assert.equal(new Set(found).size, found.length, `${key} values should be unique`);
  }

  assert.doesNotMatch(products, /Intelligent Contract Management/);
  assert.doesNotMatch(products, /commercially-available/, "no product should claim general availability without approval");

  const eleanorStart = products.indexOf('id: "eleanor"');
  const eleanorEnd = products.indexOf('id: "cogniscribe"');
  const eleanor = products.slice(eleanorStart, eleanorEnd);
  assert.match(eleanor, /maturity: "research"/);
  assert.match(eleanor, /not a separately marketed commercial product/);

  const featured = site.match(/FEATURED_PRODUCTS = \[([^\]]+)\]/)?.[1] ?? "";
  for (const id of [...featured.matchAll(/"([^"]+)"/g)].map((m) => m[1])) {
    assert.ok(values("id").includes(id), `featured product ${id} should exist in the registry`);
  }

  const home = read("src/app/page.tsx");
  assert.match(home, /FEATURED_PRODUCTS/);
  assert.match(home, /product\.id === id/, "featured products must resolve by stable id, not slug");
  assert.match(home, /featured\.length !== FEATURED_PRODUCTS\.length/, "featured ids must fail loudly");
  assert.match(home, /product\.engagement\.href/, "product destinations must use the engagement field");
  assert.doesNotMatch(home, /product\.href/);
  assert.match(read("src/app/products/page.tsx"), /product\.limitations/);
  assert.match(read("src/app/products/page.tsx"), /product\.engagement\.href/);
});

test("homepage and shared chrome preserve the deployed visual design", () => {
  const home = read("src/app/page.tsx");
  for (const signature of [
    "heroCopy",
    "diagramWrap",
    "triptych",
    "productsStrip",
    "cardsGrid",
    "insightsSide",
  ]) {
    assert.ok(home.includes(signature), `homepage should keep the live ${signature} section`);
  }
  for (const removed of ["heroActions", "divisionsSection", "proofRow", "ctaSection"]) {
    assert.ok(!home.includes(removed), `homepage should not reintroduce ${removed} from the replaced design`);
  }

  const homeCss = read("src/app/home.module.css");
  assert.match(homeCss, /grid-template-columns:\s*1\.05fr 1\.22fr/);
  assert.match(homeCss, /grid-template-columns:\s*210px 1fr 285px/);

  const globals = read("src/app/globals.css");
  assert.match(globals, /--background:\s*#FFFEF7/);
  assert.match(globals, /--accent:\s*#8A1E33/);

  const header = read("src/components/Header.tsx");
  assert.match(header, /\/brand\/bageltech\/lockup-light\.svg/);
  assert.match(read("src/components/Header.module.css"), /\.logoImg/);

  const footerCss = read("src/components/Footer.module.css");
  assert.match(footerCss, /grid-template-columns:\s*1\.35fr 0\.75fr 0\.75fr 0\.75fr 1fr/);
  assert.ok(!footerCss.includes("pawRow"), "footer should keep the deployed layout, without the later paw row");
});

test("proxy matcher covers every legacy redirect", () => {
  const proxy = read("src/proxy.ts");
  const table = proxy.slice(proxy.indexOf("const LEGACY_REDIRECTS"), proxy.indexOf("/** Prefix rewrites"));
  const matcher = proxy.slice(proxy.indexOf("matcher:"));

  for (const [from, to] of [
    ["/research", "/bdb-labs/research"],
    ["/publications", "/bdb-labs/publications"],
    ["/repository", "/insights"],
    ["/advisory", "/bpv/advisory"],
    ["/case-studies", "/bpv/advisory"],
    ["/writing", "/insights"],
  ]) {
    assert.ok(table.includes(`"${from}": "${to}"`), `${from} should redirect to ${to}`);
    assert.ok(matcher.includes(`"${from}"`), `matcher should include ${from}`);
  }
  assert.ok(matcher.includes('"/writing/:path*"'), "matcher should include legacy article paths");
});
