# 🚀 Quick Deployment Guide - Patient Management System

## 📺 Live Demo Links (After Deployment)
- **Frontend**: `https://your-app-name.vercel.app`
- **Backend**: `https://your-app-name.railway.app`

## Option 1: One-Click Deployment (Recommended) 🎯

### Step 1: Deploy Backend to Railway
1. Click this button: [![Deploy to Railway](https://railway.app/button.svg)](https://railway.app/new/template)
2. Connect your GitHub account
3. Import this repository
4. Railway will auto-detect the configuration
5. Add these environment variables in Railway dashboard:
   ```
   NODE_ENV=production
   PORT=5000
   JWT_SECRET=your-secure-jwt-secret-here
   
   # Copy your Salesforce credentials from backend/.env
   SALESFORCE_LOGIN_URL=https://login.salesforce.com
   SALESFORCE_USERNAME=your-username
   SALESFORCE_PASSWORD=your-password
   SALESFORCE_SECURITY_TOKEN=your-token
   ```
6. Click "Deploy"
7. Copy your Railway app URL (e.g., `https://patient-mgmt-backend.railway.app`)

### Step 2: Deploy Frontend to Vercel
1. Click this button: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)
2. Import this repository
3. Set the root directory to: `frontend`
4. Add this environment variable:
   ```
   REACT_APP_API_URL=https://your-railway-backend-url.railway.app/api
   ```
5. Click "Deploy"

## Option 2: Deploy Using CLI 💻

### Prerequisites
```bash
# Install Vercel CLI
npm i -g vercel

# Install Railway CLI
npm i -g @railway/cli
```

### Deploy Backend to Railway
```bash
cd backend
railway login
railway init
railway add
railway deploy
```

### Deploy Frontend to Vercel
```bash
cd frontend
vercel
# Follow the prompts
# Set REACT_APP_API_URL when asked for environment variables
```

## Option 3: Deploy via GitHub Integration 🔄

### Railway (Backend)
1. Go to [Railway Dashboard](https://railway.app)
2. New Project → Deploy from GitHub repo
3. Select your repository
4. Choose `/backend` as root directory
5. Add environment variables
6. Deploy

### Vercel (Frontend)
1. Go to [Vercel Dashboard](https://vercel.com)
2. New Project → Import Git Repository
3. Select your repository
4. Configure:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
5. Add environment variable: `REACT_APP_API_URL`
6. Deploy

## 🧪 Test Your Deployment

After deployment, test these endpoints:

### Backend Health Check
```bash
curl https://your-backend.railway.app/api/health
```

### Frontend
Visit: `https://your-app.vercel.app`

## 📱 Demo Credentials for Recruiter

### Test Patient Account
- Email: `demo@healthcare.com`
- Password: `demo123`

### Sample Patient Data
The system comes pre-loaded with:
- 12+ patient records
- 8+ appointments
- Medical history and records
- Salesforce integration (if configured)

## 🎯 Features to Showcase

1. **Patient Management**
   - Add new patient
   - Search patients
   - Update patient records
   - View medical history

2. **Appointments**
   - Schedule appointments
   - View calendar
   - Update appointment status

3. **Analytics Dashboard**
   - Real-time metrics
   - Patient statistics
   - Appointment analytics

4. **Salesforce Integration**
   - Automatic patient sync
   - CRM integration
   - Referral tracking

## 🔧 Troubleshooting

### CORS Issues
If you get CORS errors, update the backend CORS settings:
```javascript
// backend/simple-server.js
app.use(cors({
  origin: 'https://your-frontend.vercel.app'
}));
```

### Database Issues
The SQLite database is included in the repo. If needed, reinitialize:
```bash
cd backend
node scripts/seedDatabase.js
```

### Salesforce Connection
- Works without Salesforce credentials (simulation mode)
- To enable real sync, add your Salesforce credentials

## 📊 Performance Tips

1. **Frontend Optimization**
   - Already configured for production build
   - Code splitting enabled
   - Optimized bundle size

2. **Backend Optimization**
   - Database indexes in place
   - Efficient queries
   - Proper error handling

## 🎉 Share with Recruiter

Once deployed, share these with your recruiter:

1. **Live Demo URL**: `https://your-app.vercel.app`
2. **API Documentation**: `https://your-backend.railway.app/api/health`
3. **GitHub Repository**: Your repo link
4. **This Guide**: For them to understand the features

## 💡 Pro Tips

1. **Custom Domain**: Both Vercel and Railway support custom domains
2. **Analytics**: Add Google Analytics to track usage
3. **Monitoring**: Railway provides built-in monitoring
4. **Scaling**: Both platforms auto-scale based on traffic

---

**Ready to Deploy? Start with Option 1 for the quickest setup!** 🚀
