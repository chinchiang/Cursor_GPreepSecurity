# 來源引用規則

本規則與 `shared-data-contract.md` 一起使用。Agent A 擁有 `references/` 登錄表實作；其他代理只能引用已登錄的 `source_id`，不得在網站或 Skill 裡發明新的來源編號。

---

## 1. 來源登錄表欄位

登錄表建議檔案（由 Agent A 建立，本契約只定欄位）：

- `references/sources.json`（機器可讀，必備）
- `references/sources.md`（人類可讀，建議）

每一列**必須**包含下列欄位，名稱不可改：

| 欄位 | 型別 | 必填 | 說明 |
| --- | --- | --- | --- |
| `source_id` | 字串 | 是 | `SRC-YYYY-NNN`，見共用契約第 3 節 |
| `title` | 字串 | 是 | 原文書名或頁面標題，不可翻譯後當成正式題名；可另加 `title_zh` |
| `publisher` | 字串 | 是 | 例如 `Gartner`、`Tanium`、`本專案` |
| `url` | 字串或 `null` | 是（可 null） | 規範 URL；無 URL 的紙本／口頭來源必須 `null` 並在 `limitations` 說明 |
| `published_date` | `YYYY-MM-DD` 或 `YYYY-MM` 或 `YYYY` 或 `null` | 是（可 null） | 未知則 `null`，不可填假日期 |
| `accessed_date` | `YYYY-MM-DD` | 是 | 代理實際取用日 |
| `claims_supported` | 字串陣列 | 是 | 這份來源**實際能支持**的主張摘要，不是行銷目錄 |
| `limitations` | 字串陣列 | 是 | 付費牆、轉述、翻譯、取用失敗、利益衝突等都寫這裡 |

建議但非必填：

| 欄位 | 說明 |
| --- | --- |
| `source_type` | `gartner-stated` / `third-party` / `project-framework` / `unverified-hypothesis` |
| `full_text_status` | `retrieved` / `summary-only` / `paywalled` / `unavailable` / `blocked-by-bot-check` |
| `title_zh` | 正體中文參考譯名 |
| `document_id` | 供應商或 Gartner 文件編號（例如轉述中的 `G00830315`），未見原文不得假裝已核對 |
| `license_notes` | 再散布限制 |
| `superseded_by` | 被哪一個 `source_id` 取代 |

### 1.1 登錄列完整 JSON 範例

```json
{
  "source_id": "SRC-2025-001",
  "title": "Preemptive Cybersecurity Solutions: A Must in Modern Tech Products",
  "title_zh": "先制型資安解決方案：現代科技產品的必要能力",
  "publisher": "Gartner",
  "url": "https://www.gartner.com/en/articles/preemptive-cybersecurity-solutions",
  "published_date": null,
  "accessed_date": "2026-09-12",
  "source_type": "gartner-stated",
  "full_text_status": "blocked-by-bot-check",
  "document_id": null,
  "claims_supported": [],
  "limitations": [
    "2026-09-12 以自動化環境抓取時遇到 Gartner.com bot／JavaScript 驗證，未能取得全文，故不得把第三方轉述升級為 gartner-stated supported。",
    "published_date 未知，不可臆造。"
  ],
  "license_notes": "Gartner 公開文章可作短摘引用；不得整篇重製。",
  "superseded_by": null
}
```

`claims_supported` 在全文未取得時必須是空陣列。這不是失敗，這是誠實。

---

## 2. 行內追溯（不可只在文末列連結）

### 2.1 什麼算「重要主張」

下列任一出現，該**同一段落**必須出現至少一個 `source_id`：

- 把話歸給 Gartner 或具名分析師
- 數字、年份、百分比、技術名單、報告編號
- 「必須／將會／取代偵測回應」等規範或預測語氣
- 網站卡片上的定義句、Skill 的評級理由

下列可不掛來源：

- 純導航（「下一節說明 Skill 安裝」）
- 已標 `project-framework` 且指向 `SRC-2026-900` 的本專案操作說明（仍建議掛該 ID）

### 2.2 段落內寫法

研究與網站正文使用：

```markdown
Help Net Security 轉載：到 2030 年 preemptive cybersecurity solutions 將佔 IT 資安支出 50%
（來源：SRC-2025-003，publisher=Help Net Security，source_type=third-party，full_text_status=retrieved）。
公開文章頁 SRC-2025-001 為 blocked-by-bot-check、claims_supported=[]，evidence_status=partial，不得寫成 gartner-stated supported。
```

HTML 對等：

```html
<p>
  Help Net Security 轉載 2030 年支出佔比預測
  （來源：<a href="#src-2025-003">SRC-2025-003</a>）。
  官方頁 <a href="#src-2025-001">SRC-2025-001</a> 未取得正文，僅能標 partial。
</p>
```

禁止：

