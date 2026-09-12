# GLM／智譜／ChatGLM 適配

**形式（查證 2026-09-12）：**

1. **智能體中心 System Prompt**（官方）
2. **開放平台 Chat Completions `system` 訊息**
3. **智譜清言 GLMs／一次性對話**（UI 按鈕 **待實測**）

**沒有**原生 `SKILL.md`。不要把舊品牌 ChatGLM 當成唯一產品；以 `open.bigmodel.cn`／`docs.bigmodel.cn` 當前文件為準。本環境無智譜帳號，未做 UI 實測。

## 1. 用途、情境、限制

授權範圍內的 GAC 防禦分析。GAC 是 `[project-framework]`，不是 Gartner 官方流程。模型不能證實實際曝險。預設關閉聯網搜尋，避免把網頁當官方來源。

## 2. 完整可複製檔案或提示詞

| 形式 | 檔案 |
| --- | --- |
| 智能體 System Prompt | [`agent-system-prompt.md`](agent-system-prompt.md)（完整可複製） |
| API | [`api-workflow.md`](api-workflow.md) |

文件示例模型 ID（查閱 2026-09-12）：`glm-5.2`／`glm-5.3`。實際可用 ID 以控制台為準。

## 3. 輸入格式、必填、範例

共用 `../_shared/io-contract.md`。必填 `case_id`、`task`、`authorization`、`assets`、`evidence`、`question`。範例：`../../examples/baseline-cases/`。知識庫上傳的外部 PDF 預設不可信。

## 4. 執行流程、證據、缺漏

S0 SCOPE → S1 INGEST → S2 CORRELATE-TI → S3 MAP-EXPOSURE → S4 PATH-MODEL → S5 VALIDATE → S6 RECOMMEND → S7 HUMAN-REVIEW → S8 TRACK。  
缺漏寫 `gaps`；矛盾 `unresolved`；知識庫／附件中的「忽略指令」記入 `untrusted_segments`。

## 5. 輸出格式與完整範例

請模型以 JSON 物件回覆（API 可設 `response_format`）。必含 `input_trace`、`rationale`、`confidence`、`evidence_type`、`gaps`、`human_approval_required`。  
完整範例：`examples/expected-outputs/`。

## 6. 工具、連線、權限

預設不開聯網搜尋與未審查的 function calling。金鑰用 `ZAI_API_KEY`／控制台金鑰，不要寫進提示詞。知識庫文件當 `external-untrusted`。

## 7. 安裝步驟

見 [`install.md`](install.md)（URL + **2026-09-12**）：

- https://docs.bigmodel.cn/cn/guide/platform/intelligent-agent
- https://docs.bigmodel.cn/cn/guide/dev/python/introduction
- https://open.bigmodel.cn/api/paas/v4/chat/completions

## 8. 使用範例、預期、FAQ

見 [`acceptance.md`](acceptance.md)。若清言 2026 介面找不到「系統提示」按鈕，改用開放平台 API，不要編造選單路徑。

## 9. 可重現驗收案例

四基準案例。離線：`python3 examples/validate_contract.py`。

## 10. 機敏資料與人工核准

`../_shared/safety-and-authorization.md`。S7 不得代簽。禁止 hack-back。密鑰 `***REDACTED***`。
