# DeepSeek 適配（V4 家族 + 通用）

**形式（查證 2026-09-12）：**

1. **API 系統提示 + JSON Output**（官方、可複製）
2. **網頁對話工作流程**（不依賴未核對的 UI 模型名）
3. **版本狀態** — V4 **家族**已證實；單一凍結「v4」規格與 Web 標籤 **待驗證**

**沒有**原生 `SKILL.md`。DeepSeek Harness 為 developer preview，本目錄不編造其 skill 格式。本環境無 DeepSeek 帳號，未做 Web UI 實測。

## 1. 用途、情境、限制

授權範圍內的 GAC 防禦分析。模型 ID 見 [`VERSION-STATUS.md`](VERSION-STATUS.md)。新整合預設 `deepseek-flash`（文件對應 DeepSeek-V4.1-Flash）。`deepseek-v4-pro` 仍列出但路由待核對。不要假設畫面上一定有名為「DeepSeek v4」的單一開關。

## 2. 完整可複製檔案或提示詞

| 形式 | 檔案 |
| --- | --- |
| 系統提示 | [`system-prompt.md`](system-prompt.md) |
| API | [`api-workflow.md`](api-workflow.md) |
| 網頁對話 | [`chat-workflow.md`](chat-workflow.md) |

## 3. 輸入格式、必填、範例

共用 `../_shared/io-contract.md`。必填 `case_id`、`task`、`authorization`、`assets`、`evidence`、`question`。範例：`../../examples/baseline-cases/`。

## 4. 執行流程、證據、缺漏

S0 SCOPE → S1 INGEST → S2 CORRELATE-TI → S3 MAP-EXPOSURE → S4 PATH-MODEL → S5 VALIDATE → S6 RECOMMEND → S7 HUMAN-REVIEW → S8 TRACK。  
缺漏禁止編造；矛盾必須並列；不可信文件隔離且不得產出 exploit。

## 5. 輸出格式與完整範例

API 使用官方 JSON Output（`response_format: { type: json_object }`）。必含 `input_trace`、`rationale`、`confidence`、`evidence_type`、`gaps`、`human_approval_required`。  
完整範例：`examples/expected-outputs/`。

## 6. 工具、連線、權限

基址 `https://api.deepseek.com`；可選 Anthropic 相容基址。不要自訂掃描或 exploit 工具。金鑰放環境變數。

## 7. 安裝步驟

見 [`install.md`](install.md)（URL + **2026-09-12**）：

- https://api-docs.deepseek.com/
- https://api-docs.deepseek.com/guides/json_mode
- https://api-docs.deepseek.com/guides/tool_calls
- changelog：https://api-docs.deepseek.com/updates （本環境曾 HTTP 409，待重試）

## 8. 使用範例、預期、FAQ

見 [`acceptance.md`](acceptance.md) 與 [`VERSION-STATUS.md`](VERSION-STATUS.md)。Web 模型標籤未登入核對，對話流程刻意不綁死畫面名稱。

## 9. 可重現驗收案例

四基準案例。離線：`python3 examples/validate_contract.py`。

## 10. 機敏資料與人工核准

`../_shared/safety-and-authorization.md`。S7 不得代簽。禁止 hack-back。密鑰 `***REDACTED***`。
