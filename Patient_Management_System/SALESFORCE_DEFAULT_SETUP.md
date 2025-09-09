# Setting Up Default Salesforce Organization

## Overview
The Patient Management System now supports a **dual Salesforce configuration**:
1. **Default Demo Org** - Always connected for demonstrations
2. **User Override** - Users can connect their own Salesforce org through Settings

## Configuration Priority
The system uses credentials in this order:
1. **User Settings** (if provided through the Settings page)
2. **Environment Variables** (if set in Railway)
3. **Default Demo Org** (hardcoded fallback)

## Setting Up Your Default Demo Org

### Step 1: Create a Salesforce Developer Edition
1. Go to [https://developer.salesforce.com/signup](https://developer.salesforce.com/signup)
2. Create a free Developer Edition account
3. Verify your email and set up your org

### Step 2: Create the Referral Custom Object
Run this command in your project:
```bash
npm run create-salesforce-object
```

Or manually create in Salesforce Setup:
- Object Name: `Referral__c`
- Fields:
  - `Patient_Name__c` (Text, 255)
  - `Email__c` (Email)
  - `Phone__c` (Phone)
  - `Date_of_Birth__c` (Date)
  - `Status__c` (Picklist: New, In Progress, Completed)
  - `Priority__c` (Picklist: Low, Medium, High)
  - `Notes__c` (Long Text Area)

### Step 3: Get Your Security Token
1. In Salesforce, go to **Setup**
2. Search for "Reset My Security Token"
3. Click **Reset Security Token**
4. Check your email for the new token

### Step 4: Update Default Credentials

#### Option A: Update the Code (Recommended for Demo)
Edit `backend/config/default-salesforce.js`:
```javascript
const defaultSalesforceConfig = {
  DEFAULT_USERNAME: 'your-demo@salesforce.com',
  DEFAULT_PASSWORD: 'YourPassword123',
  DEFAULT_SECURITY_TOKEN: 'YourSecurityToken',
  DEFAULT_LOGIN_URL: 'https://login.salesforce.com', // or https://test.salesforce.com for sandbox
};
```

#### Option B: Use Environment Variables (Production)
In Railway, add these environment variables:
```
SALESFORCE_USERNAME=your-demo@salesforce.com
SALESFORCE_PASSWORD=YourPassword123
SALESFORCE_SECURITY_TOKEN=YourSecurityToken
SALESFORCE_LOGIN_URL=https://login.salesforce.com
```

### Step 5: Test the Connection
1. Deploy your changes
2. Visit your app
3. Go to **Settings** → **Salesforce Configuration**
4. You should see "Connected to default demo org"

## How Users Can Override

Users can connect their own Salesforce org:

1. **Through the UI:**
   - Go to **Settings** in the sidebar
   - Enter their Salesforce credentials
   - Click **Test Connection**
   - Click **Save Configuration**

2. **What Happens:**
   - Their credentials override the default for their session
   - The app will use their org instead of the demo org
   - They can clear their settings to revert to the default

## Security Considerations

### For Demo Org:
- Use a **sandbox** or **developer edition** (never production)
- Create a dedicated user with limited permissions
- Only grant access to the `Referral__c` object
- Regularly rotate the security token

### For Production:
- Store credentials in environment variables (not in code)
- Use OAuth 2.0 flow instead of username/password
- Implement IP restrictions in Salesforce
- Enable two-factor authentication

## Testing the Setup

### Test Default Connection:
```javascript
// The app will automatically connect to the default org
// Check the console logs for:
// "🎯 Using default demo Salesforce org credentials"
// "✅ Connected to Salesforce successfully"
```

### Test User Override:
1. Go to Settings page
2. Enter different credentials
3. Save and test connection
4. Check console for: "📱 Using user-provided Salesforce credentials"

## Troubleshooting

### Connection Failed:
- Verify username and password are correct
- Ensure security token is appended to password
- Check if IP is whitelisted in Salesforce
- For sandbox, use `https://test.salesforce.com`

### Object Not Found:
- Ensure `Referral__c` object exists in the org
- Check field-level security permissions
- Verify API access is enabled for the user

## Demo Script for Recruiters

"This Patient Management System demonstrates Salesforce integration with these features:

1. **Default Integration**: The app comes pre-connected to a demo Salesforce org, showing immediate integration capabilities.

2. **Flexible Configuration**: Users can connect their own Salesforce org through the Settings page, demonstrating multi-tenant capability.

3. **Real-time Sync**: When a patient is created, it automatically creates a Referral record in Salesforce.

4. **Error Handling**: If Salesforce is unavailable, the app continues to work in simulation mode, ensuring business continuity.

5. **Security**: Credentials are encrypted and can be managed through environment variables for production deployments."

## Next Steps

1. **Set up your default demo org** following the steps above
2. **Test both default and user override** scenarios
3. **Document your demo org details** for team members
4. **Create sample data** in both the app and Salesforce
5. **Prepare demo scenarios** for different use cases
