import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const siteDirectory = path.dirname(fileURLToPath(import.meta.url));
const requestedPort = Number(process.env.PORT || 4173);
if (!Number.isInteger(requestedPort) || requestedPort < 1 || requestedPort > 65535) throw new Error('PORT must be an integer between 1 and 65535.');
const mimeTypes = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.ttf': 'font/ttf', '.txt': 'text/plain; charset=utf-8', '.md': 'text/plain; charset=utf-8' };

const server = createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' });
      return response.end('Method not allowed');
    }
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const relativeFile = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    const file = path.resolve(siteDirectory, relativeFile);
    if (!file.startsWith(siteDirectory + path.sep)) {
      response.writeHead(403);
      return response.end('Forbidden');
    }
    const information = await stat(file);
    if (!information.isFile()) throw new Error('Not a file');
    const body = await readFile(file);
    response.writeHead(200, {
      'Content-Type': mimeTypes[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Content-Length': body.length,
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff'
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch (error) {
    response.writeHead(error instanceof URIError ? 400 : 404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(error instanceof URIError ? 'Bad request' : 'Not found');
  }
});
server.on('error', error => {
  console.error(error.code === 'EADDRINUSE' ? `Port ${requestedPort} is already in use. Set PORT to another number and run again.` : error.message);
  process.exitCode = 1;
});
server.listen(requestedPort, '127.0.0.1', () => console.log(`Portfolio preview: http://127.0.0.1:${requestedPort}`));
