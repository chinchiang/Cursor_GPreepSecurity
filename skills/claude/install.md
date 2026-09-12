# Claude 安裝／設定（查閱 2026-09-12）

未登入 claude.ai，下列 UI 步驟依官方 Help，**未做帳號實測**。

## A. claude.ai Skills

**來源：** [How to create custom skills](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)（2026-07-22）、[Use skills in Claude](https://support.claude.com/en/articles/12512180-use-skills-in-claude)、[Creating custom skills](https://claude.com/docs/skills/how-to)

1. 設定 → Capabilities：啟用 **Code execution and file creation**。Enterprise 需 Owner 先在 Organization settings > Skills 開啟。
2. 打包：

```bash
cd skills/claude
zip -r preemptive-cyber-review.zip preemptive-cyber-review
```

正確結構：

```
preemptive-cyber-review.zip
└── preemptive-cyber-review/
    ├── SKILL.md
    ├── references/
    └── assets/
```

3. Customize → Skills → + Create skill → Upload a skill → 選 ZIP。
4. 切換啟用。
5. 開新對話，貼 CASE-COMPLETE JSON，並寫「請使用 preemptive-cyber-review」。
6. 看 thinking／引用是否載入 skill。若沒觸發，把 description 再寫得更靠近使用者用語。

注意：Help 文有時寫 `skill.md` 與較自由的 `name`；本包採開放標準 `SKILL.md` + 小寫連字號名稱，且 description ≤ 200 字元以符合 claude.ai 限制。

## B. Claude Projects

**來源：** [Create and manage projects](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects)（查閱 2026-09-12：Free 可用，最多 5 個專案）

1. [claude.ai/projects](https://claude.ai/projects) → + New Project。
2. Set project instructions，貼 `project-instructions.md`。
3. 右側 + 上傳契約與基準案例。
4. 在專案內開 chat 跑四個案例。

## C. Claude Code

把 `preemptive-cyber-review/` 複製到：

- 個人：`~/.claude/skills/preemptive-cyber-review/`
- 專案：`.claude/skills/preemptive-cyber-review/`

與 claude.ai／API **不同步**。

## D. API

見 `api-workflow.md`。
