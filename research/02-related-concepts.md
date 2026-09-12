# 02 — 相關概念與關聯

**查閱日期：** 2026-09-12  
**契約：** 已遵循 `docs/contracts/`。每項關聯均標來源，或明確標為本專案推論。官方 Gartner URL 未取得全文時，主張最多 `partial`／轉載 `third-party`。

本文件只處理七個與 Preemptive Cybersecurity 最常被放在一起的概念。關聯分三級：

| 關聯級 | 意義 |
| --- | --- |
| **公開直接關聯** | Gartner 公開文本把該概念與先制或 CTEM 寫在同一論述中 |
| **公開間接關聯** | 公開文本分別定義兩者，本專案依其定義推導交界（標 `project-framework`） |
| **二手／待驗證** | 僅見於廠商或付費牆摘要 |

---

## 1. Continuous Threat Exposure Management (CTEM)

### 1.1 公開定義

**[third-party；evidence_status=supported]** Architecture & Governance 轉載 2024-02-22 新聞稿：CTEM 是組織可用來持續評估數位與實體資產的**可及性（accessibility）、曝險（exposure）與可利用性（exploitability）**的務實、系統性取徑。把評估與修復範圍對齊威脅向量或業務專案（而不是對齊某個基礎建設元件），能凸顯漏洞與**無法修補的威脅**。[SRC-2024-001][SRC-2024-002]

**[third-party；evidence_status=supported／conflict]** 同一轉載預測（CSA 寫 3x，見 [SRC-2024-005]）：到 2026 年，依 CTEM 計畫排定資安投資優先順序的組織，將實現漏洞／侵害（breaches）減少三分之二。[SRC-2024-001][SRC-2024-002]

**查閱日提醒：** 今日為 2026-09-12。該預測的窗口已到，但本環境**沒有** Gartner 對此預測的公開事後驗證報告。不得把「三分之二」寫成已證實的實測結果。

**[third-party]** 多家來源一致轉述 2022-07-21 客戶報告 *Implement a Continuous Threat Exposure Management (CTEM) Program*（Jeremy D'Hoinne、Pete Shoard、Mitchell Schneider；ID G00763954）中的定義與目標：

- CTEM 是一套流程與能力，讓企業持續、一致地評估資產的可及性、曝險與可利用性。[SRC-2022-001][SRC-2022-004]
- 目標是產出業務主管能理解、架構團隊能執行的、一致且可行動的安全態勢修復與改善計畫。[SRC-2022-001][SRC-2022-004]
- 每一循環必須包含五步：scoping、discovery、prioritization、validation、mobilization。[SRC-2022-001]
- Jeremy D'Hoinne 公開被引：組織無法修補一切，也無法完全確定哪些修復可以安全延後。[SRC-2024-006]

**可驗證範圍：** 報告全文付費牆。本環境只核對到被標明出處的引句與五階段名稱，**未**核對原文頁碼或圖 2。

### 1.2 五階段（公開轉述，非本專案發明）

**[third-party]** 下列階段說明綜合 XM Cyber 獲授權引述、SC Media、CSA 部落格。它們描述的是 **CTEM 計畫**，不是 Preemptive Cybersecurity 的官方作業流程。[SRC-2022-004][SRC-2024-006][SRC-2024-005]

| 階段 | 公開轉述的目的 |
| --- | --- |
| Scoping | 依業務影響界定本輪要保護的範圍，而不只依技術孤島 |
| Discovery | 找出範圍內的資產與曝險（含錯誤組態、身分、影子 IT，而不只是 CVE） |
| Prioritization | 依利用可能性、現有控制、業務關鍵性排序，而不是只看 CVSS |
| Validation | 驗證攻擊者是否真能利用該曝險、控制系統會如何反應 |
| Mobilization | 讓基礎設施／系統／專案負責人真正採取行動 |

**[third-party]** Gartner 被引的 validation 原意（XM Cyber 標明出處）：在資安脈絡中，validation 是組織用來驗證潛在攻擊者如何真正利用已識別曝險、以及監控與控制系統可能如何反應的過程；目標包含評估 likely “attack success”。[SRC-2022-001][SRC-2022-004]

### 1.3 與 Preemptive Cybersecurity 的關聯

**公開直接關聯**

- **[third-party；evidence_status=partial]** 先制轉載能力包含「在威脅成形前中和」與 exposure／攻擊面論述（GASG）。[SRC-2025-004][SRC-2025-001]
- **[third-party]** Picus 引述客戶文件，稱 Gartner 把 preemptive cyber defense 描述為曝險管理的**執行結果**，而不是另一類獨立產品；並稱 validation 是 proactive 與 preemptive 的轉折點。[SRC-2025-007][SRC-2025-014][SRC-2025-015]

