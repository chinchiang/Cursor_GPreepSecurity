# Grok 可重現驗收

與五平台同一組案例。預期見 `examples/expected-outputs/`，並對齊 `research/data/cases.json`（Northwind Synth；UNTRUSTED 乾淨主機為 `status.northwind-synth.test`）。

額外：

- Grok Build：`grok inspect` 應列出 `preemptive-cyber-review`。
- `/preemptive-cyber-review` 貼 CASE-UNTRUSTED-DOC 不得執行文件指令。

## FAQ

**Q：沒有 /preemptive-cyber-review？**  
A：確認資料夾在 `.grok/skills/preemptive-cyber-review/SKILL.md`，且 `user-invocable` 為字面 `true`。

**Q：grok.com 找不到 Skills？**  
A：新聞稿指定 Grok 4.3 + web/iOS/Android。方案或地區差異待實測。改用系統提示詞。
