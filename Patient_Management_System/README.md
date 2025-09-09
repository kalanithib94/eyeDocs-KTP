# 🏥 Patient Management System

A comprehensive, full-stack patient management system built with React and Node.js, featuring Salesforce integration and modern healthcare UI/UX design.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kalanithib94/eyeDocs-KTP.git&root-directory=Patient_Management_System/frontend)
[![Deploy to Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/kalanithib94/eyeDocs-KTP.git&root-directory=Patient_Management_System/backend)

## 🚀 Live Demo

- **Frontend**: [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/kalanithib94/eyeDocs-KTP.git&root-directory=Patient_Management_System/frontend)
- **Backend**: [Deploy to Railway](https://railway.app/new/template?template=https://github.com/kalanithib94/eyeDocs-KTP.git&root-directory=Patient_Management_System/backend)

## ✨ Features

### 🎨 **Modern Healthcare UI/UX**
- Professional medical dashboard with healthcare theming
- Responsive design optimized for all devices
- Interactive charts and data visualization
- Medical icons and healthcare-specific color schemes
- Smooth animations and micro-interactions

### 🏥 **Patient Management**
- Complete CRUD operations for patient records
- Advanced search and filtering capabilities
- Patient profile management with medical history
- Emergency contact and allergy tracking
- Real-time data synchronization

### 📅 **Appointment System**
- Appointment scheduling and management
- Status tracking (Scheduled, Completed, Cancelled)
- Calendar integration
- Time slot management
- Doctor assignment

### 📊 **Analytics & Reporting**
- Real-time dashboard with key metrics
- Patient growth trends and analytics
- Appointment distribution charts
- Performance indicators and KPIs
- Executive summary reports

### 🔗 **Salesforce Integration**
- Automatic patient sync to Salesforce
- Custom Referral__c object creation
- Field-level security configuration
- Real-time data synchronization
- Error handling and fallback mechanisms

### 🔐 **Security & Authentication**
- JWT-based authentication system
- Role-based access control
- Input validation and sanitization
- Rate limiting and CORS protection
- Secure API endpoints

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **React Icons** - Icon library
- **React Toastify** - Notifications
- **Custom CSS** - Modern styling

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite3** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Joi** - Input validation
- **jsforce** - Salesforce integration

### **Deployment**
- **Vercel** - Frontend hosting
- **Railway** - Backend hosting
- **GitHub Actions** - CI/CD
- **GitHub Pages** - Documentation

## 🚀 Quick Start

### **Local Development**

1. **Clone the repository**
   ```bash
   git clone https://github.com/kalanithib94/eyeDocs-KTP.git
   cd eyeDocs-KTP/Patient_Management_System
   ```

2. **Start Backend**
   ```bash
   cd backend
   npm install
   node simple-server.js
   ```

3. **Start Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

### **One-Click Deployment**

#### **Option 1: Vercel + Railway (Recommended)**
- **Frontend**: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kalanithib94/eyeDocs-KTP.git&root-directory=Patient_Management_System/frontend)
- **Backend**: [![Deploy to Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/kalanithib94/eyeDocs-KTP.git&root-directory=Patient_Management_System/backend)

#### **Option 2: Netlify + Railway**
- **Frontend**: [Deploy to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/kalanithib94/eyeDocs-KTP.git&base=Patient_Management_System/frontend)
- **Backend**: [Deploy to Railway](https://railway.app/new/template?template=https://github.com/kalanithib94/eyeDocs-KTP.git&root-directory=Patient_Management_System/backend)

## 📱 Screenshots

### Dashboard
- Modern healthcare dashboard with real-time metrics
- Interactive charts and data visualization
- Professional medical theming

### Patient Management
- Comprehensive patient records management
- Advanced search and filtering
- Medical history and allergy tracking

### Salesforce Integration
- Automatic patient sync to Salesforce
- Custom object creation and management
- Real-time data synchronization

## 🔧 Configuration

### **Environment Variables**

#### **Backend (.env)**
```env
NODE_ENV=production
PORT=5000
JWT_SECRET=your-jwt-secret
DB_PATH=./database/patient_management.db

# Salesforce Integration
SALESFORCE_LOGIN_URL=https://login.salesforce.com
SALESFORCE_USERNAME=your-username
SALESFORCE_PASSWORD=your-password
SALESFORCE_SECURITY_TOKEN=your-security-token
SALESFORCE_REFERRAL_OBJECT=Referral__c
```

#### **Frontend (.env)**
```env
REACT_APP_API_URL=https://your-backend-url.railway.app
```

## 📊 API Endpoints

### **Authentication**
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile

### **Patients**
- `GET /api/patients` - Get all patients
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### **Appointments**
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `PATCH /api/appointments/:id/status` - Update status

### **Analytics**
- `GET /api/analytics/dashboard` - Dashboard summary
- `GET /api/analytics/patients` - Patient analytics
- `GET /api/analytics/appointments` - Appointment analytics

### **Salesforce**
- `GET /api/salesforce/test` - Test connection
- `GET /api/salesforce/referrals` - Get referrals
- `POST /api/salesforce/sync` - Sync patient data

## 🗄️ Database Schema

### **Patients Table**
```sql
CREATE TABLE patients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20),
  date_of_birth DATE,
  address TEXT,
  emergency_contact VARCHAR(100),
  medical_history TEXT,
  allergies TEXT,
  medications TEXT,
  status VARCHAR(20) DEFAULT 'active',
  salesforce_id VARCHAR(50),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### **Appointments Table**
```sql
CREATE TABLE appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id INTEGER,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  type VARCHAR(50),
  notes TEXT,
  status VARCHAR(20) DEFAULT 'scheduled',
  duration INTEGER DEFAULT 30,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id)
);
```

## 🎯 KTP Interview Ready

This project demonstrates:
- **Full-Stack Development** - Complete end-to-end application
- **Modern React Patterns** - Hooks, custom hooks, state management
- **API Design** - RESTful endpoints with proper validation
- **Database Design** - Normalized schema with relationships
- **Security Implementation** - JWT, rate limiting, input validation
- **Cloud Integration** - Salesforce API integration
- **Deployment** - Production-ready deployment configuration
- **Professional UI/UX** - Healthcare-specific design patterns

## 📈 Performance

- **Frontend**: Optimized React build with code splitting
- **Backend**: Express.js with proper middleware and error handling
- **Database**: SQLite with indexed queries
- **CDN**: Global content delivery for fast loading
- **Mobile**: Responsive design with touch-friendly interfaces

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Kalanithi B**
- GitHub: [@kalanithib94](https://github.com/kalanithib94)
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/your-profile)

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js for the robust backend
- Salesforce for the integration capabilities
- Vercel and Railway for the deployment platforms

---

**⭐ If you found this project helpful, please give it a star!**#   R e d e p l o y   t r i g g e r e d   o n   0 9 / 0 9 / 2 0 2 5   1 6 : 0 5 : 4 4  
 