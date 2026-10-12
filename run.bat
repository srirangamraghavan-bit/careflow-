@echo off
title CareFlow - Advanced Emergency Medical Dashboard
echo ==========================================================
echo Starting CareFlow Emergency Medical Dashboard...
echo ==========================================================
start "" http://localhost:8080/index.html
python server.py 8080
pause
