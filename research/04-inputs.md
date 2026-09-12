# 04 — 必要與選用輸入

**查閱日期：** 2026-09-12  
**分類：** 輸入目錄為 **`project-framework`**（[SRC-2026-900]）。個別來源的格式與官方定位則標其來源類型。  
**契約：** 已遵循 `docs/contracts/`。SharedInput 範例見 [`data/shared-input.examples.json`](data/shared-input.examples.json)。  
機器可讀版：[`data/inputs.json`](data/inputs.json)。

## 0. 使用原則

1. 輸入分成 **required**（沒有就必須降級）與 **optional**（沒有仍可分析，但信心或覆蓋下降）。
2. 每個輸入都要回答：用途、來源、格式、更新頻率、品質要求、敏感程度、缺漏處理。
3. 外部文件預設不可信，直到通過 S1 的指令注入與來源檢查。
4. Gartner 公開文章是**論述輸入**，不是客戶環境事實。

敏感程度等級（本專案）：`public` / `internal` / `confidential` / `restricted`。

---

## 1. 必要輸入（required）

### INP-001 分析範圍與授權聲明

| 欄位 | 說明 |
| --- | --- |
| 用途 | 綁定 S0；決定可分析與可建議的邊界 |
| 來源 | 業務負責人、CISO、專案委託書 |
| 格式 | Markdown 或 JSON：`in_scope_systems[]`、`out_of_scope[]`、`authorization_statement`、`risk_appetite` |
| 更新頻率 | 每輪 GAC 開始時；重大組織變更時重簽 |
| 品質要求 | 具名簽署人、日期、明確排除項；不可只有「請檢查全部」 |
| 敏感程度 | `confidential` |
| 缺漏處理 | 停止高信心建議；只輸出範圍問卷 |
| 使用階段 | S0, S7 |

### INP-002 資產與服務清單

| 欄位 | 說明 |
| --- | --- |
| 用途 | 把曝險掛到真實物件；沒有它就無法做路徑 |
| 來源 | CMDB、CAASM、雲端資源清單、Kubernetes inventory |
| 格式 | CSV／JSON：`asset_id`、`hostname`、`ips[]`、`owner`、`business_process`、`data_class`、`internet_facing` |
| 更新頻率 | 每日或每次部署；最低每週 |
| 品質要求 | 穩定 `asset_id`；擁有者不可大量為空；時戳不可超過 14 日（本專案預設） |
| 敏感程度 | `internal` 至 `confidential` |
| 缺漏處理 | `CASE-GAP`：可列出外部發現但標 `unlinked`；禁止編造內部主機 |
| 使用階段 | S3, S4 |

**[third-party]** 攻擊面方案的價值正在於發現、盤點、脈絡化資產；Gartner 轉述甚至認為 “management” 不如 “assessment” 精確。[SRC-2024-007]

### INP-003 外部攻擊面發現（EASM 或同等）

| 欄位 | 說明 |
| --- | --- |
| 用途 | 找出組織以為不存在、但攻擊者看得到的入口 |
| 來源 | EASM 平台、憑證透明度、DNS、已授權的外部掃描 |
| 格式 | JSON：主機名稱、IP、埠、服務指紋、發現時間、截圖／橫幅雜湊（可選） |
| 更新頻率 | 每日連續；最低每週 |
| 品質要求 | 必須能對回 INP-002 或明確標 `unclaimed`；需去重 |
| 敏感程度 | `internal`（橫幅可能洩漏版本） |
| 缺漏處理 | 若完全沒有外部視圖，網際網路暴露結論的信心不得高於 `low` |
| 使用階段 | S3, S4 |

**[third-party]** EASM 被描述為 CTEM 前三階段的基礎技術之一。[SRC-2024-008]

### INP-004 漏洞與錯誤組態發現

| 欄位 | 說明 |
| --- | --- |
| 用途 | 曝險的主要技術證據 |
| 來源 | 漏洞掃描器、CSPM／CNAPP、身分稽核、容器映像掃描 |
| 格式 | SARIF、掃描器 JSON、或正規化 `finding_id`、`cve[]`、`asset_id`、`severity`、`first_seen`、`last_seen`、`status` |
| 更新頻率 | 外部暴露資產：每日；內部：每週 |
| 品質要求 | 必須帶資產鍵與時間；純 CVSS 清單不足（CTEM 公開論述反對只靠基礎嚴重性）[SRC-2024-001][SRC-2022-001] |
| 敏感程度 | `confidential` |
| 缺漏處理 | 無掃描時可依 EASM 版本指紋做「可能受影響」假設，必須標 `unverified-hypothesis` |
| 使用階段 | S3, S4, S5 |

### INP-005 已知被利用漏洞與CVE 元資料

