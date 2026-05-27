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

`count` is clamped to 1–100.

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
# 5 lorem ipsum words
curl http://localhost:3000/lorem/words/5

# 2 paragraphs as JSON
curl -H "Accept: application/json" http://localhost:3000/lorem/paragraphs/2

# Nonsense sentence
curl http://localhost:3000/nonsense/sentences/1
```
