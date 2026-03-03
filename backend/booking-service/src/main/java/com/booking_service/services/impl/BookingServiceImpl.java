package com.booking_service.services.impl;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.booking_service.client.FareClient;
import com.booking_service.client.FlightSearchClient;
import com.booking_service.dto.BookingRequest;
import com.booking_service.dto.BookingResponse;
import com.booking_service.dto.Fare;
import com.booking_service.dto.FlightDetails;
import com.booking_service.exception.BookingNotFoundException;
import com.booking_service.model.Booking;
import com.booking_service.repository.BookingRepository;
import com.booking_service.services.BookingService;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final FlightSearchClient flightSearchClient;
    private final FareClient fareClient;

    @Autowired
    public BookingServiceImpl(BookingRepository bookingRepository,
                              FlightSearchClient flightSearchClient,
                              FareClient fareClient) {
        this.bookingRepository = bookingRepository;
        this.flightSearchClient = flightSearchClient;
        this.fareClient = fareClient;
    }

    @Override
    public BookingResponse createBooking(BookingRequest request) {
    	// Check if flight exists using the flightSearchClient
    	
        FlightDetails flight = flightSearchClient.getFlight(request.getFlightNumber());
        if (flight == null || !flight.getDate().equals(request.getFlightDate())) {
            throw new RuntimeException("Flight not available or date mismatch.");
        }
     // Check if fare exists using the fareClient
        Fare fare = fareClient.getFare(request.getFlightNumber());
        if (fare == null) {
            throw new RuntimeException("Fare information not available.");
        }

        // Create and save the booking
        Booking booking = new Booking();
        booking.setFlightNumber(request.getFlightNumber());
        booking.setFlightDate(request.getFlightDate());
        booking.setFirstName(request.getFirstName());
        booking.setLastName(request.getLastName());
        booking.setGender(request.getGender());
        booking.setFare(fare.getFare());
        booking.setBookingReference("BK" + UUID.randomUUID().toString().substring(0, 6).toUpperCase());
        booking.setStatus("CONFIRMED");
        booking.setCheckedIn(false);

        bookingRepository.save(booking);

        return new BookingResponse(
                booking.getBookingReference(),
                booking.getStatus(),
                booking.getFirstName(),
                booking.getLastName(),
                booking.getGender(),
                booking.getFlightNumber(),
                booking.getFlightDate(),
                booking.getFare()
        );
    }

    @Override
    public String updateCheckInStatus(String bookingReference) {
    	 // Check if booking exists
        Booking booking = bookingRepository.findByBookingReference(bookingReference);
        if (booking == null) {
            throw new BookingNotFoundException("Booking not found with reference: " + bookingReference);
        }

        booking.setCheckedIn(true);
        bookingRepository.save(booking);
        return " Check-in status updated for: " + bookingReference;
    }
//    @Override
//    public List<BookingResponse> getUserBookings(String userId) {
//        // Fetch bookings based on user ID
//        List<Booking> bookings = bookingRepository.findByUserId(userId);
//        return bookings.stream().map(booking -> new BookingResponse(
//                booking.getBookingReference(),
//                booking.getStatus(),
//                booking.getFirstName(),
//                booking.getLastName(),
//                booking.getGender(),
//                booking.getFlightNumber(),
//                booking.getFlightDate(),
//                booking.getFare()
//        )).collect(Collectors.toList());
//    }

   

    @Override
    public String cancelBooking(String bookingReference) {
        // Fetch the booking and cancel it
        Booking booking = bookingRepository.findByBookingReference(bookingReference);
        if (booking == null) {
            throw new RuntimeException("Booking not found for reference: " + bookingReference);
        }

        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);
        return "Booking cancelled successfully for reference: " + bookingReference;
    }

    @Override
    public List<BookingResponse> getAllUserBookings() {
        // Owner can view all bookings
        List<Booking> bookings = bookingRepository.findAll();
        return bookings.stream().map(booking -> new BookingResponse(
                booking.getBookingReference(),
                booking.getStatus(),
                booking.getFirstName(),
                booking.getLastName(),
                booking.getGender(),
                booking.getFlightNumber(),
                booking.getFlightDate(),
                booking.getFare()
        )).collect(Collectors.toList());
    }
}