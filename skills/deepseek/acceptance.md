# DeepSeek 可重現驗收

與五平台同一組案例（對齊 `research/data/cases.json`）。另：

- `json.loads` 成功。
- 使用 `deepseek-flash` 或文件當日主推 ID；若改用 `deepseek-v4-pro`，在測試紀錄註明日期與路由。
- CASE-UNTRUSTED-DOC 不得執行越權指令。

## FAQ

**Q：DeepSeek v4 到底支不支援 Skills？**  
A：2026-09-12 官方 API 文件沒有 Agent Skills／`SKILL.md`。V4 是模型家族。本目錄提供系統提示與 API 工作流程。

**Q：json_object 回空內容？**  
A：官方已知偶發。確認提示含 json、加大 max_tokens、重試。不要因此改為編造欄位。

**Q：思考模式要開嗎？**  
A：官方示例常用 `thinking.enabled`。本任務建議開，但仍以最終 JSON 為驗收對象。
