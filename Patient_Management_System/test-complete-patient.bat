@echo off
echo Testing Complete Patient Creation with All Fields...
echo.

echo Creating patient with complete data...
curl -s -X POST http://localhost:5000/api/patients ^
  -H "Content-Type: application/json" ^
  -d "{\"first_name\":\"Sarah\",\"last_name\":\"Johnson\",\"email\":\"sarah.johnson@example.com\",\"phone\":\"555-1234\",\"date_of_birth\":\"1985-06-15\",\"address\":\"456 Oak Street, New York, NY 10001\",\"emergency_contact\":\"Mike Johnson - 555-9876\",\"medical_history\":\"Hypertension, Diabetes Type 2\",\"allergies\":\"Penicillin, Shellfish\",\"medications\":\"Metformin, Lisinopril\"}"

echo.
echo.

echo Testing Salesforce referrals...
curl -s http://localhost:5000/api/salesforce/referrals

echo.
echo.
pause
