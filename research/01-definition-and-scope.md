# 01 — Preemptive Cybersecurity 定義、目標與範圍

**查閱日期：** 2026-09-12  
**契約：** 已遵循 `docs/contracts/`（來源類型、`full_text_status`、`evidence_status`）。見 [`README.md`](README.md)。  
**重要主張皆在段內附來源 ID。**

> 全文狀態：blocked-by-bot-check。2026-09-12 抓取 Gartner 公開文章與 Newsroom 僅得到驗證頁。下列「Gartner 寫道」句子，可核對範圍是已讀轉載（[SRC-2025-003][SRC-2025-006]）或搜尋摘要；官方列 [SRC-2025-001][SRC-2025-004][SRC-2026-001] 的 `claims_supported` 為空，不得標 `gartner-stated` + `supported`。

## 1. 公開定義

### 1.1 Gartner 公開文章中的定義

**[third-party；evidence_status=partial]** 搜尋摘要與廠商轉述稱 Gartner 公開文章將 Preemptive Cybersecurity 定義為：一種新興但日益關鍵的取徑，目標是在網路攻擊能夠**發動或成功之前**就加以預防與嚇阻，而不是對已經進行中的攻擊做回應。[SRC-2025-001]

同一篇文章主張，先制方案應納入三項能力：

1. **Deny**：拒絕攻擊者發動攻擊或取得目標資源的機會。
2. **Disrupt**：在攻擊進行時予以干擾、打斷。
3. **Deceive**：欺騙攻擊者，使其偏離關鍵資產。[SRC-2025-001]

**可驗證範圍：** 上述句子來自 Gartner.com 公開文章〈Preemptive Cybersecurity Solutions: A Must in Modern Tech Products〉（頁面標題亦被其他來源稱為 *Don’t Delay in Building Preemptive Cybersecurity Solutions*）的搜尋引擎摘要與多家轉述。本環境無法直接抓取 gartner.com 全文（Cloudflare 403），因此**未核對**該頁其餘段落、配圖與「see image above」所指的 3 Ds 圖示細節。[SRC-2025-001]

### 1.2 Gartner 2025-09-18 新聞稿中的技術描述

**[third-party；evidence_status=supported]** Help Net Security 轉載 2025-09-18 新聞稿寫道：Preemptive cybersecurity technologies 使用進階 AI 與 machine learning (ML)，在威脅成形（materialize）之前預測並中和。能力例子包含 predictive threat intelligence、advanced deception 與 automated moving target defense。[SRC-2025-004][SRC-2025-003]

**[third-party；evidence_status=supported]** 同一轉載的支出預測：到 2030 年，preemptive cybersecurity solutions 將佔 IT 資安支出的 50%，2024 年則少於 5%，並將取代獨立的 detection and response (DR) 方案，成為抵禦網路威脅的首選取徑。[SRC-2025-004][SRC-2025-003][SRC-2025-006]

**[third-party；evidence_status=supported]** Carl Manion（Gartner Managing Vice President）轉載引言：

> Preemptive cybersecurity will soon be the new gold standard for every entity operating on, in, or through the various interconnected layers of the global attack surface grid (GASG). DR-based cybersecurity will no longer be enough to keep assets safe from AI-enabled attackers. Organizations will need to deploy additional countermeasures that act preemptively and independently of humans to neutralize potential attackers before they strike. [SRC-2025-004][SRC-2025-003]

**可驗證範圍：** 官方 URL 為 Gartner Newsroom；本環境對 gartner.com 直接抓取失敗。完整段落已於 Help Net Security（2025-09-23）與 Network World（2025-10-21）公開轉載，兩處與搜尋引擎對官方頁的摘要一致，故將上述句子標為 **[third-party]**（`evidence_status=partial` 相對官方原文；對轉載頁本身可 `supported`）。不得升格為 `gartner-stated` + `supported`。新聞稿中關於 Healthcare／ICS／SaaS 垂直整合與 API 標準化的其餘段落，以 Help Net Security 全文為準，見 [SRC-2025-003]。

### 1.3 2026 策略科技趨勢中的定位

**[third-party；evidence_status=supported]** 轉載稱 Gartner 於 2025-10-20 宣布 2026 年 Top Strategic Technology Trends，其中包含 Preemptive Cybersecurity。公開說明：面對針對網路、資料與連網系統的威脅指數成長，組織將此列為趨勢；並重申 2030 年佔資安支出一半的預測。[SRC-2026-001][SRC-2025-005]

