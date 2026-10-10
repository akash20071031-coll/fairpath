@echo off
title FairPath - Starting Application

echo.
echo ========================================
echo          FAIRPATH PROTOTYPE
echo ========================================
echo.

cd /d "%~dp0"

echo Starting Backend...
start "FairPath Backend" cmd /k "cd /d %~dp0backend && venv\Scripts\python.exe -m uvicorn main:app --reload"

timeout /t 3 /nobreak >nul

echo Starting Frontend...
start "FairPath Frontend" cmd /k "cd /d %~dp0frontend && npm.cmd run dev -- --host --port 5173"

timeout /t 5 /nobreak >nul

echo Opening FairPath...
start "" "http://localhost:5175"

echo.
echo FairPath is starting...