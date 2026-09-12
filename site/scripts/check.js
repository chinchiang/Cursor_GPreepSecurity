"use strict";

const fs = require("fs");
const path = require("path");

const DIST = path.resolve(__dirname, "..", "dist");
const requiredPages = [
  "index.html",
  "methodology.html",
  "io.html",
  "platforms.html",
  "skills.html",
  "guide.html",
  "demo.html",
  "sources.html",
  "research.html",
  "404.html",
  "css/main.css",
  "js/app.js",
  "data/site-data.json",
  "data/search-index.json",
  "data/version.json",
];

const errors = [];
const warnings = [];

function fail(msg) {
  errors.push(msg);
}

if (!fs.existsSync(DIST)) {
  fail("dist/ 不存在，請先 npm run build");
  report();
  process.exit(1);
}

for (const rel of requiredPages) {
  if (!fs.existsSync(path.join(DIST, rel))) fail(`缺少必要檔案：${rel}`);
}

const data = JSON.parse(fs.readFileSync(path.join(DIST, "data", "site-data.json"), "utf8"));
if (!data.catalog || !data.demo || !data.research || !data.skills) {
  fail("site-data.json 缺少 catalog／demo／research／skills");
}
if (!data.research.length) fail("沒有研究全文");
if (!data.skills.length) fail("沒有 Skills");
if (data.catalog.io.length < 8) fail("Inputs／Outputs 筆數過少");
const delivered = (data.catalog.platforms || []).filter((item) => item.delivery !== "out-of-scope");
const deliveredIds = delivered.map((item) => item.id);
for (const id of ["chatgpt", "claude", "grok", "glm", "deepseek"]) {
  if (!deliveredIds.includes(id)) fail(`已交付平台缺少 ${id}`);
}
for (const id of ["cursor", "copilot", "gemini"]) {
  const row = (data.catalog.platforms || []).find((item) => item.id === id);
  if (row && row.delivery !== "out-of-scope") fail(`${id} 不應列為已交付平台`);
}
if ((data.docs || []).some((d) => !fs.existsSync(path.join(DIST, `doc-${d.id}.html`)))) {
  fail("部分教學／契約頁未產出");
}
for (const id of ["chatgpt", "claude", "grok", "glm", "deepseek"]) {
  if (!data.catalog.guides || !data.catalog.guides[id]) fail(`安裝教學缺少 ${id}`);
}
if (data.catalog.guides && (data.catalog.guides.cursor || data.catalog.guides.copilot || data.catalog.guides.gemini)) {
  fail("安裝教學不應把 Cursor／Copilot／Gemini 當已交付主教學");
}
const caseIds = ((data.demo && data.demo.baselineCases) || []).map((item) => item.id);
for (const id of ["CASE-COMPLETE", "CASE-GAP", "CASE-CONFLICT", "CASE-UNTRUSTED-DOC"]) {
  if (!caseIds.includes(id)) fail(`demo 缺少基準案例 ${id}`);
}
if (!data.version || data.version.researchOrigin !== "repo:research/") fail("研究未同步倉庫 research/");
if (!data.version || data.version.skillsOrigin !== "repo:skills/") fail("Skills 未同步倉庫 skills/");
if (data.version && data.version.referencesOrigin && data.version.referencesOrigin !== "repo:references/") {
  fail("來源未同步 references/");
}
const skillPlatforms = new Set((data.skills || []).map((s) => s.platform));
for (const id of ["chatgpt", "claude", "grok", "glm", "deepseek"]) {
  if (!skillPlatforms.has(id)) fail(`Skills 專區缺少 ${id}`);
}

for (const article of data.research) {
  const file = path.join(DIST, `research-${article.slug}.html`);
  if (!fs.existsSync(file)) fail(`缺少研究頁 research-${article.slug}.html`);
}
for (const skill of data.skills) {
  if (!fs.existsSync(path.join(DIST, `skill-${skill.id}.html`))) {
    fail(`缺少技能頁 skill-${skill.id}.html`);
  }
  if (!fs.existsSync(path.join(DIST, "data", "skills", `${skill.id}.SKILL.md`))) {
    fail(`缺少技能下載檔 ${skill.id}.SKILL.md`);
  }
}

const htmlFiles = fs
  .readdirSync(DIST)
  .filter((n) => n.endsWith(".html"))
  .map((n) => path.join(DIST, n));

const hrefRe = /(?:href|src)="([^"]+)"/g;
const seen = new Set();

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const rel = path.basename(file);
  if (!html.includes('lang="zh-Hant"')) fail(`${rel} 缺少 lang="zh-Hant"`);
  if (!html.includes('class="skip-link"') && !html.includes("skip-link")) {
    fail(`${rel} 缺少 skip link`);
  }
  if (!html.includes('id="main"')) fail(`${rel} 缺少 <main id="main">`);
  if (!html.includes("<nav")) fail(`${rel} 缺少導覽`);
  if (/<button(?![^>]*aria-label)(?![^>]*>\s*[^<])/i.test(html) && html.includes("<button></button>")) {
    fail(`${rel} 有無名按鈕`);
  }
  if (rel !== "404.html" && /<main[^>]*>\s*<\/main>/.test(html)) {
    fail(`${rel} 主內容是空的`);
  }

  let match;
  while ((match = hrefRe.exec(html))) {
    const href = match[1];
    if (
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("#") ||
      href.startsWith("data:")
    ) {
      continue;
    }
    const clean = href.split("#")[0].split("?")[0];
    if (!clean) continue;
    const target = path.join(DIST, clean);
    const key = `${rel} → ${clean}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (!fs.existsSync(target)) fail(`${rel} 連結失效：${href}`);
  }
}

const demoHtml = fs.readFileSync(path.join(DIST, "demo.html"), "utf8");
if (!demoHtml.includes("本專案示範設計")) {
  fail("demo.html 未標示本專案示範設計");
}
if (!demoHtml.includes("模擬結果")) {
  fail("demo.html 未標示模擬結果");
}
for (const id of ["CASE-COMPLETE", "CASE-GAP", "CASE-CONFLICT", "CASE-UNTRUSTED-DOC"]) {
  if (!demoHtml.includes(id)) fail(`demo.html 未提到 ${id}`);
}
if (demoHtml.includes("Gartner 官方規則") && /稱為 Gartner 官方|即 Gartner 官方/.test(demoHtml)) {
  fail("demo.html 疑似把規則稱為 Gartner 官方");
}

const version = JSON.parse(fs.readFileSync(path.join(DIST, "data", "version.json"), "utf8"));
if (!version.syncedAt) fail("version.json 缺少 syncedAt");

function report() {
  if (warnings.length) {
    console.log("warnings:");
    warnings.forEach((w) => console.log("  -", w));
  }
  if (errors.length) {
    console.error(`check failed: ${errors.length} error(s)`);
    errors.forEach((e) => console.error("  -", e));
    process.exitCode = 1;
    return;
  }
  console.log(`check passed: ${htmlFiles.length} html, ${data.skills.length} skills, ${data.research.length} research`);
}

report();
