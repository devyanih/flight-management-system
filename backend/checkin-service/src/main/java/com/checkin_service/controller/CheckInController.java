package com.checkin_service.controller;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.web.bind.annotation.*;

import com.checkin_service.dto.CheckInResponse;
import com.checkin_service.services.CheckInService;

@RestController
@RequestMapping("/checkin")
public class CheckInController {
	private static final Logger logger = LoggerFactory.getLogger(CheckInController.class);


    private final CheckInService checkInService;

    public CheckInController(CheckInService checkInService) {
        this.checkInService = checkInService;
    }

    @PostMapping("/{bookingReference}")
    public CheckInResponse checkIn(@PathVariable String bookingReference) {
    	logger.info("Received check-in request for booking reference: {}", bookingReference);

        return checkInService.performCheckIn(bookingReference);
    }
}




