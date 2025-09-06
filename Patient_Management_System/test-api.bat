@echo off
echo Testing Patient Management System API...
echo.

echo Testing Backend Health Check...
curl -s http://localhost:5000/api/health
echo.
echo.

echo Testing Patients API...
curl -s http://localhost:5000/api/patients
echo.
echo.

echo Testing Analytics API...
curl -s http://localhost:5000/api/analytics/dashboard
echo.
echo.

echo API Test Complete!
pause
