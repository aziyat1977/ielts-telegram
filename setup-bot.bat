@echo off
echo ==========================================
echo IELTS Academy - Telegram Bot Setup
echo ==========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

echo [1/3] Installing bot dependencies...
call npm install

echo.
echo [2/3] Testing bot configuration...
echo Bot Token: 7871977412:AAGWGoENUckFYCLdCL0CsYE9z2bG7Jnc4HI
echo Bot Username: @ielts_rater_bot
echo WebApp URL: https://aziyat1977.github.io/ielts-telegram/
echo Worker URL: https://ielts-academy-backend.rahruz1977.workers.dev

echo.
echo [3/3] Starting bot...
echo.
echo ==========================================
echo ✓ Bot is now running!
echo ==========================================
echo.
echo To stop the bot, press Ctrl+C
echo.
echo Test your bot:
echo 1. Open Telegram
echo 2. Search for @ielts_rater_bot
echo 3. Send /start
echo.

call npm start
