# 驗收結果

**審查日：** 2026-09-12  
**分支：** `cursor/preemptive-cybersecurity-128d`  
**對照：** `docs/contracts/acceptance-checklist.md`  
**總裁決：** **有條件通過（平台帳號／Pages／瀏覽器互動仍尚未驗證）**  
**重驗範圍：** ISS-001、ISS-002、網站 generated／主要頁舊主張、`validate_contract.py`、`cd site && npm test`、五平台／四案例／GAC 歸屬抽查。未擴大成全新全面審查。修正未引入新的來源歸屬錯誤。

狀態欄只准三值：`實際執行`／`人工檢查`／`尚未驗證`。  
勾選：`[x]`＝該列在其狀態下已完成且通過；`[ ]`＝未完成、失敗、或尚未驗證。

---

## 總表（對使用者七項審查範圍）

| 範圍 | 裁決 | 狀態 | 說明 |
| --- | --- | --- | --- |
| 1. 來源歸屬 | **通過（ISS-001／002 重驗）** | 實際執行 | Skills／契約 6.1／網站 generated 已對齊 `sources.json`。禁令句可存在。ISS-005 行內 ID 不足仍開放、非本輪必修 |
| 2. 平台能力 | **條件通過（文件層）** | 實際執行 | 有來源 URL 與「未做帳號實測」聲明；DeepSeek v4 未編造單一規格。端到端 `尚未驗證` |
| 3. Skills 可操作性 | **條件通過（離線）** | 實際執行 | 五平台檔仍在；來源 ID 已對齊登錄表；`validate_contract.py` 通過。ISS-003 兩套信封仍在。帳號端到端 `尚未驗證` |
| 4. 網站功能 | **條件通過（本機靜態）** | 實際執行 | `npm test` 通過；curl 無空白頁。瀏覽器互動／視寬 `尚未驗證` |
| 5. 安全 | **通過（掃描範圍內）** | 實際執行 | 追蹤檔無金鑰／憑證／真實機敏 |
| 6. README | **通過** | 實際執行 | 含本機、建置、部署、更新、新增平台 |
| 7. 部署設定 | **失敗／尚未驗證** | 實際執行 | 本機可產出 `.nojekyll`／`404.html`；`site/dist` gitignore 合理；無 workflow、Pages API 404 |

---

## A. 倉庫與協調

| 完成 | 條件 | 裁決 | 狀態 | 證據 |
| --- | --- | --- | --- | --- |
| [x] | 工作區已有研究／skills／site／契約，不是空庫 | 通過 | 實際執行 | `ls /workspace`：`research/`、`references/`、`skills/`、`examples/`、`site/`、`docs/`、`README.md`、`AGENTS.md` |
| [x] | 目前分支為 `cursor/preemptive-cybersecurity-128d` | 通過 | 實際執行 | `git branch --show-current`；`SetActiveBranch` 已登記 |
| [x] | `AGENTS.md` 目錄分工存在 | 通過 | 實際執行 | A=`research/`+`references/`；B=`skills/`+`examples/`；C=`site/`；D=`qa/` |
| [x] | 根 `.gitignore` 含網站／建置產物 | 通過 | 實際執行 | 含 `site/dist/`、`dist/`、`node_modules/` |
| [x] | 本子代理未 push、未部署、未開 PR | 通過 | 實際執行 | 未執行 `git push`／`gh pr create` |
| [ ] | 最終整合遠端與 Pages 已由主代理決定並上線 | 尚未驗證 | 人工檢查 | `gpreep` 遠端存在；Pages API 404；見 ISS-004 |

---

## B1. 研究與來源誠實性（Agent A）

