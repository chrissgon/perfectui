// Static file server for the Playwright fixtures. No dependency: the tests
// load the built dist, which is what a user actually downloads.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const PORT = Number(process.env.PORT ?? 8139);
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json"
};

createServer(async (request, response) => {
  const path = normalize(new URL(request.url ?? "/", "http://x").pathname);
  const file = join(process.cwd(), path.replace(/^(\.\.[/\\])+/, ""));

  try {
    const body = await readFile(file);
    response.writeHead(200, {
      "content-type": TYPES[extname(file)] ?? "application/octet-stream",
      "cache-control": "no-store"
    });
    response.end(body);
  } catch {
    response.writeHead(404).end("not found");
  }
}).listen(PORT, () => console.log(`serving ${process.cwd()} on ${PORT}`));
