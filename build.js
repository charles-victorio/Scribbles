import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parse } from "smol-toml";
import { marked } from "marked";

const ROOT = import.meta.dirname;
const DIST = join(ROOT, "dist");

const { project: projects = [] } = parse(readFileSync(join(ROOT, "scribbles.toml"), "utf8"));

// top-level routes the site already uses — a project slug can't shadow these,
// since local projects get rewritten to live at "/<slug>" (see _redirects below)
const RESERVED_SLUGS = new Set(["writeups", "thumbnails", "projects", "style.css", "index.html"]);

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
mkdirSync(join(DIST, "writeups"), { recursive: true });
mkdirSync(join(DIST, "thumbnails"), { recursive: true });
cpSync(join(ROOT, "style.css"), join(DIST, "style.css"));

const page = (title, body) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<link rel="stylesheet" href="/style.css">
</head>
<body>
${body}
</body>
</html>
`;

const redirects = [];

for (const p of projects) {
  if (!p.slug || !p.name || !p.description) {
    throw new Error(`project missing slug/name/description: ${JSON.stringify(p)}`);
  }
  if (RESERVED_SLUGS.has(p.slug)) {
    throw new Error(`slug "${p.slug}" collides with a reserved top-level route: ${[...RESERVED_SLUGS].join(", ")}`);
  }

  const thumb = join(ROOT, "thumbnails", `${p.slug}.webp`);
  if (existsSync(thumb)) {
    cpSync(thumb, join(DIST, "thumbnails", `${p.slug}.webp`));
  } else {
    console.warn(`[build] no thumbnail for "${p.slug}" (expected thumbnails/${p.slug}.webp)`);
  }

  const writeupSrc = join(ROOT, "writeups", `${p.slug}.md`);
  p.hasWriteup = existsSync(writeupSrc);
  if (p.hasWriteup) {
    const html = marked.parse(readFileSync(writeupSrc, "utf8"));
    writeFileSync(
      join(DIST, "writeups", `${p.slug}.html`),
      page(p.name, `<main class="writeup"><a class="back" href="/">&larr; scribbles</a>${html}</main>`)
    );
  } else {
    console.warn(`[build] no writeup for "${p.slug}" (expected writeups/${p.slug}.md)`);
  }

  if (!p.url) {
    const projectSrc = join(ROOT, "projects", p.slug);
    if (existsSync(projectSrc)) {
      cpSync(projectSrc, join(DIST, "projects", p.slug), { recursive: true });
      // both the page itself and any relative asset it loads (css/js/video/images)
      // need a rewrite, since the browser resolves those against the visible "/<slug>/" URL
      redirects.push(`/${p.slug} /projects/${p.slug}/ 200`);
      redirects.push(`/${p.slug}/* /projects/${p.slug}/:splat 200`);
    } else {
      console.warn(`[build] no url and no local project for "${p.slug}" (expected projects/${p.slug}/index.html)`);
    }
  }
}

// clean URLs: "/<slug>" rewrites (not redirects — the address bar keeps "/<slug>")
// to the actual file under /projects/<slug>/, so the source tree stays centralized
// while the public URL stays flat. https://developers.cloudflare.com/pages/configuration/redirects/
writeFileSync(join(DIST, "_redirects"), redirects.join("\n") + "\n");

const card = (p) => {
  const projectHref = p.url ?? `/${p.slug}/`;
  return `<div class="card" role="link" tabindex="0" data-href="${projectHref}" aria-label="Open ${p.name}">
  <div class="card-thumb">
    <img src="/thumbnails/${p.slug}.webp" alt="${p.name} thumbnail" loading="lazy">
  </div>
  <div class="card-body">
    <h2>${p.name}</h2>
    <p>${p.description}</p>
    ${p.hasWriteup ? `<div class="card-links">
      <a class="writeup-link" href="/writeups/${p.slug}">Read more</a>
    </div>` : ""}
  </div>
</div>`;
};

// cards are clickable anywhere, but a real <a> nested inside a covering <a>
// is invalid HTML and a stretched-overlay anchor blocks text selection —
// so the card itself isn't a link, this delegates clicks/keypresses instead
// and steps aside for the writeup link and for in-progress text selections.
const cardClickScript = `<script>
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    if (window.getSelection().toString()) return;
    location.href = card.dataset.href;
  });
  card.addEventListener("keydown", (e) => {
    if (e.target !== card || e.key !== "Enter") return;
    location.href = card.dataset.href;
  });
});
</script>`;

writeFileSync(
  join(DIST, "index.html"),
  page(
    "scribbles",
    `<header class="site">
  <h1>scribbles</h1>
  <p>here are some ideas that I'm experimenting with</p>
</header>
<main class="grid">
${projects.map(card).join("\n")}
</main>
${cardClickScript}`
  )
);

console.log(`[build] wrote ${projects.length} project(s) to dist/`);
