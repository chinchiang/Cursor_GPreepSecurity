# 05 — 可能輸出

**查閱日期：** 2026-09-12  
**分類：`project-framework`（[SRC-2026-900]）**  
**契約：** 已遵循 `docs/contracts/`。SharedOutput 範例見 [`data/shared-output.examples.json`](data/shared-output.examples.json)。  
機器可讀版：[`data/outputs.json`](data/outputs.json)。  
範例數值全部為**合成**。

本專案輸出回答的不是「Gartner 分數」，而是：在既有證據下，哪些路徑在攻擊成功前最值得切斷，建議用 Deny／Deceive／Disrupt 的哪一種，以及人類還要決定什麼。

## 1. 輸出物件一覽

| ID | 名稱 | 主要使用對象 | 典型產生階段 |
| --- | --- | --- | --- |
| OUT-001 | `ScopeProfile` | 業務負責人、CISO | S0 |
| OUT-002 | `EvidenceBundle` | 分析師、QA | S1 |
| OUT-003 | `ThreatContext` | CTI、SOC | S2 |
| OUT-004 | `ExposureInventory` | 曝險／VM 團隊 | S3 |
| OUT-005 | `AttackPathSet` | 架構、紅／藍隊 | S4–S5 |
| OUT-006 | `PreemptiveRecommendationSet` | CISO、控制負責人 | S6 |
| OUT-007 | `ReviewDecision` | 所有核准人 | S7 |
| OUT-008 | `TrackingRecord` | PMO、SOC | S8 |
| OUT-009 | `AnalysisNarrative` | 網站、簡報、非技術主管 | 全程彙整 |
| OUT-010 | `GapConflictWarning` | 分析師、skills 閘門 | S1–S7 |

每筆輸出共用信封：

```json
{
  "output_id": "OUT-006",
  "object_id": "rec-20260912-01",
  "classification": "project-framework",
  "synthetic": true,
  "generated_at": "2026-09-12T00:00:00Z",
  "schema_version": "1.0.0-project-framework",
  "input_trace": ["ev-001", "ev-014"],
  "judgment_basis": ["RULE-KEV-INTERNET-DENY"],
  "confidence": "medium",
  "confidence_rationale": "KEV 與 EASM 一致，但無近期控制驗證",
  "validation_status": "unvalidated",
  "audiences": ["ciso", "vuln-owner"],
  "source_ids_for_narrative": ["SRC-2024-004"]
}
```

`source_ids_for_narrative` 只用於教學句（例如解釋為何 KEV 要優先），**不是**「Gartner 說這台主機有洞」。

## 2. 信心水準（本專案模型，非 Gartner）

**[project-framework]** 禁止稱此為 Gartner 成熟度或官方評分。

| 等級 | 必要條件（同時滿足） | 允許的建議強度 |
| --- | --- | --- |
| `low` | 缺資產鍵，或只有二手敘事，或來源互斥未解 | 問卷、資料請求、監控建議 |
| `medium` | 資產已連結，至少兩個獨立證據一致（例如 EASM＋掃描），無驗證 | Deny／Deceive 草案，預設需人審 |
| `high` | `medium` 條件＋＜90 日驗證支持或 KEV＋確認的網際網路暴露＋擁有者確認資產為真 | 可進入較高優先工單；仍不可自動下線核心系統 |

降級觸發：矛盾未解、資料＞14 日（資產）或驗證＞90 日、不可信文件污染、範圍未簽署。

驗證方式欄位 `validation_status`：

| 值 | 意義 |
| --- | --- |
| `unvalidated` | 僅推斷或掃描 |
| `simulation-supported` | BAS／自動化模擬支持 |
| `human-test-supported` | 授權的人工測試支持 |
| `contradicted` | 證據衝突 |
| `stale` | 曾經有效但過期 |

## 3. 各輸出結構與範例

### OUT-001 ScopeProfile

**結構：** 範圍、排除、不可接受後果、授權人、KEV 預設納入與否。

**輸入追溯：** INP-001。

**判斷依據：** 簽署聲明；本專案規則 RULE-KEV-DEFAULT-IN-SCOPE。

