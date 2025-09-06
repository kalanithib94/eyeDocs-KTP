const jsforce = require('jsforce');

class SalesforceService {
  constructor() {
    this.conn = null;
    this.isConnected = false;
  }

  async connect() {
    try {
      // Salesforce connection configuration
      const config = {
        loginUrl: process.env.SALESFORCE_LOGIN_URL || 'https://login.salesforce.com',
        username: process.env.SALESFORCE_USERNAME,
        password: process.env.SALESFORCE_PASSWORD,
        securityToken: process.env.SALESFORCE_SECURITY_TOKEN
      };

      // Check if we have the required credentials
      if (!config.username || !config.password) {
        console.log('⚠️  Salesforce credentials not configured. Using simulation mode.');
        return { connected: false, mode: 'simulation' };
      }

      this.conn = new jsforce.Connection({
        loginUrl: config.loginUrl
      });

      // Login to Salesforce
      await this.conn.login(config.username, config.password + config.securityToken);
      
      this.isConnected = true;
      console.log('✅ Connected to Salesforce successfully');
      console.log(`📊 User ID: ${this.conn.userInfo.id}`);
      console.log(`🏢 Organization ID: ${this.conn.userInfo.organizationId}`);
      
      return { connected: true, mode: 'live', userInfo: this.conn.userInfo };
    } catch (error) {
      console.error('❌ Salesforce connection failed:', error.message);
      this.isConnected = false;
      return { connected: false, mode: 'simulation', error: error.message };
    }
  }

  async createReferral(patientData) {
    try {
      if (!this.isConnected) {
        console.log('🔄 Salesforce not connected, simulating referral creation...');
        return this.simulateReferralCreation(patientData);
      }

      // Map patient data to Salesforce Referral__c object
      const referralData = {
        Name: `${patientData.first_name} ${patientData.last_name}`,
        First_Name__c: patientData.first_name,
        Last_Name__c: patientData.last_name,
        Email__c: patientData.email,
        Phone__c: patientData.phone,
        Date_of_Birth__c: patientData.date_of_birth,
        Address__c: patientData.address,
        Emergency_Contact__c: patientData.emergency_contact,
        Medical_History__c: patientData.medical_history,
        Allergies__c: patientData.allergies,
        Current_Medications__c: patientData.medications,
        Status__c: 'New',
        Source__c: 'Patient Management System',
        Referral_Date__c: new Date().toISOString().split('T')[0]
      };

      // Create the referral record
      const result = await this.conn.sobject('Referral__c').create(referralData);
      
      if (result.success) {
        console.log(`✅ Referral created in Salesforce with ID: ${result.id}`);
        return {
          success: true,
          salesforceId: result.id,
          referralData: referralData
        };
      } else {
        throw new Error(`Salesforce creation failed: ${result.errors.join(', ')}`);
      }
    } catch (error) {
      console.error('❌ Error creating Salesforce referral:', error.message);
      throw error;
    }
  }

  async simulateReferralCreation(patientData) {
    // Simulate a delay for realistic behavior
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const simulatedId = `REF_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    console.log(`🔄 Simulated referral creation for: ${patientData.first_name} ${patientData.last_name}`);
    console.log(`📋 Simulated Salesforce ID: ${simulatedId}`);
    
    return {
      success: true,
      salesforceId: simulatedId,
      mode: 'simulation',
      referralData: {
        Name: `${patientData.first_name} ${patientData.last_name}`,
        First_Name__c: patientData.first_name,
        Last_Name__c: patientData.last_name,
        Email__c: patientData.email,
        Phone__c: patientData.phone,
        Status__c: 'New',
        Source__c: 'Patient Management System'
      }
    };
  }

  async testConnection() {
    try {
      if (!this.isConnected) {
        const connectionResult = await this.connect();
        return connectionResult;
      }
      
      // Test query to verify connection
      const result = await this.conn.query('SELECT Id, Name FROM Account LIMIT 1');
      return {
        connected: true,
        mode: 'live',
        testQuery: result.records.length > 0 ? 'Success' : 'No data',
        userInfo: this.conn.userInfo
      };
    } catch (error) {
      return {
        connected: false,
        mode: 'simulation',
        error: error.message
      };
    }
  }

  async getReferrals() {
    try {
      if (!this.isConnected) {
        throw new Error('Not connected to Salesforce');
      }

      const result = await this.conn.query(`
        SELECT Id, Name, First_Name__c, Last_Name__c, Email__c, Phone__c, 
               Date_of_Birth__c, Address__c, Emergency_Contact__c, Medical_History__c,
               Allergies__c, Current_Medications__c, Status__c, Source__c, 
               Referral_Date__c, CreatedDate
        FROM Referral__c 
        ORDER BY CreatedDate DESC 
        LIMIT 10
      `);

      return {
        success: true,
        records: result.records,
        totalSize: result.totalSize
      };
    } catch (error) {
      console.error('❌ Error fetching referrals from Salesforce:', error.message);
      throw error;
    }
  }
}

// Create singleton instance
const salesforceService = new SalesforceService();

module.exports = salesforceService;