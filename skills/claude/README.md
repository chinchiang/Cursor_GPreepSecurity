# Claude 適配

**形式（官方現況，2026-09-12）：**

1. **Skills** — claude.ai ZIP、Claude Code 目錄、API `/v1/skills`（需 code execution）
2. **Projects** — project instructions + knowledge（官方：Free 亦可，上限 5）
3. **API system** — 不開 Skills 時的等效工作流程

三個表面（claude.ai／Claude Code／API）的 skill **不相通**。本環境未登入，未做帳號實測。

## 1. 用途、情境、限制

授權範圍內的 GAC 防禦分析。限制同共用安全契約。Skills 需 code execution，但禁止用它做攻擊或未授權掃描。claude.ai 的 `description` 必須 ≤ 200 字元；本包已遵守。

## 2. 完整可複製檔案或提示詞

| 形式 | 檔案 |
| --- | --- |
| Skill | [`preemptive-cyber-review/SKILL.md`](preemptive-cyber-review/SKILL.md) |
| Project | [`project-instructions.md`](project-instructions.md) |
| API | [`api-workflow.md`](api-workflow.md) |

## 3. 輸入格式、必填、範例

與五平台共用：`../_shared/io-contract.md`。必填 `case_id`、`task`、`authorization`、`assets`、`evidence`、`question`。範例：`../../examples/baseline-cases/`。

## 4. 執行流程、證據、缺漏

S0 SCOPE → S1 INGEST → S2 CORRELATE-TI → S3 MAP-EXPOSURE → S4 PATH-MODEL → S5 VALIDATE → S6 RECOMMEND → S7 HUMAN-REVIEW → S8 TRACK。  
缺漏、矛盾、不可信文件分別走 `gaps`／`conflicts`／`untrusted_segments`。不可信文件短路至 S7／OUT-010，不進入事實庫。

## 5. 輸出格式與完整範例

單一 `gac-output-1.0.0-draft` JSON。必含 `input_trace`、`rationale`、`confidence`、`evidence_type`、`gaps`、`human_approval_required`。  
完整範例：`examples/expected-outputs/`。

## 6. 工具、連線、權限

code execution 僅供 JSON 校驗與讀取 skill 包內 `references/`。API 金鑰放環境變數，不要寫進 Project knowledge。不要為本任務開啟對未授權主機的網路工具。

## 7. 安裝步驟

見 [`install.md`](install.md)（URL + **2026-09-12**）：

- https://support.claude.com/en/articles/12512198-how-to-create-custom-skills
- https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects
- https://platform.claude.com/docs/en/build-with-claude/skills-guide

## 8. 使用範例、預期、FAQ

見 [`acceptance.md`](acceptance.md)。若 skill 未觸發，在對話開頭寫「請使用 preemptive-cyber-review」並貼案例 JSON。

## 9. 可重現驗收案例

四基準案例。離線：`python3 examples/validate_contract.py`。

## 10. 機敏資料與人工核准

`../_shared/safety-and-authorization.md`。S7 不得代簽。禁止 hack-back。密鑰 `***REDACTED***`。
