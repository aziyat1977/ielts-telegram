@echo off
echo ==========================================
echo IELTS Academy - Cloudflare Setup Script
echo ==========================================

echo.
echo Step 1: Creating KV Namespace...
wrangler kv:namespace create "IELTS_KV" --preview=false > kv-output.txt

echo Step 2: Extracting KV Namespace ID...
for /f "tokens=*" %%a in ('powershell -Command "Select-String -Path kv-output.txt -Pattern 'id =' | ForEach-Object { $_ -replace '.*id = \"', '' -replace '\".*', '' }"') do set KV_ID=%%a

echo KV Namespace ID: %KV_ID%

echo.
echo Step 3: Updating wrangler.toml with KV ID...
powershell -Command "(Get-Content wrangler.toml) -replace 'PLACEHOLDER_WILL_BE_SET_BY_DEPLOY_SCRIPT', '%KV_ID%' | Set-Content wrangler.toml"

echo.
echo Step 4: Setting Cloudflare Worker Secrets...
echo.
echo Enter your Telegram Bot Token (from @BotFather):
set /p BOT_TOKEN=
wrangler secret put BOT_TOKEN
echo %BOT_TOKEN%| wrangler secret put BOT_TOKEN

echo.
echo Enter your CLICK Service ID:
set /p CLICK_SERVICE_ID=
echo %CLICK_SERVICE_ID%| wrangler secret put CLICK_SERVICE_ID

echo.
echo Enter your CLICK Secret Key:
set /p CLICK_SECRET_KEY=
echo %CLICK_SECRET_KEY%| wrangler secret put CLICK_SECRET_KEY

echo.
echo ======================================
echo ✅ Setup Complete!
echo ======================================
echo.
echo KV Namespace: %KV_ID%
echo Secrets: BOT_TOKEN, CLICK_SERVICE_ID, CLICK_SECRET_KEY
echo.
echo Next Steps:
echo 1. Run: wrangler deploy
echo 2. Get your Worker URL
echo 3. Set Telegram webhook: https://api.telegram.org/bot[TOKEN]/setWebhook?url=[WORKER_URL]/webhook/telegram
echo.
pause
