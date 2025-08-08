import { useState, useCallback } from 'react';
import { apiService } from '../services/api';

export const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookings = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getBookings(params);
      if (response && response.bookings) {
        setBookings(response.bookings);
      }
    } catch (err) {
      setError(err.message);
      console.error('Bookings Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createBooking = useCallback(async (bookingData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.createBooking(bookingData);
      if (response && response.booking) {
        setBookings(prev => [response.booking, ...prev]);
        return { success: true, booking: response.booking };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

        const updateBookingStatus = useCallback(async (bookingId, status) => {
    try {
      await apiService.updateBookingStatus(bookingId, status);
      
      // Обновляем локальное состояние
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status }
            : booking
        )
      );
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    createBooking,
    updateBookingStatus
  };
};