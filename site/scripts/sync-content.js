"use strict";

require("./ensure-utf8");

const fs = require("fs");
const path = require("path");
const { renderMarkdown, parseFrontmatter } = require("./md");

const SITE_ROOT = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(SITE_ROOT, "..");
const OUT_DIR = path.join(SITE_ROOT, "content", "generated");
const DELIVERED_PLATFORMS = ["chatgpt", "claude", "grok", "glm", "deepseek"];
const OUT_OF_SCOPE_PLATFORMS = new Set(["cursor", "copilot", "gemini", "windsurf"]);
const BASELINE_CASE_IDS = ["CASE-COMPLETE", "CASE-GAP", "CASE-CONFLICT", "CASE-UNTRUSTED-DOC"];

function exists(p) {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
}

function readText(file) {
  const buf = fs.readFileSync(file);
  if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe) {
    return buf.toString("utf16le");
  }
  if (buf.length >= 2 && buf[0] === 0xfe && buf[1] === 0xff) {
    return buf.swap16().toString("utf16le");
  }
  if (buf.length >= 4 && buf[1] === 0x00 && buf[3] === 0x00) {
    return buf.toString("utf16le");
  }
  return buf.toString("utf8");
}

function walk(dir, acc = []) {
  if (!exists(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

function readJsonSafe(file) {
  try {
    return JSON.parse(readText(file));
  } catch {
    return null;
  }
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "doc";
}

function firstHeading(body) {
  const m = /^#\s+(.+)$/m.exec(body);
  return m ? m[1].replace(/[#*`]/g, "").trim() : "";
}

function collectMarkdown(primaryDir, fallbackDir, kind) {
  const merged = new Map();

  const ingest = (root, origin) => {
    if (!exists(root)) return;
    for (const file of walk(root)) {
      if (!/\.(md|markdown)$/i.test(file)) continue;
      const rel = path.relative(root, file).replace(/\\/g, "/");
      const raw = readText(file);
      const { meta, body } = parseFrontmatter(raw);
      const base = path.basename(file, path.extname(file));
      const platform = rel.includes("/") ? rel.split("/")[0] : "";
      const isSkill = /SKILL\.md$/i.test(file);
      const name = meta.name || (isSkill ? path.basename(path.dirname(file)) : base);
      const id =
        kind === "skill" && isSkill
          ? `${platform || "shared"}-${name}`
          : slugify(meta.slug || `${platform}-${base}`.replace(/^-/, "") || base);
      const title = meta.title || firstHeading(body) || name;
      merged.set(`${origin}:${rel}`, {
        id,
        slug: meta.slug || id,
        title,
        description: meta.description || meta.summary || "",
        status: meta.status || (origin === "repo" ? "已同步倉庫正文" : "暫存／待研究對齊"),
        origin,
        rel,
        platform,
        kind: isSkill ? "skill" : kind === "research" ? "research" : "doc",
        markdown: body.trim(),
        html: renderMarkdown(body),
        raw,
      });
    }
  };

  ingest(fallbackDir, "fallback");
  ingest(primaryDir, "repo");
  const items = [...merged.values()];
  const usedRepo = items.some((i) => i.origin === "repo");
  return { items, usedRepo };
}

function parseResearchIo(researchItems) {
  const io = [];
  const inputsDoc = researchItems.find((i) => /04-inputs|inputs/i.test(i.rel));
  const outputsDoc = researchItems.find((i) => /05-outputs|outputs/i.test(i.rel));

  if (inputsDoc) {
    const blocks = inputsDoc.markdown.split(/^### /m).slice(1);
    for (const block of blocks) {
      const head = block.split("\n")[0].trim();
      const idMatch = /^(INP-\d+)\s+(.+)$/.exec(head);
      if (!idMatch) continue;
      const get = (label) => {
        const row = new RegExp(`\\|\\s*${label}\\s*\\|\\s*([^|]+)\\|`).exec(block);
        return row ? row[1].trim() : "";
      };
      const required = /必要輸入|required/i.test(inputsDoc.markdown.slice(0, inputsDoc.markdown.indexOf(head) + 1))
        ? "必要"
        : block.includes("選用")
          ? "選用"
          : /INP-00[1-8]/.test(idMatch[1])
            ? "必要"
            : "建議";
      io.push({
        id: idMatch[1],
        name: `${idMatch[1]} ${idMatch[2]}`,
        kind: "input",
        stage: get("使用階段") || "GAC",
        necessity: /INP-00([1-8])\b/.test(idMatch[1]) ? "必要" : "建議",
        audience: get("來源") || "分析師",
        description: get("用途") || idMatch[2],
      });
    }
  }

  if (outputsDoc) {
    const rowRe = /\|\s*(OUT-\d+)\s*\|\s*`?([^`|]+)`?\s*\|\s*([^|]+)\|\s*([^|]+)\|/g;
    let m;
    while ((m = rowRe.exec(outputsDoc.markdown))) {
      io.push({
        id: m[1],
        name: `${m[1]} ${m[2].trim()}`,
        kind: "output",
        stage: m[4].trim(),
        necessity: "必要",
        audience: m[3].trim(),
        description: `${m[2].trim()}（研究全文 05 輸出目錄）`,
      });
    }
  }
  return io;
}

function parseGacProcess(researchItems) {
  const processDoc = researchItems.find((i) => /03-analysis-process|process/i.test(i.rel));
  if (!processDoc) return null;
  const stages = [];
  const re = /^###\s+(S\d+|GAC-[A-Z-]+)\s*[—–-]?\s*(.+)$/gm;
  let m;
  while ((m = re.exec(processDoc.markdown))) {
    stages.push({
      id: m[1].toLowerCase(),
      stage: m[1],
      nameZh: m[2].replace(/\*+/g, "").trim(),
      intent: "GPreep Analysis Cycle（GAC）階段。此流程為 project-framework，不是 Gartner 官方流程。",
      actions: ["見研究全文〈分析流程〉"],
    });
  }
  return stages.length ? stages : null;
}

function normalizePlatforms(platforms) {
  return (platforms || [])
    .map((item) => {
      const id = String(item.id || "").toLowerCase();
      if (DELIVERED_PLATFORMS.includes(id)) {
        return { ...item, id, delivery: "delivered" };
      }
      if (OUT_OF_SCOPE_PLATFORMS.has(id)) {
        return {
          ...item,
          id,
          delivery: "out-of-scope",
          skillSupport: "非本專案交付範圍",
          notes: `${item.notes || ""} 本倉庫沒有此平台的 GAC skill，不列入已交付比較。`.trim(),
        };
      }
      return { ...item, id, delivery: item.delivery || "out-of-scope" };
    })
    .sort((a, b) => {
      const av = a.delivery === "delivered" ? 0 : 1;
      const bv = b.delivery === "delivered" ? 0 : 1;
      if (av !== bv) return av - bv;
      return DELIVERED_PLATFORMS.indexOf(a.id) - DELIVERED_PLATFORMS.indexOf(b.id);
    });
}

function promotePromptSkills(skillItems, skillDocs) {
  const have = new Set(skillItems.map((item) => item.platform));
  const extras = [];
  for (const doc of skillDocs) {
    if (doc.origin !== "repo") continue;
    if (!DELIVERED_PLATFORMS.includes(doc.platform)) continue;
    if (have.has(doc.platform)) continue;
    if (!/(^|\/)(system-prompt|agent-system-prompt)\.md$/i.test(doc.rel)) continue;
    extras.push({
      ...doc,
      kind: "skill",
      id: `${doc.platform}-preemptive-cyber-review`,
      slug: `${doc.platform}-preemptive-cyber-review`,
      title: doc.title || `${doc.platform} GAC 系統提示`,
      description: doc.description || "此平台無原生 SKILL.md，以系統提示作為可執行交付。",
    });
    have.add(doc.platform);
  }
  return extras;
}

function loadBaselineCases(dataCases) {
  const baselineDir = path.join(REPO_ROOT, "examples", "baseline-cases");
  const expectedDir = path.join(REPO_ROOT, "examples", "expected-outputs");
  const researchCases = (dataCases && (dataCases.cases || dataCases)) || [];
  return BASELINE_CASE_IDS.map((id) => {
    const input = readJsonSafe(path.join(baselineDir, `${id}.json`));
    const expected = readJsonSafe(path.join(expectedDir, `${id}.expected.json`));
    const meta = Array.isArray(researchCases) ? researchCases.find((item) => item.id === id) || {} : {};
    return {
      id,
      title: meta.title || id,
      intent: meta.intent || "",
      inputsPresent: meta.inputsPresent || [],
      inputsMissing: meta.inputsMissing || [],
      expectedBehavior: meta.expectedBehavior || [],
      forbiddenBehavior: meta.forbiddenBehavior || [],
      passCriteria: meta.passCriteria || [],
      input,
      expected,
      synthetic: true,
      notice: (input && input.notice) || "SYNTHETIC。示範規則為 project-framework，不是 Gartner。",
    };
  }).filter((item) => item.input);
}

function buildGuides(skillItems, catalog) {
  const guides = {};
  for (const id of DELIVERED_PLATFORMS) {
    if (catalog.guides && catalog.guides[id]) guides[id] = catalog.guides[id];
  }
  const installs = skillItems.filter((i) => /\/install\.md$/i.test(i.rel) && i.origin === "repo");
  for (const inst of installs) {
    const platform = inst.platform || "other";
    guides[platform] = {
      title: platform,
      steps: inst.markdown
        .split("\n")
        .filter((line) => /^\d+\.\s+/.test(line) || /^[-*]\s+/.test(line))
        .map((line) => line.replace(/^(\d+\.|\-|\*)\s+/, ""))
        .slice(0, 12),
      html: inst.html,
      sourceRel: inst.rel,
    };
    if (!guides[platform].steps.length) {
      guides[platform].steps = ["請閱讀此平台的安裝全文（已同步進本頁）。"];
    }
  }
  return guides;
}

function main() {
  const catalog = readJsonSafe(path.join(SITE_ROOT, "content", "fallback", "catalog.json"));
  const demo = readJsonSafe(path.join(SITE_ROOT, "content", "fallback", "demo.json"));

  const research = collectMarkdown(
    path.join(REPO_ROOT, "research"),
    path.join(SITE_ROOT, "content", "fallback", "research"),
    "research"
  );
  const skillsAll = collectMarkdown(
    path.join(REPO_ROOT, "skills"),
    path.join(SITE_ROOT, "content", "fallback", "skills"),
    "skill"
  );

  const usedRepoSkills = skillsAll.items.some((i) => i.kind === "skill" && i.origin === "repo");
  const skills = {
    items: skillsAll.items.filter((i) => i.kind === "skill" && (!usedRepoSkills || i.origin === "repo")),
    usedRepo: usedRepoSkills,
  };
  const usedRepoSkillDocs = skillsAll.items.some((i) => i.kind !== "skill" && i.origin === "repo");
  const skillDocs = skillsAll.items.filter((i) => i.kind !== "skill" && (!usedRepoSkillDocs || i.origin === "repo"));

  const contracts = [];
  const contractDir = path.join(REPO_ROOT, "docs", "contracts");
  if (exists(contractDir)) {
    for (const file of walk(contractDir)) {
      if (!/\.(md|json)$/i.test(file)) continue;
      const rel = path.relative(REPO_ROOT, file).replace(/\\/g, "/");
      const raw = readText(file);
      if (file.endsWith(".md")) {
        const { body } = parseFrontmatter(raw);
        contracts.push({
          id: slugify(path.basename(file, ".md")),
          slug: slugify(path.basename(file, ".md")),
          title: firstHeading(body) || path.basename(file),
          description: "docs/contracts 契約全文",
          status: "已同步倉庫正文",
          origin: "repo",
          rel,
          kind: "contract",
          markdown: body.trim(),
          html: renderMarkdown(body),
          raw,
        });
      }
    }
  }

  const dataInputs = readJsonSafe(path.join(REPO_ROOT, "research", "data", "inputs.json"));
  const dataOutputs = readJsonSafe(path.join(REPO_ROOT, "research", "data", "outputs.json"));
  const dataProcess = readJsonSafe(path.join(REPO_ROOT, "research", "data", "process.json"));
  const dataCases = readJsonSafe(path.join(REPO_ROOT, "research", "data", "cases.json"));
  const sourcesJson = readJsonSafe(path.join(REPO_ROOT, "references", "sources.json"));

  const parsedIo = parseResearchIo(research.items.filter((i) => i.origin === "repo"));
  const inputItems = (dataInputs && (dataInputs.inputs || dataInputs.items)) || null;
  if (Array.isArray(inputItems)) {
    catalog.io = inputItems.map((item) => ({
      id: item.id,
      name: `${item.id} ${item.name || ""}`.trim(),
      kind: "input",
      stage: (item.usedByStages || item.stages || item.stage || ["GAC"]).toString(),
      necessity: item.requirement === "optional" || item.required === false ? "選用" : "必要",
      audience: (item.sources || []).join("／") || item.audience || "分析師",
      description: item.purpose || item.description || "",
    }));
  } else if (parsedIo.length) {
    catalog.io = parsedIo;
  }

  const outputItems = (dataOutputs && (dataOutputs.outputs || dataOutputs.items)) || null;
  if (Array.isArray(outputItems)) {
    const outs = outputItems.map((item) => ({
      id: item.id,
      name: `${item.id} ${item.name || ""}`.trim(),
      kind: "output",
      stage: (item.producedIn || item.stage || item.stages || ["GAC"]).toString(),
      necessity: "必要",
      audience: (item.audiences || []).join("／") || item.audience || "分析師",
      description: item.purpose || item.description || "",
    }));
    catalog.io = [...(catalog.io || []).filter((x) => x.kind !== "output"), ...outs];
  }

  const processStages = dataProcess && (dataProcess.stages || dataProcess.process);
  if (Array.isArray(processStages) && processStages.length) {
    catalog.process = processStages.map((s) => ({
      id: (s.id || s.name || "").toLowerCase(),
      stage: s.id || s.name,
      nameZh: s.nameZh || s.name || "",
      intent: s.purpose || "",
      actions: s.methods || s.actions || [],
    }));
  } else {
    const gac = parseGacProcess(research.items);
    if (gac && gac.length) catalog.process = gac;
  }

  const sourceList = sourcesJson && (sourcesJson.sources || (Array.isArray(sourcesJson) ? sourcesJson : null));
  if (Array.isArray(sourceList)) {
    catalog.sources = sourceList.map((s) => ({
      id: s.id || s.source_id,
      title: s.title,
      org: s.publisher || s.org || "",
      idCode: s.id || s.source_id || "",
      datePublished: s.published_date || s.publishedDate || s.published || s.datePublished || "",
      dateAccessed: s.accessed_date || s.retrievedDate || s.accessed || s.dateAccessed || "",
      url: s.url || s.href || "",
      kind: s.source_type || s.sourceType || s.type || s.kind || "",
      confidence: s.full_text_status || s.evidenceType || s.confidence || "",
      usedFor: (s.claims_supported || s.citedClaims || []).slice(0, 2).join("；") || s.usedFor || "",
      limit: Array.isArray(s.limitations) ? s.limitations[0] : (s.verificationScope || s.notes || s.limit || ""),
    }));
  }

  if (dataCases && (dataCases.cases || Array.isArray(dataCases))) {
    const cases = dataCases.cases || dataCases;
    demo.researchCases = cases;
  }

  catalog.guides = buildGuides(skillDocs, catalog);
  catalog.platforms = normalizePlatforms(catalog.platforms);
  const promptSkills = promotePromptSkills(skills.items, skillDocs);
  skills.items = [...skills.items, ...promptSkills];
  demo.baselineCases = loadBaselineCases(dataCases);

  const extraFiles = [];
  for (const dirName of ["references", "examples"]) {
    const dir = path.join(REPO_ROOT, dirName);
    if (!exists(dir)) continue;
    for (const file of walk(dir)) {
      if (!/\.(md|json|txt)$/i.test(file)) continue;
      extraFiles.push({
        rel: path.relative(REPO_ROOT, file).replace(/\\/g, "/"),
        markdown: readText(file),
      });
    }
  }

  const now = new Date();
  const version = {
    syncedAt: now.toISOString(),
    syncedAtLocal: now.toLocaleString("zh-Hant-TW", { timeZone: "Asia/Taipei" }),
    researchOrigin: research.usedRepo ? "repo:research/" : "fallback",
    skillsOrigin: skills.usedRepo ? "repo:skills/" : "fallback",
    contractsOrigin: contracts.length ? "repo:docs/contracts/" : "missing",
    referencesOrigin: sourcesJson ? "repo:references/" : "fallback",
    examplesOrigin: extraFiles.some((f) => f.rel.startsWith("examples/")) ? "repo:examples/" : "missing",
    contentStatus: research.usedRepo && skills.usedRepo ? "已同步倉庫正文" : "部分或全部為暫存／待研究對齊",
    researchCount: research.items.filter((i) => i.origin === "repo" || !research.usedRepo).length,
    skillsCount: skills.items.length,
    contractCount: contracts.length,
    extraFileCount: extraFiles.length,
  };

  const researchPages = [
    ...research.items.filter((i) => !(research.usedRepo && i.origin === "fallback" && research.items.some((r) => r.origin === "repo" && r.rel === i.rel))),
  ];
  if (research.usedRepo) {
    for (let i = researchPages.length - 1; i >= 0; i -= 1) {
      if (researchPages[i].origin === "fallback") researchPages.splice(i, 1);
    }
  }

  const searchIndex = [];
  const pushSearch = (type, title, href, text) => {
    searchIndex.push({ type, title, href, text: `${title} ${text || ""}`.slice(0, 4000) });
  };
  for (const article of researchPages) {
    pushSearch("研究", article.title, `research-${article.slug}.html`, article.markdown);
  }
  for (const skill of skills.items) {
    pushSearch("Skill", `${skill.platform}／${skill.title}`, `skill-${skill.id}.html`, skill.markdown);
  }
  for (const doc of skillDocs) {
    pushSearch("教學", `${doc.platform}／${doc.title}`, `doc-${doc.id}.html`, doc.markdown);
  }
  for (const doc of contracts) {
    pushSearch("契約", doc.title, `doc-${doc.id}.html`, doc.markdown);
  }
  for (const def of catalog.definitions) {
    pushSearch("定義", `${def.termZh}（${def.term}）`, "methodology.html#definitions", def.text);
  }
  for (const item of catalog.io) {
    pushSearch(item.kind === "input" ? "Input" : "Output", item.name, "io.html", item.description);
  }
  for (const p of catalog.platforms) {
    pushSearch("平台", p.name, "platforms.html", `${p.form} ${p.limits}`);
  }

  const siteData = {
    version,
    catalog,
    demo,
    research: researchPages.map(({ raw, ...rest }) => ({ ...rest, raw })),
    skills: skills.items.map((s) => s),
    docs: [...skillDocs, ...contracts],
    extraFiles,
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, "site-data.json"), JSON.stringify(siteData, null, 2));
  fs.writeFileSync(path.join(OUT_DIR, "search-index.json"), JSON.stringify(searchIndex, null, 2));
  fs.writeFileSync(path.join(OUT_DIR, "version.json"), JSON.stringify(version, null, 2));
  console.log(
    `synced research=${siteData.research.length} (${version.researchOrigin}) skills=${siteData.skills.length} docs=${siteData.docs.length}`
  );
}

main();
