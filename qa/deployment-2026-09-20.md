# GitHub Pages 部署驗收（2026-09-20）

## 結果

- 公開站：<https://chinchiang.github.io/Cursor_GPreepSecurity/>
- 發布來源 commit：`0e813386c05f8e9db0467fb92d7ffbfb953679b4`
- 發布分支：`cursor/preemptive-cybersecurity-128d`
- Actions：<https://github.com/chinchiang/Cursor_GPreepSecurity/actions/runs/35498743094>
- run 完成：2026-09-20 08:08:54 UTC（臺北 16:08:54），`conclusion=success`。

## 根因與修正

本次查核時程式碼已在目標庫，但 `has_pages=false`、Actions run 數為 0、沒有部署 workflow。舊 handoff-log 的空庫／Cursor push 403 是歷史紀錄，不能當成目前仍為空庫的證據。

已將 Pages Source 設為 GitHub Actions，新增 `.github/workflows/pages.yml`，先驗證契約與網站再上傳 `site/dist/`，由相依 deploy job 發布。PR 不部署；部署權限限於 Pages 與 OIDC。Actions 固定完整 commit SHA，不使用 PAT，也不把建置產物提交進來源分支。README 標題與部署說明同步修正。

## 實際驗證

| 狀態 | 項目 | 結果與範圍 |
| --- | --- | --- |
| 實際執行 | 本機 `python3 examples/validate_contract.py` | 通過：契約、四基準案例、Skill frontmatter、研究對齊；未呼叫五平台 API |
| 實際執行 | 本機 `cd site && npm test` | 通過：71 HTML、5 Skills、8 研究 |
| 實際執行 | 本機 HTTP 專案子路徑測試 | `/Cursor_GPreepSecurity/` 下 11 個端點皆 200 且非空；含首頁、方法論、I/O、案例、Skills、CSS、JS、2 個 JSON、ChatGPT Skill Markdown、404.html |
| 實際執行 | GitHub Actions build | 契約驗證、網站檢查、artifact 上傳皆 success |
| 實際執行 | GitHub Actions deploy | 部署與公開 HTTP 檢查皆 success；檢查 index.html、css/main.css、js/app.js、data/site-data.json |
| 實際執行 | 正式站瀏覽器 | 首頁與資料載入成功；顯示 8 研究／5 Skills／24 I/O／5 平台 |
| 實際執行 | 正式站搜尋 | 搜尋 CVE 顯示 12 筆結果 |
| 實際執行 | 正式站案例切換 | CASE-CONFLICT 可執行，輸出模擬結果、UNRESOLVED 與 low（0.25），並保留五方證據 |
| 實際執行 | 正式站 Skills | 五平台卡片與下載連結皆顯示 |
| 尚未驗證 | 正式站 Markdown 實際下載完成 | 點擊未取得 download event；直接開啟檔案回 net::ERR_BLOCKED_BY_CLIENT。屬此雲端瀏覽器限制，未據此宣稱網站下載失敗或下載成功 |

未重做整站安全審查、五平台帳號／API 測試或行動裝置完整驗收。未知多層路徑的 404 導覽行為不在本次驗收範圍。
