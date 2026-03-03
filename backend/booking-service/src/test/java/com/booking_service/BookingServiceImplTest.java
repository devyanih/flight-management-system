package com.booking_service;

import com.booking_service.client.FareClient;
import com.booking_service.client.FlightSearchClient;
import com.booking_service.dto.*;
import com.booking_service.model.Booking;
import com.booking_service.repository.BookingRepository;
import com.booking_service.services.impl.BookingServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;

public class BookingServiceImplTest {

    private BookingRepository bookingRepository;
    private FlightSearchClient flightSearchClient;
    private FareClient fareClient;
    private BookingServiceImpl bookingService;

    @BeforeEach
    public void setup() {
        bookingRepository = mock(BookingRepository.class);
        flightSearchClient = mock(FlightSearchClient.class);
        fareClient = mock(FareClient.class);
        bookingService = new BookingServiceImpl(bookingRepository, flightSearchClient, fareClient);
    }

    @Test
    public void testCreateBooking_Success() {
        BookingRequest request = new BookingRequest();
        request.setFlightNumber("AI101");
        request.setFirstName("John");
        request.setLastName("Doe");
        request.setGender("Male");

        

       
        BookingResponse response = bookingService.createBooking(request);

        assertNotNull(response);
        assertEquals("AI101", response.getFlightNumber());
        verify(bookingRepository, times(1)).save(any(Booking.class));
    }

    @Test
    public void testUpdateCheckInStatus_Success() {
        Booking booking = new Booking();
        booking.setBookingReference("BK123456");
        booking.setCheckedIn(false);

        when(bookingRepository.findByBookingReference("BK123456")).thenReturn(booking);

        String message = bookingService.updateCheckInStatus("BK123456");

        assertTrue(booking.isCheckedIn());
        assertEquals(" Check-in status updated for: BK123456", message);
        verify(bookingRepository, times(1)).save(booking);
    }
}