(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  async function loadJson(rel) {
    const res = await fetch(rel);
    if (!res.ok) throw new Error(`無法讀取 ${rel}`);
    return res.json();
  }

  function setNavCurrent() {
    const page = document.body.dataset.page;
    $$("[data-nav]").forEach((a) => {
      if (a.dataset.nav === page) a.setAttribute("aria-current", "page");
    });
  }

  function setupNav() {
    const toggle = $("#nav-toggle");
    const nav = $("#site-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "關閉選單" : "開啟選單";
    });
  }

  function setupSearch(index) {
    const dialog = $("#search-dialog");
    const openBtn = $("#search-open");
    const closeBtn = $("#search-close");
    const input = $("#search-input");
    const results = $("#search-results");
    const status = $("#search-status");
    if (!dialog || !openBtn) return;

    const close = () => {
      dialog.hidden = true;
      openBtn.focus();
    };
    const open = () => {
      dialog.hidden = false;
      input.value = "";
      results.innerHTML = "";
      status.textContent = "輸入至少兩個字。";
      input.focus();
    };
    openBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !dialog.hidden) close();
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        open();
      }
    });

    const render = () => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) {
        results.innerHTML = "";
        status.textContent = "輸入至少兩個字。";
        return;
      }
      const hits = index
        .filter((item) => `${item.title} ${item.text} ${item.type}`.toLowerCase().includes(q))
        .slice(0, 12);
      status.textContent = hits.length ? `找到 ${hits.length} 筆` : "沒有符合的項目。";
      results.innerHTML = hits
        .map(
          (item) =>
            `<li><small>${escapeHtml(item.type)}</small><br><a href="${escapeHtml(item.href)}">${escapeHtml(item.title)}</a></li>`
        )
        .join("");
    };
    input.addEventListener("input", render);
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function setupCopy() {
    document.addEventListener("click", async (e) => {
      const btn = e.target.closest("[data-copy]");
      if (!btn) return;
      const target = document.getElementById(btn.dataset.copy);
      if (!target) return;
      const text = target.value || target.textContent;
      try {
        await navigator.clipboard.writeText(text);
        btn.dataset.old = btn.dataset.old || btn.textContent;
        btn.textContent = "已複製";
        setTimeout(() => {
          btn.textContent = btn.dataset.old;
        }, 1600);
      } catch {
        target.hidden = false;
        target.focus();
        target.select();
        btn.textContent = "請手動複製已選取文字";
      }
    });
  }

  function fillFooter(version) {
    const el = $("#content-version");
    if (!el || !version) return;
    el.innerHTML = `同步時間 ${escapeHtml(version.syncedAtLocal || version.syncedAt)}。<br>研究：${escapeHtml(version.researchOrigin)}（${version.researchCount}）　Skills：${escapeHtml(version.skillsOrigin)}（${version.skillsCount}）。<br>契約：${escapeHtml(version.contractsOrigin || "—")}　來源：${escapeHtml(version.referencesOrigin || "—")}　案例：${escapeHtml(version.examplesOrigin || "—")}。<br>狀態：${escapeHtml(version.contentStatus)}。`;
  }

  function renderHome(data) {
    const root = $("#home-stats");
    if (!root) return;
    const delivered = (data.catalog.platforms || []).filter((item) => item.delivery !== "out-of-scope");
    root.innerHTML = `
      <div class="stat"><strong>${data.research.length}</strong><span>研究篇章</span></div>
      <div class="stat"><strong>${data.skills.length}</strong><span>已交付 Skills／提示</span></div>
      <div class="stat"><strong>${data.catalog.io.length}</strong><span>Inputs／Outputs</span></div>
      <div class="stat"><strong>${delivered.length}</strong><span>已交付平台</span></div>`;
  }

  function renderMethodology(data) {
    const defs = $("#definition-list");
    if (defs) {
      defs.innerHTML = data.catalog.definitions
        .map(
          (d) => `<article class="card" id="${escapeHtml(d.id)}">
            <p class="kicker">${escapeHtml(d.status)}</p>
            <h3>${escapeHtml(d.termZh)} <span class="muted">${escapeHtml(d.term)}</span></h3>
            <p>${escapeHtml(d.text)}</p>
            <p class="muted">來源：${escapeHtml(d.source)}</p>
          </article>`
        )
        .join("");
    }
    const flow = $("#process-flow");
    if (flow) {
      flow.innerHTML = data.catalog.process
        .map(
          (s, i) => `<article>
            <div class="n">0${i + 1}</div>
            <h3>${escapeHtml(s.stage)} ${escapeHtml(s.nameZh)}</h3>
            <p>${escapeHtml(s.intent)}</p>
            <ul>${s.actions.map((a) => `<li>${escapeHtml(a)}</li>`).join("")}</ul>
          </article>`
        )
        .join("");
    }
    const rel = $("#relation-list");
    if (rel) {
      rel.innerHTML = data.catalog.relations
        .map((r) => `<li><strong>${escapeHtml(r.from)}</strong> → ${escapeHtml(r.to)}　<span class="muted">${escapeHtml(r.note)}</span></li>`)
        .join("");
    }
    const radar = $("#radar-list");
    if (radar) {
      radar.innerHTML = data.catalog.radarTech
        .map(
          (t) => `<tr>
            <td>${escapeHtml(t.name)}</td>
            <td>${escapeHtml(t.theme)}</td>
            <td>${escapeHtml(t.summary)}</td>
          </tr>`
        )
        .join("");
    }
  }

  function renderIo(data) {
    const body = $("#io-body");
    const count = $("#io-count");
    if (!body) return;
    const stage = $("#filter-stage");
    const necessity = $("#filter-necessity");
    const audience = $("#filter-audience");
    const kind = $("#filter-kind");
    const q = $("#filter-q");

    const unique = (key) => [...new Set(data.catalog.io.map((i) => i[key]))];
    const fillSelect = (el, values) => {
      values.forEach((v) => {
        const opt = document.createElement("option");
        opt.value = v;
        opt.textContent = v;
        el.append(opt);
      });
    };
    fillSelect(stage, unique("stage"));
    fillSelect(necessity, unique("necessity"));
    fillSelect(audience, unique("audience"));

    const draw = () => {
      const rows = data.catalog.io.filter((item) => {
        if (kind.value !== "all" && item.kind !== kind.value) return false;
        if (stage.value !== "all" && item.stage !== stage.value) return false;
        if (necessity.value !== "all" && item.necessity !== necessity.value) return false;
        if (audience.value !== "all" && item.audience !== audience.value) return false;
        if (q.value.trim()) {
          const hay = `${item.name} ${item.description} ${item.stage} ${item.audience}`.toLowerCase();
          if (!hay.includes(q.value.trim().toLowerCase())) return false;
        }
        return true;
      });
      count.textContent = `顯示 ${rows.length}／${data.catalog.io.length} 筆`;
      body.innerHTML = rows.length
        ? rows
            .map(
              (item) => `<tr>
                <td><span class="tag">${item.kind === "input" ? "Input" : "Output"}</span> ${escapeHtml(item.name)}</td>
                <td>${escapeHtml(item.stage)}</td>
                <td>${escapeHtml(item.necessity)}</td>
                <td>${escapeHtml(item.audience)}</td>
                <td>${escapeHtml(item.description)}</td>
              </tr>`
            )
            .join("")
        : `<tr><td colspan="5">沒有符合篩選的項目。可清空條件再試。</td></tr>`;
    };
    [stage, necessity, audience, kind, q].forEach((el) => el.addEventListener("input", draw));
    draw();
  }

  function platformRow(p) {
    return `<tr>
      <th scope="row">${escapeHtml(p.name)}</th>
      <td>${escapeHtml(p.form)}</td>
      <td>${escapeHtml(p.needs)}</td>
      <td>${escapeHtml(p.limits)}</td>
      <td>${escapeHtml(p.skillSupport)}</td>
      <td>${escapeHtml(p.offline)}</td>
    </tr>`;
  }

  function renderPlatforms(data) {
    const delivered = (data.catalog.platforms || []).filter((p) => p.delivery !== "out-of-scope");
    const other = (data.catalog.platforms || []).filter((p) => p.delivery === "out-of-scope");
    const body = $("#platform-body");
    if (body) body.innerHTML = delivered.map(platformRow).join("");
    const otherBody = $("#platform-out-of-scope");
    if (otherBody) otherBody.innerHTML = other.map(platformRow).join("");
    const cards = $("#platform-notes");
    if (cards) {
      cards.innerHTML = delivered
        .map(
          (p) => `<article class="card">
            <h3>${escapeHtml(p.name)}</h3>
            <p>${escapeHtml(p.install)}</p>
            <p class="muted">${escapeHtml(p.notes)}</p>
          </article>`
        )
        .join("");
    }
  }

  function renderSkills(data) {
    const list = $("#skill-list");
    if (!list) return;
    const formLabel = (s) =>
      /glm|deepseek/i.test(s.platform || "") ? "系統提示（無原生 SKILL.md）" : "SKILL.md／平台技能包";
    list.innerHTML = data.skills
      .map(
        (s) => `<article class="tile">
          <p class="kicker">${escapeHtml(s.platform || "skill")} · ${escapeHtml(s.status)} · ${escapeHtml(formLabel(s))}</p>
          <h2>${escapeHtml(s.title)}</h2>
          <p>${escapeHtml(s.description || "本專案已交付的 GAC 工作流程。")}</p>
          <div class="actions">
            <a class="btn" href="skill-${escapeHtml(s.id)}.html">閱讀全文</a>
            <a class="btn btn-quiet" href="data/skills/${escapeHtml(s.id)}.SKILL.md" download="${escapeHtml(s.id)}.SKILL.md">下載</a>
            <button type="button" class="btn btn-quiet" data-copy="src-${escapeHtml(s.id)}">一鍵複製</button>
          </div>
          <textarea id="src-${escapeHtml(s.id)}" class="sr-source" readonly hidden>${escapeHtml(s.markdown)}</textarea>
        </article>`
      )
      .join("");
  }

  function renderGuide(data) {
    const switcher = $("#guide-switch");
    const panels = $("#guide-panels");
    if (!switcher || !panels) return;
    const entries = Object.entries(data.catalog.guides);
    switcher.innerHTML = entries
      .map(
        ([id, g], i) =>
          `<button type="button" class="chip" data-guide="${escapeHtml(id)}" aria-pressed="${i === 0}">${escapeHtml(g.title)}</button>`
      )
      .join("");
    panels.innerHTML = entries
      .map(([id, g], i) => {
        const body = g.html
          ? g.html
          : `<ol>${(g.steps || []).map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ol>`;
        return `<section class="guide-panel prose" data-guide-panel="${escapeHtml(id)}" ${i ? "hidden" : ""}>
          <h2>${escapeHtml(g.title)} 安裝與使用</h2>
          ${body}
        </section>`;
      })
      .join("");
    switcher.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-guide]");
      if (!btn) return;
      $$("[data-guide]", switcher).forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      $$("[data-guide-panel]", panels).forEach((p) => {
        p.hidden = p.dataset.guidePanel !== btn.dataset.guide;
      });
    });
  }

  function clamp01(n) {
    return Math.min(1, Math.max(0, n));
  }

  function demoScore(inputs) {
    const critN = inputs.criticality / 5;
    const unvalN = Math.min(inputs.unvalidated, 40) / 40;
    const intelN = inputs.intel / 100;
    const driftN = inputs.drift / 100;
    const privN = Math.min(inputs.privileges, 80) / 80;
    const validateN = inputs.validation / 100;
    const autoN = inputs.automation / 100;
    const deceiveN = inputs.deception / 100;
    const raw =
      100 *
      (0.26 * critN + 0.2 * unvalN + 0.16 * intelN + 0.14 * driftN + 0.12 * privN + 0.12 * (1 - validateN)) *
      (1 - 0.35 * autoN - 0.25 * deceiveN);
    return Math.round(Math.max(4, Math.min(99, raw)));
  }

  function assetScore(a) {
    const raw =
      0.28 * (a.business / 5) +
      0.22 * a.exploitability +
      0.18 * a.reachability +
      0.16 * a.intel +
      0.1 * (1 - a.control) +
      0.06 * (1 - a.effort);
    return Math.round(raw * 100);
  }

  function recommend(score, inputs) {
    const actions = [];
    if (inputs.validation < 40) actions.push("Validate：先驗證高優先暴露，不要把掃描分數當成已確認。");
    if (inputs.drift > 40) actions.push("Deny：用控制評估補組態漂移，再考慮買新工具。");
    if (inputs.deception < 25) actions.push("Deceive：對不能立刻修的探測面加誘餌或合成憑證。");
    if (inputs.intel > 60 && inputs.automation < 30) actions.push("Disrupt：情報已熱、自動化低，先訂政策內可自動封鎖的邊界。");
    if (inputs.privileges > 20) actions.push("Deny：收斂常設特權，改為即時核准。");
    if (!actions.length) actions.push("維持 Mobilize 回測：分數雖低，仍要寫殘餘風險。");
    const stage = score >= 70 ? "Validate → Mobilize" : score >= 45 ? "Prioritize → Validate" : "Scope 收斂後持續 Discover";
    return { actions, stage };
  }

  function listHtml(items) {
    return (items || []).map((item) => `<li>${escapeHtml(typeof item === "string" ? item : JSON.stringify(item))}</li>`).join("");
  }

  function simulateCase(c) {
    const expected = c.expected || {};
    const input = c.input || {};
    const gaps = expected.gaps || [];
    const conflicts = expected.conflicts || [];
    const findings = expected.candidate_findings || [];
    const actions = expected.recommended_3d_actions || [];
    const untrusted = (expected.input_trace && expected.input_trace.untrusted_segments) || [];
    const missing = (expected.input_trace && expected.input_trace.missing_required) || c.inputsMissing || [];
    const verdict =
      c.id === "CASE-GAP"
        ? "CASE-GAP：缺漏阻擋完整路徑，禁止編造內部主機。"
        : c.id === "CASE-CONFLICT"
          ? "CASE-CONFLICT：五方證據同時保留，resolution=unresolved。"
          : c.id === "CASE-UNTRUSTED-DOC"
            ? "CASE-UNTRUSTED-DOC：偽造 PDF 已隔離，不產出 exploit，不新增假 SRC。"
            : "CASE-COMPLETE：資料足夠時產出 medium 路徑與 3 Ds 建議，不得標 high。";
    return { expected, input, gaps, conflicts, findings, actions, untrusted, missing, verdict };
  }

  function renderDemo(data) {
    const select = $("#demo-case");
    const summary = $("#demo-summary");
    const out = $("#demo-out");
    const facts = $("#demo-facts");
    const run = $("#demo-run");
    const cases = (data.demo && data.demo.baselineCases) || [];
    if (!select || !out) return;
    if (!cases.length) {
      out.innerHTML = `<p class="empty">沒有基準案例。請確認 examples/baseline-cases/ 已同步。</p>`;
      return;
    }
    select.innerHTML = cases
      .map((c) => `<option value="${escapeHtml(c.id)}">${escapeHtml(c.id)} · ${escapeHtml(c.title || "")}</option>`)
      .join("");

    const show = () => {
      const c = cases.find((item) => item.id === select.value) || cases[0];
      const sim = simulateCase(c);
      if (summary) {
        summary.innerHTML = `
          <p class="kicker">${escapeHtml(c.id)} · 合成資料</p>
          <h2>${escapeHtml(c.title || c.id)}</h2>
          <p>${escapeHtml(c.intent || c.notice || "")}</p>
          <p><strong>已提供輸入：</strong> ${(c.inputsPresent || []).map(escapeHtml).join("、") || "—"}</p>
          <p><strong>缺漏輸入：</strong> ${(c.inputsMissing || []).map(escapeHtml).join("、") || "無（或僅選用）"}</p>
          <p class="muted">${escapeHtml(c.notice || "")}</p>`;
      }
      if (facts) {
        const input = c.input || {};
        const bits = [];
        if (input.question) bits.push(`<p><strong>問題：</strong>${escapeHtml(input.question)}</p>`);
        if (input.authorization) bits.push(`<p><strong>授權：</strong>${escapeHtml(input.authorization.statement || input.authorization.scope || "")}</p>`);
        if (input.assets) bits.push(`<p><strong>資產數：</strong>${input.assets.length}</p>`);
        if (input.exposures) bits.push(`<p><strong>暴露數：</strong>${input.exposures.length}</p>`);
        if (input.evidence) bits.push(`<p><strong>證據數：</strong>${input.evidence.length}</p>`);
        if (input.uploaded_documents) bits.push(`<p><strong>上傳文件：</strong>${escapeHtml(input.uploaded_documents.map((d) => d.filename).join("、"))}</p>`);
        facts.innerHTML = bits.join("") || "<p>見左側案例輸入。</p>";
      }
      out.innerHTML = `
        <p class="sim-badge">尚未執行。按「執行示範規則」才會產生<strong>模擬結果</strong>。</p>
        <p class="muted">預期行為：</p>
        <ul>${listHtml(c.expectedBehavior)}</ul>
        <p class="muted">禁止行為：</p>
        <ul>${listHtml(c.forbiddenBehavior)}</ul>`;
    };

    const runDemo = () => {
      const c = cases.find((item) => item.id === select.value) || cases[0];
      const sim = simulateCase(c);
      const conf = (sim.expected.confidence || {});
      out.innerHTML = `
        <p class="sim-badge">模擬結果 · 本專案示範設計 · 不是 Gartner 官方規則</p>
        <p class="kicker">${escapeHtml(sim.verdict)}</p>
        <p>信心：<strong>${escapeHtml(conf.label || "n/a")}</strong>（${escapeHtml(String(conf.overall ?? "—"))}）— ${escapeHtml(conf.notes || "")}</p>
        <p>${escapeHtml(sim.expected.rationale || "")}</p>
        <h3>缺漏</h3>
        <ul>${sim.gaps.length ? sim.gaps.map((g) => `<li>${escapeHtml(g.gap_id || "")} ${escapeHtml(g.field || "")}：${escapeHtml(g.reason || "")}${g.blocking ? "（blocking）" : ""}</li>`).join("") : "<li>無 blocking 缺漏</li>"}</ul>
        <h3>矛盾</h3>
        <ul>${sim.conflicts.length ? sim.conflicts.map((g) => `<li>${escapeHtml(g.conflict_id || "")} ${escapeHtml(g.topic || "")} · ${escapeHtml(g.resolution || "")}</li>`).join("") : "<li>無未解矛盾</li>"}</ul>
        <h3>不可信片段</h3>
        <ul>${sim.untrusted.length ? sim.untrusted.map((g) => `<li>${escapeHtml(g.source || "")}：${escapeHtml(g.reason || "")}</li>`).join("") : "<li>無</li>"}</ul>
        <h3>候選發現</h3>
        <ul>${sim.findings.length ? sim.findings.map((g) => `<li>${escapeHtml(g.finding_id || "")} ${escapeHtml(g.title || "")}</li>`).join("") : "<li>無</li>"}</ul>
        <h3>3 Ds 建議（未執行）</h3>
        <ul>${sim.actions.length ? sim.actions.map((g) => `<li>${escapeHtml(g.action_id || g.id || "")} ${escapeHtml(g.class || g.kind || "")}：${escapeHtml(g.title || g.summary || "")}${g.do_not_execute ? "（不自動執行）" : ""}</li>`).join("") : "<li>本案例不給完整自動處置</li>"}</ul>
        <p class="muted">通過條件：${(c.passCriteria || []).map(escapeHtml).join("；")}</p>`;
    };

    select.addEventListener("change", show);
    if (run) run.addEventListener("click", runDemo);
    show();
  }

  function renderResearch(data) {
    const list = $("#research-list");
    if (!list) return;
    const docs = (data.docs || []).filter((d) => d.kind === "doc" || d.kind === "contract");
    list.innerHTML = [
      ...data.research.map(
        (a) => `<article class="tile">
          <p class="kicker">${escapeHtml(a.status)}</p>
          <h2>${escapeHtml(a.title)}</h2>
          <p>${escapeHtml(a.description || "研究正文，建置時自 research/ 同步。")}</p>
          <a class="btn" href="research-${escapeHtml(a.slug)}.html">在站內閱讀</a>
        </article>`
      ),
      ...docs.map(
        (a) => `<article class="tile">
          <p class="kicker">${escapeHtml(a.kind)} · ${escapeHtml(a.status)}</p>
          <h2>${escapeHtml(a.title)}</h2>
          <p>${escapeHtml(a.description || a.rel || "")}</p>
          <a class="btn" href="doc-${escapeHtml(a.id)}.html">在站內閱讀</a>
        </article>`
      ),
    ].join("");
  }

  function renderSources(data) {
    const body = $("#source-body");
    if (!body) return;
    body.innerHTML = data.catalog.sources
      .map(
        (s) => `<tr>
          <td>${escapeHtml(s.title)}<br><small>${escapeHtml(s.org)} ${escapeHtml(s.idCode || "")}</small></td>
          <td>${escapeHtml(s.datePublished || "—")}</td>
          <td>${escapeHtml(s.dateAccessed)}</td>
          <td>${escapeHtml(s.kind)}／${escapeHtml(s.confidence)}</td>
          <td>${escapeHtml(s.usedFor)}</td>
          <td>${escapeHtml(s.limit)}</td>
          <td>${s.url ? `<a href="${escapeHtml(s.url)}" rel="noopener noreferrer">查閱</a>` : "—"}</td>
        </tr>`
      )
      .join("");
    const pending = $("#pending-list");
    if (pending) {
      pending.innerHTML = data.catalog.pending.map((p) => `<li>${escapeHtml(p)}</li>`).join("");
    }
  }

  async function boot() {
    setNavCurrent();
    setupNav();
    setupCopy();
    let data = null;
    let index = [];
    try {
      data = await loadJson("data/site-data.json");
      index = await loadJson("data/search-index.json");
      fillFooter(data.version);
    } catch (err) {
      const el = $("#content-version");
      if (el) el.textContent = `無法載入內容資料：${err.message}`;
    }
    setupSearch(index);
    if (!data) return;
    const page = document.body.dataset.page;
    const renderers = {
      home: renderHome,
      methodology: renderMethodology,
      io: renderIo,
      platforms: renderPlatforms,
      skills: renderSkills,
      guide: renderGuide,
      demo: renderDemo,
      research: renderResearch,
      sources: renderSources,
    };
    if (renderers[page]) renderers[page](data);
  }

  boot();
})();
