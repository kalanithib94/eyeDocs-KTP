@echo off
echo Starting Patient Management System...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd /d %~dp0backend && node simple-server.js"

echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd /d %~dp0frontend && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit this window...
pause > nul
