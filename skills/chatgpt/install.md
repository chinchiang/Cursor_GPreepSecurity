# ChatGPT 安裝／設定（經查證，查閱 2026-09-12）

本目錄提供三種形式，依你的方案選擇。**本環境沒有 ChatGPT 帳號，下列步驟未在 UI 端到端實測。**

## 形式 A：Skills（首選，若工作區開放）

**來源：** [Skills in ChatGPT](https://help.openai.com/en/articles/20001066-skills-in-chatgpt)、[Build skills](https://learn.chatgpt.com/docs/build-skills)、[Agent Skills 規格](https://agentskills.io/specification)（查閱 2026-09-12）

**適用（官方 Help）：** ChatGPT Business、Enterprise、Healthcare、Edu。受工作區設定與產品可用性限制。

1. 確認工作區管理員已允許 Skills。
2. 在本機打包：

```bash
cd skills/chatgpt
zip -r preemptive-cyber-review.zip preemptive-cyber-review \
  -x "*.DS_Store"
```

ZIP 內應為：

```
preemptive-cyber-review.zip
└── preemptive-cyber-review/
    ├── SKILL.md
    ├── agents/openai.yaml
    ├── references/
    └── assets/
```

3. ChatGPT → Skills → Create → Upload from your computer → 選 ZIP。
4. 等待掃描完成。若標 Needs Review，先讀內容再啟用。若標 Blocked，改用形式 B。
5. 或 Skills → Create → Create with editor，把 `SKILL.md` 正文貼上，`name` 設為 `preemptive-cyber-review`。
6. 新對話輸入 `@preemptive-cyber-review` 再貼 `examples/baseline-cases/CASE-COMPLETE.json`。

Codex／桌面端亦可把同一資料夾放到 `$REPO/.agents/skills/preemptive-cyber-review/` 或 `$HOME/.agents/skills/`（[Build skills](https://learn.chatgpt.com/docs/build-skills)）。

## 形式 B：Custom GPT（Skills 不可用時）

**來源：** [Creating and editing GPTs](https://help.openai.com/en/articles/8554397-creating-a-custom-gpt)（查閱 2026-09-12）

1. 側欄 Explore GPTs → Create。
2. Configure 分頁：依 `gpt-instructions.md` 填 Name／Description／Instructions。
3. Knowledge（可選）：上傳 `io-contract.md` 與四個基準案例。
4. 關閉未審查 Actions。可開 Data analysis。
5. 儲存為 Only me 或工作區內分享（依政策）。
6. 用 Conversation starter 跑 `CASE-GAP` 確認會標缺漏。

## 形式 C：Projects

**來源：** [Projects in ChatGPT](https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt)（查閱 2026-09-12）

1. 左側 Projects → 建立專案（建議名：GPreep Cyber Review）。
2. `...` → Project settings → 貼上 `project-instructions.md`。
3. 上傳基準案例與契約（檔案數注意方案上限：Free 5；Go/Plus 25；Edu/Pro/Business/Enterprise 40）。
4. 建議開 project-only memory，避免與其他對話混淆。
5. 在專案內開新 chat，貼案例 JSON。

## 權限與連線

- 不需要外部 API。
- 不要把生產密鑰放進 Knowledge。
- 企業方案遵循工作區保留與分享政策。
