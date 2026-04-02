# CloudBase Setup

This project keeps the static frontend on GitHub Pages and uses Tencent CloudBase HTTP access service for server-side MBTI analysis and result storage.

## What to create in CloudBase

1. A CloudBase environment.
2. A cloud function named `predictMBTI`.
3. An HTTP access service route such as `/predict-mbti` bound to that function.
4. A database collection named `game_results`.

## Function environment variables

Set these in the CloudBase console before deploying the function:

- `DEEPSEEK_API_KEY`: your DeepSeek API key
- `DEEPSEEK_MODEL`: optional, defaults to `deepseek-chat`
- `RESULT_COLLECTION`: optional, defaults to `game_results`

## Frontend config

Copy `cloudbase-config.example.js` to `cloudbase-config.js` and fill in your HTTP service URL.

## Notes

- GitHub Pages only hosts the static files.
- The DeepSeek API key is no longer meant to live in browser code.
- If the HTTP service is unavailable, the app falls back to local MBTI output.
