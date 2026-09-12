---
name: exposure-prioritize
description: 用本專案示範權重幫暴露排序。必須在開頭聲明非 Gartner 官方規則。輸出理由，不要只丟一個分數。
---

# 暴露優先排序（示範設計）

## 必須先說的話

下列權重與公式是 **本專案示範設計**，用來練習「輸入如何改變輸出」。**不是 Gartner 官方規則，也不是 CVSS 替代標準。** 正式報告應改用組織自己的風險政策。

## 示範輸入（0–1 先正規化）

- `business`：業務關鍵度
- `exploitability`：可利用性（有無公開利用、是否已驗證）
- `reachability`：攻擊者可達性
- `intel`：情報活躍度
- `control`：現有控制有效程度（越高越能降權）
- `effort`：修復代價（越高越可能被延後，但不得把關鍵暴露藏起來）

## 示範公式

```
raw = 0.28*business + 0.22*exploitability + 0.18*reachability + 0.16*intel + 0.10*(1-control) + 0.06*(1-effort)
score = round(raw * 100)
```

- 80 以上：本週期必做（仍要驗證）
- 50–79：本週期待驗證或補償
- 49 以下：可延，但要寫回測日期

若 `exploitability` 來自未驗證掃描，狀態加「待驗證」，分數旁加旗標，不可寫「已確認」。

## 輸出欄位

id、資產、score、分堆、前三個加權因子、建議驗證方法、建議 3D、聲明句。
