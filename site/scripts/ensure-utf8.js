"use strict";

const fs = require("fs");
const path = require("path");

function decode(buf) {
  if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe) return buf.toString("utf16le");
  if (buf.length >= 4 && buf[1] === 0x00 && buf[3] === 0x00) return buf.toString("utf16le");
  return null;
}

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === "dist" || ent.name === "generated" || ent.name === "node_modules") continue;
      walk(full, acc);
    } else acc.push(full);
  }
  return acc;
}

let n = 0;
for (const file of walk(path.resolve(__dirname, ".."))) {
  const text = decode(fs.readFileSync(file));
  if (text == null) continue;
  fs.writeFileSync(file, text, "utf8");
  n += 1;
}
if (n) console.log(`ensure-utf8: converted ${n} file(s)`);
