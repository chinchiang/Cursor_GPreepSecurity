# 機敏掃描

**日期：** 2026-09-12  
**裁決：** 通過（掃描範圍內未發現金鑰、憑證、真實機敏值）  
**狀態：** 實際執行

## 範圍

1. `git ls-files` 全部追蹤檔（130 個），略過影像字型。
2. 工作區再掃一遍，排除 `.git`、`node_modules`、`dist`、`content/generated`、大於 2MB 的檔。

## 正則

| 名稱 | 模式 |
| --- | --- |
| AWS | `AKIA[0-9A-Z]{16}` |
| OpenAI | `sk-[A-Za-z0-9]{20,}` |
| Anthropic | `sk-ant-...` |
| GitHub PAT | `ghp_`／`gho_`／`github_pat_` |
| xAI | `xai-[A-Za-z0-9]{20,}` |
| PEM | `-----BEGIN ... PRIVATE KEY-----` |
| JWT | `eyJ...` 三段式 |
| Slack | `xox[baprs]-...` |
| 賦值 | `api_key|secret|token|password` 後接引號長值 |

## 結果

| 項目 | 結果 |
| --- | --- |
| 追蹤檔 hit | **0** |
| 工作區（排除項後）hit | **0** |
| 檔名含 secret／credential／.pem／.env | **無** |
| 非 example／synth 的 email | **無** |

API 工作流程使用環境變數名（`ANTHROPIC_API_KEY`、`DEEPSEEK_API_KEY` 等）與中文占位「你的金鑰」，沒有實值。輸出規範為 `***REDACTED***`。

根 `.gitignore` 已忽略 `.env`、`*.pem`、`*.key`、`credentials.json`。

## 不列入本掃描、也不寫進本檔的項目

本機 `git remote -v` 的 HTTPS URL 可能帶有執行環境注入的存取權杖。那是**執行期 git config**，不在追蹤檔。本檔不轉貼 remote URL。

## 人工檢查（未做）

- 付費 Gartner 全文是否被整篇重製：短摘存在，法律判斷見 acceptance-results B5
- 合成案例中的主機／CVE 識別碼：標示 `SYNTHETIC`／`northwind-synth.test`，不當成真客戶
