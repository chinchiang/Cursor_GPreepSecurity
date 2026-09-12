# Cursor_MultiAgent

## 專案協調／目錄責任

先制型資安平台工作（分支 `cursor/preemptive-cybersecurity-128d`）的目錄責任如下。細節以 `AGENTS.md` 與 `docs/contracts/` 為準。

| 角色 | 擁有目錄 |
| --- | --- |
| Agent A | `research/`、`references/` |
| Agent B | `skills/`、`examples/` |
| Agent C | `site/` |
| Agent D | `qa/` |
| 主代理 | 根文件、Git、部署；`docs/contracts/`、`docs/orchestration/` |

本工作區 clone 來源（`origin` → Cursor_MultiAgent）與交付庫（`gpreep` → Cursor_GPreepSecurity）不同，不要把本專案推進 MultiAgent 的 main。

子代理不得 push 或部署。共用根文件由主代理管理。來源類型、schema 與基準案例見 `docs/contracts/shared-data-contract.md`。

---

## 本專案是什麼

把公開可核對的 **Preemptive Cybersecurity** 概念編成：

- 方法論與來源登錄（`research/`、`references/`）
- 五平台同一套 **GPreep Analysis Cycle（GAC）** 工作流程（`skills/`）
- 四個合成基準案例（`examples/baseline-cases/`）
- GitHub Pages 靜態站（`site/`）

GAC、信心分數與示範權重是 **project-framework**，不是 Gartner 官方流程或成熟度模型。

**已交付平台：** ChatGPT、Claude、Grok、GLM、DeepSeek。  
**非本專案交付範圍：** Cursor、GitHub Copilot、Gemini（倉庫沒有對應 GAC skill）。

---

## 本機使用

需要 Git 與 Node.js 18+。示範不需 API 金鑰。

```bash
git clone <此倉庫>
cd <repo>
cd site
npm run build
npm run preview
```

瀏覽器開啟 `http://127.0.0.1:4173/`。不要用 `file://` 開頁：搜尋與篩選依賴 `fetch` 讀 `data/site-data.json`。

若只想用系統 Python 當靜態伺服器：

```bash
cd site
npm run build
python3 -m http.server 4173 --directory dist
```

網站建置會讀倉庫的 `research/`、`skills/`、`docs/contracts/`、`references/`、`examples/`，寫入 `site/content/generated/` 再複製到 `site/dist/`。頁腳顯示同步時間與來源。後備稿只在對應目錄不存在時使用，並標「暫存／待研究對齊」。

四個基準案例可在站內「案例示範」頁切換並執行示範規則（輸出標示為**模擬結果**）：

- `CASE-COMPLETE`
- `CASE-GAP`
- `CASE-CONFLICT`
- `CASE-UNTRUSTED-DOC`

把 `examples/baseline-cases/*.json` 貼進任一已交付平台的 skill／系統提示／API `user` 訊息，預期形狀見 `examples/expected-outputs/`。

---

## 建置與檢查

全部在 `site/`，腳本只用 Node 標準庫，沒有 `npm install` 依賴。

```bash
cd site
npm run sync    # 只同步內容到 content/generated/
npm run build   # 同步 + 產出 dist/
npm test        # 同步 + 建置 + 連結／必要頁面／五平台／四案例檢查
npm run preview # 本機靜態預覽
```

產出：

- `site/dist/*.html`：首頁、方法論、I／O、平台、Skills、教學、案例、研究、來源、404
- `site/dist/research-*.html`、`skill-*.html`、`doc-*.html`：全文頁
- `site/dist/data/`：JSON 與可下載 Markdown
- `site/dist/.nojekyll`：避免 GitHub Pages 的 Jekyll 吃掉底線檔

`site/dist/` 列在根 `.gitignore`，不要把建置產物當來源提交。

編碼必須是 **UTF-8（無 BOM）**。`site/scripts/ensure-utf8.js` 會在同步前把誤存的 UTF-16 轉回 UTF-8。

---

## 部署（GitHub Pages 子路徑）

預定公開庫是 `Cursor_GPreepSecurity`，Pages 子路徑為 **`/Cursor_GPreepSecurity/`**。

頁面與資源使用相對路徑（`css/main.css`、`methodology.html`），因此可以掛在：

- `https://<user>.github.io/Cursor_GPreepSecurity/`
- 或自訂網域下的同等子路徑

注意：

1. 發佈目錄必須是建置後的 **`site/dist/` 內容**，不要只發佈 `site/src/`。
2. 把 `404.html` 留在發行根目錄，子路徑重新整理才有後援。
3. 本站不是前端路由器 SPA。
4. 整合代理與子代理**不得** push 或部署。由主代理對 `gpreep` 遠端發布。

建議 workflow 概念（根目錄 CI 由主代理建立）：

```yaml
- run: node site/scripts/sync-content.js && node site/scripts/build.js
- uses: peaceiris/actions-gh-pages@v4
  with:
    publish_dir: site/dist
```

若 Pages 來源是 `docs/` 或 `gh-pages` 分支，請把 `dist/` 內容放到該發行根，而不是把整個 `site/` 原始碼丟上去。

---

## 更新內容

| 要改什麼 | 改哪裡 | 然後 |
| --- | --- | --- |
| 定義、流程、I／O、限制 | `research/`、`research/data/*.json` | `cd site && npm run build` |
| 來源登錄 | `references/sources.json`、`references/sources.md` | 同上；gartner.com 被擋時 `claims_supported` 必須為空 |
| 平台工作流程 | `skills/<platform>/` | 同上；站內 Skills／教學會重讀 |
| 基準案例 | `examples/baseline-cases/`、`examples/expected-outputs/` | 同上；案例頁會重讀四個 ID |
| 契約 | `docs/contracts/`（主代理） | 同上 |
| 站台文案、樣式、檢查 | `site/src/`、`site/scripts/` | 同上 |

不要在 `site/content/fallback/` 手抄第二份不標版本的正文。後備稿只在倉庫目錄缺失時使用。

---

## 新增平台

1. 先確認該產品是否真的有原生 `SKILL.md`。沒有就做系統提示＋API 工作流，不要假裝已有 Skills。
2. 在 `skills/<platform>/` 至少放：`README.md`、`install.md`、`acceptance.md`，以及 `SKILL.md` **或** `system-prompt.md`／`agent-system-prompt.md`。
3. 把平台列進 `skills/README.md` 與 `skills/platform-capabilities.md`（含查閱日期與限制）。
4. 同一組四個基準案例必須能跑，預期輸出對齊 `examples/expected-outputs/`。
5. 不要把尚未交付的 IDE／助手（例如 Cursor、Copilot、Gemini）寫進主比較表的「已交付」列。
6. `cd site && npm test`，確認新平台出現在 Skills 專區與安裝教學。

DeepSeek 目前以 **V4 家族**適配（預設 `deepseek-flash`）。單一「DeepSeek v4」產品 ID、chat.deepseek.com 畫面名稱仍待帳號驗證，見 `skills/deepseek/VERSION-STATUS.md`。
