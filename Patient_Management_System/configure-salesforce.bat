@echo off
echo ========================================
echo    Salesforce Integration Setup
echo ========================================
echo.

echo Step 1: Opening Salesforce configuration file...
echo Please fill in your Salesforce credentials:
echo.
echo - SALESFORCE_USERNAME: Your Salesforce login email
echo - SALESFORCE_PASSWORD: Your Salesforce password  
echo - SALESFORCE_SECURITY_TOKEN: Get from Salesforce Setup
echo - SALESFORCE_LOGIN_URL: https://login.salesforce.com (or test.salesforce.com for sandbox)
echo.

notepad backend\.env

echo.
echo Step 2: Testing Salesforce connection...
curl -s http://localhost:5000/api/salesforce/test

echo.
echo.
echo Step 3: Testing patient creation with Salesforce sync...
curl -s -X POST http://localhost:5000/api/patients ^
  -H "Content-Type: application/json" ^
  -d "{\"first_name\":\"Salesforce\",\"last_name\":\"Test\",\"email\":\"salesforce.test@example.com\",\"phone\":\"555-0001\",\"date_of_birth\":\"1990-01-01\",\"address\":\"123 Salesforce St\",\"emergency_contact\":\"Test Contact\",\"medical_history\":\"None\",\"allergies\":\"None\",\"medications\":\"None\"}"

echo.
echo.
echo ========================================
echo    Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Check if connection shows "connected": true
echo 2. If successful, add patients via http://localhost:3000
echo 3. Check your Salesforce org for new Referral records
echo.
pause
