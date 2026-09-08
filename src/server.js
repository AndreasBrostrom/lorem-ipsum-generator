import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { getWords, getSentences, getParagraphs } from './lorem.js';
import {
  getNonsenseWords,
  getNonsenseSentences,
  getNonsenseParagraphs,
} from './nonsense.js';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT ?? 3000;

app.set('trust proxy', Number(process.env.TRUST_PROXY_HOPS ?? 1));

app.use(cors());
app.use(express.static(join(__dirname, 'public')));

const limiter = rateLimit({
  windowMs: (process.env.RATE_LIMIT_WINDOW_MINUTES ?? 15) * 60 * 1000,
  limit: process.env.RATE_LIMIT_MAX ?? 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(['/lorem', '/nonsense'], limiter);

const MAX_WORDS = 500;
const MAX_SENTENCES = 200;
const MAX_PARAGRAPHS = 50;

function clampCount(raw, max) {
  const n = parseInt(raw, 10);
  if (isNaN(n)) return 1;
  return Math.max(1, Math.min(n, max));
}

function isClassic(req) {
  return req.query.classic !== 'false';
}

function respond(req, res, text) {
  const acceptJson =
    req.headers['accept'] &&
    req.headers['accept'].includes('application/json');
  if (acceptJson) {
    res.json({ result: text });
  } else {
    res.type('text/plain').send(text);
  }
}

// Bare defaults
app.get('/lorem', (req, res) => {
  const classic = isClassic(req);
  respond(req, res, getParagraphs(3, classic));
});

app.get('/nonsense', (req, res) => {
  respond(req, res, getNonsenseParagraphs(3));
});

// Lorem Ipsum routes
app.get('/lorem/words/:count', (req, res) => {
  const n = clampCount(req.params.count, MAX_WORDS);
  respond(req, res, getWords(n));
});

app.get('/lorem/sentences/:count', (req, res) => {
  const n = clampCount(req.params.count, MAX_SENTENCES);
  const classic = isClassic(req);
  respond(req, res, getSentences(n, classic));
});

app.get('/lorem/paragraphs/:count', (req, res) => {
  const n = clampCount(req.params.count, MAX_PARAGRAPHS);
  const classic = isClassic(req);
  respond(req, res, getParagraphs(n, classic));
});

// Nonsense routes
app.get('/nonsense/words/:count', (req, res) => {
  const n = clampCount(req.params.count, MAX_WORDS);
  respond(req, res, getNonsenseWords(n));
});

app.get('/nonsense/sentences/:count', (req, res) => {
  const n = clampCount(req.params.count, MAX_SENTENCES);
  respond(req, res, getNonsenseSentences(n));
});

app.get('/nonsense/paragraphs/:count', (req, res) => {
  const n = clampCount(req.params.count, MAX_PARAGRAPHS);
  respond(req, res, getNonsenseParagraphs(n));
});

// API listing
app.get('/api', (req, res) => {
  res.json({
    endpoints: [
      {
        method: 'GET',
        path: '/lorem',
        description:
          'Returns 3 lorem ipsum paragraphs (default shortcut)',
      },
      {
        method: 'GET',
        path: '/nonsense',
        description:
          'Returns 3 nonsense paragraphs (default shortcut)',
      },
      {
        method: 'GET',
        path: '/lorem/words/:count',
        description: `Returns :count lorem ipsum words (max ${MAX_WORDS})`,
      },
      {
        method: 'GET',
        path: '/lorem/sentences/:count',
        description: `Returns :count lorem ipsum sentences (max ${MAX_SENTENCES})`,
      },
      {
        method: 'GET',
        path: '/lorem/paragraphs/:count',
        description: `Returns :count lorem ipsum paragraphs (3-6 sentences each, max ${MAX_PARAGRAPHS})`,
      },
      {
        method: 'GET',
        path: '/nonsense/words/:count',
        description: `Returns :count algorithmically-generated nonsense words (max ${MAX_WORDS})`,
      },
      {
        method: 'GET',
        path: '/nonsense/sentences/:count',
        description: `Returns :count nonsense sentences with real grammar structure (max ${MAX_SENTENCES})`,
      },
      {
        method: 'GET',
        path: '/nonsense/paragraphs/:count',
        description: `Returns :count nonsense paragraphs (3-6 sentences each, max ${MAX_PARAGRAPHS})`,
      },
      {
        method: 'GET',
        path: '/api',
        description: 'This endpoint listing',
      },
    ],
    notes: [
      `count is capped per type (min 1): words max ${MAX_WORDS}, sentences max ${MAX_SENTENCES}, paragraphs max ${MAX_PARAGRAPHS}`,
      'Add Accept: application/json header to receive a JSON response instead of plain text',
      'classic=false on /lorem, /lorem/sentences/:count and /lorem/paragraphs/:count skips the traditional opening sentence',
      `Requests to /lorem/* and /nonsense/* are rate-limited per IP (default ${process.env.RATE_LIMIT_MAX ?? 100} per ${process.env.RATE_LIMIT_WINDOW_MINUTES ?? 15} minutes)`,
    ],
  });
});

// Fallback to index.html for SPA
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`lorem-api running at http://localhost:${PORT}`);
});