**本專案推論（必須標明）**

**[project-framework]** CTEM 提供「持續找出並減少真實曝險」的計畫骨架；Preemptive Cybersecurity 的公開 3 Ds 提供「對這些曝險採取 Deny／Deceive／Disrupt」的行動詞彙。沒有 CTEM 式的範圍與驗證，3 Ds 容易變成未經驗證的自動封鎖。沒有 3 Ds，CTEM 的 mobilization 可能只停在工單，而不是在攻擊成功前改變攻擊者成本。

**[unverified-hypothesis]** 「Preemptive = CTEM + 自治執行」常見於廠商文案，但不是本環境讀過的 Gartner 原文命題。

---

## 2. 威脅情資（Threat Intelligence, TI）

### 2.1 公開定義與格式

**[third-party；evidence_status=supported]** 先制技術清單轉載把 **predictive threat intelligence** 列為核心能力之一：在威脅成形前預測並中和。[SRC-2025-004][SRC-2025-003]

**[third-party]** MITRE 將 Structured Threat Information Expression (STIX) 定義為交換網路威脅情資（CTI）的語言與序列化格式；ATT&CK 資料集以 STIX 2.0／2.1 發布，並可經 TAXII 取得。[SRC-2026-002]

**[third-party]** MITRE Engage Handbook 把原始感測資料與既有 CTI（含 ATT&CK）對照，用來識別對手當前與可能的未來活動，再規劃欺敵與拒止。[SRC-2022-002]

**[third-party]** CISA Known Exploited Vulnerabilities (KEV) Catalog 是「已被野外利用」漏洞的權威清單，組織應把它當作漏洞管理優先順序的輸入。[SRC-2024-004]

**[third-party]** FIRST EPSS 每日發布 CVE 在未來一段時間被野外利用的機率分數，並提供 API／CSV。[SRC-2026-003]

### 2.2 與先制的關聯

**公開直接關聯：** predictive threat intelligence 被 Gartner 新聞稿點名。[SRC-2025-004]

**[third-party]** IONIX 把 predictive TI 放在 **Disrupt**：把多來源情資交給 AI，提高早期惡意意圖被偵出的機率，並以自動化處置打斷殺傷鏈。[SRC-2025-008]

**[project-framework]** 本專案把 TI 分成四層，避免把「情資來源」與「預測結論」混為一談：

| 層 | 例子 | 先制用途 | 限制 |
| --- | --- | --- | --- |
| 觀測情報 | KEV、商業 IoC、蜜罐／欺敵互動 | 證實「已被用過」 | 對尚未被觀測的手法落後 |
| 技術知識 | ATT&CK 技術、CWE、NVD | 正規化攻擊步驟 | 不是「你一定會被打」 |
| 機率模型 | EPSS | 排序候選 CVE | 不是環境內已驗證的可利用性 |
| 預測敘事 | 分析師對某 APT 下一季目標的研判 | 假設產生器 | 必須標信心與來源；不得自動變成封鎖 |

**[project-framework]** 先制分析若只有 TI 而沒有資產與曝險，只能產出「通用威脅簡報」，不能產出可執行的 Deny 清單。

---

## 3. 攻擊面管理（Attack Surface Management, ASM）

### 3.1 公開／二手定義

**[unverified-hypothesis／third-party]** 2024 年 Gartner *Innovation Insight: Attack Surface Management*（Mitchell Schneider、John Watts、Pete Shoard，2024-04）為客戶報告。Security Boulevard 等轉述其摘要：傳統攻擊面方案聚焦外部可見資產的安全衛生；正擴展到品牌／聲譽風險以及 SaaS 與第三方系統。[SRC-2024-007][SRC-2024-010]

**[third-party]** 同一轉述稱 Gartner 認為 “attack surface management” 用詞不精確：持續發現、盤點、脈絡化資產比較接近 **attack surface assessment (ASA)**；技術族大致分為 CAASM、DRPS、EASM。[SRC-2024-007]

**可驗證範圍：** 本環境未能抓取 Security Boulevard 全文（Cloudflare），也未能讀 Gartner 原文。上述句子僅來自搜尋摘要，**待以原文覆核**。

**[third-party]** NetSpi 對 Gartner EASM 競爭格局報告的解讀（標明為 Gartner 陳述的轉述）：EASM 提供由外而內的資產與曝險視圖；CTEM 由 scoping／discovery／prioritization／validation／mobilization 構成，EASM 是其底下的技術之一，主要幫助前三階段。[SRC-2024-008]

### 3.2 與先制的關聯

**公開間接關聯**

**[third-party；evidence_status=partial]** 先制轉載論述建立在 GASG／攻擊面擴張之上。[SRC-2025-004][SRC-2026-001]