| 欄位 | 說明 |
| --- | --- |
| 用途 | 把「 theoretically 嚴重」與「野外已用」分開 |
| 來源 | CISA KEV JSON／CSV [SRC-2024-004]；NVD CVE API 2.0 [SRC-2026-004]；FIRST EPSS [SRC-2026-003] |
| 格式 | KEV：`cveID`、`vendorProject`、`product`、`dateAdded`、`dueDate`、`knownRansomwareCampaignUse`、`requiredAction`；NVD：CVE JSON 2.0；EPSS：`cve`、`epss`、`percentile` |
| 更新頻率 | KEV／EPSS：每日核對；NVD：隨 CVE 發布 |
| 品質要求 | 以官方 feed 為準，不用部落格轉貼當權威；保留 `dateAdded` |
| 敏感程度 | `public` |
| 缺漏處理 | 無 KEV 時不得宣稱「沒有已知利用」；只能說「未載入 KEV」 |
| 使用階段 | S2, S6 |

**[third-party]** CISA 原文：組織應把 KEV 當作漏洞管理優先順序框架的輸入。[SRC-2024-004]

---

## 2. 強烈建議（strongly recommended）

### INP-006 網路與身分拓樸

| 欄位 | 說明 |
| --- | --- |
| 用途 | 攻擊路徑的邊 |
| 來源 | 防火牆／安全群組、AD／IdP 匯出、零信任政策、VPN 群組 |
| 格式 | 圖 JSON：節點（網段、角色、群組）、邊（允許、成員、信任） |
| 更新頻率 | 每週；政策變更時立即 |
| 品質要求 | 能區分「政策允許」與「實際曾連線」；過期規則需標記 |
| 敏感程度 | `restricted` |
| 缺漏處理 | 路徑信心鎖 `low`；只輸出單點曝險 |
| 使用階段 | S4 |

### INP-007 威脅情資包

| 欄位 | 說明 |
| --- | --- |
| 用途 | 預測與對手對齊 |
| 來源 | 商業 TI、ISAC、MITRE ATT&CK STIX [SRC-2026-002]、內部欺敵遙測 |
| 格式 | STIX 2.1 bundle 優先；否則結構化 JSON：`actor`、`techniques[]`、`indicators[]`、`confidence`、`valid_from`、`valid_until` |
| 更新頻率 | 連續或每日 |
| 品質要求 | 每條 IoC 必須有時效；敘事必須與 IoC 分開 |
| 敏感程度 | `confidential`（TSI 可能更高） |
| 缺漏處理 | 回退到 ATT&CK 通用技術＋KEV |
| 使用階段 | S2, S6 |

### INP-008 安全驗證結果

| 欄位 | 說明 |
| --- | --- |
| 用途 | S5 升級信心 |
| 來源 | BAS、PTaaS、紅隊、控制有效性測試 |
| 格式 | JSON：`control_id` 或 `path_id`、`technique`、`result`（blocked／detected／succeeded／not-tested）、`test_date`、`tester` |
| 更新頻率 | 持續或每輪 GAC；單次年審視為 `stale`（本專案：＞90 日） |
| 品質要求 | 必須寫測試範圍與**未測**項；禁止只給行銷分數 |
| 敏感程度 | `restricted` |
| 缺漏處理 | 允許繼續，`validation_status=unvalidated` |
| 使用階段 | S5, S8 |

**[third-party]** CTEM validation 的公開轉述正是確認攻擊者能否利用、控制如何反應。[SRC-2022-001]

### INP-009 業務關鍵性與資料分類

| 欄位 | 說明 |
| --- | --- |
| 用途 | 把「可利用」轉成「不可接受」 |
| 來源 | 業務影響分析、資料地圖、法規範圍（例如個資、工控安全） |
| 格式 | `business_process`、`rto`、`data_types[]`、`impact_if_lost` |
| 更新頻率 | 每季或重大變更 |
| 品質要求 | 與 INP-002 的 `business_process` 鍵一致 |
| 敏感程度 | `confidential` |
| 缺漏處理 | 預設所有網際網路暴露身分系統為高影響（本專案保守規則） |
| 使用階段 | S0, S4, S6 |

---

## 3. 選用輸入（optional）

### INP-010 欺敵與 AMTD 遙測

| 欄位 | 說明 |
| --- | --- |
| 用途 | 高訊號「有人在摸誘餌」；回饋 S2／S8 |
| 來源 | Honeypot、誘餌憑證、AMTD 控制器 |
| 格式 | 事件 JSON：時間、誘餌 ID、來源、技術猜測 |
| 更新頻率 | 即時 |
| 品質要求 | 誘餌與生產憑證必須隔離；誤把生產當誘餌視為事故 |
| 敏感程度 | `confidential` |
| 缺漏處理 | 不阻斷分析；少了早期 Disrupt 建議 |
| 使用階段 | S2, S6, S8 |

