# 問題清單

嚴重程度：`高`＝阻擋產品驗收；`中`＝必須在整合前處理或明確接受風險；`低`＝紀錄，不單獨阻擋。

建議責任：A=`research/`／`references/`；B=`skills/`／`examples/`；C=`site/`；主代理＝契約、README、Git、Pages。

---

## ISS-001（高）Skills 把 SRC-2025-001／002 對到舊號，並升格為 gartner-stated — **已修復**（2026-09-12 重驗）

- **位置：**
  - `skills/_shared/core-instructions.md`、`skills/_shared/task-spec.md`
  - `skills/chatgpt/preemptive-cyber-review/SKILL.md`、`gpt-instructions.md`、`project-instructions.md` 與 `references/` 副本
  - `skills/claude/preemptive-cyber-review/SKILL.md` 與 `references/`
  - `skills/grok/preemptive-cyber-review/SKILL.md` 與 `references/`
  - `skills/glm/agent-system-prompt.md`
  - `skills/deepseek/system-prompt.md`
- **重現（第一輪失敗）：**
  1. `python3 -c "import json; from pathlib import Path; s=json.loads(Path('references/sources.json').read_text());
print([(x['source_id'], x['source_type'], x['full_text_status'], x['title'][:50]) for x in s['sources'] if x['source_id'] in ('SRC-2025-001','SRC-2025-002','SRC-2025-003')])"`
  2. `rg -n "SRC-2025-002" skills --glob '*.md'`
- **期望：** 登錄表為唯一發號。`SRC-2025-001`＝公開文章（blocked，`claims_supported=[]`）。`SRC-2025-002`＝Impact Radar（paywalled）。3 Ds／「發動或成功前」最多標 third-party／partial，且不得寫成「可引用的 gartner-stated 句子」。50% 支出等已讀轉載應掛 `SRC-2025-003`／`SRC-2025-006`，類型 `third-party`。
- **第一輪實際：** Skills 寫「公開文章要求 Deny/Disrupt/Deceive [SRC-2025-002]」，把 50%／AI-ML 掛 `[SRC-2025-001][SRC-2025-003]`。ChatGPT `project-instructions.md` 第 6 點把 `SRC-2025-001` 至 `006` 與 `SRC-2022-001` 全部當成可引用 gartner-stated。
- **重驗實際（已修復）：**
  1. 登錄表仍為 `001`＝公開文章 `gartner-stated`／`blocked-by-bot-check`／`claims_supported=[]`；`002`＝Impact Radar `unverified-hypothesis`／`paywalled`；`003`／`006`＝已讀轉載 `third-party`／`retrieved`。
  2. Skills／examples 已改為：3 Ds 標 **[third-party；partial]** 並掛 `[SRC-2025-001]`，並寫「不要／禁止把 3 Ds 掛到 [SRC-2025-002]」。50% 支出標 **[third-party；supported]** 並掛 `[SRC-2025-003][SRC-2025-006]`。
  3. 掃 `skills/`、`examples/`：無「公開文章要求 … SRC-2025-002」；無「50% 與 SRC-2025-001 同行且缺少 003／006」的正向主張。殘留的「可引用的 gartner-stated 句子」皆在**禁令**句（「不得寫」），允許存在。
  4. 對應 commit：`434e774`（Skills）、`3c626a6`（網站 generated 同步）。
- **建議責任：** 原為 Agent B。本輪無需再改 Skills。

---

## ISS-002（中）契約 SharedOutput 範例仍標 gartner-stated + supported — **已修復**（2026-09-12 重驗）

- **位置：** `docs/contracts/shared-data-contract.md` 第 6.1 節 CASE-COMPLETE 範例
- **重現（第一輪失敗）：** 搜尋該檔 `evidence_status": "supported"` 與 `SRC-2025-001` 的同一 claim 物件。
- **期望：** 官方 URL `full_text_status=blocked-by-bot-check` 時，不得出現 `gartner-stated` + `supported`。Agent A 的 `research/data/shared-output.examples.json` 已改為 `partial`，契約範例應一致。
- **第一輪實際：** 契約範例仍是舊的 supported + 摘錄，與 `source-citation-rules.md`、`sources.json` 衝突。
- **重驗實際（已修復）：** 6.1 現為三筆 claim：
  - `CLM-SPEND-50`：`source_ids=["SRC-2025-003","SRC-2025-006"]`，`source_type=third-party`，`evidence_status=supported`（已讀轉載，合法）。
  - `CLM-3D-001`：`source_ids=["SRC-2025-001"]`，`source_type=gartner-stated`，**`evidence_status=partial`**，`quoted_excerpt=null`，`gap_reason` 寫 blocked-by-bot-check。**不再**是 `gartner-stated` + `supported`。
  - `CLM-SCORE-001`：`project-framework` + `supported`（SRC-2026-900），燈號聲明非 Gartner。
  - 對應 commit：`7d4dde9`。
- **建議責任：** 原為主代理。本輪無需再改契約。

---

## ISS-003（中）同一案例 ID 存在兩套不相容 I／O

