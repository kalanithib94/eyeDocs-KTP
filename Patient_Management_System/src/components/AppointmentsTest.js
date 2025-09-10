import React, { useState, useEffect } from 'react';
import { appointmentsAPI } from '../services/api';

const AppointmentsTest = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔍 TEST: Loading appointments...');
      const response = await appointmentsAPI.getAll();
      console.log('🔍 TEST: Raw API response:', response);
      
      if (!response || !response.data) {
        throw new Error('No response data');
      }
      
      if (!response.data.data) {
        throw new Error('No appointments data in response');
      }
      
      console.log('🔍 TEST: Appointments data:', response.data.data);
      
      // Test each appointment individually
      const safeAppointments = response.data.data.map((apt, index) => {
        console.log(`🔍 TEST: Processing appointment ${index}:`, apt);
        
        const safeApt = {
          id: apt?.id || `unknown-${index}`,
          patientName: apt?.patientName || 'Unknown Patient',
          time: apt?.appointmentTime || apt?.time || 'No time',
          date: apt?.appointmentDate || apt?.date || 'No date',
          type: apt?.type || 'general',
          status: apt?.status || 'scheduled',
          notes: apt?.notes || ''
        };
        
        console.log(`🔍 TEST: Safe appointment ${index}:`, safeApt);
        return safeApt;
      });
      
      console.log('🔍 TEST: All safe appointments:', safeAppointments);
      setAppointments(safeAppointments);
    } catch (err) {
      console.error('🔍 TEST: Error loading appointments:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time) => {
    console.log('🔍 TEST: formatTime called with:', time, typeof time);
    
    if (!time || time === 'undefined' || time === 'null') {
      console.log('🔍 TEST: formatTime returning "No time set"');
      return 'No time set';
    }
    
    try {
      const timeStr = String(time).trim();
      console.log('🔍 TEST: formatTime timeStr:', timeStr);
      
      if (!timeStr.includes(':')) {
        console.log('🔍 TEST: formatTime no colon, returning:', timeStr);
        return timeStr;
      }
      
      const parts = timeStr.split(':');
      console.log('🔍 TEST: formatTime parts:', parts);
      
      if (parts.length < 2) {
        console.log('🔍 TEST: formatTime not enough parts, returning:', timeStr);
        return timeStr;
      }
      
      const hour = parseInt(parts[0], 10);
      const minute = parts[1];
      
      if (isNaN(hour)) {
        console.log('🔍 TEST: formatTime invalid hour, returning:', timeStr);
        return timeStr;
      }
      
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      const result = `${displayHour}:${minute} ${ampm}`;
      
      console.log('🔍 TEST: formatTime result:', result);
      return result;
    } catch (err) {
      console.error('🔍 TEST: formatTime error:', err);
      return 'Invalid time';
    }
  };

  if (loading) {
    return <div>Loading appointments...</div>;
  }

  if (error) {
    return (
      <div>
        <h2>Error: {error}</h2>
        <button onClick={loadAppointments}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Appointments Test Page</h1>
      <p>Total appointments: {appointments.length}</p>
      
      {appointments.map((apt, index) => (
        <div key={apt.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>Appointment {index + 1}</h3>
          <p><strong>ID:</strong> {apt.id}</p>
          <p><strong>Patient:</strong> {apt.patientName}</p>
          <p><strong>Time:</strong> {formatTime(apt.time)}</p>
          <p><strong>Date:</strong> {apt.date}</p>
          <p><strong>Type:</strong> {apt.type}</p>
          <p><strong>Status:</strong> {apt.status}</p>
          <p><strong>Notes:</strong> {apt.notes}</p>
        </div>
      ))}
    </div>
  );
};

export default AppointmentsTest;
