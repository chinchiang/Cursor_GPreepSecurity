# Grok 安裝／設定（查閱 2026-09-12）

## A. Grok Build（檔案系統 Skills，官方文件最完整）

**來源：** [Skills, Plugins & Marketplaces](https://docs.x.ai/build/features/skills-plugins-marketplaces)

```bash
# 專案範圍（建議納入版本庫）
mkdir -p .grok/skills
cp -R skills/grok/preemptive-cyber-review .grok/skills/

# 或使用者範圍
mkdir -p ~/.grok/skills
cp -R skills/grok/preemptive-cyber-review ~/.grok/skills/
```

啟動後：

```bash
grok inspect
# 對話中：
# /preemptive-cyber-review
```

也可在 `~/.grok/config.toml` 加：

```toml
[skills]
paths = ["/absolute/path/to/skills/grok"]
```

## B. grok.com / iOS / Android Skills

**來源：** [Skills in web, iOS, and Android](https://x.ai/news/grok-skills)（2026-05-18）

1. 使用 Grok 4.3 或更新（新聞稿所述）。
2. 以對話描述、上傳 `SKILL.md`、或請 Grok「把這些規則存成 skill」。台詞見 `system-prompt.md`。
3. **選單標籤待帳號實測**（新聞稿未給逐步點擊路徑）。

## C. 系統提示／API

見 `system-prompt.md`、`api-workflow.md`。

## 權限

Grok Build 的 `allowed-tools` **不授予**工具（官方表）。仍須用 sandbox／allow-deny 旗標限制網路。不要 `--always-approve` 跑本分析。
