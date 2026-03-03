package com.checkin_service.services;

import com.checkin_service.dto.CheckInResponse;

public interface CheckInService {
    CheckInResponse performCheckIn(String bookingReference);
}


