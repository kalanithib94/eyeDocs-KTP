import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  verify: (token) => api.post('/auth/verify', { token }),
  getProfile: () => api.get('/auth/profile'),
};

// Patients API
export const patientsAPI = {
  getAll: (params = {}) => api.get('/patients', { params }),
  getById: (id) => api.get(`/patients/${id}`),
  create: (patientData) => {
    // Map form field names to API field names
    const mappedData = {
      first_name: patientData.firstName,
      last_name: patientData.lastName,
      email: patientData.email,
      phone: patientData.phone,
      date_of_birth: patientData.dateOfBirth,
      address: patientData.address,
      emergency_contact: patientData.emergencyContact,
      medical_history: patientData.medicalHistory,
      allergies: patientData.allergies,
      medications: patientData.medications
    };
    return api.post('/patients', mappedData);
  },
  update: (id, patientData) => {
    // Map form field names to API field names
    const mappedData = {
      first_name: patientData.firstName,
      last_name: patientData.lastName,
      email: patientData.email,
      phone: patientData.phone,
      date_of_birth: patientData.dateOfBirth,
      address: patientData.address,
      emergency_contact: patientData.emergencyContact,
      medical_history: patientData.medicalHistory,
      allergies: patientData.allergies,
      medications: patientData.medications,
      status: patientData.status || 'active'
    };
    return api.put(`/patients/${id}`, mappedData);
  },
  delete: (id) => api.delete(`/patients/${id}`),
  getAppointments: (id) => api.get(`/patients/${id}/appointments`),
};

// Appointments API
export const appointmentsAPI = {
  getAll: (params = {}) => api.get('/appointments', { params }),
  getById: (id) => api.get(`/appointments/${id}`),
  create: (appointmentData) => api.post('/appointments', appointmentData),
  update: (id, appointmentData) => api.put(`/appointments/${id}`, appointmentData),
  delete: (id) => api.delete(`/appointments/${id}`),
  updateStatus: (id, status) => api.patch(`/appointments/${id}/status`, { status }),
  getToday: () => api.get('/appointments/today'),
};

// Analytics API
export const analyticsAPI = {
  getOverview: (period = '30') => api.get('/analytics/overview', { params: { period } }),
  getPatients: (period = '6') => api.get('/analytics/patients', { params: { period } }),
  getAppointments: (period = '6') => api.get('/analytics/appointments', { params: { period } }),
  getRevenue: (period = '6') => api.get('/analytics/revenue', { params: { period } }),
  getDashboard: () => api.get('/analytics/dashboard'),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;
