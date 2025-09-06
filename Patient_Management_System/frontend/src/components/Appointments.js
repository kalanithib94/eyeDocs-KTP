import React, { useState, useEffect } from 'react';
import { 
  FiCalendar, 
  FiClock, 
  FiUser, 
  FiPlus, 
  FiEdit2, 
  FiTrash2,
  FiCheckCircle,
  FiXCircle
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import './Appointments.css';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    date: '',
    time: '',
    type: 'general',
    notes: '',
    status: 'scheduled'
  });

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const sampleAppointments = [
      {
        id: 1,
        patientId: 1,
        patientName: 'John Smith',
        date: '2024-01-20',
        time: '09:00',
        type: 'general',
        notes: 'Regular checkup and blood pressure monitoring',
        status: 'scheduled',
        duration: 30
      },
      {
        id: 2,
        patientId: 2,
        patientName: 'Sarah Johnson',
        date: '2024-01-20',
        time: '10:30',
        type: 'follow-up',
        notes: 'Follow-up for diabetes management',
        status: 'confirmed',
        duration: 45
      },
      {
        id: 3,
        patientId: 3,
        patientName: 'Michael Wilson',
        date: '2024-01-21',
        time: '14:00',
        type: 'consultation',
        notes: 'Cardiovascular consultation',
        status: 'scheduled',
        duration: 60
      },
      {
        id: 4,
        patientId: 4,
        patientName: 'Emily Davis',
        date: '2024-01-21',
        time: '15:30',
        type: 'emergency',
        notes: 'Urgent consultation - chest pain',
        status: 'urgent',
        duration: 30
      },
      {
        id: 5,
        patientId: 5,
        patientName: 'Robert Brown',
        date: '2024-01-22',
        time: '11:00',
        type: 'follow-up',
        notes: 'Arthritis management follow-up',
        status: 'completed',
        duration: 30
      }
    ];

    setAppointments(sampleAppointments);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingAppointment) {
      // Update existing appointment
      setAppointments(prev => prev.map(appointment => 
        appointment.id === editingAppointment.id 
          ? { ...appointment, ...formData }
          : appointment
      ));
      toast.success('Appointment updated successfully!');
    } else {
      // Add new appointment
      const newAppointment = {
        id: Date.now(),
        ...formData,
        duration: 30
      };
      setAppointments(prev => [newAppointment, ...prev]);
      toast.success('Appointment scheduled successfully!');
    }
    
    setShowModal(false);
    setEditingAppointment(null);
    setFormData({
      patientId: '',
      patientName: '',
      date: '',
      time: '',
      type: 'general',
      notes: '',
      status: 'scheduled'
    });
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      patientId: appointment.patientId,
      patientName: appointment.patientName,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type,
      notes: appointment.notes,
      status: appointment.status
    });
    setShowModal(true);
  };

  const handleDelete = (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      setAppointments(prev => prev.filter(appointment => appointment.id !== appointmentId));
      toast.success('Appointment deleted successfully!');
    }
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    setAppointments(prev => prev.map(appointment => 
      appointment.id === appointmentId 
        ? { ...appointment, status: newStatus }
        : appointment
    ));
    toast.success(`Appointment marked as ${newStatus}!`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return '#f6ad55';
      case 'confirmed': return '#48bb78';
      case 'completed': return '#38b2ac';
      case 'cancelled': return '#f56565';
      case 'urgent': return '#e53e3e';
      default: return '#a0aec0';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'general': return '#667eea';
      case 'follow-up': return '#764ba2';
      case 'consultation': return '#48bb78';
      case 'emergency': return '#f56565';
      default: return '#a0aec0';
    }
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="appointments">
      <div className="appointments-header">
        <div>
          <h1 className="appointments-title">Appointments</h1>
          <p className="appointments-subtitle">Manage patient appointments and schedules</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <FiPlus size={16} />
          Schedule Appointment
        </button>
      </div>

      {/* Appointments List */}
      <div className="appointments-grid">
        {appointments.map(appointment => (
          <div key={appointment.id} className="appointment-card">
            <div className="appointment-header">
              <div className="appointment-time">
                <FiClock size={16} />
                <span>{formatTime(appointment.time)}</span>
              </div>
              <div className="appointment-actions">
                <button 
                  className="btn btn-sm btn-secondary"
                  onClick={() => handleEdit(appointment)}
                  title="Edit"
                >
                  <FiEdit2 size={14} />
                </button>
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(appointment.id)}
                  title="Delete"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
            
            <div className="appointment-content">
              <div className="appointment-patient">
                <FiUser size={16} />
                <span>{appointment.patientName}</span>
              </div>
              
              <div className="appointment-details">
                <div className="appointment-date">
                  <FiCalendar size={14} />
                  <span>{new Date(appointment.date).toLocaleDateString()}</span>
                </div>
                
                <div className="appointment-type">
                  <span 
                    className="type-badge"
                    style={{ backgroundColor: getTypeColor(appointment.type) }}
                  >
                    {appointment.type.replace('-', ' ')}
                  </span>
                </div>
              </div>
              
              {appointment.notes && (
                <div className="appointment-notes">
                  <p>{appointment.notes}</p>
                </div>
              )}
            </div>
            
            <div className="appointment-footer">
              <div className="appointment-status">
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(appointment.status) }}
                >
                  {appointment.status}
                </span>
              </div>
              
              <div className="appointment-actions">
                {appointment.status === 'scheduled' && (
                  <button 
                    className="btn btn-sm btn-success"
                    onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                  >
                    <FiCheckCircle size={14} />
                    Confirm
                  </button>
                )}
                {appointment.status === 'confirmed' && (
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={() => handleStatusChange(appointment.id, 'completed')}
                  >
                    <FiCheckCircle size={14} />
                    Complete
                  </button>
                )}
                {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                  >
                    <FiXCircle size={14} />
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingAppointment ? 'Edit Appointment' : 'Schedule New Appointment'}</h3>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowModal(false);
                  setEditingAppointment(null);
                }}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Patient Name</label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Appointment Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="general">General Checkup</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="consultation">Consultation</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows="3"
                  placeholder="Additional notes or special instructions..."
                />
              </div>
              
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    setEditingAppointment(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingAppointment ? 'Update Appointment' : 'Schedule Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
