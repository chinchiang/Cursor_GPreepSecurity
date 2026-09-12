# 跨平台 Skills／等效工作流程

**文件角色：** Agent B  
**任務：** 把同一套 **GPreep Analysis Cycle（GAC）** 接到五個語言模型產品  
**查閱日期：** 2026-09-12  
**對齊：** `research/README.md`（GAC、3 Ds、CTEM、四個案例 ID、來源分類）。階段已對齊 process.json 的 S0–S8。

## 先讀

| 檔案 | 用途 |
| --- | --- |
| [platform-capabilities.md](platform-capabilities.md) | 查證結果、來源 URL、限制、待驗證 |
| [_shared/task-spec.md](_shared/task-spec.md) | 共用任務與 GAC 階段 |
| [_shared/io-contract.md](_shared/io-contract.md) | 輸入／輸出契約 |
| [_shared/safety-and-authorization.md](_shared/safety-and-authorization.md) | 授權、不可信資料、人工核准 |
| [_shared/core-instructions.md](_shared/core-instructions.md) | 可複製核心指令 |
| [_shared/output.schema.json](_shared/output.schema.json) | 機器檢查 schema |
| [../examples/baseline-cases/](../examples/baseline-cases/) | 五平台同一組合成案例 |
| [../examples/expected-outputs/](../examples/expected-outputs/) | 預期輸出（已對齊 research/data/cases.json） |

## 平台怎麼裝

| 平台 | 原生 Skills？ | 本目錄給什麼 | 入口 |
| --- | --- | --- | --- |
| ChatGPT | 有（官方：Business／Enterprise／Healthcare／Edu） | `SKILL.md` + Custom GPT + Project | [chatgpt/](chatgpt/) |
| Claude | 有（claude.ai／Code／API） | `SKILL.md` + Project + API | [claude/](claude/) |
| Grok | 有（Build 檔案系統；grok.com 新聞稿） | `SKILL.md` + 系統提示 + API | [grok/](grok/) |
| GLM | **無** | System Prompt + API | [glm/](glm/) |
| DeepSeek | **無** | 系統提示 + API／對話；V4 家族見版本說明 | [deepseek/](deepseek/) |

不要假設每個產品都吃 `SKILL.md`。

## 安全聲明

工作流程僅供**授權範圍內的防禦分析**。對外掃描、主動驗證、正式環境變更須有明確授權與人工核准。語言模型**不能**自行證實實際曝險，也**不能**保證阻止攻擊。GAC、信心分數、示範權重皆為 `[project-framework]`，不是 Gartner 官方產物。

## 每個平台目錄都包含

1. 用途、情境、限制  
2. 完整可複製檔案或提示詞  
3. 輸入格式與範例  
4. 執行流程、證據、缺漏  
5. 輸出格式與完整範例（指向 `examples/expected-outputs/`）  
6. 工具、連線、權限  
7. 經查證的安裝步驟（URL + 2026-09-12）  
8. 使用範例、預期、FAQ  
9. 可重現驗收案例  
10. 機敏資料與人工核准邊界  