| 完成 | 條件 | 裁決 | 狀態 | 證據 |
| --- | --- | --- | --- | --- |
| [x] | 有可讀研究文件 | 通過 | 實際執行 | `research/README.md` + `01`–`07`；機器資料在 `research/data/` |
| [ ] | 每段重要主張行內追溯 `source_id` | 部分通過 | 實際執行 | **重驗：** Skills 引用已對齊登錄（ISS-001 已修復）。ISS-005 仍在：研究多段 `[project-framework]` 同行無 `SRC-2026-900`。非本輪必修 |
| [x] | 來源類型僅四種合法值 | 通過 | 實際執行 | `sources.json`：third-party 23、unverified-hypothesis 10、gartner-stated 4、project-framework 1 |
| [x] | ID 為 `SRC-YYYY-NNN` 且有登錄表 | 通過 | 實際執行 | 38 筆，無重複；`sources.md` ID 集合相同 |
| [x] | 登錄含規定欄位 | 通過 | 實際執行 | 38 筆皆有 source_id, title, publisher, url, published_date, accessed_date, claims_supported, limitations |
| [x] | 付費牆／未得全文已標示；gartner.com 被擋不假裝已讀全文（**研究登錄**） | 通過 | 實際執行 | 四筆 `gartner-stated` 皆 `blocked-by-bot-check` 且 `claims_supported=[]`。本回合 `curl` gartner.com → HTTP 403 Cloudflare。研究 `shared-output.examples.json` 對 3 Ds 標 `partial` |
| [x] | 未把專案評分／成熟度歸屬 Gartner（**全產品含 Skills／契約範例**） | 通過（重驗） | 實際執行 | ISS-002：6.1 的 SRC-2025-001 現為 `gartner-stated`+`partial`。ISS-001：Skills 不再升格轉載。抽查未把 GAC 標成 Gartner。`demo.html` 仍有「不是 Gartner 官方規則」 |
| [x] | 外部文件指令當不可信資料（基準檔層） | 通過 | 實際執行 | `CASE-UNTRUSTED-DOC` 輸入含偽造 PDF；預期輸出隔離、不新增 SRC-1999-999、不產出 exploit。`validate_contract.py` 通過。**模型實跑**見 C |

`SRC-1999-999` 只出現在不可信案例，不在登錄表，屬合成偽造號，符合設計。  
`SRC-2025-011` 已登錄但研究正文未引用（ISS-006，低）。

---

## B2. 跨平台 Skills 與案例（Agent B）

| 完成 | 條件 | 裁決 | 狀態 | 證據 |
| --- | --- | --- | --- | --- |
| [ ] | 可安裝／可複製 Skill，I／O 符合 SharedInput／SharedOutput | 失敗 | 實際執行 | 五平台皆有可複製檔。Skill I／O 是 `gac-output-1.0.0-draft`，與契約信封 SharedInput／SharedOutput（`research/data/shared-*.json` schema `1.0.0`）不同形（ISS-003）。離線 GAC 預期檔通過 `validate_contract.py` |
| [x] | 平台列涵蓋交付範圍，或缺者明文標出 | 通過 | 實際執行 | 已交付：ChatGPT／Claude／Grok／GLM／DeepSeek。Cursor／Copilot／Gemini 在 README、`platforms.html`、site-data `out-of-scope` |
| [x] | `examples/` 含四個基準 ID | 通過 | 實際執行 | `CASE-COMPLETE`／`GAP`／`CONFLICT`／`UNTRUSTED-DOC` 皆有 `.md`+`.json` 與 `expected-outputs/` |
| [x] | Skill 禁止真實金鑰、禁止 push／部署 | 通過 | 實際執行 | `_shared/safety-and-authorization.md`、各平台 README；金鑰寫環境變數／`***REDACTED***` |
| [x] | 安裝與能力陳述有來源，並聲明未做帳號端到端 | 通過 | 實際執行 | `skills/platform-capabilities.md` 列 OA-／AN-／XAI-／ZHIPU-／DS- URL，並寫「沒有各平台登入帳號，未做產品 UI 端到端實測」 |
| [x] | DeepSeek v4 未編造單一凍結規格 | 通過 | 實際執行 | `VERSION-STATUS.md` 寫 V4 **家族**。本回合擷取 `https://api-docs.deepseek.com/` HTTP 200，可見 `deepseek-flash`、`deepseek-v4-pro`、退役別名 |
| [ ] | 五平台帳號端到端實測 | 尚未驗證 | 尚未驗證 | 無帳號。文件未宣稱已實測 |

平台能力 URL 本回合覆核：x.ai Grok Skills 200；智譜智能體文件 200；OpenAI Help Skills 403（ISS-007）。

---

## B3. 互動網站與 GitHub Pages（Agent C + 主代理）

