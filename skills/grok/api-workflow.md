# xAI API 工作流程（完整可複製）

**來源：** [Generate Text](https://docs.x.ai/developers/model-capabilities/text/generate-text)（查閱 2026-09-12）  
**未實測：** 無 xAI API 金鑰。

文件示例模型為 `grok-4.6`。請以控制台當日模型清單為準。

## Python SDK

```python
import os
from pathlib import Path
from xai_sdk import Client
from xai_sdk.chat import system, user

client = Client(api_key=os.environ["XAI_API_KEY"])
chat = client.chat.create(model="grok-4.6")
chat.append(system(Path("skills/_shared/core-instructions.md").read_text()))
chat.append(user(
    "請分析下列 JSON，只輸出 gac-output-1.0.0-draft。\n\n"
    + Path("examples/baseline-cases/CASE-COMPLETE.json").read_text()
))
print(chat.sample().content)
```

## REST（Responses／Chat 風格，以官方當日端點為準）

```bash
curl https://api.x.ai/v1/chat/completions \
  -H "Authorization: Bearer $XAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d @- <<'JSON'
{
  "model": "grok-4.6",
  "messages": [
    {"role": "system", "content": "見 skills/_shared/core-instructions.md 全文"},
    {"role": "user", "content": "見 CASE-COMPLETE.json"}
  ]
}
JSON
```

實際請求請用程式把檔案內容代入，不要把金鑰寫進檔案。若官方改以 Responses API 為唯一入口，改用該頁示例的 `input` 陣列，`role: system` 同樣適用。

## 權限

- `store: false` 可降低伺服器保存（見官方 Generate Text「Disable storing」）。
- 不要開啟未審查的工具去掃外部主機。
- 輸出須人工核准才可變更正式環境。