**驗證方式：** 簽署人確認。

**使用對象：** 進入分析前的守門人。

```json
{
  "scope_id": "scope-northwind-2026q3",
  "in_scope": ["e-commerce-checkout", "identity-idp", "ot-dmz-jump"],
  "out_of_scope": ["employee-byod"],
  "unacceptable_outcomes": ["ransom-of-ot-cell", "mass-customer-pii-exfil"],
  "authorizer": "CISO (synthetic)",
  "kev_internet_default": true
}
```

### OUT-002 EvidenceBundle

**結構：** `items[]`，每項含 `evidence_id`、`input_id`、`hash`、`trust`、`sensitivity`、`flags[]`。

**輸入追溯：** 所有原始輸入。

**判斷依據：** S1 分類規則。

**驗證方式：** 雜湊與來源 URL／系統。

**使用對象：** 需要重現分析的人。

若 `flags` 含 `untrusted-instruction`，整包進入 OUT-010，不進入事實庫。

### OUT-003 ThreatContext

**結構：** 對手假設、技術、KEV 命中、EPSS 高分 CVE、敘事與觀測分離。

**輸入追溯：** INP-005、INP-007、INP-010。

**判斷依據：** 例如 `cve in KEV AND product matches asset`。

**驗證方式：** 對回官方 KEV 條目日期；IoC 對回 STIX `valid_until`。

**使用對象：** CTI、SOC、S6。

**合成範例（教學句可引用 [SRC-2024-004]）：**

```json
{
  "kev_hits": [
    {
      "cve": "CVE-2026-19490",
      "note": "合成案例使用查閱日公開 KEV 中的 Citrix 名稱僅作教學；案例環境為虛構",
      "product_guess": "NetScaler-class ADC (synthetic mapping)"
    }
  ],
  "narrative_hypotheses": [
    {
      "claim": "同業可能在假期窗口打 VPN",
      "type": "unverified-hypothesis"
    }
  ]
}
```

### OUT-004 ExposureInventory

**結構：** 資產 × 暴露面 × 發現 × 擁有者 × 資料分類。

**輸入追溯：** INP-002–004、INP-009、INP-011。

**判斷依據：** 合併規則（DNS 名＝CMDB 名；IP 衝突標 unlinked）。

**驗證方式：** 擁有者認領；複掃。

**使用對象：** VM、雲端、應用負責人。

### OUT-005 AttackPathSet

**結構：**

```json
{
  "path_id": "path-01",
  "nodes": [
    {"id": "inet", "type": "actor-position"},
    {"id": "vpn-edge", "type": "asset", "exposure": "internet"},
    {"id": "jump", "type": "asset"},
    {"id": "ot-hmi", "type": "crown-jewel"}
  ],
  "edges": [
    {"from": "inet", "to": "vpn-edge", "via": "CVE-placeholder", "assumption": "unauthenticated access if unpatched"},
    {"from": "vpn-edge", "to": "jump", "via": "flat-admin-net", "assumption": "no additional MFA"}
  ],
  "techniques": ["T1190", "T1021"],
  "validation_status": "unvalidated",
  "confidence": "medium"
}
```

**輸入追溯：** OUT-004、INP-006、INP-007。

**判斷依據：** 圖遍歷規則；每條邊必須有假設句。

**驗證方式：** S5 對帳。

**使用對象：** 架構師；禁止把未驗證路徑貼進董事會投影片當「已被入侵」。

**[project-framework]** 攻擊路徑是本專案推論產物，不是 Gartner 公開必備輸出格式。

### OUT-006 PreemptiveRecommendationSet

**結構：** 每條建議含 `d_tag`（deny|deceive|disrupt）、目標路徑、先決條件、殘餘風險、衝擊、可逆性、預設閘門。

**輸入追溯：** OUT-005、INP-012、INP-001。

**判斷依據：** RULE-KEV-INTERNET-DENY、RULE-NO-HACKBACK 等。

**驗證方式：** S8 複測。

**使用對象：** 控制負責人、CISO。

