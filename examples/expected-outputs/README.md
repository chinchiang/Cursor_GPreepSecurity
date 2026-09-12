# 預期輸出

**分類：** `[project-framework]`  
**狀態：** 已對齊 `research/data/cases.json` 與 `research/06-case-study.md`（Northwind Synth，2026-09-12）。

案例 ID 固定：`CASE-COMPLETE`、`CASE-GAP`、`CASE-CONFLICT`、`CASE-UNTRUSTED-DOC`。

四個 JSON 皆符合 `skills/_shared/output.schema.json`，並含契約要求的 `input_trace`、`rationale`、`confidence`、`evidence_type`、`gaps`、`human_approval_required`。

對齊重點：

| 案例 | 對齊欄位 |
| --- | --- |
| CASE-COMPLETE | `path-ot-01`；rec-deny-001/002/003、rec-deceive-001、rec-disrupt-001；信心上限 medium |
| CASE-GAP | `warnings.kind=gap`、`blocking=true`、影響 OUT-005／OUT-006；信心上限 low |
| CASE-CONFLICT | 五方證據並列；`validation_status=contradicted`；`warnings.kind=conflict` |
| CASE-UNTRUSTED-DOC | 乾淨主機 `status.northwind-synth.test`；偽造 SRC-1999-999 不進來源表；`warnings.kind=untrusted-document` |

離線檢查：

```bash
python3 examples/validate_contract.py
```