**[project-framework]** ASM／EASM／CAASM 是 Discovery 的感測器，不是先制本身。它們回答「攻擊者看得到什麼、我們以為自己有什麼」。先制分析把這些發現轉成路徑與 3 Ds 建議。沒有 ASM，外部影子資產會從 Deny 清單消失；只有 ASM 而沒有驗證，則會把掃描噪音當成先制成果。

---

## 4. 曝險管理（Exposure Management）

### 4.1 公開定義

**[third-party；evidence_status=supported]** CTEM 轉載定義的核心三詞就是 accessibility、exposure、exploitability。[SRC-2024-001]

**[third-party]** SC Media 引述 Gartner 導入白皮書：「曝險管理的目標不是修補每一個已識別問題，也不是只追最多的 zero-day，而是識別並處理**最可能被用來對付該組織**的威脅。」[SRC-2024-006][SRC-2022-001]

**[third-party]** Picus 引述後續客戶研究，使用 Preemptive Exposure Management (PEM)、Unified Exposure Management Platforms (UEMP) 等產品標籤。[SRC-2025-007][SRC-2025-016]

**[unverified-hypothesis]** PEM／UEMP 是否為 Gartner 2025 正式市場類別，本環境未讀到官方公開市場定義全文，不得寫成「Gartner Magic Quadrant 已如此命名」——公開搜尋可見的是客戶文件標題與廠商轉述。

### 4.2 與先制的關聯

**[project-framework]** 曝險管理是先制分析的**對象層**：漏洞、錯誤組態、過度權限、外洩憑證、可達性、無法修補的業務暴露。先制是對這些對象採取時間上更早的行動。

**[third-party]** IONIX 把 preemptive exposure management 放在 **Deny**：持續發現、以模擬攻擊驗證、自動化修復，以縮小新披露漏洞可被利用的窗口。[SRC-2025-008]

**[project-framework]** 本專案同意「Deny 常透過減少曝險完成」，但**不同意**把所有曝險工單自動稱為先制成功。未驗證、未對齊業務範圍的工單，只是預防衛生。

---

## 5. 攻擊路徑分析（Attack Path Analysis）

### 5.1 公開資料狀態

Gartner 2025-09-18 與 2025-10-20 **公開新聞稿沒有**把 “attack path analysis” 列為先制三大能力名詞。[SRC-2025-004][SRC-2026-001]

**[third-party]** CTEM 的 validation 轉述反覆出現「攻擊軌跡／攻擊成功／攻擊者會怎麼做」：CSA 提到 attack trajectory analysis、red team、BAS、PTaaS；SC Media 引 Pete Shoard：validation 是依攻擊者會做的事過濾清單。[SRC-2024-005][SRC-2024-006]

**[third-party]** Picus 將 BAS 與 Automated Pentesting 描述為驗證完整攻擊路徑（含身分橫向移動）。[SRC-2025-007]

**[third-party]** MITRE ATT&CK 提供把對手行為編成戰術／技術的知識庫，是路徑節點的常用詞彙，不是路徑搜尋演算法本身。[SRC-2026-002]

### 5.2 與先制的關聯

**[project-framework]** 攻擊路徑分析是本專案把「單一 CVE」升級成「先制建議」的必要推論步驟。理由：

1. Deny 需要知道要切斷哪一條邊（例如：網際網路 → 未修補 VPN → 域管）。
2. Deceive 需要知道攻擊者偵察時會相信什麼假節點。
3. Disrupt 需要知道在哪一個 ATT&CK 戰術打斷代價最低。

沒有路徑，3 Ds 只能對單點漏洞喊「趕快修」。

**[unverified-hypothesis]** 「Gartner 把 attack path 列為先制官方技術柱」——公開新聞稿未證實。

---

## 6. 安全驗證（Security Validation）

### 6.1 公開定義

**[third-party]** 在 CTEM 轉述中，validation 確認曝險是否真能被利用、控制如何反應。[SRC-2022-001][SRC-2022-004]

**[third-party]** 常用手段：red team、外部滲透測試、PTaaS、BAS。[SRC-2024-006]

**[third-party]** SimSpace 對 Impact Radar 的摘要把 automated security control assessment 放在 1–3 年採用環。[SRC-2025-010]

**[unverified-hypothesis]** 該雷達條目的官方定義與樣本廠商未在本環境核對。

### 6.2 與先制的關聯

**公開間接關聯：** 先制強調在攻擊成功前行動；若「成功」從未被驗證，行動可能浪費在不可達的漏洞上。這與 CTEM 公開強調的 validation 一致。[SRC-2024-001][SRC-2022-001]

