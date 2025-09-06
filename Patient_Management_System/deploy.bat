@echo off
echo ========================================
echo    Patient Management System Deployment
echo ========================================
echo.

echo This script will help you deploy your app to make it shareable!
echo.

echo Choose deployment option:
echo 1. Deploy to Vercel (Frontend) + Railway (Backend) - RECOMMENDED
echo 2. Deploy to Netlify (Frontend) + Heroku (Backend)
echo 3. Deploy to GitHub Pages (Frontend) + Railway (Backend)
echo 4. Show deployment guide
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto vercel_railway
if "%choice%"=="2" goto netlify_heroku
if "%choice%"=="3" goto github_railway
if "%choice%"=="4" goto show_guide
goto invalid

:vercel_railway
echo.
echo ========================================
echo    Vercel + Railway Deployment
echo ========================================
echo.
echo Step 1: Deploy Backend to Railway
echo 1. Go to https://railway.app
echo 2. Sign up with GitHub
echo 3. Create new project from GitHub repo
echo 4. Set root directory to 'backend/'
echo 5. Add environment variables:
echo    - NODE_ENV=production
echo    - PORT=5000
echo.
echo Step 2: Deploy Frontend to Vercel
echo 1. Go to https://vercel.com
echo 2. Sign up with GitHub
echo 3. Import your GitHub repository
echo 4. Set root directory to 'frontend/'
echo 5. Add environment variable:
echo    - REACT_APP_API_URL=https://your-backend-url.railway.app
echo.
echo After deployment, your app will be available at:
echo Frontend: https://your-app.vercel.app
echo Backend: https://your-backend.railway.app
echo.
goto end

:netlify_heroku
echo.
echo ========================================
echo    Netlify + Heroku Deployment
echo ========================================
echo.
echo Step 1: Deploy Backend to Heroku
echo 1. Go to https://heroku.com
echo 2. Create new app
echo 3. Connect GitHub repository
echo 4. Set buildpack to Node.js
echo 5. Add environment variables
echo.
echo Step 2: Deploy Frontend to Netlify
echo 1. Go to https://netlify.com
echo 2. Connect GitHub repository
echo 3. Set build command: cd frontend && npm run build
echo 4. Set publish directory: frontend/build
echo.
goto end

:github_railway
echo.
echo ========================================
echo    GitHub Pages + Railway Deployment
echo ========================================
echo.
echo Step 1: Deploy Backend to Railway
echo (Same as Vercel + Railway option)
echo.
echo Step 2: Deploy Frontend to GitHub Pages
echo 1. Go to repository Settings
echo 2. Go to Pages section
echo 3. Select source: GitHub Actions
echo 4. Create .github/workflows/deploy.yml
echo 5. Push to trigger deployment
echo.
goto end

:show_guide
echo.
echo Opening deployment guide...
start DEPLOYMENT_GUIDE.md
goto end

:invalid
echo.
echo Invalid choice. Please run the script again.
goto end

:end
echo.
echo ========================================
echo    Deployment Instructions Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Follow the deployment steps above
echo 2. Test your deployed app
echo 3. Share your live URL!
echo.
echo For detailed instructions, see DEPLOYMENT_GUIDE.md
echo.
pause