**[third-party；evidence_status=supported]** Advanced deception 是轉載點名的先制能力例子。[SRC-2025-003][SRC-2025-004]

### INP-011 軟體物料清單（SBOM）與供應鏈

| 欄位 | 說明 |
| --- | --- |
| 用途 | 把應用依賴連到 CVE；支援 2026 趨勢中的 digital provenance 論述（相鄰，不是先制本體）[SRC-2025-005] |
| 來源 | CI 產出的 CycloneDX／SPDX |
| 格式 | CycloneDX 1.5+ 或 SPDX 2.3+ |
| 更新頻率 | 每次建置 |
| 品質要求 | 對得回應用與環境 |
| 敏感程度 | `internal` |
| 缺漏處理 | 只能管理主機／映像層漏洞 |
| 使用階段 | S3 |

### INP-012 既有偵測與回應能力清單

| 欄位 | 說明 |
| --- | --- |
| 用途 | 避免建議已經存在的控制；標示 Disrupt 交給誰 |
| 來源 | SOC runbook、SIEM／XDR 覆蓋、EDR 部署率 |
| 格式 | 控制目錄：`technique`、`control`、`coverage`、`owner` |
| 更新頻率 | 每月 |
| 品質要求 | 覆蓋聲明應能被 INP-008 抽樣 |
| 敏感程度 | `internal` |
| 缺漏處理 | Disrupt 建議只能寫到「交 SOC 評估」 |
| 使用階段 | S6 |

### INP-013 外部研究與廠商文件

| 欄位 | 說明 |
| --- | --- |
| 用途 | 教學、產品對照、趨勢背景 |
| 來源 | Gartner 公開新聞稿／文章、NIST、CISA、MITRE、廠商部落格 |
| 格式 | URL＋來源 ID；禁止把 HTML 全文當環境事實 |
| 更新頻率 | 研究庫每季重核 |
| 品質要求 | 必須能對到 `SRC-*`；付費牆標 `verification_scope` |
| 敏感程度 | `public` 或依授權 |
| 缺漏處理 | 不阻斷客戶環境分析 |
| 使用階段 | 論述層；S1 若當檔案上傳則先過不可信檢查 |

### INP-014 使用者上傳的任意文件

| 欄位 | 說明 |
| --- | --- |
| 用途 | 可能含資產表、滲透測試、或惡意指令 |
| 來源 | 聊天附件、郵件轉寄、網頁貼上 |
| 格式 | 不限；S1 必須先分類 |
| 更新頻率 | 隨對話 |
| 品質要求 | **預設不可信** |
| 敏感程度 | 未知，先當 `restricted` 處理 |
| 缺漏處理 | 不適用；這是風險來源 |
| 使用階段 | S1 閘門 |

對齊 `CASE-UNTRUSTED-DOC`：此輸入可以是攻擊面，而不是證據。

---

## 4. 輸入品質總表

| ID | 必要 | 最小可用分析 | 高信心分析 |
| --- | --- | --- | --- |
| INP-001 範圍授權 | 是 | 必須 | 必須 |
| INP-002 資產 | 是 | 部分＋大量 gap | 完整且＜14 日 |
| INP-003 EASM | 是 | 至少 DNS／憑證視圖 | 連續發現＋認領流程 |
| INP-004 漏洞／組態 | 是 | 外部暴露掃描 | 外部＋內部＋身分 |
| INP-005 KEV／NVD／EPSS | 是 | KEV 即可起步 | 三者皆每日 |
| INP-006 拓樸 | 強烈建議 | 無則無路徑 | 有政策＋實際連線 |
| INP-007 TI | 強烈建議 | ATT&CK＋KEV | STIX＋產業 TI |
| INP-008 驗證 | 強烈建議 | 無則 medium 封頂 | ＜90 日且對得上路徑 |
| INP-009 業務影響 | 強烈建議 | 保守預設 | 正式 BIA |
| INP-010–014 | 選用 | 可缺 | 依情境 |

## 5. 敏感資料處理（project-framework）

- 憑證、Cookie、私鑰、完整記憶體轉儲：不得寫入 `research/` 範例，也不得進入網站靜態資料。
- 合成案例只使用明顯假的網域（`example.invalid`、`northwind-synth.test`）。
- 真實客戶資料若進入分析器，輸出預設最小化：資產用 ID，不回顯秘密。

## 6. 與 Gartner 的界線

**[third-party；evidence_status=partial]** 已讀轉載與公開文章摘要**沒有**發布「先制產品必須吃哪些 API」的官方輸入規格。[SRC-2025-003][SRC-2025-001][SRC-2025-004]

**[project-framework]** 上表是為本專案分析器設計的契約。skills 可以引用 INP-ID，但必須在 UI 標明這是專案輸入契約。