**合成範例：**

```json
{
  "recommendation_id": "rec-deny-001",
  "d_tag": "deny",
  "title": "修補或下線網際網路暴露的 ADC 管理面",
  "path_id": "path-01",
  "prerequisites": ["change-window", "rollback-plan"],
  "residual_risk_if_rejected": "未認證入口持續暴露",
  "impact": "high",
  "reversible": false,
  "default_gate": "ciso-or-business-owner",
  "confidence": "medium",
  "input_trace": ["ev-easm-adc", "ev-kev-citrix-name-only"],
  "judgment_basis": ["RULE-KEV-INTERNET-DENY"]
}
```

`d_tag` 借用 Gartner 公開 3 Ds 標籤 [SRC-2025-001]，**建議內容**是本專案產生。

### OUT-007 ReviewDecision

**結構：** `accepted[]`、`modified[]`、`rejected[]`、`need_more_evidence[]`、審查人、時間、理由。

**輸入追溯：** OUT-006。

**判斷依據：** 人類陳述（必填）。

**驗證方式：** 身分與時間戳；不可由模型代簽。

**使用對象：** 稽核軌跡。

### OUT-008 TrackingRecord

**結構：** 建議 ID、工單、驗證方法、到期、狀態（`open` / `closed-verified` / `open-unverified` / `accepted-risk`）。

**輸入追溯：** OUT-007、複掃、INP-008。

**判斷依據：** 「關閉工單且複掃未再見暴露」才得 `closed-verified`。

**驗證方式：** 新的 EvidenceItem。

**使用對象：** PMO、下一輪 S0。

### OUT-009 AnalysisNarrative

**結構：** 正體中文短文，段落內引用來源 ID，並分開「環境事實／Gartner 公開論述／本專案推論」。

**輸入追溯：** 上述所有物件。

**判斷依據：** 敘事模板。

**驗證方式：** 抽查每句是否能指回 ID。

**使用對象：** 網站、簡報。此物件**不得**單獨作為執行依據。

### OUT-010 GapConflictWarning

**結構：** `kind` = `gap` | `conflict` | `untrusted-document` | `stale`；`blocking` 布林；`affected_outputs[]`。

**輸入追溯：** 觸發的 EvidenceItem。

**判斷依據：** S1／S5 規則。

**驗證方式：** 人類確認是否誤報。

**使用對象：** skills 必須在 UI 置頂。

## 4. 輸出與使用對象矩陣

| 使用對象 | 應看 | 不應單獨看 |
| --- | --- | --- |
| 董事會／非技術主管 | OUT-009（加警告）、OUT-006 前 5 條、OUT-010 | 原始路徑 JSON |
| CISO | OUT-006、OUT-007、OUT-001 | 未審查的模型草稿 |
| 漏洞／平台負責人 | OUT-004、OUT-006（Deny） | 預測性敘事 |
| SOC | OUT-003、OUT-006（Disrupt）、INP-010 | 未授權的外部反制 |
| 欺敵負責人 | OUT-006（Deceive）、INP-010 | KEV 修補的替代幻想 |
| QA／其他代理 | 全部 JSON＋來源表 | 把敘事當 schema |

## 5. 追溯要求（skills 必須實作）

每一條給使用者看的建議，最少顯示：

1. `input_trace`（人讀名稱，不只 ID）
2. `judgment_basis`
3. `confidence` + `confidence_rationale`
4. `validation_status`
5. 若使用了 Gartner 句子：來源 ID 與「此句是市場／定義論述，不是對你環境的掃描結果」

## 6. 與公開資料的界線

**[third-party；evidence_status=partial]** 已讀轉載與公開文章摘要**沒有**規定先制產品必須輸出攻擊路徑 JSON 或信心三級制。[SRC-2025-003][SRC-2025-004][SRC-2025-001]

**[third-party]** CTEM 的公開目標是「業務主管能理解、架構團隊能執行的修復與改善計畫」。[SRC-2022-001] 本專案的 OUT-006＋OUT-009 是朝此目標的**專案實作**，不是該報告的官方模板。
