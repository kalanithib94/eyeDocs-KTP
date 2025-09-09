@echo off
echo ========================================
echo 🚀 Patient Management System Deployment
echo ========================================
echo.

echo This script will help you deploy your app to the cloud!
echo.
echo Prerequisites:
echo - GitHub account
echo - Vercel account (free at vercel.com)
echo - Railway account (free at railway.app)
echo.
pause

echo.
echo ========================================
echo STEP 1: Deploy Backend to Railway
echo ========================================
echo.
echo 1. Open your browser and go to: https://railway.app
echo 2. Click "Start a New Project"
echo 3. Select "Deploy from GitHub repo"
echo 4. Connect your GitHub and select this repository
echo 5. Set root directory to: backend
echo 6. Add these environment variables in Railway:
echo    NODE_ENV=production
echo    PORT=5000
echo    JWT_SECRET=your-secret-key-here
echo    (Copy Salesforce variables from backend/.env if you have them)
echo 7. Click Deploy and copy the URL (e.g., https://your-app.railway.app)
echo.
echo Press any key when backend is deployed...
pause > nul

echo.
echo ========================================
echo STEP 2: Deploy Frontend to Vercel
echo ========================================
echo.
echo 1. Open your browser and go to: https://vercel.com
echo 2. Click "Add New Project"
echo 3. Import your Git repository
echo 4. Configure:
echo    - Root Directory: frontend
echo    - Framework Preset: Create React App
echo 5. Add environment variable:
echo    REACT_APP_API_URL = [Your Railway Backend URL]/api
echo    Example: https://patient-mgmt.railway.app/api
echo 6. Click Deploy
echo.
echo Press any key when frontend is deployed...
pause > nul

echo.
echo ========================================
echo 🎉 DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your app should now be live!
echo.
echo Test your deployment:
echo 1. Visit your Vercel URL to see the frontend
echo 2. Try creating a new patient
echo 3. Check the analytics dashboard
echo 4. Test appointment scheduling
echo.
echo Share these with your recruiter:
echo - Live Demo URL: [Your Vercel URL]
echo - Features: Patient Management, Appointments, Analytics, Salesforce Integration
echo - GitHub Repo: [Your GitHub URL]
echo.
echo ========================================
echo.
pause
