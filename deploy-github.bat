@echo off
echo ==========================================
echo IELTS Academy - GitHub Deployment
echo ==========================================
echo.

REM Check if git is initialized
if not exist ".git" (
    echo [1/5] Initializing Git repository...
    git init
    git branch -M main
) else (
    echo [1/5] Git repository already initialized ✓
)

echo.
echo [2/5] Adding all files...
git add .

echo.
echo [3/5] Committing changes...
git commit -m "IELTS Academy - Configured for deployment"

echo.
echo [4/5] Adding remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/aziyat1977/ielts-telegram.git

echo.
echo [5/5] Pushing to GitHub...
git push -u origin main --force

echo.
echo ==========================================
echo ✓ GitHub Deployment Complete!
echo ==========================================
echo.
echo Next steps:
echo 1. Go to: https://github.com/aziyat1977/ielts-telegram/settings/pages
echo 2. Under "Source", select "Deploy from a branch"
echo 3. Select branch: main
echo 4. Select folder: / (root)
echo 5. Click Save
echo.
echo Your site will be available at:
echo https://aziyat1977.github.io/ielts-telegram/
echo.
pause
