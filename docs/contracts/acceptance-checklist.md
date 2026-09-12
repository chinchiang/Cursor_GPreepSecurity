# 驗收清單

狀態欄只能用下列三值，不可發明「幾乎完成」「看起來 OK」：

| 狀態 | 意義 |
| --- | --- |
| `實際執行` | 本回合已用指令、瀏覽器或檔案核對，結果寫在「證據」欄 |
| `人工檢查` | 需要人類打開付費文獻、GitHub 設定頁、或判斷法律／品牌風險 |
| `尚未驗證` | 依賴其他代理尚未交付的目錄，或本環境權限不足 |

勾選盒：`[x]`＝該列狀態下已完成；`[ ]`＝未完成。`尚未驗證` 的列即使有設計文件也保持 `[ ]`。

---

## A. 倉庫與協調（Lead Setup 本回合）

| 完成 | 條件 | 狀態 | 證據 |
| --- | --- | --- | --- |
| [x] | 檢查工作區結構、根目錄檔案、是否空庫 | 實際執行 | `/workspace` 僅有 `README.md` + `.git`；`find` 無 `site/`、`package.json`、`.github/` |
| [x] | 檢查 `AGENTS.md`（當時不存在則建立） | 實際執行 | `main` 無 `AGENTS.md`；本分支新建 |
| [x] | 檢查 Cursor 專案規則與 `.github/` | 實際執行 | 工作區無 `.cursor/rules`、無 `.github/`；家目錄僅有 Cursor skills／hooks |
| [x] | 檢查既有網站技術棧 | 實際執行 | `main` 無前端棧；`origin/cursor/security-review-core-4044` 為另一套 Python 產品 |
| [x] | 檢查 Git 狀態、遠端、分支、未提交變更 | 實際執行 | 開始時 `main` 乾淨、與 `origin/main` 同步；遠端 `Cursor_MultiAgent` |
| [x] | 建立並切換 `cursor/preemptive-cybersecurity-128d` | 實際執行 | `git checkout -b cursor/preemptive-cybersecurity-128d`；`SetActiveBranch` 已登記 |
| [x] | 唯讀檢查 GitHub：目標庫與工作區庫 | 實際執行 | `gh repo view`／`gh api`；見 handoff-log |
| [x] | 建立 `docs/contracts/shared-data-contract.md` | 實際執行 | 含 schema 與四案例完整 JSON |
| [x] | 建立 `docs/contracts/source-citation-rules.md` | 實際執行 | 含登錄欄位與付費牆標示 |
| [x] | 建立本清單 | 實際執行 | 本檔 |
| [x] | 建立 `docs/orchestration/task-board.md` | 實際執行 | 含 A／B／C／D／主代理 |
| [x] | 建立 `docs/orchestration/handoff-log.md` | 實際執行 | 含倉庫現況與假設 |
| [x] | 更新／建立 `AGENTS.md` 責任分工 | 實際執行 | A=`research/`+`references/` 等 |
| [x] | 根目錄 `.gitignore` 含網站／建置產物 | 實際執行 | 新建 |
| [x] | README 既存在則只加協調小節 | 實際執行 | 未重寫原標題 |
| [x] | 未寫入 `research/`、`references/`、`skills/`、`examples/`、`site/`、`qa/` 內容檔 | 實際執行 | 目錄不存在 |
| [x] | 本子代理未 push、未部署、未開 PR、未強制推送、未合併 | 實際執行 | 無 `git push`；無 `gh pr create` |
| [x] | 未覆寫使用者既有未提交變更 | 實際執行 | 開始時 working tree clean |

---

## B. 使用者提出的產品驗收條件（全平台）

以下對應「先制型資安平台」主任務與其子代理職責，不是只驗契約檔是否存在。

### B1. 研究與來源誠實性（Agent A）

| 完成 | 條件 | 狀態 | 證據 |
| --- | --- | --- | --- |
| [ ] | 先制型資安方法論有可讀研究文件，且每段重要主張行內追溯 `source_id` | 尚未驗證 | 等待 `research/` |
| [ ] | 來源類型僅使用 `gartner-stated`／`third-party`／`project-framework`／`unverified-hypothesis` | 尚未驗證 | 契約已定；產物未交 |
| [ ] | 來源 ID 使用 `SRC-YYYY-NNN` 並有登錄表 | 尚未驗證 | 等待 `references/` |
| [ ] | 登錄表含 source_id, title, publisher, url, published_date, accessed_date, claims_supported, limitations | 尚未驗證 | 規則已寫；表未建 |
| [ ] | 付費牆或未得全文已標示，未編造頁碼／圖表／完整技術名單 | 尚未驗證 | Lead 對 gartner.com 取用失敗，A 須重試 |
| [ ] | 未把自行設計的評分／成熟度模型歸屬於 Gartner | 尚未驗證 | 契約禁止；網站／研究未交 |
| [ ] | 外部文件指令被當成不可信資料 | 尚未驗證 | 等 `CASE-UNTRUSTED-DOC` 實跑 |

### B2. 跨平台 Skills 與案例（Agent B）

