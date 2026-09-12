# 智譜 API 工作流程（完整可複製）

**來源：** [官方 Python SDK](https://docs.bigmodel.cn/cn/guide/develop/python/introduction)、[智能體](https://docs.bigmodel.cn/cn/guide/platform/intelligent-agent)（查閱 2026-09-12）  
**基址：** `https://open.bigmodel.cn/api/paas/v4/`  
**未實測：** 無 `ZAI_API_KEY`。

文件示例模型含 `glm-5.2`、`glm-5.3`。請以開放平台當日模型清單為準。

## Python（zai-sdk）

```python
import json
import os
from pathlib import Path
from zai import ZhipuAiClient

client = ZhipuAiClient(api_key=os.environ["ZAI_API_KEY"])
system_prompt = Path("skills/glm/agent-system-prompt.md").read_text()
# 實際應只取 fenced 內文；此處示範讀 core
system_prompt = Path("skills/_shared/core-instructions.md").read_text()
user_payload = Path("examples/baseline-cases/CASE-COMPLETE.json").read_text()

kwargs = dict(
    model="glm-5.3",
    messages=[
        {"role": "system", "content": system_prompt},
        {
            "role": "user",
            "content": "請輸出 json，且必須是 gac-output-1.0.0-draft。\n\n" + user_payload,
        },
    ],
    temperature=0.2,
    max_tokens=8192,
)

# 若你的當日 API 文件支援與 OpenAI 相同的 response_format，可取消下一行註解。
# 本環境未核對 glm-5.3 是否接受此欄，故預設只靠提示約束。待驗證。
# kwargs["response_format"] = {"type": "json_object"}

resp = client.chat.completions.create(**kwargs)
text = resp.choices[0].message.content
print(text)
json.loads(text[text.find("{") : text.rfind("}") + 1])
```

## curl

```bash
curl https://open.bigmodel.cn/api/paas/v4/chat/completions \
  -H "Authorization: Bearer $ZAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "glm-5.3",
    "messages": [
      {"role": "system", "content": "（貼上 agent-system-prompt 內文）"},
      {"role": "user", "content": "請輸出 json。輸入：見 CASE-GAP.json"}
    ],
    "temperature": 0.2
  }'
```

## 工具

- **不要**為本任務開啟 `web_search` 去掃目標主機。
- Function calling 若使用，只允許 `validate_gac_json` 這類本地校驗函式，禁止 `scan_host`。
- 智能體知識庫若上傳外部 PDF，一律當不可信資料。

## 權限

金鑰用 `ZAI_API_KEY` 環境變數。不要把金鑰提交到 git。
