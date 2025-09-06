# 🏥 Patient Management System

A comprehensive, full-stack patient management system built with React and Node.js. This is a complete demonstration project perfect for showcasing to senior developers or potential employers.

## 🚀 Quick Start

### Windows
```bash
# Double-click start.bat or run:
start.bat
```

### Linux/Mac
```bash
# Make executable and run:
chmod +x start.sh
./start.sh
```

### Manual Start
```bash
# Backend
cd backend
npm install
npm run seed  # Seed sample data
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm start
```

## 🔑 Default Login
- **Admin**: admin@medicare.com / admin123
- **Doctor**: doctor@medicare.com / doctor123

## 📊 Features

### Frontend (React)
- **Modern Dashboard** with real-time analytics
- **Patient Management** with full CRUD operations
- **Appointment Scheduling** with status management
- **Analytics & Reporting** with data visualization
- **Responsive Design** for all devices

### Backend (Node.js/Express)
- **RESTful API** with proper HTTP status codes
- **JWT Authentication** with secure login
- **SQLite Database** with normalized schema
- **Input Validation** using Joi
- **Security Features** (rate limiting, CORS, Helmet)

## 🛠️ Tech Stack

### Frontend
- React 18, React Router DOM
- Axios for API calls
- Recharts for data visualization
- React Icons, React Toastify
- Custom CSS with modern design

### Backend
- Node.js, Express.js
- SQLite3 with proper schema
- JWT authentication
- Bcrypt for password hashing
- Joi for validation
- Security middleware (Helmet, CORS, Rate Limiting)

## 📁 Project Structure

```
Patient_Management_System/
├── frontend/                 # React frontend application
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API services
│   │   └── ...
│   └── package.json
├── backend/                 # Node.js backend API
│   ├── config/             # Database configuration
│   ├── database/           # Database initialization
│   ├── routes/             # API routes
│   ├── scripts/            # Database seeding
│   └── server.js
├── start.bat               # Windows startup script
├── start.sh                # Linux/Mac startup script
└── README.md               # This file
```

## 🎯 Key Features Demonstrated

### For Senior Developers
1. **Clean Architecture** - Separation of concerns
2. **Modern React Patterns** - Hooks, custom hooks
3. **API Design** - RESTful endpoints with validation
4. **Database Design** - Normalized schema with relationships
5. **Security Implementation** - JWT, rate limiting, validation
6. **Error Handling** - Comprehensive error management
7. **Code Quality** - Consistent naming and documentation

### For Portfolio
1. **Full-Stack Development** - Complete end-to-end application
2. **Modern UI/UX** - Professional, responsive design
3. **Real-time Features** - Live data updates
4. **Data Visualization** - Charts and analytics
5. **Scalable Architecture** - Easy to extend and maintain

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile

### Patients
- `GET /api/patients` - Get all patients (paginated)
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `PATCH /api/appointments/:id/status` - Update status

### Analytics
- `GET /api/analytics/dashboard` - Dashboard summary
- `GET /api/analytics/patients` - Patient analytics
- `GET /api/analytics/appointments` - Appointment analytics

## 🗄️ Database Schema

### Patients Table
- id, first_name, last_name, email, phone
- date_of_birth, address, emergency_contact
- medical_history, allergies, medications
- status, created_at, updated_at

### Appointments Table
- id, patient_id, appointment_date, appointment_time
- type, notes, status, duration
- created_at, updated_at

### Users Table
- id, username, email, password_hash
- first_name, last_name, role
- is_active, created_at, updated_at

## 🚀 Deployment

### Backend
1. Set up production database (PostgreSQL recommended)
2. Update environment variables
3. Deploy to Heroku, Railway, or AWS

### Frontend
1. Build: `npm run build`
2. Deploy to Netlify, Vercel, or AWS S3

## 📈 Future Enhancements

- Real-time notifications with WebSockets
- File upload for patient documents
- Email notifications for appointments
- Mobile app with React Native
- Advanced reporting and analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

---

**Note**: This is a demonstration project showcasing full-stack development skills. For production use, additional security measures and optimizations would be required.

