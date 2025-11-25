@echo off
echo ========================================
echo   IELTS Academy - Gamified Learning
echo ========================================
echo.
echo Starting local server...
echo.

cd /d "%~dp0"

start http://localhost:8080
npx http-server -p 8080

pause
