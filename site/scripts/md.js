"use strict";

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inline(text) {
  let html = escapeHtml(text);
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2" rel="noopener noreferrer">$1</a>');
  return html;
}

function renderMarkdown(src) {
  const lines = String(src).replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let i = 0;
  let inCode = false;
  let codeBuf = [];
  let listType = null;

  const closeList = () => {
    if (listType) {
      out.push(listType === "ol" ? "</ol>" : "</ul>");
      listType = null;
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      if (inCode) {
        out.push(`<pre><code>${escapeHtml(codeBuf.join("\n"))}</code></pre>`);
        codeBuf = [];
        inCode = false;
      } else {
        closeList();
        inCode = true;
      }
      i += 1;
      continue;
    }
    if (inCode) {
      codeBuf.push(line);
      i += 1;
      continue;
    }

    if (!line.trim()) {
      closeList();
      i += 1;
      continue;
    }

    const heading = /^(#{1,4})\s+(.*)$/.exec(line);
    if (heading) {
      closeList();
      const level = heading[1].length;
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      i += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      closeList();
      const quote = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quote.push(lines[i].slice(2));
        i += 1;
      }
      out.push(`<blockquote>${inline(quote.join(" "))}</blockquote>`);
      continue;
    }

    if (line.startsWith("| ")) {
      closeList();
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        rows.push(lines[i]);
        i += 1;
      }
      const parseRow = (row) =>
        row
          .split("|")
          .slice(1, -1)
          .map((c) => c.trim());
      const head = parseRow(rows[0]);
      const body = rows.slice(2).map(parseRow);
      out.push("<table><thead><tr>");
      head.forEach((c) => out.push(`<th>${inline(c)}</th>`));
      out.push("</tr></thead><tbody>");
      body.forEach((row) => {
        out.push("<tr>");
        row.forEach((c) => out.push(`<td>${inline(c)}</td>`));
        out.push("</tr>");
      });
      out.push("</tbody></table>");
      continue;
    }

    const ul = /^[-*]\s+(.*)$/.exec(line);
    if (ul) {
      if (listType !== "ul") {
        closeList();
        out.push("<ul>");
        listType = "ul";
      }
      out.push(`<li>${inline(ul[1])}</li>`);
      i += 1;
      continue;
    }

    const ol = /^(\d+)\.\s+(.*)$/.exec(line);
    if (ol) {
      if (listType !== "ol") {
        closeList();
        out.push("<ol>");
        listType = "ol";
      }
      out.push(`<li>${inline(ol[2])}</li>`);
      i += 1;
      continue;
    }

    closeList();
    out.push(`<p>${inline(line)}</p>`);
    i += 1;
  }
  closeList();
  if (inCode) {
    out.push(`<pre><code>${escapeHtml(codeBuf.join("\n"))}</code></pre>`);
  }
  return out.join("\n");
}

function parseFrontmatter(raw) {
  const text = String(raw).replace(/^\uFEFF/, "");
  if (!text.startsWith("---")) {
    return { meta: {}, body: text };
  }
  const end = text.indexOf("\n---", 3);
  if (end === -1) return { meta: {}, body: text };
  const fm = text.slice(4, end).trim();
  const body = text.slice(end + 4).replace(/^\s*\n/, "");
  const meta = {};
  fm.split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  });
  return { meta, body };
}

module.exports = { renderMarkdown, parseFrontmatter, escapeHtml };
