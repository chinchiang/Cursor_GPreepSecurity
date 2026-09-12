# 先制型資安互動站

靜態多頁網站，適合 GitHub Pages。不需長期跑應用伺服器，示範不需 API 金鑰。

本目錄是網站的唯一工作區。建置時會**讀取**倉庫的 `research/`、`skills/`、`docs/contracts/`、`references/`、`examples/`（若存在），把 Markdown／JSON 同步進 `content/generated/` 再複製到 `dist/data/`。後備稿在 `content/fallback/`，並標示「暫存／待研究對齊」。頁腳顯示同步時間與來源。已交付平台是 ChatGPT、Claude、Grok、GLM、DeepSeek；Cursor／Copilot／Gemini 標為非本專案交付範圍。

## 本機啟動

需要 Node.js 18+。

```bash
cd site
npm run build
npm run preview
```

瀏覽器開啟 `http://127.0.0.1:4173/`。

若只想用系統 Python：

```bash
cd site
npm run build
python3 -m http.server 4173 --directory dist
```

不要用 `file://` 開頁：搜尋與篩選依賴 `fetch` 讀 `data/site-data.json`，瀏覽器會擋本機檔案。

## 建置

```bash
cd site
npm run sync    # 只同步內容
npm run build   # 同步 + 產出 dist/
npm test        # 建置 + 連結／必要頁面檢查
```

產出：

- `dist/*.html`：首頁、方法論、I／O、平台、Skills、教學、案例、研究、來源、404
- `dist/research-*.html`、`dist/skill-*.html`：全文頁
- `dist/data/`：JSON 與可下載 Markdown
- `dist/.nojekyll`：避免 GitHub Pages 的 Jekyll 吃掉底線檔

沒有 `npm install` 依賴；腳本只用 Node 標準庫。

## GitHub Pages 子路徑

頁面與資源都用**相對路徑**（`css/main.css`、`methodology.html`），因此可以放在：

- `https://<user>.github.io/<repo>/`
- `https://<user>.github.io/<repo>/site/`
- `https://<user>.github.io/<repo>/docs/`

注意：

1. 發佈目錄必須是**建置後的 `dist/` 內容**，或把 `dist/` 設成 Pages 來源。不要只發佈 `src/`。
2. 若把 `dist/` 放到 `site/` 子路徑，請以該資料夾當 Pages root，或在 Actions 裡搬到發行根目錄。
3. 本站不是前端路由器 SPA；每個功能都是真實 HTML。若仍用 hash 以外的前端路由，重新整理未知路徑會落到 `404.html`（請把 `404.html` 留在發行根目錄）。
4. 自訂網域不影響相對路徑。倉庫改名後也不必改程式，只要 Pages 根目錄對。

建議 workflow 概念（本目錄不負責建立根層 CI）：

```yaml
# 在 repo 根：把 site/dist 發到 gh-pages
- run: node site/scripts/sync-content.js && node site/scripts/build.js
- uses: peaceiris/actions-gh-pages@v4
  with:
    publish_dir: site/dist
```

## 內容同步規則

`scripts/sync-content.js`：

1. 先載入 `content/fallback/`
2. 若存在 `../research/**/*.md`、`../skills/**/*.md`，以倉庫正文覆蓋後備稿
3. 若存在 `../research/data/*.json`、`../references/sources.json`、`../docs/contracts/`、`../examples/baseline-cases/`，覆蓋 I／O、來源、契約與四個基準案例
4. GLM／DeepSeek 若無 `SKILL.md`，以 `system-prompt.md`／`agent-system-prompt.md` 作為可執行交付
5. 寫入 `content/generated/site-data.json`、`search-index.json`、`version.json`

前端不放憑證。Skills 與教學都要求關閉不必要的外呼。

## 檢查腳本

`npm test` 會確認：

- 必要頁面存在
- 站內相對連結指向真實檔案
- 每頁有 `zh-Hant`、skip link、`#main`、導覽
- 研究與 Skills 全文頁與下載檔存在
- 案例頁標示「本專案示範設計」與「模擬結果」，並含四個基準案例 ID
- 研究／Skills 來源為 `repo:research/`、`repo:skills/`，而非過期 fallback

## 頁面

| 檔案 | 內容 |
| --- | --- |
| `index.html` | 入口與範圍聲明 |
| `methodology.html` | 定義、流程、概念關係 |
| `io.html` | Inputs／Outputs 篩選 |
| `platforms.html` | 平台比較 |
| `skills.html` | 技能列表、複製、下載 |
| `guide.html` | 依平台切換安裝教學 |
| `demo.html` | 合成案例互動 |
| `research.html` | 研究全文索引 |
| `sources.html` | 引用與待驗證 |
| `404.html` | 子路徑重新整理後援 |
