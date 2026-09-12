"use strict";

const fs = require("fs");
const path = require("path");
const { escapeHtml } = require("./md");

const SITE_ROOT = path.resolve(__dirname, "..");
const SRC = path.join(SITE_ROOT, "src");
const DIST = path.join(SITE_ROOT, "dist");
const GEN = path.join(SITE_ROOT, "content", "generated");

function rmrf(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const ent of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, ent.name);
    const dest = path.join(to, ent.name);
    if (ent.isDirectory()) copyDir(src, dest);
    else fs.copyFileSync(src, dest);
  }
}

function injectPartials(html, header, footer) {
  return html.replace("<!--HEADER-->", header).replace("<!--FOOTER-->", footer);
}

function pageShell({ title, page, main, extraHead = "" }) {
  return `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} · 先制型資安</title>
  <meta name="description" content="先制型資安（Preemptive Cybersecurity）方法論、Inputs／Outputs、平台比較、Skills 與合成案例示範。">
  <link rel="stylesheet" href="css/main.css">
  ${extraHead}
</head>
<body data-page="${page}">
<!--HEADER-->
${main}
<!--FOOTER-->
<script src="js/app.js" defer></script>
</body>
</html>
`;
}

function articlePage(kind, item) {
  const folder = kind === "skill" ? "skills" : kind === "doc" ? "docs" : "research";
  const downloadName = kind === "skill" ? `${item.id}.SKILL.md` : `${item.slug || item.id}.md`;
  const copyTarget = kind === "skill" ? "skill-source" : "article-source";
  const indexHref = kind === "skill" ? "skills.html" : kind === "doc" ? "guide.html" : "research.html";
  const indexLabel = kind === "skill" ? "Skills" : kind === "doc" ? "教學與契約" : "研究全文";
  return pageShell({
    title: item.title,
    page: kind === "skill" ? "skill-detail" : "research-detail",
    main: `
<main id="main" class="wrap article">
  <p class="crumb"><a href="${indexHref}">${indexLabel}</a> / ${escapeHtml(item.title)}</p>
  <header class="page-head">
    <p class="kicker">${escapeHtml(kind)} · ${escapeHtml(item.status)}</p>
    <h1>${escapeHtml(item.title)}</h1>
    <p class="lede">${escapeHtml(item.description || "完整正文可閱讀、複製或下載。")}</p>
    <div class="actions">
      <button type="button" class="btn" data-copy="${copyTarget}">一鍵複製全文</button>
      <a class="btn btn-quiet" href="data/${folder}/${escapeHtml(downloadName)}" download="${escapeHtml(downloadName)}">下載 Markdown</a>
    </div>
  </header>
  <article class="prose">${item.html}</article>
  <textarea id="${copyTarget}" class="sr-source" readonly hidden>${escapeHtml(item.markdown)}</textarea>
</main>`,
  });
}

function main() {
  if (!fs.existsSync(path.join(GEN, "site-data.json"))) {
    throw new Error("missing content/generated/site-data.json — run sync first");
  }
  const data = JSON.parse(fs.readFileSync(path.join(GEN, "site-data.json"), "utf8"));
  const header = fs.readFileSync(path.join(SRC, "partials", "header.html"), "utf8");
  const footer = fs.readFileSync(path.join(SRC, "partials", "footer.html"), "utf8");

  rmrf(DIST);
  fs.mkdirSync(DIST, { recursive: true });
  copyDir(path.join(SRC, "css"), path.join(DIST, "css"));
  copyDir(path.join(SRC, "js"), path.join(DIST, "js"));

  const pagesDir = path.join(SRC, "pages");
  for (const name of fs.readdirSync(pagesDir)) {
    if (!name.endsWith(".html")) continue;
    const html = injectPartials(fs.readFileSync(path.join(pagesDir, name), "utf8"), header, footer);
    fs.writeFileSync(path.join(DIST, name), html);
  }

  for (const article of data.research) {
    fs.writeFileSync(
      path.join(DIST, `research-${article.slug}.html`),
      injectPartials(articlePage("research", article), header, footer)
    );
  }
  for (const skill of data.skills) {
    fs.writeFileSync(
      path.join(DIST, `skill-${skill.id}.html`),
      injectPartials(articlePage("skill", skill), header, footer)
    );
  }
  for (const doc of data.docs || []) {
    fs.writeFileSync(
      path.join(DIST, `doc-${doc.id}.html`),
      injectPartials(articlePage("doc", { ...doc, slug: doc.id }), header, footer)
    );
  }

  const dataDir = path.join(DIST, "data");
  fs.mkdirSync(path.join(dataDir, "research"), { recursive: true });
  fs.mkdirSync(path.join(dataDir, "skills"), { recursive: true });
  fs.copyFileSync(path.join(GEN, "site-data.json"), path.join(dataDir, "site-data.json"));
  fs.copyFileSync(path.join(GEN, "search-index.json"), path.join(dataDir, "search-index.json"));
  fs.copyFileSync(path.join(GEN, "version.json"), path.join(dataDir, "version.json"));
  for (const article of data.research) {
    fs.writeFileSync(path.join(dataDir, "research", `${article.slug}.md`), article.raw || article.markdown);
  }
  for (const skill of data.skills) {
    fs.writeFileSync(path.join(dataDir, "skills", `${skill.id}.SKILL.md`), skill.raw || skill.markdown);
  }
  fs.mkdirSync(path.join(dataDir, "docs"), { recursive: true });
  for (const doc of data.docs || []) {
    fs.writeFileSync(path.join(dataDir, "docs", `${doc.id}.md`), doc.raw || doc.markdown);
  }

  const notFound = injectPartials(
    pageShell({
      title: "找不到頁面",
      page: "notfound",
      main: `<main id="main" class="wrap">
  <header class="page-head">
    <p class="kicker">404</p>
    <h1>沒有這個路徑</h1>
    <p class="lede">GitHub Pages 專案子路徑重新整理時，若主機找不到檔案會落到此頁。請用上方導覽或回<a href="index.html">首頁</a>。</p>
  </header>
</main>`,
    }),
    header,
    footer
  );
  fs.writeFileSync(path.join(DIST, "404.html"), notFound);

  fs.writeFileSync(
    path.join(DIST, ".nojekyll"),
    ""
  );

  console.log(`built ${DIST}`);
}

main();
