@echo off
title Push CareFlow to GitHub
cd /d "%~dp0"
echo ==========================================================
echo   Uploading CareFlow to GitHub:
echo   valakondapavankowshik-art/CareFlow-Smart-Medical-Ecosystem
echo ==========================================================
echo.
echo Running: git push -u origin main
echo.
git remote set-url origin https://github.com/valakondapavankowshik-art/CareFlow-Smart-Medical-Ecosystem.git
git branch -M main
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ==========================================================
    echo   SUCCESS! Your files are now uploaded to GitHub!
    echo ==========================================================
) else (
    echo ==========================================================
    echo   Please sign in to GitHub in the popup window above.
    echo ==========================================================
)
echo.
pause