**[third-party；evidence_status=supported]** Tori Paulman（Gartner VP Analyst）轉載引言：

> Preemptive cybersecurity is about acting before attackers strike using AI-powered SecOps, programmatic denial and deception. This is a world where prediction is protection. [SRC-2026-001][SRC-2025-005][SRC-2025-006]

**[third-party；evidence_status=supported]** Network World 轉載同一材料時，補上與 2025-09-18 新聞稿相同的技術句子（AI／ML、predictive threat intelligence、advanced deception、AMTD），並再次引用 Manion 的 GASG 原句。[SRC-2025-006]

### 1.4 本專案採用的操作定義

**[project-framework]** 為了讓後續 skills 與網站能執行分析，本專案把公開定義收斂成下列**操作定義**。此定義**不是** Gartner 官方 glossary 條目：

> Preemptive Cybersecurity 分析，是在攻擊路徑尚可被切斷時，依據可追溯證據，判斷「攻擊者接下來最可能利用什麼曝險」，並提出 Deny / Deceive / Disrupt 建議；同時明確標示哪些判斷尚未驗證、哪些必須由人類核准。

此操作定義刻意比 Gartner 公開願景**更窄**：它描述的是**分析工作**，不是整套 Autonomous Cyber Immune System (ACIS) 產品。

## 2. 目標

從公開資料可分離出三層目標，不可混為一談。

### 2.1 Gartner 對產品與 CIO 的公開目標

**[third-party；evidence_status=partial]** 下列條目綜合公開文章摘要與已讀轉載，不是已取得的官方 HTML：

- 在攻擊發動或成功之前預防與嚇阻。[SRC-2025-001]
- 以 Deny / Deceive / Disrupt 對抗「武器化 AI」。[SRC-2025-001]
- 在 Global Attack Surface Grid (GASG) 的互連層上，部署可**先於人類、獨立行動**的反制措施。[SRC-2025-004][SRC-2025-003]
- 從「一體適用的 DR 平台」轉向更針對垂直產業、應用類型與威脅手法的先制方案，其中許多將基於 agentic AI 與 domain-specific language models (DSLMs)。[SRC-2025-004][SRC-2025-003]
- 產品負責人若未投入先制能力，未來兩到四年可能面臨影響職涯的資安事件與市佔損失。[SRC-2025-001][SRC-2025-003]

**[third-party；evidence_status=supported]** 轉載另預測：到 2030 年，已記錄的 cybersecurity CVEs 將超過 100 萬，較 2025 年約 277,000 增加 300%。此數字被用來支持「DR 跟不上」的論證，但新聞稿**沒有**公開其 CVE 計數方法。[SRC-2025-004][SRC-2025-003]

### 2.2 Gartner 遠期概念：ACIS

**[third-party；evidence_status=supported]** 轉載稱，安全數位世界取決於擁抱 Autonomous Cyber Immune System (ACIS)——它是 Preemptive Cybersecurity 針對複雜且快速成長之 GASG 的終極演化。[SRC-2025-004][SRC-2025-003]

**[third-party；evidence_status=supported]** Manion 引言（Help Net Security 轉載）：GASG 的擴張與複雜化使傳統被動措施過時；ACIS 雖仍早期，其主動與調適能力是數位防禦的未來；發展與部署智慧、去中心、戰術性的 ACIS 框架「不只是志向，而是最終的絕對必要」。[SRC-2025-003]

**[unverified-hypothesis]** ACIS 的架構元件、與現有 SOC 的介面、自治行動的治理界線，**未**在公開新聞稿中展開。不得把本專案的 GAC 流程寫成 ACIS。

### 2.3 本專案分析目標

**[project-framework]** 本專案（GPreep）的分析目標不是「部署自治免疫系統」，而是：

1. 把組織當下的資產、曝險、情資與驗證結果，轉成可審查的先制建議。
2. 讓每條建議都能追溯輸入、判斷依據、信心水準與人工決策點。
3. 在資料缺漏、證據矛盾、外部文件含不可信指令時，**降級或拒絕**，而不是編造完整度。

## 3. 範圍

### 3.1 公開資料明確納入的能力

