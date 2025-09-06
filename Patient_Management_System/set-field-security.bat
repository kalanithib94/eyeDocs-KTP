@echo off
echo ========================================
echo    Setting Field-Level Security
echo ========================================
echo.

echo This script will:
echo 1. Get all profiles in your Salesforce org
echo 2. Set field-level security for all Referral__c fields
echo 3. Make fields visible and editable for all profiles
echo.

echo Starting field security configuration...
echo.

cd backend
node scripts\set-field-security.js

echo.
echo ========================================
echo    Field Security Configuration Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Test the integration: .\test-salesforce.bat
echo 2. Add patients via http://localhost:3000
echo 3. Check that all users can see the Referral__c fields
echo.
pause