- 只在文末「參考資料」貼 10 個連結，段落裡完全不標
- 用 `[1]` 卻不在同一頁解析到 `source_id`
- 把網址縮成「據網上資料」

文末總表**可以**有，但是**附加**，不能代替行內 ID。

### 2.3 Skill 與 JSON 輸出

研究信封的主張必須輸出 `SharedOutput.claims[].source_ids`。五平台 Skill 用 GAC 信封（`examples/`）的 `evidence` 欄掛同一組 `source_id`；兩層格式見共用契約第 13 節，不可把 Shared* JSON 直接貼進 Skill。僅在系統提示說「參考 Gartner」但沒有 ID，QA 判失敗。

---

## 3. 付費牆／無法取得全文時的標示

依實際取用結果選**一個** `full_text_status`：

| 值 | 何時 | 主張上限 |
| --- | --- | --- |
| `retrieved` | 代理讀到該 URL 或檔案的正文（不是只讀搜尋摘要） | 可標 `gartner-stated` + `supported`（若出版者確為 Gartner） |
| `summary-only` | 只拿到官方摘要、目錄、或新聞稿級段落 | `partial`；不可引用未出現在摘要裡的細節 |
| `paywalled` | 確認存在但需訂閱／登入 | 該來源可登錄；細節主張 `gap` 或改走第三方並標轉述 |
| `unavailable` | 404、連線失敗、已下架 | 不可當 `supported` |
| `blocked-by-bot-check` | 站點回 CAPTCHA／「Enable JavaScript」 | 視同未取得全文；**禁止** `gartner-stated` + `supported`。本環境對 gartner.com（含 SRC-2025-001）已發生 |

### 3.1 正文標示模板

付費牆：

```markdown
> 全文狀態：paywalled。SRC-2025-002《Emerging Tech Impact Radar: Preemptive Cybersecurity》未取得正文；
> 以下技術名稱來自第三方登陸頁轉述（SRC-2025-010），evidence_status=partial，不得視為 Gartner 完整清單。
```

Bot 阻擋：

```markdown
> 全文狀態：blocked-by-bot-check。2026-09-12 抓取 https://www.gartner.com/en/articles/preemptive-cybersecurity-solutions
> 僅得到驗證頁，未讀到正文。在人工打開該頁並補登錄前，禁止新增 gartner-stated supported 主張。
```

搜尋引擎摘要：

```markdown
> 全文狀態：summary-only。僅使用搜尋結果片段，片段本身不是來源；claims_supported 保持空，或改登錄真正被打開的頁面。
```

### 3.2 禁止的「看起來像引用」

- 用記憶或訓練資料寫出未核對的 Gartner 長引號，再掛一個打不開的 URL
- 把 Simspace、Zynap、Tanium 等轉述句加上「Gartner (2025)」而不寫這些轉述者自己的 `source_id`
- 為了通過 QA 把 `full_text_status` 改成 `retrieved`

第三方轉述的正確做法：

```markdown
Help Net Security 轉載 Gartner 預測稱到 2030 年先制型方案將佔資安支出 50%
（來源：SRC-2025-003，publisher=Help Net Security，source_type=third-party，full_text_status=retrieved）。
Gartner 原文頁（SRC-2025-001）為 blocked-by-bot-check；Impact Radar（SRC-2025-002）為 paywalled。不得把轉載升格為 gartner-stated supported。
```

---

## 4. 發號與衝突

1. Agent A 是唯一發號者。其他代理若需要新來源，在 `docs/orchestration/handoff-log.md` 或交給 Agent A 的 notes 裡提案，不要自己佔號。
2. 同一 URL 只發一個 `source_id`。同一報告的不同轉述頁各有自己的 ID。
3. 發現兩列指向同一 URL：保留較早 ID，另一列 `superseded_by` 指向它。
4. `CASE-CONFLICT` 需要**兩筆不同** `source_id`，不可把衝突寫在同一列的 `limitations` 就結束。

---

## 5. 網站與子路徑

引用錨點使用 `id="src-2025-001"`（小寫、連字號）。在 GitHub Pages 專案子路徑下，目錄頁連結必須走 `SITE_BASE`，例如 `SITE_BASE + "references/sources.html#src-2025-001"`，不可寫成 `/references/sources.html`。

---

## 6. 本環境已觀察到的取用限制（2026-09-12）

Lead Setup 實際抓取：

| URL | 結果 |
| --- | --- |
| `https://www.gartner.com/en/articles/preemptive-cybersecurity-solutions` | bot／JavaScript 驗證頁，無正文 |
| `https://www.gartner.com/en/newsroom/press-releases/2025-10-20-gartner-identifies-the-top-strategic-technology-trends-for-2026` | 同上 |

因此契約示範列把 Gartner.com 標成 `blocked-by-bot-check`。Agent A 必須重新取用；成功則更新登錄，失敗則維持缺口。不得因為示範列存在就宣稱原文已讀。