- **位置：**
  - 契約信封：`research/data/shared-input.examples.json`、`shared-output.examples.json`（`schema_version=1.0.0`，欄位 `request_id`／`payload`／`claims`）
  - GAC Skill：`examples/baseline-cases/*.json`、`examples/expected-outputs/*.expected.json`（`task=preemptive-cyber-review`，欄位 `assets`／`evidence`／`confidence`）
- **重現：** 比較 `CASE-COMPLETE` 兩邊的 top-level keys（見 `qa/data/case-schema-diff.json`）。
- **期望：** 五平台「同一組輸入輸出」應指向同一 JSON 形狀；或在 README／io-contract 用粗體標明「貼 Skill 請用 examples/，契約信封是研究階段」。
- **實際：** 五平台 Skill 彼此一致（都指 `examples/`）。研究信封與 Skill 信封不能互換。`validate_contract.py` 只驗 GAC 形。使用者若把 `shared-input.examples.json` 貼進 Skill，會缺 `authorization`／`assets`。
- **建議責任：** Agent A + Agent B 對齊文件；主代理若要單一 schema 則改契約。

---

## ISS-004（中）GitHub Pages 未設定、無發佈 workflow

- **位置：** 倉庫根（缺 `.github/`）；遠端 `chinchiang/Cursor_GPreepSecurity`
- **重現：**
  1. `ls .github` → 不存在
  2. `gh api repos/chinchiang/Cursor_GPreepSecurity/pages` → HTTP 404
- **期望：** 若要滿足清單「Pages 已設定且公開 URL 可開啟」，需主代理建立 workflow、把 `site/dist` 發到 Pages 根，並保留 `404.html` 與 `.nojekyll`。
- **實際：** README／`site/README.md` 已說明要發佈 **建置後的 dist**，且 `site/dist` 被 gitignore（合理）。本機 `npm run build` 會寫出 `dist/.nojekyll` 與 `dist/404.html`。線上未部署。子代理不得部署。
- **建議責任：** 主代理。

---

## ISS-005（中）研究多段 project-framework 未行內掛 SRC-2026-900

- **位置：** `research/01-definition-and-scope.md`、`02-related-concepts.md`、`03-analysis-process.md` 等多處 `**[project-framework]**` 段落
- **重現：** 搜尋 `[project-framework]` 同行是否含 `SRC-2026-900`。
- **期望：** 清單 B1「每段重要主張行內追溯 source_id」。流程／操作定義應掛 `SRC-2026-900`。
- **實際：** 檔首與部分段落有 ID；多數操作定義只有分類標籤。未把 GAC 寫成 Gartner，但嚴格追溯不足。
- **建議責任：** Agent A。

---

## ISS-006（低）SRC-2025-011 已登錄、研究未用

- **位置：** `references/sources.json`（CounterCraft 摘要，`summary-only`）
- **重現：** 研究樹搜尋 `SRC-2025-011` → 無。
- **期望：** 未引用來源可留作登錄，但應在 `sources.md` 標「未引用」或從正文引用其摘要限制。
- **實際：** 孤兒列。不影響已引用主張。
- **建議責任：** Agent A。

---

## ISS-007（低）本回合無法覆核 OpenAI Help；ChatGPT Skills 適用方案仍待帳號

- **位置：** `skills/platform-capabilities.md`（OA-SKILL-HELP）
- **重現：** `curl -sS -o /dev/null -w '%{http_code}' https://help.openai.com/en/articles/20001066-skills-in-chatgpt` → 403
- **期望：** 能力表所引官方頁可被第三方覆核，或標「本環境 Help 403、待人工打開」。
- **實際：** 文件已寫未做 UI 實測。本回合 Help 也被擋，**不能**獨立確認 Business／Enterprise 限定。x.ai 與智譜文件本回合 200。
- **建議責任：** Agent B 補「覆核狀態」；驗收維持尚未驗證，不當成已實測。

---

## ISS-008（低）`site/content/generated/` 已提交，`npm test` 會改時間戳

- **位置：** `site/content/generated/site-data.json`、`version.json`、`search-index.json`
- **重現：** `cd site && npm test` 後 `git status` 出現 generated 檔（本回合已 `git checkout --` 還原，未提交）。
- **期望：** generated 若當建置中間物，應 gitignore；若要提交，應避免無意義時間戳 diff。
- **實際：** `site/dist` 正確被 ignore。generated 被追蹤。
- **建議責任：** Agent C。

---

## ISS-009（低）`app.js` 殘留未掛載的示範計分函式

- **位置：** `site/src/js/app.js` 的 `demoScore`、`assetScore`、`recommend`
- **重現：** 函式已定義；`renderDemo` 改讀 `expected` JSON，不呼叫上述函式。
- **期望：** 使用者可見的分數只來自已標示的 GAC 預期輸出，死碼應刪以免日後誤接成「另一套分數」。
- **實際：** 目前 UI 未顯示該公式。不是假按鈕。
- **建議責任：** Agent C。

---

## 必須先修（整合前）

**本輪無剩餘必須先修項。** ISS-001、ISS-002 已修復（重驗通過）。

其餘仍開放、**不單獨阻擋**本輪有條件通過：ISS-003（兩套 I／O）、ISS-004（Pages／workflow 未上線）、ISS-005（研究多段未行內掛 SRC-2026-900）。平台帳號、瀏覽器互動仍 `尚未驗證`。
