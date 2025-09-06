@echo off
echo Testing Salesforce Integration...
echo.

echo 1. Testing Salesforce Connection...
curl -s http://localhost:5000/api/salesforce/test
echo.
echo.

echo 2. Testing Patient Creation with Salesforce Sync...
curl -s -X POST http://localhost:5000/api/patients ^
  -H "Content-Type: application/json" ^
  -d "{\"first_name\":\"Test\",\"last_name\":\"Patient\",\"email\":\"test.patient@example.com\",\"phone\":\"555-0123\",\"date_of_birth\":\"1990-01-01\",\"address\":\"123 Test St\",\"emergency_contact\":\"Test Contact\",\"medical_history\":\"None\",\"allergies\":\"None\",\"medications\":\"None\"}"
echo.
echo.

echo 3. Testing Salesforce Referrals (if connected)...
curl -s http://localhost:5000/api/salesforce/referrals
echo.
echo.

echo Salesforce integration test complete!
pause
