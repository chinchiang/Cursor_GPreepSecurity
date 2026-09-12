# 平台能力調查（2026-09-12）

**文件角色：** Agent B 查證紀錄  
**查閱日期：** 2026-09-12  
**方法：** 官方文件／說明中心／開發者文件網路擷取；本環境**沒有**各平台登入帳號，故**未做產品 UI 端到端實測**。  
**分類：** 能力描述依各官方頁；GAC 適配方式為 `[project-framework]`。

## 總表

| 平台 | 產品 vs 模型 | 原生 Skills（`SKILL.md`） | 專案／工作區指令 | API 系統提示 | 本目錄提供的可執行形式 |
| --- | --- | --- | --- | --- | --- |
| ChatGPT | 產品：ChatGPT；模型由產品路由（2026-02-13 起若干舊模型已從 ChatGPT 下架，API 另計） | **有**（Agent Skills）。Skills 頁面上傳或編輯器建立。官方寫明適用 **Business / Enterprise / Healthcare / Edu**（受工作區設定限制） | **有** Projects：專案指令覆寫全域自訂指令；可上傳檔案 | OpenAI API 另有 Skills 與 Responses／Chat Completions | ① 可上傳 skill 包 ② Custom GPT instructions ③ Project instructions |
| Claude | 產品：claude.ai、Claude Code、Claude API；模型如官方 Messages 文件所示 | **有**（Agent Skills）。claude.ai 上傳 ZIP；Claude Code 讀 `.claude/skills/`；API `POST /v1/skills` + Messages `container.skills`（需 code execution） | **有** Projects：project instructions + knowledge；官方 2026-09-12 寫 Free 亦可建專案（上限 5） | Messages `system` | ① `SKILL.md` ZIP ② Project instructions ③ API 工作流程 |
| Grok | 產品：grok.com / iOS / Android（Grok 4.3 起官方宣布 Skills）；開發：Grok Build CLI；模型：xAI API（文件示例 `grok-4.6`） | **有，但分表面**：grok.com 可用對話／上傳建立 Skills（2026-05-18 新聞稿）；Grok Build 發現 `./.grok/skills/`、`~/.grok/skills/` 的 `SKILL.md` | Grok Build 讀 `AGENTS.md` 家族。消費者端 Workspaces／Projects 多見於二手教學，**UI 路徑待帳號實測** | xAI Responses／Chat：`role: system` 或 SDK `system()` | ① `SKILL.md`（Build／上傳）② 系統提示詞 ③ `AGENTS.md` 片段 ④ API 呼叫稿 |
| GLM（智譜） | 產品：智譜開放平台智能體中心、智譜清言 GLMs；模型：文件示例 `glm-5.2`、`glm-5.3` | **無**經官方證實的 Agent Skills／`SKILL.md` 標準 | 智能體中心：System Prompt（進階模式可分 System／User）；知識庫、外掛、聯網搜尋 | `https://open.bigmodel.cn/api/paas/v4/` `chat.completions` + `messages.role=system` | ① 智能體 System Prompt ② API 工作流程 ③ 對話一次性提示 |
| DeepSeek | 產品：chat.deepseek.com（Web UI 模型標籤**未在本環境登入核對**）；API：`https://api.deepseek.com` | **無**公開的原生 Skills／`SKILL.md`。DeepSeek Harness 為 developer preview，規格不在此編造 | 無官方「Projects + 專案指令」對等物經本查證確認 | OpenAI 相容 Chat Completions；`system` + 可選 `response_format: json_object`；亦提供 Anthropic 相容基址 | ① 系統提示詞 ② API／JSON 工作流程 ③ 網頁對話流程。**版本：官方已有 V4 家族，見下表，部分別名待驗證** |

不要假設五平台都支援 `SKILL.md`。沒有原生 Skills 的平台以系統提示詞與 API 工作流程為準。

---

## ChatGPT

### 查證摘要

