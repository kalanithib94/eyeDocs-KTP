# Salesforce Integration Setup Guide

## 🔐 **Step 1: Get Your Salesforce Credentials**

### **Required Information:**
1. **Salesforce Username** - Your login email
2. **Salesforce Password** - Your account password
3. **Security Token** - Get from Salesforce Setup
4. **Login URL** - Production or Sandbox

### **How to Get Your Security Token:**
1. Log into your Salesforce org
2. Go to **Setup** (gear icon → Setup)
3. Go to **My Personal Information** → **Reset My Security Token**
4. Click **Reset Security Token**
5. Check your email for the new token

### **Login URLs:**
- **Production**: `https://login.salesforce.com`
- **Sandbox**: `https://test.salesforce.com`

## 🔧 **Step 2: Configure the Integration**

### **Edit the .env file:**
```bash
# Open the configuration file
notepad backend\.env
```

### **Fill in your credentials:**
```env
SALESFORCE_LOGIN_URL=https://login.salesforce.com
SALESFORCE_USERNAME=your_username@example.com
SALESFORCE_PASSWORD=your_password
SALESFORCE_SECURITY_TOKEN=your_security_token
```

## 🧪 **Step 3: Test the Connection**

### **Test Salesforce connection:**
```bash
.\test-salesforce.bat
```

### **Expected Success Response:**
```json
{
  "status": "success",
  "data": {
    "connected": true,
    "mode": "live",
    "userInfo": {
      "id": "005...",
      "organizationId": "00D...",
      "url": "https://your-org.salesforce.com"
    }
  }
}
```

## 📋 **Step 4: Create Custom Object (if needed)**

### **In Salesforce Setup:**
1. Go to **Object Manager**
2. Click **Create** → **Custom Object**
3. Create object named **Referral**
4. Add these fields:
   - `First_Name__c` (Text)
   - `Last_Name__c` (Text)
   - `Email__c` (Email)
   - `Phone__c` (Phone)
   - `Date_of_Birth__c` (Date)
   - `Address__c` (Text Area)
   - `Emergency_Contact__c` (Text)
   - `Medical_History__c` (Text Area)
   - `Allergies__c` (Text)
   - `Current_Medications__c` (Text)
   - `Status__c` (Picklist: New, In Progress, Completed)
   - `Source__c` (Text)
   - `Referral_Date__c` (Date)

## ✅ **Step 5: Verify Integration**

### **Add a test patient:**
1. Go to `http://localhost:3000`
2. Click **Add Patient**
3. Fill in patient details
4. Click **Add Patient**
5. Check the success message for Salesforce ID

### **Check in Salesforce:**
1. Go to your Salesforce org
2. Search for **Referrals**
3. Verify the patient record was created

## 🚨 **Troubleshooting**

### **Common Issues:**
- **Invalid credentials**: Double-check username/password
- **Security token expired**: Reset your security token
- **Wrong login URL**: Use correct URL (production vs sandbox)
- **Permission denied**: Ensure user has API access

### **Test Commands:**
```bash
# Test connection only
curl http://localhost:5000/api/salesforce/test

# Test patient creation
.\test-salesforce.bat
```
