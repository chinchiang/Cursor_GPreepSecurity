# 來源登錄表

**查閱日期：** 2026-09-12  
**契約：** 已存在並遵循 `docs/contracts/shared-data-contract.md` 與 `docs/contracts/source-citation-rules.md`。  
**機器可讀：** [`sources.json`](sources.json)（欄位：`source_id`、`title`、`publisher`、`url`、`published_date`、`accessed_date`、`claims_supported`、`limitations`）。

來源類型僅允許：`gartner-stated` | `third-party` | `project-framework` | `unverified-hypothesis`。

**硬規則（契約 1.1／3.2）：** gartner.com 被 bot 擋下時，該列 `claims_supported` 必須是空陣列。轉載頁（Help Net Security、Network World、Architecture & Governance）可填已讀主張，但只能標 `third-party`，**不得**升格為 `gartner-stated` + `supported`。

契約預留號：`SRC-2025-001` 公開文章、`SRC-2025-002` Impact Radar G00830315、`SRC-2026-001` 2026 趨勢公開材料、`SRC-2026-900` 本專案框架。

| source_id | source_type | full_text_status | 標題 | publisher | published_date | URL | claims_supported 摘要 | limitations |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SRC-2025-001 | gartner-stated | blocked-by-bot-check | Preemptive Cybersecurity Solutions: A Must in Modern Tech Products | Gartner | null | https://www.gartner.com/en/articles/preemptive-cybersecurity-solutions | **[]** | 2026-09-12 僅驗證頁；禁止 supported |
| SRC-2025-002 | unverified-hypothesis | paywalled | Emerging Tech Impact Radar: Preemptive Cybersecurity（G00830315） | Gartner | 2025-10-07 | null | **[]** | 全文未得；細節見 SRC-2025-010 |
| SRC-2025-003 | third-party | retrieved | Gartner: Preemptive cybersecurity to dominate 50% of security spend by 2030 | Help Net Security | 2025-09-23 | https://www.helpnetsecurity.com/2025/09/23/preemptive-cybersecurity-solutions-shift/ | 50%／<5%、AI/ML、predictive TI、deception、AMTD、Manion GASG、ACIS、CVE 100 萬 | 轉載，非官網 HTML |
| SRC-2025-004 | gartner-stated | blocked-by-bot-check | …Preemptive Capabilities, not Detection and Response…（2025-09-18 新聞稿） | Gartner | 2025-09-18 | https://www.gartner.com/en/newsroom/press-releases/2025-09-18-gartner-says-that-in-the-age-of-genai-preemptive-capabilities-not-detection-and-response-are-the-future-of-cybersecurity | **[]** | bot 擋；可讀句在 SRC-2025-003／006 |
| SRC-2025-005 | third-party | retrieved | Gartner predicts the technologies set to transform 2026 | Help Net Security | 2025-10-23 | https://www.helpnetsecurity.com/2025/10/23/gartner-2026-technology-trends/ | 先制列 2026 趨勢、half of spending、Paulman 原句 | 轉載 |
| SRC-2025-006 | third-party | retrieved | AI dominates Gartner’s top strategic technology trends for 2026 | Network World | 2025-10-21 | https://www.networkworld.com/article/4076316/ai-dominates-gartners-top-strategic-technology-trends-for-2026.html | 50%／<5%、技術句子、Paulman、Manion | 轉載 |
| SRC-2025-007 | third-party | retrieved | What Is Preemptive Security? The Future of Cyber Defense | Picus Security | 2026-01-22 | https://www.picussecurity.com/resource/blog/what-is-preemptive-security-the-future-of-cyber-defense | 廠商 proactive／preemptive；聲稱的 5951239 短句 | 不得當已讀 Gartner 原文 |
| SRC-2025-008 | third-party | retrieved | Deceive, Disrupt, and Deny: The 3 D’s of Preemptive Cybersecurity | IONIX | null | https://www.ionix.io/guides/what-is-preemptive-cybersecurity/deceive-disrupt-and-deny-the-3-ds-of-preemptive-cybersecurity/ | 廠商 3 Ds 技術分配 | 順序與公開文章摘要不同 |
| SRC-2025-009 | third-party | retrieved | Preemptive Cybersecurity: What Gartner Means and Why It Matters | Zynap | null | https://www.zynap.com/blog/preemptive-cybersecurity/ | 四象限、五能力、MTRER | 廠商用語 |
| SRC-2025-010 | third-party | summary-only | Impact Radar 行銷登陸頁 | SimSpace | null | https://simspace.com/reports-and-white-papers/gartner-emerging-tech-impact-radar-preemptive-cybersecurity/ | G00830315、35 頁、1–3 年環四技術名 | 不是報告原文 |
| SRC-2025-011 | third-party | summary-only | Gartner Names Deception Core to Preemptive Cybersecurity | CounterCraft | null | https://www.countercraftsec.com/blog/gartner-preemptive-cybersecurity-deception-technology/ | 摘要：deception 為核心能力之一 | 未完整保存 |
| SRC-2025-012 | unverified-hypothesis | paywalled | Tech FutureSight: …Emerging AI Attack Surfaces | Gartner | null | null | **[]** | 僅標題 |
| SRC-2025-013 | unverified-hypothesis | unavailable | Preemptive Cybersecurity – A Top 5 Disruptive Trend…（webinar） | Gartner | null | null | **[]** | 無逐字稿 |
| SRC-2025-014 | unverified-hypothesis | paywalled | Quick Answer: How Does Exposure Management Support Preemptive Cybersecurity? | Gartner | null | https://www.gartner.com/en/documents/5951239 | **[]** | Doc 5951239 |
| SRC-2025-015 | unverified-hypothesis | paywalled | Exposure Management Vendors Must Get Preemptive or Perish | Gartner | null | https://www.gartner.com/en/documents/6664234 | **[]** | Doc 6664234 |
| SRC-2025-016 | unverified-hypothesis | paywalled | Emerging Tech: Pivot to Preemptive Exposure Management Services… | Gartner | null | https://www.gartner.com/en/documents/6764634 | **[]** | Doc 6764634 |
| SRC-2025-017 | unverified-hypothesis | paywalled | （作廢初稿號）同 SRC-2025-002 | Gartner | 2025-10-07 | null | **[]** | superseded_by SRC-2025-002 |
| SRC-2025-018 | unverified-hypothesis | paywalled | Top Strategic Technology Trends for 2026（客戶特別報告 G00829643） | Gartner | 2025-10-18 | null | **[]** | 正文未讀 |
| SRC-2026-001 | gartner-stated | blocked-by-bot-check | Gartner Identifies the Top Strategic Technology Trends for 2026 | Gartner | 2025-10-20 | https://www.gartner.com/en/newsroom/press-releases/2025-10-20-gartner-identifies-the-top-strategic-technology-trends-for-2026 | **[]** | 契約預留號；可讀句在 SRC-2025-005／006 |
| SRC-2026-002 | third-party | retrieved | ATT&CK Data & Tools | MITRE ATT&CK | null | https://attack.mitre.org/resources/attack-data-and-tools/ | STIX 2.0／2.1、TAXII | 非 Gartner |
| SRC-2026-003 | third-party | retrieved | EPSS data and API | FIRST.org | null | https://www.first.org/epss/data | 每日利用機率分數 | 非環境驗證 |
| SRC-2026-004 | third-party | retrieved | NVD Vulnerability APIs | NIST NVD | null | https://nvd.nist.gov/developers/vulnerabilities | CVE API 2.0 | — |
| SRC-2026-005 | third-party | unavailable | BOD 26-04 Prioritizing Security Updates Based on Risk | CISA | null | https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk | **[]** | 本輪未讀全文 |
| SRC-2026-900 | project-framework | retrieved | GPreep Analysis Cycle and research data contracts | 本專案 | 2026-09-12 | null | GAC S0–S8、INP／OUT／CASE、信心三級 | **不是** Gartner 官方流程 |
| SRC-2024-001 | gartner-stated | blocked-by-bot-check | Gartner Identifies the Top Cybersecurity Trends for 2024 | Gartner | 2024-02-22 | https://www.gartner.com/en/newsroom/press-releases/2024-02-22-gartner-identifies-top-cybersecurity-trends-for-2024 | **[]** | 可讀句在 SRC-2024-002 |
| SRC-2024-002 | third-party | retrieved | 同上（轉載） | Architecture & Governance | 2024-02-26 | https://www.architectureandgovernance.com/security/gartner-identifies-the-top-cybersecurity-trends-for-2024/ | CTEM 三詞定義、two-thirds 預測 | 與 SRC-2024-005 的 3x 衝突 |
| SRC-2024-003 | third-party | retrieved | The NIST Cybersecurity Framework (CSF) 2.0 | NIST | 2024-02-26 | https://doi.org/10.6028/NIST.CSWP.29 | 六 Functions；不規定作法 | 非先制專文 |
| SRC-2024-004 | third-party | retrieved | Known Exploited Vulnerabilities Catalog | CISA | null | https://www.cisa.gov/known-exploited-vulnerabilities-catalog | KEV 為優先順序輸入 | 目錄會變 |
| SRC-2024-005 | third-party | retrieved | The Transformative Power of CTEM (Myth or Reality?) | Cloud Security Alliance | 2024-05-24 | https://cloudsecurityalliance.org/blog/2024/05/24/the-transformative-power-of-continuous-threat-exposure-management-myth-or-reality | **3x less likely**；後段又寫 two-thirds | 與 SRC-2024-002 衝突 |
| SRC-2024-006 | third-party | retrieved | The state of continuous threat exposure management | SC Media | 2024-06-11 | https://www.scworld.com/feature/the-state-of-continuous-threat-exposure-management | D'Hoinne／Shoard 引言 | 含 three times 轉述 |
| SRC-2024-007 | third-party | blocked-by-bot-check | What’s New in the 2024 Gartner Innovation Insight: ASM | Security Boulevard | 2024-05-01 | https://securityboulevard.com/2024/05/whats-new-in-the-2024-gartner-innovation-insight-attack-surface-management/ | **[]** | 待覆核 |
| SRC-2024-008 | third-party | summary-only | Gartner on External Attack Surface Management | NetSpi | null | https://www.netspi.com/blog/executive-blog/attack-surface-management/netspi-view-on-2023-gartner-competitive-landscape-external-attack-surface-management-report/ | 摘要：EASM 支援 CTEM 前三階段 | 二手 |
| SRC-2024-009 | third-party | retrieved | NIST Cybersecurity Framework FAQs | NIST | null | https://www.nist.gov/cyberframework/faqs | 六 Functions | — |
| SRC-2024-010 | unverified-hypothesis | paywalled | Innovation Insight: Attack Surface Management | Gartner | 2024-04 | https://www.gartner.com/en/documents/5341663 | **[]** | 付費牆 |
| SRC-2022-001 | unverified-hypothesis | paywalled | Implement a CTEM Program（G00763954） | Gartner | 2022-07-21 | null | **[]** | 五階段見轉述 |
| SRC-2022-002 | third-party | retrieved | MITRE Engage Handbook v1.0 | MITRE | 2022-04 | https://engage.mitre.org/wp-content/uploads/2022/04/EngageHandbook-v1.0.pdf | 欺敵／拒止／CTI | 非 Gartner |
| SRC-2022-003 | third-party | retrieved | MITRE Engage: A Framework and Community for Cyber Deception | MITRE | 2022-02-28 | https://www.mitre.org/news-insights/impact-story/mitre-engage-framework-and-community-cyber-deception | 避免 hack-back | 非 Gartner |
| SRC-2022-004 | third-party | summary-only | A Practical Guide to Getting Started With CTEM | XM Cyber | null | https://info.xmcyber.com/hubfs/A%20Practical%20Guide%20to%20CTEM%20v.6.0.pdf | 標授權的 CTEM 引句 | 非原文檔 |

## 引用慣例

正文使用 `[SRC-YYYY-NNN]`，且重要主張必須在**同一段落**出現來源 ID。  
同一主張若同時有官方 URL 與轉載，兩個 ID 都標，例如 `[SRC-2025-004][SRC-2025-003]`，但 `evidence_status` 以最弱來源與 `full_text_status` 為準：官方列為 `blocked-by-bot-check` 時，整段最多 `partial`，歸屬為 `third-party`。  
`project-framework` 不冒充研究發現。  
禁止：假頁碼、假引言、把 GAC／信心三級寫成 Gartner。