- **Custom GPT：** 於 GPT builder 設定 Name、Description、Instructions、Knowledge、Capabilities、Actions。Instructions 套用到每個對話。[Creating and editing GPTs](https://help.openai.com/en/articles/8554397-creating-a-custom-gpt)（查閱 2026-09-12）
- **Projects：** 群組 chats、上傳參考檔、專案指令；專案指令覆寫全域 custom instructions。免費與付費方案皆可用；檔案上限依方案（Free 5／Go·Plus 25／Edu·Pro·Business·Enterprise 40）。[Projects in ChatGPT](https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt)（查閱 2026-09-12）
- **Skills：** 可重用工作流程，含 instructions、examples、code。建立後可自動或 `@` 呼叫。官方：Business、Enterprise、Healthcare、Edu（受設定與產品可用性限制）。可「Create with editor」或「Upload from your computer」。[Skills in ChatGPT](https://help.openai.com/en/articles/20001066-skills-in-chatgpt)（查閱 2026-09-12，Help 中心 403 時另以搜尋摘要核對）
- **SKILL.md 標準：** ChatGPT Learn 寫明採 [Agent Skills](https://agentskills.io/specification)／[Build skills](https://learn.chatgpt.com/docs/build-skills)：目錄 + `SKILL.md`（`name`、`description`），可選 `scripts/`、`references/`、`assets/`、`agents/openai.yaml`。Codex 另從 `.agents/skills` 發現。
- **API Skills：** [Skills | OpenAI API](https://developers.openai.com/api/docs/guides/tools-skills)（查閱 2026-09-12）：`POST /v1/skills` 上傳目錄或 ZIP；`SKILL.md` 大小寫不敏感；ZIP ≤ 50 MB。

### 限制

- Plus／Free 是否有 Skills：**官方 Help 未列為適用方案** → 視為**待帳號實測**；請改用 Custom GPT 或 Project instructions。
- 未在本環境登入 ChatGPT，未驗證 Skills 選單實際標籤與掃描（Needs Review／Blocked）行為。
- Custom GPT 的 Actions 會呼叫外部 API；本技能**預設不啟用**對外 Actions。

---

## Claude

### 查證摘要

- **Agent Skills：** [skills-guide](https://platform.claude.com/docs/en/build-with-claude/skills-guide)（查閱 2026-09-12）。Messages 以 `container.skills` 掛載，最多文件所述上限（該頁寫最多 20）；需 code execution 工具。自訂技能 `POST /v1/skills`。
- **claude.ai 上傳：** [How to create custom skills](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)（頁面日期 2026-07-22，查閱 2026-09-12）。ZIP 內應含與 `name` 相符的資料夾。Help 文同時寫 `skill.md` 與 200 字元 description；[claude.com/docs/skills/how-to](https://claude.com/docs/skills/how-to) 與 [agentskills.io](https://agentskills.io/specification) 則要求 `SKILL.md`、小寫連字號 `name`、description 最長 1024（claude.ai 建議壓到 200）。本目錄採 **`SKILL.md` + 小寫名稱 + description ≤ 200** 以同時相容。
- **Claude Code：** `~/.claude/skills/` 或專案 `.claude/skills/`。與 claude.ai、API **不自動同步**。
- **Projects：** [How can I create and manage projects?](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects)（查閱 2026-09-12，頁面標 Updated today）。`claude.ai/projects` → + New Project → Set project instructions；右側 knowledge 上傳。Free 最多 5 個專案。Team／Enterprise 可分享。

### 限制

- Skills 需要啟用 code execution / file creation。
- 未登入，未實測 ZIP 上傳錯誤訊息與 Enterprise 組織佈建。
- API 與 claude.ai 技能目錄不相通。

---

## Grok / xAI

### 查證摘要

- **消費者 Skills：** [Skills in web, iOS, and Android](https://x.ai/news/grok-skills)（2026-05-18，查閱 2026-09-12）。Grok 4.3 於 grok.com、iOS、Android；可用對話描述、上傳檔案或從頭撰寫；可請 Grok 把學到的流程存成 skill。
- **Grok Build Skills：** [Skills, Plugins & Marketplaces](https://docs.x.ai/build/features/skills-plugins-marketplaces)（查閱 2026-09-12）。發現路徑：`./.grok/skills/`（往上走到 repo root）、`~/.grok/skills/`、plugin `skills/`、`~/.grok/config.toml` 的 `[skills] paths`。`SKILL.md` YAML：`name`、`description`、`when-to-use`、`user-invocable` 等。斜線命令：`/<name>`。
- **專案規則：** [AGENTS.md](https://docs.x.ai/build/features/project-rules)（查閱 2026-09-12）。讀 `AGENTS.md`／`AGENT.md`／`CLAUDE.md` 與 `.grok/rules/*.md`。`--rules` 附加、`--system-prompt-override` 覆寫。`grok inspect` 可列出載入的規則。
- **API：** [Generate Text](https://docs.x.ai/developers/model-capabilities/text/generate-text)（查閱 2026-09-12）。Responses API 為首選；Python SDK `chat.append(system("..."))`；REST 可用 `role: system`。文件示例模型 `grok-4.6`。

### 限制／待驗證

- grok.com Skills 的精確選單路徑、是否接受標準 ZIP `SKILL.md`：**新聞稿未給逐步 UI**，本目錄同時提供「上傳 SKILL.md」與「對話建立稿」與「系統提示詞」。
- 消費者 Projects／Workspaces：二手教學（2026）有寫，**不是 xAI docs.x.ai 的主文件路徑** → 標 **待帳號實測**。本目錄不以二手 UI 步驟當唯一安裝法。
- 未呼叫 xAI API（無金鑰）。

---

## GLM／智譜／ChatGLM

### 查證摘要

- **開放平台智能體：** [智能体](https://docs.bigmodel.cn/cn/guide/platform/intelligent-agent)（查閱 2026-09-12）。控制台「智能體中心」：<https://open.bigmodel.cn/console/appcenter_v2/intelligent/center>。Prompt 預設為 system prompt；全螢幕進階模式可分 System／User。可接知識庫（function 呼叫）、聯網搜尋、外掛。
- **API：** 基址 `https://open.bigmodel.cn/api/paas/v4/`。Python SDK `zai-sdk`、客戶端 `ZhipuAiClient`。[官方 Python SDK](https://docs.bigmodel.cn/cn/guide/develop/python/introduction)（查閱 2026-09-12）。文件示例模型 `glm-5.2`、`glm-5.3`。支援 `messages`、function calling、`thinking`、`web_search` 工具。
- **智譜清言 GLMs：** 2014–2024 公開報導／教學描述「用提示詞建立智能體」。此為**消費者產品形態**，與開放平台智能體中心並存。本環境未登入清言，**建立按鈕路徑待實測**。提供可直接貼上的系統提示詞即可在兩處使用。
- **無**官方 Agent Skills／`SKILL.md` 頁面經本查證找到。

### 限制

- 不要把 ChatGLM 舊版網頁當成目前唯一產品。
- JSON 結構化輸出：官方 SDK 示例以自然語言為主；本工作流程在 system／user 中要求 JSON，並在驗收時用解析器檢查。是否有與 OpenAI 完全相同的 `response_format=json_object`：**待以當前 API 參考核對**，呼叫稿提供「提示約束」與「若端點支援則加上 response_format」兩種。
- 未持有智譜 API Key，未實測。

---

## DeepSeek（含 v4 家族）

### 查證摘要（官方 API 文件，2026-09-12）

來源：[Your First API Call](https://api-docs.deepseek.com/)（成功擷取）、搜尋引擎對 [Change Log](https://api-docs.deepseek.com/updates) 的摘要（該 updates URL 在本環境回 409，**changelog 全文待重試**）。

| 模型名稱 | 官方狀態（2026-09-12 可見範圍） | 本工作流程建議 |
| --- | --- | --- |
| `deepseek-flash` | 文件主推；對應 DeepSeek-V4.1-Flash（原生多模態） | **新整合預設** |
| `deepseek-v4-pro` | 文件仍列出。changelog 摘要曾寫 2026-09-14 12:00 CST 後可能改路由；首頁（查閱當日）改稱「因應需求，9/14 後續提供 V4 Pro，計費不變」 | **可用，但路由／壽命待持續核對** |
| `deepseek-v4-flash`、`deepseek-v4-flash-vision-exp` | 舊名；文件稱已退役，請求由 V4.1-Flash 承接 | 相容別名，新專案勿再寫死 |
| `deepseek-chat` / `deepseek-reasoner` | changelog 摘要稱將停用並曾指向 v4-flash 的非思考／思考模式 | **待驗證**，新專案不要依賴 |
| 「DeepSeek v4」作為單一產品名 | 公開資料呈現為 **V4 家族**（Pro／Flash／V4.1-Flash），不是單一不變的 `v4` ID | 文件中寫「DeepSeek V4 家族」，並標模型 ID |

其他官方能力（[JSON Output](https://api-docs.deepseek.com/guides/json_mode/)、[Tool Calls](https://api-docs.deepseek.com/guides/tool_calls/)）：

- `base_url`：`https://api.deepseek.com`（OpenAI 相容）；Anthropic 相容：`https://api.deepseek.com/anthropic`
- `thinking: {type: enabled}`、`reasoning_effort`
- `response_format: {"type":"json_object"}` 時，提示中必須出現 “json” 並給範例
- 工具呼叫；`strict` 模式需 beta 基址（官方標 Beta）
- DeepSeek Harness：developer preview，**不在此編造其 skill 格式**

**網頁對話：** 官方產品存在，但本環境未登入，**目前選單中的模型顯示名稱待驗證**。提供「把系統提示貼進第一則訊息」的通用流程。

### 限制

- 無原生 `SKILL.md`。
- 未持有 API Key，未實測空 JSON、思考模式與 json_object 同時開啟的行為。
- changelog 頁 409，V4 Pro 在 2026-09-14 之後的精確路由以官網當日為準。

---

## 來源清單（查閱 2026-09-12）

| ID | URL | 用於 |
| --- | --- | --- |
| OA-GPT | https://help.openai.com/en/articles/8554397-creating-a-custom-gpt | Custom GPT |
| OA-PROJ | https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt | Projects |
| OA-SKILL-HELP | https://help.openai.com/en/articles/20001066-skills-in-chatgpt | ChatGPT Skills 可用性 |
| OA-SKILL-LEARN | https://learn.chatgpt.com/docs/build-skills | SKILL.md／Codex |
| OA-SKILL-API | https://developers.openai.com/api/docs/guides/tools-skills | API Skills |
| ASK | https://agentskills.io/specification | Agent Skills 開放標準 |
| AN-SKILL-API | https://platform.claude.com/docs/en/build-with-claude/skills-guide | Claude API Skills |
| AN-SKILL-HELP | https://support.claude.com/en/articles/12512198-how-to-create-custom-skills | claude.ai 上傳 |
| AN-SKILL-HOW | https://claude.com/docs/skills/how-to | 打包與 200 字限制 |
| AN-PROJ | https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects | Claude Projects |
| XAI-NEWS | https://x.ai/news/grok-skills | Grok 消費者 Skills |
| XAI-BUILD | https://docs.x.ai/build/features/skills-plugins-marketplaces | Grok Build Skills |
| XAI-RULES | https://docs.x.ai/build/features/project-rules | AGENTS.md |
| XAI-API | https://docs.x.ai/developers/model-capabilities/text/generate-text | xAI 系統訊息 |
| ZHIPU-AGENT | https://docs.bigmodel.cn/cn/guide/platform/intelligent-agent | 智能體 System Prompt |
| ZHIPU-SDK | https://docs.bigmodel.cn/cn/guide/develop/python/introduction | GLM API |
| DS-API | https://api-docs.deepseek.com/ | DeepSeek 呼叫 |
| DS-JSON | https://api-docs.deepseek.com/guides/json_mode/ | JSON Output |
| DS-TOOLS | https://api-docs.deepseek.com/guides/tool_calls/ | Tool Calls |
| DS-UPD | https://api-docs.deepseek.com/updates | changelog（本環境 409，待重試） |

## 待驗證清單

1. ChatGPT Free／Plus 是否出現 Skills 選單。
2. grok.com 上傳 `SKILL.md` 的實際按鈕路徑；消費者 Projects 是否一等公民。
3. 智譜清言 2026 介面是否仍稱「GLMs」。
4. DeepSeek Web 目前模型標籤；`deepseek-v4-pro` 在 2026-09-14 後的路由。
5. `research/03-analysis-process.md` 與 `research/data/process.json` 落地後，GAC 階段名稱是否需改名（本目錄已預留「待與 research/ 對齊」）。