**[third-party]** Picus 主張：沒有 validation，曝險管理最多是 proactive；有 validation 並在衝擊前動員，才是 preemptive。[SRC-2025-007]

**[project-framework]** 本專案採納較保守的版本：

- 驗證**提高**先制建議的信心，但不是公開新聞稿給出的先制必要條件。
- 未驗證的建議可以輸出，但必須把 `validation_status` 標為 `unvalidated`，且不得建議高破壞性自動執行。
- 本專案**禁止**為了驗證而產出利用程式碼或對未授權系統測試。

---

## 7. 欺敵技術（Deception）

### 7.1 公開定義

**[third-party；evidence_status=supported]** Advanced deception 是 2025-09-18 轉載 新聞稿點名的先制能力；2026 趨勢引言包含 programmatic denial and deception。[SRC-2025-004][SRC-2026-001]

**[third-party；evidence_status=partial]** 公開文章摘要把 Deceive 定義為：欺騙攻擊者使其偏離關鍵資產。[SRC-2025-001]

**[third-party]** 公開文章摘要另描述 Advanced cyber deception (ACD)：以擬真誘餌（假伺服器、應用、檔案）建立「網路地雷場」，並分析攻擊者在誘餌上的行為以即時改善防禦。[SRC-2025-001]（此段來自搜尋摘要，細部措辭待原文覆核。）

**[third-party]** MITRE Engage 是規劃對手交戰、欺敵與拒止的框架，對映 ATT&CK；前提是妥協往往不可避免，欺敵讓攻擊者「只要錯一次」。矩陣五欄：Prepare、Expose、Affect、Elicit、Understand。Engage 明確建議交戰但**避免 hack-back**。[SRC-2022-003][SRC-2022-002]

**[third-party]** IONIX／Zynap 把 AMTD（動態改變名稱、IP、埠、協定）與 honeypot／合成憑證一併放在 Deceive。[SRC-2025-008][SRC-2025-009]

### 7.2 與先制的關聯

**公開直接關聯：** Deceive 是 3 Ds 之一；advanced deception 是新聞稿能力例子。[SRC-2025-001][SRC-2025-004]

**[project-framework]** 欺敵在本專案同時是：

- **輸出建議**（部署哪類誘餌、是否對某條路徑做 AMTD）；
- **輸入來源**（誘餌上的互動是高訊號情資，因為對誘餌的任何使用預設未授權）。

**[project-framework]** 欺敵不能取代修補網際網路暴露的已知被利用漏洞（KEV）。對 KEV＋外部暴露，Deny（修補／下線／虛擬修補）優先於只放誘餌。

---

## 8. 七項關聯總表

| 概念 | 關聯級 | 主要來源 | 本專案一句話 | 禁止的歸屬 |
| --- | --- | --- | --- | --- |
| CTEM | 公開直接（曝險計畫）＋二手五階段細節 | [SRC-2024-001][SRC-2022-001] | 先制行動所需的持續曝險計畫骨架 | 不得說「Gartner 官方先制流程＝CTEM 五步」 |
| 威脅情資 | 公開直接（predictive TI） | [SRC-2025-004][SRC-2026-002][SRC-2024-004] | 預測與優先順序的外部證據 | 不得把 IoC feed 自動升級成已驗證攻擊 |
| ASM | 公開間接＋二手報告 | [SRC-2025-004][SRC-2024-008] | Discovery 感測器 | 不得說 ASM 產品＝先制產品 |
| 曝險管理 | 公開直接（CTEM 定義） | [SRC-2024-001][SRC-2024-006] | 分析對象層 | 不得把 PEM 市場標籤當成已核對的官方 MQ |
| 攻擊路徑 | 本專案推論；CTEM validation 二手提及 | [SRC-2024-005][SRC-2026-002] | 把單點曝險連成可切斷的邊 | 不得寫成 Gartner 先制三大柱之一 |
| 安全驗證 | 公開間接（CTEM validation） | [SRC-2022-001][SRC-2024-006] | 信心升級器 | 不得為驗證而寫 exploit |
| 欺敵 | 公開直接（3 Ds / advanced deception） | [SRC-2025-001][SRC-2022-003] | 同時是建議與情資來源 | 不得把欺敵當成可取代 KEV 修補的主控 |

## 9. 本節推論邊界

**[project-framework]** 若 skills 需要一張「先制能力地圖」，請使用上表，並在 UI 標示哪些格子是 `gartner-stated`、哪些是本專案推論。

**[unverified-hypothesis]** 客戶報告 *Quick Answer: How Does Exposure Management Support Preemptive Cybersecurity?*（5951239）很可能是釐清 CTEM 與先制關係的關鍵文本，但全文未取得。[SRC-2025-014]
