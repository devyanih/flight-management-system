package com.booking_service.controller;


import org.springframework.web.bind.annotation.*;

import com.booking_service.dto.BookingRequest;
import com.booking_service.dto.BookingResponse;
import com.booking_service.services.BookingService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

	private static final Logger logger = LoggerFactory.getLogger(BookingController.class);

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public BookingResponse createBooking(@Valid @RequestBody BookingRequest request) {
    	logger.info("Received booking request for flight: {}", request.getFlightNumber());
    	return bookingService.createBooking(request);
    }

    @PutMapping("/updateCheckIn/{bookingReference}")
    public String updateCheckInStatus(@PathVariable String bookingReference) {
    	logger.info("Check-in update requested for booking reference: {}", bookingReference);
        return bookingService.updateCheckInStatus(bookingReference);
    }
//    @GetMapping("/user/{id}")
//    public List<BookingResponse> getUserBookings(@PathVariable Long id) {
//    logger.info("Fetching bookings for user: {}", id);
//       return bookingService.find(id);
//    }

    // Endpoint to cancel a user's booking
    @DeleteMapping("/cancel/{bookingReference}")
    public String cancelBooking(@PathVariable String bookingReference) {
        logger.info("Cancel booking requested for reference: {}", bookingReference);
        return bookingService.cancelBooking(bookingReference);
    }

    // Endpoint to view all bookings (for Owner)
    @GetMapping("/all")
    public List<BookingResponse> getAllUserBookings() {
        logger.info("Fetching all bookings for owner");
        return bookingService.getAllUserBookings();
    }
}


