# CloudBase Setup

This project keeps the static frontend on GitHub Pages and uses Tencent CloudBase for server-side MBTI analysis and result storage.

## What to create in CloudBase

1. A CloudBase environment.
2. An anonymous login strategy for Web.
3. A cloud function named `predictMBTI`.
4. A database collection named `game_results`.

## Function environment variables

Set these in the CloudBase console before deploying the function:

- `GEMINI_API_KEY`: your Gemini API key
- `GEMINI_MODEL`: optional, defaults to `gemini-2.0-flash`
- `RESULT_COLLECTION`: optional, defaults to `game_results`

## Frontend config

Copy `cloudbase-config.example.js` to `cloudbase-config.js` and fill in your environment ID.

## Notes

- GitHub Pages only hosts the static files.
- The Gemini API key is no longer meant to live in browser code.
- If CloudBase is not configured yet, the app falls back to local MBTI output.
