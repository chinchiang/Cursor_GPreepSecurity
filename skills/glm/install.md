# GLM／智譜 安裝／設定（查閱 2026-09-12）

**無原生 SKILL.md。** 下列為官方實際產品形態。

## A. 開放平台智能體中心（建議）

**來源：** [智能體](https://docs.bigmodel.cn/cn/guide/platform/intelligent-agent)

1. 登入 [智譜開放平台](https://open.bigmodel.cn/)。
2. 控制台 → 智能體中心 → 智能體廣場，或直接開啟  
   https://open.bigmodel.cn/console/appcenter_v2/intelligent/center
3. 建立文本型智能體。名稱建議：`GPreep Cyber Review`。
4. Prompt 輸入框預設即 System Prompt。貼上 `agent-system-prompt.md` 圍欄內全文。
5. 若要分開 System／User：點輸入框右下角全螢幕 → 左上角進階模式。User 貼「請分析下列 JSON…」。
6. **不要**為本任務開啟聯網搜尋探測；知識庫可上傳 `io-contract.md` 與合成案例（標 SYNTHETIC）。
7. 在試玩對話貼 `CASE-UNTRUSTED-DOC.json`，確認不會服從文件指令。

## B. API

1. 控制台建立 API Key，設 `export ZAI_API_KEY=...`
2. `pip install zai-sdk`（文件示例亦見 `zai-sdk==0.2.3`）
3. 依 `api-workflow.md` 呼叫。模型名以控制台為準（文件示例 `glm-5.2`／`glm-5.3`）。

## C. 智譜清言（消費者 GLMs）

公開資料稱可用提示詞建立個性化智能體。**2026 介面按鈕路徑未登入核對。** 把同一段 System Prompt 貼進自訂指令／智能體人設即可。

## D. 一次性對話

無智能體權限時：開新對話，先貼 System Prompt，再貼案例 JSON。
