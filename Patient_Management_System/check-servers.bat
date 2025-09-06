@echo off
echo ========================================
echo    Checking Server Status
echo ========================================
echo.

echo Checking Backend Server (Port 5000)...
netstat -an | findstr :5000 >nul
if %errorlevel%==0 (
    echo ✅ Backend Server is RUNNING
    echo    URL: http://localhost:5000
    echo    Health: http://localhost:5000/api/health
) else (
    echo ❌ Backend Server is NOT running
    echo    Run: cd backend && node simple-server.js
)

echo.
echo Checking Frontend Server (Port 3000)...
netstat -an | findstr :3000 >nul
if %errorlevel%==0 (
    echo ✅ Frontend Server is RUNNING
    echo    URL: http://localhost:3000
) else (
    echo ❌ Frontend Server is NOT running
    echo    Run: cd frontend && npm start
)

echo.
echo ========================================
echo    Server Status Check Complete
echo ========================================
echo.

if %errorlevel%==0 (
    echo 🎉 Both servers are running!
    echo.
    echo Open your browser and go to:
    echo http://localhost:3000
    echo.
    echo To make it shareable, run:
    echo .\deploy.bat
) else (
    echo ⚠️  Some servers are not running.
    echo Please start them manually or run:
    echo .\start-servers.bat
)

echo.
pause
