# 測試紀錄

**日期：** 2026-09-12（UTC）  
**CWD：** `/workspace`  
**分支：** `cursor/preemptive-cybersecurity-128d`（開始時 `HEAD=cfc9f0f`）  
**原則：** 只記錄實際執行的指令。未列出的就不是本回合證據。

---

## 1. 倉庫狀態

```text
$ git status && git branch --show-current && git log -5 --oneline
On branch cursor/preemptive-cybersecurity-128d
nothing to commit, working tree clean
cursor/preemptive-cybersecurity-128d
cfc9f0f 整合 Agent C 網站並對齊五平台與基準案例
6aa096b 對齊契約的先制資安研究檔與來源登錄表
d2aa3ea 新增五平台 GAC skills 與 Northwind 基準案例
...
```

`SetActiveBranch`：`cursor/preemptive-cybersecurity-128d`。未切走。

---

## 2. 來源交叉比對（Python）

對 `references/sources.json`：

- 38 筆、無重複 ID
- 必填欄位無缺
- 類型：third-party 23、unverified-hypothesis 10、gartner-stated 4、project-framework 1
- `full_text_status`：retrieved 18、paywalled 9、blocked-by-bot-check 5、summary-only 4、unavailable 2
- **所有 `gartner-stated` 的 `claims_supported` 皆為空陣列**
- `sources.md` 與 JSON 的 ID 集合相同
- 研究引用但不在登錄：僅 `SRC-1999-999`（不可信案例偽造號）
- 登錄但研究未引用：`SRC-2025-011`

Skills 內 `SRC-2025-002` 被當成公開文章 3 Ds（與登錄相反）。見 ISS-001。

---

## 3. `python3 examples/validate_contract.py`

```text
OK: contract, four baseline expected outputs, skill frontmatter, research alignment
Note: no live ChatGPT/Claude/Grok/GLM/DeepSeek account test was run.
EXIT:0
```

腳本聲明：無即時帳號測試。本 QA 不把此輸出解釋成平台端到端通過。

---

## 4. `cd site && npm test`

```text
> test
> node scripts/sync-content.js && node scripts/build.js && node scripts/check.js

synced research=8 (repo:research/) skills=5 docs=48
built /workspace/site/dist
check passed: 71 html, 5 skills, 8 research
EXIT:0
```

副作用：改寫 `site/content/generated/site-data.json`、`version.json` 時間戳。已執行：

```text
git checkout -- site/content/generated/site-data.json site/content/generated/version.json
```

確認 working tree 回到乾淨（在寫入 `qa/` 之前）。**未**把 generated 變更提交。

---

## 5. 本機 preview + curl

```text
$ cd site && npm run preview
preview http://127.0.0.1:4173/
```

| URL | HTTP | bytes | 備註 |
| --- | ---: | ---: | --- |
| `/` `index.html` | 200 | 5216 | `zh-Hant`、skip-link、`#main`、導覽 |
| `/methodology.html` | 200 | 4784 | |
| `/io.html` | 200 | 4431 | |
| `/platforms.html` | 200 | 4457 | |
| `/skills.html` | 200 | 3541 | |
| `/guide.html` | 200 | 4149 | |
| `/demo.html` | 200 | 5208 | 含「本專案示範設計」「不是 Gartner」 |
| `/research.html` | 200 | 3420 | |
| `/sources.html` | 200 | 3659 | |
| `/404.html` | 200 | 3405 | |
| `/this-path-does-not-exist` | **404** | 3405 | 回 `404.html`；title「找不到頁面」 |
| `/css/main.css` | 200 | 9504 | |
| `/js/app.js` | 200 | 22477 | |
| `/data/site-data.json` | 200 | 1371403 | 五平台 + 四案例 expected |
| `/data/search-index.json` | 200 | 251072 | |
| `/.nojekyll` | 200 | 0 | build 產出 |
| `/skill-chatgpt-preemptive-cyber-review.html` | 200 | 11433 | |
| `/research-01-definition-and-scope.html` | 200 | 38274 | |
| `/data/skills/*-preemptive-cyber-review.SKILL.md` | 200 | 各平台皆在 | GLM／DeepSeek 為系統提示檔名仍用 `.SKILL.md` 下載別名 |

十個 HTML 頁：無空 `<button>`、無空 `<a>`、無 `href="/..."` 絕對站內路徑。

**未做：** 真實瀏覽器點擊搜尋、I／O 篩選、一鍵複製、案例「執行示範規則」、720px 漢堡選單。`app.js` 有對應程式。互動標 `尚未驗證`。

---

## 6. 外部 URL

