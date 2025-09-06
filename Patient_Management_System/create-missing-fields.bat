@echo off
echo ========================================
echo    Creating Missing Salesforce Fields
echo ========================================
echo.

echo This script will add the remaining fields to Referral__c:
echo - Date_of_Birth__c (Date)
echo - Address__c (Text Area, 255 characters)
echo - Emergency_Contact__c (Text, 100 characters)
echo - Medical_History__c (Text Area, 1000 characters)
echo - Allergies__c (Text, 255 characters)
echo - Current_Medications__c (Text, 255 characters)
echo - Status__c (Picklist: New, In Progress, Completed)
echo - Source__c (Text, 50 characters)
echo - Referral_Date__c (Date)
echo.

echo Starting field creation...
echo.

cd backend
node scripts\create-missing-fields.js

echo.
echo ========================================
echo    Field Creation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Test the updated integration: .\test-salesforce.bat
echo 2. Add a patient with full data via http://localhost:3000
echo 3. Check your Salesforce org for the complete patient record
echo.
pause
