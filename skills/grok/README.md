# Grok 適配

**形式（查證 2026-09-12）：**

1. **Grok Build `SKILL.md`** — `./.grok/skills/`、`~/.grok/skills/`（官方 docs.x.ai）
2. **grok.com Skills** — 2026-05-18 新聞稿；逐步 UI **待實測**
3. **系統提示／AGENTS.md／`--rules`**
4. **xAI API `system` 訊息**

消費者「Projects」僅見二手教學，不當作唯一官方安裝法。本環境無 Grok 帳號，未做 UI 實測。

## 1. 用途、情境、限制

授權範圍內的 GAC 防禦分析。DeepSearch／網頁瀏覽不得當成已讀 Gartner 全文，也不得把搜尋結果升格為 `gartner-stated`。GAC 不是 Gartner 官方流程。

## 2. 完整可複製檔案或提示詞

| 形式 | 檔案 |
| --- | --- |
| Build Skill | [`preemptive-cyber-review/SKILL.md`](preemptive-cyber-review/SKILL.md) |
| 系統提示 | [`system-prompt.md`](system-prompt.md) |
| API | [`api-workflow.md`](api-workflow.md) |

## 3. 輸入格式、必填、範例

共用 `../_shared/io-contract.md`。必填 `case_id`、`task`、`authorization`、`assets`、`evidence`、`question`。範例：`../../examples/baseline-cases/`。

## 4. 執行流程、證據、缺漏

S0 SCOPE → S1 INGEST → S2 CORRELATE-TI → S3 MAP-EXPOSURE → S4 PATH-MODEL → S5 VALIDATE → S6 RECOMMEND → S7 HUMAN-REVIEW → S8 TRACK。  
缺漏禁止編造；矛盾必須 `unresolved`；不可信文件隔離。禁止 `--always-approve` 讓模型自行改正式環境。

## 5. 輸出格式與完整範例

單一 `gac-output-1.0.0-draft` JSON，必含 `input_trace`、`rationale`、`confidence`、`evidence_type`、`gaps`、`human_approval_required`。  
完整範例：`examples/expected-outputs/`。

## 6. 工具、連線、權限

Build：`grok inspect`、sandbox。API：環境變數金鑰。不要為本任務新增對外掃描工具。DeepSearch 僅可核對已列 SRC 標題。

## 7. 安裝步驟

見 [`install.md`](install.md)（URL + **2026-09-12**）：

- https://x.ai/news/grok-skills
- https://docs.x.ai/docs/build-features/skills-plugins-marketplace
- https://docs.x.ai/docs/developer/model-capabilities/text/generate-text

## 8. 使用範例、預期、FAQ

見 [`acceptance.md`](acceptance.md)。若 grok.com 看不到 Skills，改用系統提示或 API，不要編造 UI 路徑。

## 9. 可重現驗收案例

四基準案例。離線：`python3 examples/validate_contract.py`。

## 10. 機敏資料與人工核准

`../_shared/safety-and-authorization.md`。S7 人工核准。禁止 hack-back。密鑰 `***REDACTED***`。
