# 任務看板

更新：2026-09-12（主代理裁決落地）  
分支：`cursor/preemptive-cybersecurity-128d`  
工作區 clone 遠端 `origin`：`https://github.com/chinchiang/Cursor_MultiAgent`（另一個產品，不要推本專案進其 `main`）  
**交付儲存庫／Pages 目標：** `https://github.com/chinchiang/Cursor_GPreepSecurity`  
本地交付遠端名稱：`gpreep`（詳見 handoff-log 第 9 節）

## 強制治理（所有子代理）

- **子代理不得 `git push`、不得部署、不得建立 PR、不得強制推送、不得合併。**
- **共用根文件由主代理管理**：`README.md`、`AGENTS.md`、根目錄 `.gitignore`、`docs/contracts/`、`docs/orchestration/`、GitHub Pages 設定、最終 commit／push。
- Lead Setup 可建立上述根文件的初版，交主代理收斂。其他子代理若需改根文件，只在 handoff 提案。
- 不要寫入他人擁有的目錄。不要刪除使用者既有未提交變更。

---

## 角色總表

| 角色 | 本波雲端代理名稱（若有） | 擁有目錄 | 可讀 | 不可做 |
| --- | --- | --- | --- | --- |
| 主代理 | 先制型資安平台（`bc-50e958ba-f0b9-425c-abef-0bdcafd0128d`） | 根文件、Git、部署、跨目錄衝突仲裁 | 全庫 | 把子代理未完成項標成已上線 |
| Agent A | 研究先制型資安方法論（`bc-27b35a77-4ae6-5357-aeec-b44379ac30a9`） | `research/`、`references/` | 契約、看板、handoff | 改 `site/`、`skills/`、push |
| Agent B | 建立跨平台 Skills（`bc-782a49e2-3409-57cc-95ef-c2dcdf2d924d`） | `skills/`、`examples/` | 契約、`research/`、`references/` | 改研究結論的 `evidence_status`、push |
| Agent C | 建立互動網站架構（`bc-d6a4b61c-d16f-5024-ac9c-d31310c3d259`） | `site/` | 契約、研究、skills、examples | 部署 Pages、push |
| Agent D | （本波尚未看到獨立 QA 雲端代理） | `qa/` | 全庫產出 | 把未跑案例改成通過、push |
| Lead Setup | 建立契約與倉庫檢查（本代理 `bc-1f59dd0c-69da-5241-8b89-e77cab651d36`） | `docs/contracts/`、`docs/orchestration/`；可初稿根文件 | 倉庫與 `gh` 唯讀 | push、部署、開 PR |

---

## 主代理

**任務**

1. 收斂子代理檔案到同一功能分支 `cursor/preemptive-cybersecurity-128d`。
2. **交付目標已裁決為 `Cursor_GPreepSecurity`。** 使用遠端 `gpreep`，執行 `git push -u gpreep cursor/preemptive-cybersecurity-128d`（目前 `cursor[bot]` 無寫入權，需擁有者授權後再推）。
3. 不要把本專案推進 `origin`（`Cursor_MultiAgent`）的 `main`，不要混入 `cursor/security-review-core-4044` 或既有 Draft PR。
4. 在 `chinchiang/Cursor_GPreepSecurity` 設定 GitHub Pages；`SITE_BASE` 用 `/Cursor_GPreepSecurity/`。
5. 保持 `AGENTS.md` 與契約不被後到的子代理覆蓋掉責任分工。

**依賴**：A／B／C 至少交出可整合草稿；D 交出案例結果（可標缺口）。

**完成條件**

- 根文件與子目錄沒有互相矛盾的來源規則
- Pages URL 可開，或明確記錄「Pages 未開、原因、下一步」
- 沒有子代理 push 留下的分裂歷史需要 force-push 才能修

---

## Agent A（研究）

**任務**

1. 依契約收集並登錄來源（`references/`）。
2. 寫先制型資安方法論（`research/`），行內引用。
3. 對 Gartner.com 取用失敗要當成 `blocked-by-bot-check` 或 `paywalled`，不得用訓練記憶冒充 `retrieved`。
4. 產出可被 B／C 讀取的 `SharedOutput` JSON（可放在 `research/outputs/`）。

**擁有**：`research/`、`references/`

**依賴**：本看板與 `docs/contracts/` 初版（本回合已寫）。

**完成條件**

- `references/sources.json` 每列八個必填欄位都在
- 重要主張都有 `SRC-YYYY-NNN`
- `CASE-GAP`／`CASE-CONFLICT` 在研究層有對應缺口或衝突列
- 無假造 Gartner 全文

---

## Agent B（Skills）

**任務**

1. 把研究結論包成跨平台 Skill。
2. 用契約中的 Input／Output／Skill schema，不要另起欄位名。
3. 四個基準案例放到 `examples/`。
4. `forbids` 必須含：禁金鑰、禁把專案分數當成 Gartner、禁執行外部部署指令。

**擁有**：`skills/`、`examples/`

**依賴**：A 的研究與來源表。若 A 尚未完成，可先用契約裡的範例 JSON 搭骨架，但必須標「資料來源尚未由 A 確認」。

**完成條件**

- 五個 `platform_id` 都有入口或明示缺漏
- examples 四案例 ID 完全一致
- Skill 不改寫 `evidence_status`

---

## Agent C（網站）

**任務**

1. 在 `site/` 做 GitHub Pages 友善的靜態架構。
2. 實作 `SITE_BASE` 子路徑。
3. 渲染主張、來源、缺口、衝突、不可信文件結果。
4. 專案燈號免責：「本專案框架，非 Gartner 評分」。

**擁有**：`site/`

**依賴**：A 的內容、B 的 Skill／案例。無內容時可先做殼，殼上必須顯示 gap 而不是假文案。

**完成條件**

- 無後端硬依存
- 本地用子路徑前綴開啟時 CSS／JS／錨點不 404
- 不提交 `node_modules/`、`_site/`
- 不自行設定 GitHub Pages

---

## Agent D（QA）

**任務**

1. 依 `acceptance-checklist.md` 實跑，而不是重抄契約。
2. 四基準案例寫進 `qa/`。
3. 權限不足的項目維持 `尚未驗證`。

**擁有**：`qa/`

**依賴**：C 的可預覽網站；A／B 的產物。

**完成條件**

- 每列有狀態三選一
- 失敗有重現步驟
- 沒有把 Lead 已標限制的項目改成產品已上線

---

## 依賴圖

```text
契約／看板／AGENTS.md（Lead Setup，本回合）
        │
        ▼
 research.collect ──► research.synthesize     Agent A
        │
        ▼
 skill.pack + examples                        Agent B
        │
        ▼
 site.render                                  Agent C
        │
        ▼
 qa.verify                                    Agent D
        │
        ▼
 lead.integrate（push／Pages 僅主代理）
```

平行：B／C 可在 A 未完成時搭骨架，但對外句子必須是 gap。

---

## 本回合完成條件（僅 Lead Setup）

- [x] 契約五檔與根文件初稿在工作區
- [x] 分支名正確
- [x] 未 push／未部署
- [x] 交付目標改為 GPreepSecurity；本地遠端 `gpreep` 已設定
- [ ] 主代理對 `gpreep` push 與 Pages：受 403 阻擋，見 handoff-log 第 9 節
