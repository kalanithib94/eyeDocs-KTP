@echo off
echo Starting Patient Management System...
echo.

echo Starting Backend Server...
cd backend
start cmd /k "npm install && npm run dev"

echo.
echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo Starting Frontend Server...
cd ../frontend
start cmd /k "npm install && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul
