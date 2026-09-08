# lorem-api

A simple REST API for generating Lorem Ipsum and algorithmically generated nonsense text.

## Running

```bash
yarn install
yarn dev   # or yarn start
```

Runs on `http://localhost:3000`.

## Endpoints

All endpoints return `text/plain` by default. Add `Accept: application/json` to get `{ "result": "..." }` instead.

`count` is clamped (min 1) per type: words max 500, sentences max 200, paragraphs max 50.

`/lorem/*` and `/nonsense/*` requests are rate-limited per IP (default 100 requests / 15 minutes, configurable via `RATE_LIMIT_MAX` / `RATE_LIMIT_WINDOW_MINUTES`). Exceeding it returns `429 Too Many Requests`.

### Lorem Ipsum

| Method | Path | Description |
|--------|------|-------------|
| GET | `/lorem` | 3 paragraphs (shortcut) |
| GET | `/lorem/words/:count` | N lorem ipsum words |
| GET | `/lorem/sentences/:count` | N lorem ipsum sentences |
| GET | `/lorem/paragraphs/:count` | N lorem ipsum paragraphs (3–6 sentences each) |

**Query params for lorem routes:**
- `classic=false` — skip the traditional opening sentence ("Lorem ipsum dolor sit amet…")

### Nonsense

| Method | Path | Description |
|--------|------|-------------|
| GET | `/nonsense` | 3 paragraphs (shortcut) |
| GET | `/nonsense/words/:count` | N algorithmically generated nonsense words |
| GET | `/nonsense/sentences/:count` | N nonsense sentences with real grammar structure |
| GET | `/nonsense/paragraphs/:count` | N nonsense paragraphs (3–6 sentences each) |

### Meta

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api` | JSON listing of all endpoints |

## Examples

```bash
# 3 lorem ipsum paragraphs (default shortcut)
curl http://localhost:3000/lorem

# 3 nonsense paragraphs (default shortcut)
curl http://localhost:3000/nonsense

# 5 lorem ipsum words
curl http://localhost:3000/lorem/words/5

# 4 lorem ipsum sentences, classic opening included (default)
curl http://localhost:3000/lorem/sentences/4

# 4 lorem ipsum sentences, skipping the classic opening
curl "http://localhost:3000/lorem/sentences/4?classic=false"

# 2 lorem ipsum paragraphs, classic opening included (default)
curl http://localhost:3000/lorem/paragraphs/2

# 2 lorem ipsum paragraphs, skipping the classic opening
curl "http://localhost:3000/lorem/paragraphs/2?classic=false"

# 2 paragraphs as JSON instead of plain text
curl -H "Accept: application/json" http://localhost:3000/lorem/paragraphs/2

# 5 algorithmically-generated nonsense words
curl http://localhost:3000/nonsense/words/5

# 4 nonsense sentences
curl http://localhost:3000/nonsense/sentences/4

# 2 nonsense paragraphs
curl http://localhost:3000/nonsense/paragraphs/2

# 2 nonsense paragraphs as JSON
curl -H "Accept: application/json" http://localhost:3000/nonsense/paragraphs/2

# Full endpoint listing (paths, caps, rate limit info)
curl http://localhost:3000/api
```
