# DeepSeek 安裝／設定（查閱 2026-09-12）

**無原生 SKILL.md。** 版本細節見 `VERSION-STATUS.md`。

## API

**來源：** https://api-docs.deepseek.com/

1. 在 DeepSeek 開放平台申請 API Key。
2. `export DEEPSEEK_API_KEY=...`
3. `pip install openai`
4. 依 `api-workflow.md` 呼叫 `deepseek-flash`。
5. 需要嚴格 JSON 時設 `response_format: {"type":"json_object"}`，且提示含 “json” 與範例。

## 網頁

見 `chat-workflow.md`。畫面模型名稱 **待驗證**。

## 權限

- 金鑰不入庫。
- 不要把生產日誌貼進 chat.deepseek.com 除非組織允許該處理器。
- Harness（developer preview）不在本目錄安裝範圍，避免編造其介面。
