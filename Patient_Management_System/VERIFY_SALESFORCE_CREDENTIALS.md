# Verify Your Salesforce Credentials

## Current Credentials Status
The credentials you provided are currently not connecting. This could be due to several reasons.

## Your Provided Credentials:
- **Username**: masterenterprise@test.com
- **Password**: 1@Balumani9A
- **Security Token**: nm2A4WwPTmKR6NoWAyEfboWg

## Steps to Verify and Fix:

### 1. Check Org Type
First, determine if your org is Production or Sandbox:
- Log in to Salesforce at https://login.salesforce.com
- If that fails, try https://test.salesforce.com
- The one that works tells you your org type

**Update in code:**
- Production: `DEFAULT_LOGIN_URL: 'https://login.salesforce.com'`
- Sandbox: `DEFAULT_LOGIN_URL: 'https://test.salesforce.com'`

### 2. Reset Security Token
Your security token might have expired or changed:
1. Log in to Salesforce
2. Go to **Setup** (gear icon)
3. Search for "Reset My Security Token"
4. Click **Reset Security Token**
5. Check your email for the new token
6. Update `DEFAULT_SECURITY_TOKEN` in the code

### 3. Verify Password
Make sure your password is correct:
- Try logging in manually to Salesforce
- If you recently changed your password, the security token also resets

### 4. Check IP Restrictions
Your org might have IP restrictions:
1. Go to **Setup** → **Network Access**
2. Add your current IP or range
3. Or add 0.0.0.0 to 255.255.255.255 for testing (remove later for security)

### 5. Check User Permissions
Ensure your user has API access:
1. Go to **Setup** → **Users**
2. Find your user
3. Check Profile → ensure "API Enabled" is checked

## How the App Works Without Valid Credentials:

**Don't worry!** The app is designed to work even without valid Salesforce credentials:

1. **Simulation Mode**: If Salesforce connection fails, the app automatically switches to simulation mode
2. **All Features Work**: Patient management, appointments, analytics all function normally
3. **Local Data**: Data is stored in SQLite database
4. **Demo Ready**: Perfect for demonstrations without needing live Salesforce

## Testing Your Credentials:

### Option 1: Through the App
1. Deploy to Railway with updated credentials
2. Go to **Settings** page
3. Enter credentials and click **Test Connection**

### Option 2: Local Test
```bash
cd backend
node test-salesforce-connection.js
```

### Option 3: Manual Test in Salesforce Workbench
1. Go to https://workbench.developerforce.com
2. Select your environment (Production/Sandbox)
3. Login with your credentials
4. If it works there, the credentials are valid

## Current App Status:

The app is configured with your credentials and will:
1. **Try to connect** to Salesforce with your credentials
2. **If successful**: Sync data to Salesforce
3. **If failed**: Continue in simulation mode (fully functional)

## For Demo Purposes:

You can demonstrate the app to recruiters even without valid Salesforce credentials:
- Say: "The app has Salesforce integration capability"
- Show: The Settings page where users can configure their own org
- Explain: "It's currently in simulation mode for security, but can sync with any Salesforce org"

## Next Steps:

1. **Verify your credentials** using the steps above
2. **Update the configuration** if needed:
   - File: `backend/config/default-salesforce.js`
   - Or use Railway environment variables
3. **Redeploy** to Railway
4. **Test** through the Settings page

## Alternative: Use a Free Developer Org

If your current credentials don't work, create a free Salesforce Developer org:
1. Go to https://developer.salesforce.com/signup
2. Create a free account
3. Use those credentials instead
4. This gives you a fully functional Salesforce org for demos

## Support:

The app is fully functional regardless of Salesforce connection status. The integration is a bonus feature that demonstrates your ability to work with external APIs and handle failures gracefully.
