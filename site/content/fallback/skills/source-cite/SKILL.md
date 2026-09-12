---
name: source-cite
description: 為先制型資安相關陳述補上引用、查閱日期、原文／轉述區分與待驗證標記。
---

# 來源引用與限制標示

任何看起來像 Gartner 預測、定義或廠商排名的句子，都要經此檢查。

## 每條主張的欄位

- `claim`：原句
- `sourceTitle`
- `sourceId`：研究編號或 URL
- `datePublished`
- `dateAccessed`
- `kind`：原文／授權轉載／二手轉述／本專案整理
- `confidence`：高／中／低／待驗證
- `limitation`

## 規則

- 找不到出處就刪主張或改成「未驗證說法」。
- 二手轉述不得寫成「Gartner 原文」。
- 示範分數不得寫進來源表冒充研究發現。
- 查閱日期用 ISO 日期。

## 輸出

Markdown 表格，並附「不得公開轉載的原文」處理方式：只保留可公開的轉述與連結，不貼上受版權保護的長文。
