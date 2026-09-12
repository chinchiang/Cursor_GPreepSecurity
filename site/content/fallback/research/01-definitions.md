---
title: 定義與術語
slug: definitions
status: 暫存／待研究對齊
summary: 先制型資安、CTEM、PEM、3D、PTI、AMTD、ASCA、AAE 等公開出現的術語對照。
---

# 定義與術語

> 狀態：**暫存／待研究對齊**。同一術語在 Gartner 不同研究編號中可能範圍不同，以下標出公開可見定義與限制。

## Preemptive Cybersecurity（先制型資安）

**公開可見定義（二手）**：使用進階 AI／機器學習，在威脅具體化之前預測並中和威脅的技術與營運取徑。

**本專案工作定義（非官方）**：一套把「暴露發現 → 可利用性驗證 → 業務脈絡優先序 → 政策內自動或半自動處置」串起來的持續計畫，目標是在攻擊鏈早期 **拒絕、欺騙、打斷**，而不是只縮短 MTTD／MTTR。

## 相關但不同的名詞

- **Preventive / Proactive**：減少攻擊面的人工作業（強化、修補、權限收斂）。先制包含這層，但要求更快的驗證與動作迴路。
- **CTEM（Continuous Threat Exposure Management）**：Gartner 提出的持續暴露管理**計畫**，五階段為 Scope、Discover、Prioritize、Validate、Mobilize。CTEM 不是單一產品。
- **PEM（Preemptive Exposure Management）**：公開研究把 PEM 寫成執行暴露管理的進階取徑，用 AI、智能模擬與分析加速 CTEM 的發現、高準度驗證或處置。**不是獨立產品類別。**
- **ASCA（Automated Security Control Assessment）**：持續分析並優化安全控制組態，縮小控制漂移與無效控制。
- **PTI（Predictive Threat Intelligence）**：預測未來攻擊可能性與新興威脅，重點在「可能發生什麼」而非只彙整已發生 IOC。
- **AMTD（Automated Moving Target Defense）**：持續改變網路／主機特徵，使偵察資料迅速過期。
- **Advanced Cyber Deception**：自動部署並依攻擊者互動調整的欺騙資產。
- **AAE（Autonomous Adversarial Emulation）**：以模型與歷史／模擬行為，即時仿真攻擊以驗證防禦。
- **AEV（Adversarial Exposure Validation）**：用安全的攻擊仿真驗證暴露與控制是否真的可被利用。
- **ITDR（Identity Threat Detection and Response）**：身份威脅偵測與回應；部分二手來源將身份暴露納入先制拼圖，**與 3D／五能力清單的對應待原文核對**。

## 三個 D（Three Ds）

公開整理（IONIX、Zynap 等）將 Gartner 先制模型寫成：

1. **Deny**：在攻擊者使用前關閉路徑（持續發現與驗證暴露、加速修復、混淆偵察目標）。
2. **Deceive**：讓攻擊者難以分辨真資產與受控誘餌（AMTD、honeypot、合成憑證）。
3. **Disrupt**：在攻擊鏈早期依行為訊號自動打斷，不必等事件成立。

**限制**：3D 的官方原文用字、是否「恰好三個」、以及與五項核心技術如何對照，仍須對 Gartner 授權文件查證。本站以「公開二手一致處」呈現，分歧處列入〈來源與查證〉。

## 不要當成官方的句子

以下是本專案為了教學清楚而寫的工作語句，**不是 Gartner 原文**：

- 「先制分數」
- 「3D 覆蓋率」
- 「示範優先序權重」
- 「Skills 就緒度」
