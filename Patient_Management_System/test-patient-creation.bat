@echo off
echo Testing Patient Creation with Debug Info...
echo.

echo 1. Testing with minimal data...
curl -s -X POST http://localhost:5000/api/patients ^
  -H "Content-Type: application/json" ^
  -d "{\"first_name\":\"John\",\"last_name\":\"Doe\",\"email\":\"john.doe@test.com\",\"phone\":\"555-0001\",\"date_of_birth\":\"1990-01-01\"}"

echo.
echo.

echo 2. Testing Salesforce connection...
curl -s http://localhost:5000/api/salesforce/test

echo.
echo.

echo 3. Testing Salesforce referrals...
curl -s http://localhost:5000/api/salesforce/referrals

echo.
echo.
pause
