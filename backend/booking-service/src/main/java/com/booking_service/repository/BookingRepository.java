package com.booking_service.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.booking_service.model.Booking;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    Booking findByBookingReference(String bookingReference);

}




