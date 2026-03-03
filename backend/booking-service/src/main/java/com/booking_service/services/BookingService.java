package com.booking_service.services;

import com.booking_service.dto.BookingRequest;
import com.booking_service.dto.BookingResponse;

import java.util.List;

public interface BookingService {
    BookingResponse createBooking(BookingRequest request);
    String updateCheckInStatus(String bookingReference);
   // List<BookingResponse> getUserBookings(String userId);  // Fetch bookings for a specific user
    String cancelBooking(String bookingReference);  // Cancel a specific booking
    List<BookingResponse> getAllUserBookings();  // Owner can view all bookings
	
}




