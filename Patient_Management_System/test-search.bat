@echo off
echo Testing Patient Search Functionality...
echo.

echo Testing search for "John"...
curl -s "http://localhost:5000/api/patients?search=John"
echo.
echo.

echo Testing search for "Sarah"...
curl -s "http://localhost:5000/api/patients?search=Sarah"
echo.
echo.

echo Testing search for "email"...
curl -s "http://localhost:5000/api/patients?search=email"
echo.
echo.

echo Search test complete!
pause
