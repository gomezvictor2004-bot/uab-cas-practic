import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { URL } from 'node:url';
import { getStatus } from './controllers/statusController.js';
import { getBriefing } from './controllers/briefingController.js';
import { summarize, list as listDocuments } from './controllers/documentController.js';
import { getTasks, postTask } from './controllers/taskController.js';
import { logger } from './utils/logger.js';
import { createHttpError } from './utils/httpError.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public');
const indexFilePath = path.join(publicDir, 'index.html');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const safeResolvePublicPath = (requestedPath) => {
  const normalized = path.normalize(requestedPath).replace(/^\/+/, '');
  const resolved = path.resolve(publicDir, normalized);
  if (!resolved.startsWith(publicDir)) {
    return indexFilePath;
  }
  return resolved;
};

const streamFile = async (res, filePath) => {
  const stream = createReadStream(filePath);
  await new Promise((resolve, reject) => {
    stream.on('open', () => {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] ?? 'application/octet-stream';
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      });
      stream.pipe(res);
    });
    stream.on('error', reject);
    stream.on('end', resolve);
  });
};

const serveStaticAsset = async (res, pathname) => {
  let candidate = pathname === '/' ? indexFilePath : safeResolvePublicPath(pathname);
  try {
    const stats = await stat(candidate);
    if (stats.isDirectory()) {
      candidate = path.join(candidate, 'index.html');
    }
  } catch (error) {
    candidate = indexFilePath;
  }

  try {
    await streamFile(res, candidate);
  } catch (error) {
    logger.error('static_file_error', { message: error.message, file: candidate });
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Error interno al servir el archivo.');
  }
};

const parseJsonBody = async (req) =>
  new Promise((resolve, reject) => {
    const MAX_SIZE = 5 * 1024 * 1024;
    let received = 0;
    const chunks = [];

    req.on('data', (chunk) => {
      received += chunk.length;
      if (received > MAX_SIZE) {
        reject(createHttpError(413, 'Request body too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      if (chunks.length === 0) {
        resolve({});
        return;
      }

      try {
        const buffer = Buffer.concat(chunks);
        const parsed = JSON.parse(buffer.toString('utf8'));
        resolve(parsed);
      } catch (error) {
        reject(createHttpError(400, 'Invalid JSON body'));
      }
    });

    req.on('error', (error) => {
      reject(createHttpError(400, error.message));
    });
  });

const respondJson = (res, { statusCode = 200, body }) => {
  const payload = body === undefined ? null : body;
  const serialized = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-cache'
  });
  res.end(serialized);
};

const handleApiRequest = async (req, res, url) => {
  const query = Object.fromEntries(url.searchParams.entries());
  if (req.method === 'GET' && url.pathname === '/api/status') {
    respondJson(res, getStatus());
    return true;
  }

  if (req.method === 'GET' && url.pathname === '/api/briefings') {
    const result = await getBriefing({ query });
    respondJson(res, result);
    return true;
  }

  if (req.method === 'POST' && url.pathname === '/api/documents/summary') {
    const body = await parseJsonBody(req);
    const result = await summarize({ body });
    respondJson(res, result);
    return true;
  }

  if (req.method === 'GET' && url.pathname === '/api/documents') {
    const result = await listDocuments({ query });
    respondJson(res, result);
    return true;
  }

  if (req.method === 'GET' && url.pathname === '/api/tasks') {
    const result = await getTasks({ query });
    respondJson(res, result);
    return true;
  }

  if (req.method === 'POST' && url.pathname === '/api/tasks') {
    const body = await parseJsonBody(req);
    const result = await postTask({ body });
    respondJson(res, result);
    return true;
  }

  return false;
};

export const createServer = () => {
  const handler = async (req, res) => {
    const start = Date.now();
    const host = req.headers.host ?? 'localhost';
    const url = new URL(req.url ?? '/', `http://${host}`);

    try {
      if (url.pathname.startsWith('/api/')) {
        const handled = await handleApiRequest(req, res, url);
        if (!handled) {
          throw createHttpError(404, 'Endpoint not found');
        }
      } else {
        await serveStaticAsset(res, url.pathname);
      }
    } catch (error) {
      const statusCode = error.statusCode ?? error.status ?? 500;
      logger.error('request_failed', {
        message: error.message,
        statusCode,
        stack: error.stack
      });
      res.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache'
      });
      res.end(
        JSON.stringify({
          error: {
            message: error.message ?? 'Unexpected error',
            details: error.details
          }
        })
      );
    } finally {
      logger.info('http_request_completed', {
        method: req.method,
        path: url.pathname + url.search,
        statusCode: res.statusCode,
        durationMs: Date.now() - start
      });
    }
  };

  return (req, res) => {
    handler(req, res).catch((error) => {
      logger.error('unhandled_request_error', { message: error.message });
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      }
      res.end(
        JSON.stringify({
          error: {
            message: 'Unexpected error'
          }
        })
      );
    });
  };
};

export default createServer;
