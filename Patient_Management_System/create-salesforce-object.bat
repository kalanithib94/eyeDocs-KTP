@echo off
echo ========================================
echo    Creating Salesforce Custom Object
echo ========================================
echo.

echo This script will:
echo 1. Authenticate with your Salesforce org
echo 2. Create the Referral__c custom object
echo 3. Add all required fields for patient data
echo.

echo Starting Salesforce object creation...
echo.

cd backend
node scripts\create-salesforce-object.js

echo.
echo ========================================
echo    Object Creation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Test the connection: .\test-salesforce.bat
echo 2. Add a patient via http://localhost:3000
echo 3. Check your Salesforce org for the new object
echo.
pause