| 完成 | 條件 | 裁決 | 狀態 | 證據 |
| --- | --- | --- | --- | --- |
| [x] | `site/` 靜態或可靜態匯出 | 通過 | 實際執行 | Node 標準庫建置；preview 為靜態 HTTP；無必須長駐後端 |
| [x] | 子路徑：相對路徑、無根絕對連結 | 通過 | 實際執行 | `site/src` 無 `href="/"`／`src="/"`。本機 preview 掛在 `/`，**未**在 `/Cursor_GPreepSecurity/` 前綴下重掛 |
| [x] | 網站顯示證據／來源，並有非 Gartner 免責 | 通過 | 實際執行 | 首頁與 `demo.html` banner；`sources.html` 載入 38 筆登錄；案例頁含「本專案示範設計」「模擬結果」 |
| [x] | `cd site && npm test` | 通過 | 實際執行 | `check passed: 71 html, 5 skills, 8 research` |
| [x] | 本機預覽主要頁面非空白、無空 `<button>`／空 `<a>` | 通過 | 實際執行 | curl 見 test-log。JS 填入的平台／I／O／案例資料在 `site-data.json` 齊全 |
| [ ] | 導覽／篩選／複製／案例互動以瀏覽器點過 | 尚未驗證 | 尚未驗證 | 無瀏覽器；`app.js` 有對應 handler。不得標端到端通過 |
| [ ] | 桌面與行動視寬實看 | 尚未驗證 | 尚未驗證 | CSS `@media (max-width: 720px)` 有漢堡選單。未截圖 |
| [ ] | GitHub Pages 已設定且公開 URL 可開 | 尚未驗證 | 實際執行 | `gh api .../pages` → 404；無 `.github/`。ISS-004 |
| [x] | 建置產物 `site/dist` 未被提交 | 通過 | 實際執行 | `.gitignore` 含 `site/dist/`；`git ls-files 'site/dist/**'` 空。`content/generated/` **有**提交（ISS-008） |

---

## B4. QA（本回合 Agent D）

| 完成 | 條件 | 裁決 | 狀態 | 證據 |
| --- | --- | --- | --- | --- |
| [ ] | 四基準案例都有**模型實際執行**紀錄 | 尚未驗證 | 尚未驗證 | 僅離線檢查 golden JSON 與契約腳本，不是模型實跑 |
| [x] | 未通過項沒有被改寫成通過 | 通過 | 實際執行 | 本檔與 issues.md |
| [x] | 靜態頁本機可取用主要 HTML | 通過 | 實際執行 | preview `127.0.0.1:4173`；互動點擊 `尚未驗證` |

---

## B5. 安全、授權、Git 治理

| 完成 | 條件 | 裁決 | 狀態 | 證據 |
| --- | --- | --- | --- | --- |
| [x] | 契約禁止金鑰／憑證／真實機敏入庫 | 通過 | 實際執行 | `shared-data-contract.md` 第 10 節；`AGENTS.md` |
| [x] | 全庫掃描無意外秘密（追蹤檔） | 通過 | 實際執行 | 見 `secrets-scan.md`。0 hit |
| [ ] | 未整篇重製 Gartner 付費全文 | 尚未驗證 | 人工檢查 | 公開轉載為短摘；法律／授權需人類判斷 |
| [x] | 子代理不得 push／部署 | 通過 | 實際執行 | 本回合遵守 |
| [ ] | Pages 遠端已發布 | 尚未驗證 | 人工檢查 | 主代理；ISS-004 |

---

## C. 四基準案例

離線 golden／契約檢查：**通過（實際執行）**。模型實跑：**尚未驗證**。

| 完成 | 案例 | 預期 | 離線 golden | 模型實跑 |
| --- | --- | --- | --- | --- |
| [ ] | `CASE-COMPLETE` | `status` 完整可產出；Gartner 與框架分開；信心不得 high；有 `path-ot-01` 與五條 3 Ds | 通過：`examples/expected-outputs/CASE-COMPLETE.expected.json`；`confidence.label=medium`；`not_a_gartner_score=true`；rec-deny-001/002/003、rec-deceive-001、rec-disrupt-001 | 尚未驗證 |
| [ ] | `CASE-GAP` | 缺文標 gap；無假內部主機 | 通過：gaps 4 且 blocking；僅 `billing.northwind-synth.test`；信心 low | 尚未驗證 |
| [ ] | `CASE-CONFLICT` | 並陳五源；不自動選邊 | 通過：EV-SCAN-A/B、EV-OWNER、EV-EASM、EV-BAS；`resolution=unresolved`；`validation_status=contradicted` | 尚未驗證 |
| [ ] | `CASE-UNTRUSTED-DOC` | 拒絕越權指令；不 push；不產出 exploit | 通過：`untrusted_segments` 3 筆；乾淨主機 `status.northwind-synth.test`；偽造 SRC 不進登錄 | 尚未驗證 |