| 完成 | 條件 | 狀態 | 證據 |
| --- | --- | --- | --- |
| [ ] | 存在可安裝／可複製的 Skill，輸入輸出符合 SharedInput／SharedOutput | 尚未驗證 | 等待 `skills/` |
| [ ] | 平台列涵蓋 Cursor、Claude、Gemini、ChatGPT、GitHub Copilot（或明文標缺哪一個） | 尚未驗證 | schema 已定 |
| [ ] | `examples/` 含 `CASE-COMPLETE`、`CASE-GAP`、`CASE-CONFLICT`、`CASE-UNTRUSTED-DOC` | 尚未驗證 | 契約有完整 JSON；examples 未建 |
| [ ] | Skill 禁止要求貼真實金鑰、禁止 push／部署 | 尚未驗證 | 契約 `forbids` 已列 |

### B3. 互動網站與 GitHub Pages（Agent C + 主代理部署）

| 完成 | 條件 | 狀態 | 證據 |
| --- | --- | --- | --- |
| [ ] | `site/` 為靜態或可靜態匯出，無必須長駐的後端 | 尚未驗證 | `main` 無既有棧；契約指定 HTML／CSS／JS |
| [ ] | 正確處理專案子路徑（`SITE_BASE`） | 尚未驗證 | 契約第 11 節 |
| [ ] | 網站顯示證據標示與來源，不在文末才第一次出現 | 尚未驗證 | 等 C |
| [ ] | 專案分數／燈號有「非 Gartner」免責 | 尚未驗證 | 等 C |
| [ ] | GitHub Pages 已設定且公開 URL 可開啟 | 尚未驗證 | 兩庫目前 `has_pages=false` 或空庫；子代理不得部署 |
| [ ] | 建置產物未被提交 | 人工檢查 | `.gitignore` 已加；提交前主代理再看 `git status` |

### B4. QA（Agent D）

| 完成 | 條件 | 狀態 | 證據 |
| --- | --- | --- | --- |
| [ ] | 四個基準案例都有實際執行紀錄，不是只複製契約範例 | 尚未驗證 | 等待 `qa/` |
| [ ] | 未通過項沒有被改寫成通過 | 尚未驗證 | 等 D |
| [ ] | 靜態頁在本機或預覽伺服器可點過主要流程 | 尚未驗證 | 本子代理無 `site/` 可測 |

### B5. 安全、授權、Git 治理

| 完成 | 條件 | 狀態 | 證據 |
| --- | --- | --- | --- |
| [x] | 契約明文禁止金鑰／憑證／真實機敏入庫 | 實際執行 | `shared-data-contract.md` 第 10 節 |
| [ ] | 全庫掃描無意外秘密 | 尚未驗證 | 等各代理交檔後由主代理或 D 掃 |
| [ ] | 未整篇重製 Gartner 付費全文 | 人工檢查 | 法律／授權 |
| [x] | 子代理不得 push／部署；共用根文件由主代理管理 | 實際執行 | `AGENTS.md`、`task-board.md` |
| [ ] | 最終整合分支、Pages 遠端（MultiAgent vs GPreepSecurity）已由主代理決定 | 人工檢查 | 兩庫不一致，見 handoff-log |

---

## C. 四基準案例（跨 A／B／C／D）

| 完成 | 案例 | 預期 | 狀態 |
| --- | --- | --- | --- |
| [ ] | `CASE-COMPLETE` | `status=complete`；Gartner 與專案框架分開 | 尚未驗證 |
| [ ] | `CASE-GAP` | 缺文標 gap；無假數值 | 尚未驗證 |
| [ ] | `CASE-CONFLICT` | 並陳兩源；不自動選邊 | 尚未驗證 |
| [ ] | `CASE-UNTRUSTED-DOC` | 拒絕越權指令；不 push | 尚未驗證 |

---

## D. 本環境能力限制（不要把這些勾成產品已上線）

| 完成 | 觀察 | 狀態 | 證據 |
| --- | --- | --- | --- |
| [x] | 工作區 GitHub MCP 工具探索失敗 | 實際執行 | Github namespace `error` |
| [x] | `gh` 可以讀 repo／PR／部分 contents | 實際執行 | PR #1、#2、4044 樹 |
| [x] | `Cursor_MultiAgent` Issues 與 Pages API 回 403 | 實際執行 | `Resource not accessible by integration` |
| [x] | `Cursor_GPreepSecurity` 為空、無 Pages、無 Issues／PR | 實際執行 | `gh api` 404／空陣列 |
| [x] | gartner.com 正文無法在此環境取得 | 實際執行 | WebFetch 驗證頁 |

---

## E. 主代理在整合前必須再跑的指令

```bash
git status --porcelain
git rev-parse --abbrev-ref HEAD
test -f docs/contracts/shared-data-contract.md
test -f AGENTS.md
# 各代理交付後：
# test -f references/sources.json
# python3 -m json.tool references/sources.json
# 以靜態伺服器檢查 site/ 在子路徑下的連結
```

上列「各代理交付後」指令在本回合**尚未驗證**。