**[third-party；evidence_status=supported]** 新聞稿與 2026 趨勢轉載共同點名的能力：[SRC-2025-004][SRC-2025-003][SRC-2025-006]

| 能力 | 公開文本中的角色 | 本專案處理方式 |
| --- | --- | --- |
| Predictive threat intelligence | 在威脅成形前預測 | 作為**輸入與關聯**（見 02、04） |
| Advanced deception | 先制能力之一 | 作為 **Deceive** 建議類型 |
| Automated moving target defense | 先制能力之一 | 作為 **Deceive／Deny** 建議類型 |
| AI-powered SecOps | 2026 趨勢引言 | 作為執行建議的可能承載，不是本專案必備執行器 |
| Programmatic denial and deception | 2026 趨勢引言 | 對齊 3 Ds 的 Deny／Deceive |

**[third-party]** IONIX、Zynap 等廠商將公開的 3 Ds 展開為五項技術：AMTD、advanced cyber deception、predictive threat intelligence、advanced obfuscation、preemptive exposure management／CTEM。[SRC-2025-008][SRC-2025-009]

**[unverified-hypothesis]** 「Gartner 官方先制框架恰好包含這五項技術」來自廠商詮釋，不是本環境讀過的 Gartner 報告目錄。本專案可把這五項當**常見能力清單**討論，但必須標 `third-party` 或 `unverified-hypothesis`，不得寫成 Gartner 官方產品分類。

**[third-party]** SimSpace 對客戶報告 *Emerging Tech Impact Radar: Preemptive Cybersecurity*（G00830315，2025-10-07）的行銷頁聲稱：報告 35 頁、描繪十一項新興技術；1–3 年環包含 advanced cyber deception、automated security control assessment、predictive threat intelligence、preemptive exposure management。[SRC-2025-010][SRC-2025-002]

**可驗證範圍：** 僅能確認報告**標題、文件編號、公開日期與行銷頁摘要**。十一項技術的完整名單、廠商樣例與四項高階建議**未**在本環境讀到原文，列為待驗證。

### 3.2 公開資料明確對照、但不等於「被取代而消失」的範圍

**[third-party；evidence_status=supported]** 轉載的對照組是 **standalone detection and response (DR) solutions**。措辭是「replacing … as the preferred approach」，指向**支出與偏好的轉移**，不是宣布偵測／回應不再需要。[SRC-2025-004][SRC-2025-003]

**[project-framework]** 因此本專案範圍：

- **納入分析：** 曝險、攻擊路徑、情資、驗證證據、可在攻擊成功前採取的 Deny／Deceive／Disrupt 選項。
- **納入銜接、但不把其產出誤稱為先制成功：** 偵測規則、事件回應 runbook、復原計畫。
- **不納入（除非使用者明確提供）：** 攻擊武器化程式碼、未授權利用、對第三方系統的實際攻擊。
- **不納入：** 把 Gartner 客戶報告全文當成本地知識。

### 3.3 與「全球攻擊面網格」用語的界線

**[third-party；evidence_status=supported]** GASG 出現在 Manion 轉載引言中，作為互連攻擊面的修辭框架。[SRC-2025-004][SRC-2025-003]

**[project-framework]** 本專案**不**把 GASG 實作為一種必須存在的資料模型。實際輸入仍是資產清單、EASM 發現、身分與網路拓樸、SaaS 與供應鏈邊界。GASG 只作為 Gartner 公開論述的背景詞。

## 4. 與預防、偵測、回應的關係

這一節必須同時使用 Gartner 公開對照、NIST 的功能分類，以及本專案自己的對照表。三者層次不同。

### 4.1 Gartner 公開對照：Preemptive vs Detection and Response

**[third-party；evidence_status=partial]** 公開文章摘要與新聞稿轉載反覆把先制與「傳統 detection-and-response／stand-alone DR」對立：後者被描述為跟不上 AI 加速的攻擊；前者聚焦 prevention, not reaction，並在攻擊發動或成功前作用。[SRC-2025-001][SRC-2025-004][SRC-2025-003]

**[third-party；evidence_status=supported]** 2026 趨勢轉載引言把先制說成「在攻擊者出手前行動」。[SRC-2026-001]

**[project-framework]** 正確讀法是**時間點與證據基礎的轉移**，不是刪除 Detect／Respond 功能：

