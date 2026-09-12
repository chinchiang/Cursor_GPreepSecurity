---
title: 概念關係
slug: relations
status: 暫存／待研究對齊
summary: 先制型資安、CTEM、PEM、3D 與雷達技術之間的關係，以及本專案 Skills 接在哪一段。
---

# 概念關係

> 狀態：**暫存／待研究對齊**。關係圖是本專案為教學畫的，來源之間並非完全一致。

## 一張圖看位置

```
業務結果與風險胃口（Scope 的起點）
        │
        ▼
   CTEM 計畫（持續五階段）
        │
        ├─ Discover / Prioritize ◄── PTI、資產脈絡
        ├─ Validate ◄──────────── AEV / AAE / ASCA
        └─ Mobilize ──► 3D 動作
                         ├─ Deny   （修復、封鎖路徑、混淆）
                         ├─ Deceive（欺騙、AMTD）
                         └─ Disrupt（依預測與行為打斷）
        │
        ▼
   PEM = 用 AI／模擬把上述階段做快、做準（取徑，不是新品類）
```

## 兩份公開清單不要硬併成一份「官方五力」

二手來源常見「五項核心技術」寫法（例如 PTI、AMTD、Deception、CTEM、Obfuscation）。Gartner *Emerging Tech Impact Radar: Preemptive Cybersecurity*（G00830315，2025-10-07）則以 **11 項新興技術／趨勢** 分成營運、情報、基礎設施三主題。本站同時列出，不把其中一份宣稱成唯一官方清單。

本專案已從公開轉載讀到並納入對照的雷達項目包括：Advanced Cyber Deception、ASCA、PTI、PEM、Advanced Obfuscation、AAE、Cybersecurity Precrime Platforms、Secure Software-Defined Storage。其餘項目列為待補。

## Skills 接點

| Skill | 接在方法論的哪裡 | 主要輸出 |
| --- | --- | --- |
| preemptive-assess | 進入 CTEM 前的現況快照 | 姿勢判斷、缺口、下一步 |
| ctem-cycle | 五階段推進 | 本週期範圍、清單、分堆 |
| exposure-prioritize | Prioritize | 示範排序與理由（非官方公式） |
| three-ds-playbook | Mobilize | Deny／Deceive／Disrupt 選項 |
| source-cite | 全程 | 引用、查閱日期、限制、待驗證 |

## 與本倉庫其他代理的契約

- `research/` 為方法論正文來源；網站建置時同步，不另手抄一份會漂的複本而不標版本。
- `skills/` 為可安裝技能正文；網站提供閱讀、複製、下載。
- `docs/contracts/` 若出現 schema，同步腳本會併入並覆蓋同名欄位。
- 示範評分永遠帶「本專案示範設計」標籤。
