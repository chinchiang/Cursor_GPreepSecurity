# Agent D 獨立驗證紀錄

**角色：** Agent D（獨立審查）  
**工作區：** `/workspace`  
**目標分支：** `cursor/preemptive-cybersecurity-128d`  
**審查日期：** 2026-09-12  
**對照契約：** `docs/contracts/acceptance-checklist.md`  
**本回合只寫入：** `qa/`

本目錄是**驗收證據**，不是產品內容。通過／失敗以實際指令與檔案核對為準；沒跑過的列標 `尚未驗證`。沒有 ChatGPT／Claude／Grok／GLM／DeepSeek 帳號，因此**不得**把平台端到端實測寫成通過。

## 閱讀順序

| 順序 | 檔案 | 用途 |
| --- | --- | --- |
| 1 | 本檔 | 方法、範圍、限制 |
| 2 | [acceptance-results.md](acceptance-results.md) | 逐條驗收：通過／失敗／尚未驗證 |
| 3 | [issues.md](issues.md) | 必須先修與其餘問題 |
| 4 | [test-log.md](test-log.md) | 實際跑過的指令與摘要 |
| 5 | [secrets-scan.md](secrets-scan.md) | 機敏掃描 |
| 6 | [data/](data/) | 機器可讀摘要（可選） |

## 審查方法

1. 確認並留在 `cursor/preemptive-cybersecurity-128d`；`SetActiveBranch` 已登記。未切走、未 merge、未 push、未開 PR。
2. 以 Python 讀 UTF-8 正文（部分 Markdown 在編輯器工具中會顯示亂碼，指令列解碼正常）。
3. 交叉比對 `references/sources.json`、`references/sources.md`、`research/**`、`skills/**`、`examples/**`、`site/**` 的 `SRC-YYYY-NNN`。
4. 實際執行：`python3 examples/validate_contract.py`、`cd site && npm test`、本機 `npm run preview` + `curl`。
5. 以 `git ls-files` 為範圍做機敏正則掃描；另掃工作區（排除 `.git`／大型 generated）。
6. 以 `curl` 重試 `gartner.com` 與若干官方文件 URL。
7. 以 `gh` 唯讀查 Pages；GitHub MCP namespace 本回合為 `error`。
8. 發現問題只寫進 `qa/`，不改其他代理目錄。

## 本環境限制（不要把這些勾成產品已上線）

| 限制 | 影響 |
| --- | --- |
| 無五平台登入帳號、無 API 金鑰 | 平台 UI／API 端到端一律 `尚未驗證` |
| 無圖形瀏覽器自動化 | 網站互動（複製、篩選、示範按鈕、行動選單）只能 curl + 原始碼檢查，不得標「瀏覽器點過」 |
| `gartner.com` Cloudflare 403 | 本回合仍無法讀官方全文；只核對研究／登錄是否誠實標示 |
| OpenAI Help 本回合 403 | ChatGPT Skills 適用方案無法本回合覆核 |
| GitHub Pages API 404 | 公開 URL 未上線；部署項不得標通過 |
| 無 `.github/` workflow | 自動發佈未交付 |

## 總裁決（先讀）

**失敗。** 離線契約檢查與網站建置檢查通過，但五平台 Skills／系統提示把 `SRC-2025-001`／`SRC-2025-002` 對到**舊發號**，並把未取得全文或第三方轉載寫成「可引用的 gartner-stated 句子」。這直接違反來源誠實性，不能因「看起來完整」而通過。

必須先修：見 [issues.md](issues.md) 的 ISS-001、ISS-002。
