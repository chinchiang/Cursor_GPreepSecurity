# Cursor_MultiAgent

## 專案協調／目錄責任

先制型資安平台工作（分支 `cursor/preemptive-cybersecurity-128d`）的目錄責任如下。細節以 `AGENTS.md` 與 `docs/contracts/` 為準。

| 角色 | 擁有目錄 |
| --- | --- |
| Agent A | `research/`、`references/` |
| Agent B | `skills/`、`examples/` |
| Agent C | `site/` |
| Agent D | `qa/` |
| 主代理 | 根文件、Git、部署；`docs/contracts/`、`docs/orchestration/` |

本工作區 clone 來源（`origin` → Cursor_MultiAgent）與交付庫（`gpreep` → Cursor_GPreepSecurity）不同，不要把本專案推進 MultiAgent 的 main。

子代理不得 push 或部署。共用根文件由主代理管理。來源類型、schema 與基準案例見 `docs/contracts/shared-data-contract.md`。
