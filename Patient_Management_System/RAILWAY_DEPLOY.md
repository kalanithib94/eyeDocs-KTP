# 🚀 Railway Backend Deployment

## One-Click Deploy

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/kalanithib94/eyeDocs-KTP.git&root-directory=Patient_Management_System/backend)

## Manual Deployment Steps

### 1. Go to Railway
- Visit: https://railway.app
- Sign up with GitHub

### 2. Deploy from GitHub
- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose: `kalanithib94/eyeDocs-KTP`

### 3. Configure Settings
- **Root Directory**: `Patient_Management_System/backend`
- **Build Command**: `npm install`
- **Start Command**: `node simple-server.js`

### 4. Add Environment Variables
```
NODE_ENV=production
PORT=5000
```

### 5. Deploy
- Click "Deploy"
- Wait for build to complete
- Get your backend URL

## Expected Result
- **Backend URL**: `https://your-app.railway.app`
- **Health Check**: `https://your-app.railway.app/api/health`
- **Status**: ✅ Running

## Troubleshooting
- If build fails, check the logs
- Ensure root directory is set correctly
- Verify environment variables are added