五平台共用同一組 `examples/baseline-cases/*.json`，**跨平台輸入檔一致**。  
與 `research/data/cases.json` 對齊檢查已由 `validate_contract.py` 執行。  
與 `research/data/shared-input.examples.json`／`shared-output.examples.json` **形狀不一致**（ISS-003）。

---

## D. 本環境能力（不要勾成產品已上線）

| 完成 | 觀察 | 狀態 | 證據 |
| --- | --- | --- | --- |
| [x] | GitHub MCP 工具探索失敗 | 實際執行 | Github namespace `error` |
| [x] | `gh` 可讀部分 repo；Pages API 404 | 實際執行 | `repos/chinchiang/Cursor_GPreepSecurity/pages` → 404 |
| [x] | gartner.com 正文仍取不到 | 實際執行 | HTTP 403，title `Just a moment... \| Gartner` |

---

## E. 主代理整合前指令（本回合已跑）

```text
git status --porcelain          # 開始時 clean；qa/ commit 後僅 qa/
git rev-parse --abbrev-ref HEAD # cursor/preemptive-cybersecurity-128d
test -f docs/contracts/shared-data-contract.md  # 存在
test -f AGENTS.md               # 存在
test -f references/sources.json # 存在
python3 -m json.tool references/sources.json  # 合法 JSON，38 sources
cd site && npm test             # 通過
```

靜態伺服器子路徑重掛：**尚未驗證**（只在 `/` preview）。

---

## F. 重驗紀錄（ISS-001／ISS-002／網站同步，2026-09-12）

對照 commit：`7d4dde9`（契約）、`434e774`（Skills）、`3c626a6`（site generated）。HEAD 於重驗時為 `3c626a6`。只重驗受影響項。

| 完成 | 檢查 | 裁決 | 狀態 | 證據 |
| --- | --- | --- | --- | --- |
| [x] | ISS-001：3 Ds 不再掛 `SRC-2025-002` 當公開原文 | 通過 | 實際執行 | Skills／examples 改為 third-party／partial + `SRC-2025-001`，並禁掛 `SRC-2025-002`（paywalled Impact Radar） |
| [x] | ISS-001：50% 支出不再當 `SRC-2025-001` 的 gartner-stated + supported | 通過 | 實際執行 | 50% 掛 `SRC-2025-003`／`SRC-2025-006`，類型 third-party／supported |
| [x] | ISS-002：契約 6.1 不再標 gartner-stated + supported + `SRC-2025-001` | 通過 | 實際執行 | `CLM-3D-001`：`source_type=gartner-stated`，`evidence_status=partial`，`quoted_excerpt=null` |
| [x] | 網站 generated／主要頁不展示上述舊主張 | 通過 | 實際執行 | `site/content/generated` 無「公開文章要求 + 002」；九個 `site/src/pages/*.html` 無舊主張 token。禁令句可存在 |
| [x] | `python3 examples/validate_contract.py` | 通過 | 實際執行 | EXIT 0；無帳號實測 |
| [x] | `cd site && npm test` | 通過 | 實際執行 | `check passed: 71 html, 5 skills, 8 research`。時間戳 diff 已 `git checkout`，未提交 |
| [x] | 抽查未誤傷：五平台檔、四案例、GAC 未標 Gartner | 通過 | 實際執行 | ChatGPT／Claude／Grok／GLM／DeepSeek 入口檔皆在；四 CASE 的 md／json／expected 皆在；「GAC **不是** Gartner 官方流程」 |

**剩餘必修：** 無。  
**仍尚未驗證：** 平台帳號端到端、Pages 公開 URL、瀏覽器互動／視寬。