| 取徑 | 主要時間點 | 主要證據 | 主要失敗模式 |
| --- | --- | --- | --- |
| 預防／強化（傳統 Prevent／Protect） | 週期性、變更時 | 基準、合規、補丁清單 | 清單與真實可利用路徑脫節 |
| 偵測（Detect） | 攻擊已產生訊號 | 警示、IoC、行為異常 | 攻擊速度快於分析師 |
| 回應（Respond） | 事件已成立 | 事件工單、取證 | 損失可能已發生 |
| 先制（Preemptive，Gartner 公開用法） | 攻擊尚未成功，理想上尚未發動 | 預測情資、已驗證曝險、欺敵互動 | 把未驗證假設當成已發生的攻擊 |

### 4.2 廠商對 Preemptive / Proactive / Predictive / Reactive 的四象限

**[third-party]** Zynap 將安全取徑排成 Reactive → Proactive → Predictive → Preemptive，並聲稱 Gartner 研究把先制描述為：從廣泛主動防禦轉向針對性、預測性取徑，識別攻擊前兆並在侵害前介入；且「不等人審核即 deny／deceive／disrupt」。[SRC-2025-009]

**[third-party]** Picus 引述其聲稱的 Gartner Doc 5951239：「Preemptive cybersecurity focuses on preventing, stopping or deterring attacks before they can launch an effective assault。」並主張 Gartner 區分 proactive（準備）與 preemptive（基於已驗證攻擊可行性的預防）。[SRC-2025-007][SRC-2025-014]

**[unverified-hypothesis]** 上述「四象限」與「proactive vs preemptive 對照表」**尚未**被本環境在 Gartner 公開全文中核對。skills 可以使用「先制強調在攻擊成功前依證據行動」這一**已核對**的公開意思，但不得把 Zynap／Picus 的表格寫成 Gartner 官方表格。

### 4.3 NIST CSF 2.0：預防、偵測、回應不是過時分類

**[third-party]** NIST CSF 2.0（2024-02-26）以六個並行且持續的 Functions 組織資安成果：Govern、Identify、Protect、Detect、Respond、Recover。CSF **不規定**如何達成成果，也不是「先制取代 CSF」的聲明。[SRC-2024-003][SRC-2024-009]

**[project-framework]** 本專案把 Gartner 公開的先制目標**對映**到 CSF，而不是用先制覆蓋 CSF：

| NIST CSF 2.0 Function | 與先制分析的關係（本專案） |
| --- | --- |
| Govern | 決定哪些資產不可接受被利用、哪些自治動作必須人工核准 |
| Identify | 資產、曝險、威脅與業務脈絡——先制分析的主要輸入 |
| Protect | Deny（修補、區隔、混淆、最小權限）落地於此 |
| Detect | 欺敵互動、移動目標引發的異常，仍可能產生偵測訊號 |
| Respond | Disrupt 若發生在「攻擊已開始但未成功」的窗口，會與回應重疊 |
| Recover | 先制失敗時的後路；不是先制成功指標 |

**[project-framework]** 因此：「先制」描述的是**決策與行動何時發生**；「預防／偵測／回應」描述的是**控制功能屬於哪一類成果**。兩者可同時為真。

### 4.4 本專案禁止的簡化句

以下句子**不得**出現在 skills 或網站，除非加上本節的限定：

- 「Gartner 說偵測與回應已經過時、可以停用。」——新聞稿說的是 DR **不足夠**且支出偏好將轉移，不是停用。[SRC-2025-004]
- 「Gartner 發布了官方的六步先制作業流程。」——公開資料沒有這樣的流程；GAC 是本專案的。[project-framework]
- 「Preemptive 等於 CTEM。」——CTEM 是 2022 年起的曝險管理計畫；先制是 2025–2026 公開強化的能力敘事。二者相關，但不是同義詞（見 02）。

## 5. 本節未解決的問題

1. Gartner 公開文章與新聞稿都談「獨立於人類行動」，但未公開治理模型：哪些動作可自動執行、哪些必須人工。**[unverified-hypothesis]**
2. 「預測即保護」是修辭還是可量測成果，公開資料沒有定義 MTRER 或其他官方 KPI。Zynap 提到 MTRER，屬廠商用語。[SRC-2025-009]
3. 3 Ds 的官方圖像與各技術如何精確分配到 Deny／Deceive／Disrupt，公開全文未在本環境核對。IONIX 的分配是二手詮釋。[SRC-2025-008]
