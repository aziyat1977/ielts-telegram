@echo off
echo ==========================================
echo IELTS Academy - Cloudflare Worker Setup
echo ==========================================
echo.

REM Check if wrangler is installed
where wrangler >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [1/6] Installing Wrangler CLI...
    call npm install -g wrangler
) else (
    echo [1/6] Wrangler CLI already installed ✓
)

echo.
echo [2/6] Logging in to Cloudflare...
call wrangler login

echo.
echo [3/6] Creating KV namespace...
call wrangler kv:namespace create "IELTS_KV" > kv-output.txt
set /p KV_ID=< kv-output.txt
echo KV Namespace created: %KV_ID%

echo.
echo [4/6] Setting environment secrets...
echo.
echo Setting BOT_TOKEN...
echo 7871977412:AAGWGoENUckFYCLdCL0CsYE9z2bG7Jnc4HI | call wrangler secret put BOT_TOKEN
echo.
echo Setting CLICK_SERVICE_ID...
echo 81769 | call wrangler secret put CLICK_SERVICE_ID
echo.
echo Setting CLICK_SECRET_KEY...
echo OT9IF8nB4JGW | call wrangler secret put CLICK_SECRET_KEY

echo.
echo [5/6] Updating wrangler.toml with KV namespace ID...
REM Note: You need to manually update the KV namespace ID in wrangler.toml
echo Please update wrangler.toml line 8 with the KV namespace ID shown above

echo.
echo [6/6] Deploying worker...
call wrangler deploy

echo.
echo ==========================================
echo ✓ Deployment Complete!
echo ==========================================
echo.
echo Your Worker URL: https://ielts-academy-backend.rahruz1977.workers.dev
echo.
echo Next steps:
echo 1. Update KV namespace ID in wrangler.toml (if not done automatically)
echo 2. Set CLICK webhook URL in CLICK dashboard to:
echo    https://ielts-academy-backend.rahruz1977.workers.dev/webhook/click
echo.
pause
