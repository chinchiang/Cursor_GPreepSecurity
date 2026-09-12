# DeepSeek API／對話工作流程（完整可複製）

**來源：** [Your First API Call](https://api-docs.deepseek.com/)、[JSON Output](https://api-docs.deepseek.com/guides/json_mode/)（查閱 2026-09-12）  
**未實測：** 無 `DEEPSEEK_API_KEY`。

預設模型：`deepseek-flash`（V4.1-Flash）。V4 Pro 見 `VERSION-STATUS.md`。

## Chat Completions + JSON Output

```python
import json
import os
from pathlib import Path
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["DEEPSEEK_API_KEY"],
    base_url="https://api.deepseek.com",
)

system_prompt = Path("skills/deepseek/system-prompt.md").read_text()
# 實務：擷取圍欄內文；或改讀 core-instructions 並確保含單字 json
user = (
    "Analyze this input and output json only.\n\n"
    + Path("examples/baseline-cases/CASE-COMPLETE.json").read_text()
)

resp = client.chat.completions.create(
    model="deepseek-flash",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user},
    ],
    response_format={"type": "json_object"},
    extra_body={"thinking": {"type": "enabled"}},
    reasoning_effort="high",
    max_tokens=8192,
    stream=False,
)
data = json.loads(resp.choices[0].message.content)
assert "input_trace" in data and "gaps" in data
print(json.dumps(data, ensure_ascii=False, indent=2))
```

官方注意：JSON 模式必須在 system 或 user 出現 “json” 並給範例；`max_tokens` 要夠大以免截斷；偶發空內容時改寫提示重試。

## curl

```bash
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-flash",
    "messages": [
      {"role": "system", "content": "見 system-prompt.md；必須輸出 json"},
      {"role": "user", "content": "見 CASE-GAP.json"}
    ],
    "thinking": {"type": "enabled"},
    "reasoning_effort": "high",
    "response_format": {"type": "json_object"},
    "stream": false
  }'
```

## Anthropic 相容基址（可選）

`base_url=https://api.deepseek.com/anthropic`，把同一段規則放進 `system`。見官方首頁表格。

## 網頁對話（通用，不依賴特定 Web 模型名）

1. 開啟 chat.deepseek.com（**模型下拉標籤待驗證**）。
2. 新對話第一則貼 `system-prompt.md` 圍欄全文。
3. 第二則貼案例 JSON，並寫「請輸出 json」。
4. 不要對未授權主機使用任何聯網功能。

## 工具

官方支援 tool calls。本任務若啟用，只允許本地 `validate_gac_json`。`strict` 模式需 `https://api.deepseek.com/beta`（官方標 Beta）。**不要**做主機掃描函式。
