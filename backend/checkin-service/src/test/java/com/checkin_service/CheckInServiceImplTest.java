package com.checkin_service;



import com.checkin_service.client.BookingClient;
import com.checkin_service.dto.CheckInResponse;
import com.checkin_service.exception.CheckInFailedException;
import com.checkin_service.model.CheckIn;
import com.checkin_service.repository.CheckInRepository;
import com.checkin_service.services.impl.CheckInServiceImpl;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class CheckInServiceImplTest {

    @Mock
    BookingClient bookingClient;

    @Mock
    CheckInRepository checkInRepository;

    @InjectMocks
    CheckInServiceImpl checkInService;

    public CheckInServiceImplTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testPerformCheckIn_Success() {
        String ref = "REF001";

        doNothing().when(bookingClient).updateCheckInStatus(ref);
        when(checkInRepository.save(any())).thenReturn(new CheckIn());

        CheckInResponse response = checkInService.performCheckIn(ref);

        assertNotNull(response);
        assertEquals(" Checked in successfully", response.getMessage());
    }

    @Test
    void testPerformCheckIn_Failure() {
        String ref = "FAIL001";

        doThrow(new RuntimeException()).when(bookingClient).updateCheckInStatus(ref);

        assertThrows(CheckInFailedException.class, () -> checkInService.performCheckIn(ref));
    }
}
