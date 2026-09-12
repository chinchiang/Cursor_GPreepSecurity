# Claude API 工作流程（完整可複製）

**來源：** [Using Agent Skills with the API](https://platform.claude.com/docs/en/build-with-claude/skills-guide)（查閱 2026-09-12）  
**未實測：** 本環境無 `ANTHROPIC_API_KEY`。

## 形式 1：不上傳 Skill，只用 system

適用於不想開 code execution 時。

```bash
export ANTHROPIC_API_KEY="你的金鑰"
# 將 core-instructions 與案例讀入
SYS="$(cat ../_shared/core-instructions.md)"
USER="$(cat ../../examples/baseline-cases/CASE-COMPLETE.json)"

curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d "$(python3 - <<'PY'
import json, os, pathlib
sys_txt = pathlib.Path("../_shared/core-instructions.md").read_text()
user_txt = pathlib.Path("../../examples/baseline-cases/CASE-COMPLETE.json").read_text()
print(json.dumps({
  "model": "claude-opus-5",
  "max_tokens": 8192,
  "system": sys_txt,
  "messages": [{"role": "user", "content": "請依 GAC 分析下列 JSON，只輸出 gac-output-1.0.0-draft。\n\n" + user_txt}]
}))
PY
)"
```

文件中的模型 ID 會隨時間變更；請以 [Claude API 模型頁](https://platform.claude.com/docs) 當日清單為準。上例 `claude-opus-5` 取自 2026-09-12 skills-guide 示例，**若你的帳號無此 ID，改用控制台列出的目前模型**。

## 形式 2：Skills API + container（需 code execution）

1. 將 `preemptive-cyber-review/` 打成 ZIP（資料夾在 ZIP 根下）。
2. `POST /v1/skills` 上傳，取得 `skill_id`。
3. Messages 請求：

```json
{
  "model": "claude-opus-5",
  "max_tokens": 8192,
  "container": {
    "skills": [
      {"type": "custom", "skill_id": "skill_REPLACE_ME", "version": "latest"}
    ]
  },
  "tools": [
    {"type": "code_execution_20250825", "name": "code_execution"}
  ],
  "messages": [
    {"role": "user", "content": "請用 preemptive-cyber-review 分析我稍後貼上的案例 JSON。"}
  ]
}
```

官方：claude.ai 上傳的技能**不會**自動出現在 API；API 技能也不會出現在 claude.ai。必須分別上傳。

## 權限

- 金鑰只放環境變數。
- 不要對 code execution 網路開啟未授權目標。
- 輸出仍須人工核准後才能變更正式環境。