| URL | 結果 | 用途 |
| --- | --- | --- |
| `https://www.gartner.com/en/articles/preemptive-cybersecurity-solutions` | HTTP 403，Cloudflare「Just a moment...」 | 證實仍 blocked |
| `https://api-docs.deepseek.com/` | 200 | 見 `deepseek-flash`、`deepseek-v4-pro`、退役 flash 別名 |
| `https://api-docs.deepseek.com/updates` | 302 → `/updates/` | Agent B 曾記 409；本回合是 302，**未**再跟完整文 |
| `https://help.openai.com/en/articles/20001066-skills-in-chatgpt` | 403 | 無法覆核 ChatGPT Skills 方案 |
| `https://x.ai/news/grok-skills` | 200 | 標題含 Skills |
| `https://docs.bigmodel.cn/cn/guide/platform/intelligent-agent` | 200 | 智能體／System Prompt |

---

## 7. GitHub 唯讀

```text
$ gh api repos/chinchiang/Cursor_GPreepSecurity/pages
{"message":"Not Found", ... "status":"404"}
```

GitHub MCP namespace：`error`（工具探索失敗）。  
遠端：`origin` → Cursor_MultiAgent；`gpreep` → Cursor_GPreepSecurity。未 push。

---

## 8. 機敏掃描

見 [secrets-scan.md](secrets-scan.md)。追蹤檔 0 hit。

---

## 9. 刻意沒有跑的指令

- 任何平台 API（無金鑰）
- `git push`、`gh pr create`、Pages 部署
- 瀏覽器 E2E
- 在 `/Cursor_GPreepSecurity/` 子路徑重掛靜態伺服器

---

## 10. 重驗回合（ISS-001／ISS-002，同一日稍後）

**HEAD：** `3c626a6`（其前 `434e774` Skills、`7d4dde9` 契約）  
**分支：** `cursor/preemptive-cybersecurity-128d`（未切走、未 push）  
**範圍：** 只重驗 ISS-001／002 與網站同步；不重跑機敏掃描、Pages API、gartner.com curl、本機 preview。

### 10.1 登錄表核對

```text
SRC-2025-001  gartner-stated          blocked-by-bot-check  claims_supported=[]
SRC-2025-002  unverified-hypothesis   paywalled             claims_supported=[]
SRC-2025-003  third-party             retrieved             50% 轉載
SRC-2025-006  third-party             retrieved             50% 轉載
```

### 10.2 Skills／examples 殘留舊主張

掃 `skills/`、`examples/`（排除 `validate_contract.py` 偵測字串本身）：

- 「公開文章要求 … SRC-2025-002」：**0**
- 「50% 與 SRC-2025-001 同行且無 003／006」且非禁令句：**0**
- 「可引用的 gartner-stated 句子」僅出現在「不得寫／禁止」句（允許）

契約 6.1 `CLM-3D-001`：`gartner-stated` + **`partial`**（不再是 supported）。`CLM-SPEND-50`：third-party + supported + 003／006。

### 10.3 網站

`site/src/pages/*.html`：無 `SRC-2025-002`、無「50% + SRC-2025-001」、無正向 gartner-stated 舊主張。  
`site/content/generated`：無「公開文章要求 + 002」舊句；內容為同步後的 third-party／partial／禁令。

### 10.4 回歸

```text
$ python3 examples/validate_contract.py
OK: contract, four baseline expected outputs, skill frontmatter, research alignment
Note: no live ChatGPT/Claude/Grok/GLM/DeepSeek account test was run.
EXIT:0
```

```text
$ cd site && npm test
synced research=8 (repo:research/) skills=5 docs=48
built /workspace/site/dist
check passed: 71 html, 5 skills, 8 research
EXIT:0
```

副作用：改寫 `site/content/generated/site-data.json`、`version.json` 時間戳（各 4 行）。已執行：

```text
git checkout -- site/content/generated/site-data.json site/content/generated/version.json
```

**未**把 generated 變更提交。working tree 在寫入 `qa/` 前乾淨。

### 10.5 誤傷抽查

| 檢查 | 結果 |
| --- | --- |
| ChatGPT `SKILL.md`／`gpt-instructions.md`／`project-instructions.md` | 在 |
| Claude `SKILL.md`／`project-instructions.md` | 在 |
| Grok `SKILL.md` | 在 |
| GLM `agent-system-prompt.md` | 在 |
| DeepSeek `system-prompt.md` | 在 |
| `CASE-COMPLETE`／`GAP`／`CONFLICT`／`UNTRUSTED-DOC` 的 md＋json＋expected | 皆在 |
| GAC 標成 Gartner 官方 | 未發現；命中皆為「GAC **不是** Gartner 官方流程」 |

### 10.6 刻意沒有重跑

- 機敏掃描、Pages API、gartner.com、本機 preview／curl
- 平台 API／帳號、瀏覽器 E2E、`git push`
