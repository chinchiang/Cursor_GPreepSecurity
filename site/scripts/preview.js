"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const DIST = path.resolve(__dirname, "..", "dist");
const PORT = Number(process.env.PORT || 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml",
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  let file = path.join(DIST, urlPath === "/" ? "index.html" : urlPath);
  if (!file.startsWith(DIST)) {
    res.writeHead(403);
    res.end("forbidden");
    return;
  }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    file = path.join(file, "index.html");
  }
  if (!fs.existsSync(file)) {
    file = path.join(DIST, "404.html");
  }
  const ext = path.extname(file);
  res.writeHead(fs.existsSync(path.join(DIST, urlPath === "/" ? "index.html" : urlPath)) || urlPath === "/" ? 200 : 404, {
    "Content-Type": types[ext] || "application/octet-stream",
    "Cache-Control": "no-store",
  });
  fs.createReadStream(file).pipe(res);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`preview http://127.0.0.1:${PORT}/  （請先 npm run build）`);
});
