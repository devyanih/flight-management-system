package com.checkin_service.services.impl;



import org.springframework.stereotype.Service;

import com.checkin_service.client.BookingClient;
import com.checkin_service.dto.CheckInResponse;
import com.checkin_service.exception.CheckInFailedException;
import com.checkin_service.model.CheckIn;
import com.checkin_service.repository.CheckInRepository;
import com.checkin_service.services.CheckInService;

import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
public class CheckInServiceImpl implements CheckInService {

    private static final Logger logger = LoggerFactory.getLogger(CheckInServiceImpl.class);
    private final BookingClient bookingClient;
    private final CheckInRepository checkInRepository;

    public CheckInServiceImpl(BookingClient bookingClient, CheckInRepository checkInRepository) {
        this.bookingClient = bookingClient;
        this.checkInRepository = checkInRepository;
    }

    @Override
    public CheckInResponse performCheckIn(String bookingReference) {
    	try {
    		  logger.info("Initiating check-in for booking reference: {}", bookingReference);
        bookingClient.updateCheckInStatus(bookingReference);

        CheckIn checkIn = new CheckIn();
        checkIn.setSeatNumber("A" + (int)(Math.random() * 100));
        checkIn.setCheckInId(UUID.randomUUID().toString());

        checkInRepository.save(checkIn);
        logger.info("Check-in successful for booking reference: {}", bookingReference);
        return new CheckInResponse(" Checked in successfully", checkIn.getSeatNumber(), checkIn.getCheckInId());
    }
    catch(Exception e) {
    	 logger.error(" Check-in failed for booking reference: {}", bookingReference, e);
    	 throw new CheckInFailedException("Check-in failed. Please try again later.");
    }
    }
}

