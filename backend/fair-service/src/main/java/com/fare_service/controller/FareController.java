package com.fare_service.controller;


import org.springframework.web.bind.annotation.*;

import com.fare_service.exception.FareNotFoundException;
import com.fare_service.model.Fare;
import com.fare_service.services.FareService;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/fares")
@Tag(name = "Fare API", description = "Operations related to flight fare data")
public class FareController {

	private static final Logger logger = LoggerFactory.getLogger(FareController.class);
	private final FareService fareService;

	public FareController(FareService fareService) {
		this.fareService = fareService;
	}

	@GetMapping("/{flightNumber}")
	public Fare getFare(@PathVariable String flightNumber) {
		logger.info("Fetching fare for flight number: {}", flightNumber);
		Fare fare = fareService.getFareByFlightNumber(flightNumber);
		if (fare == null) {
			logger.error("Fare not found for flight number: {}", flightNumber);
			throw new FareNotFoundException("Fare not found for flight number: " + flightNumber);
		}
		return fare;
	}

	@PostMapping
	public Fare addFare(@Valid @RequestBody Fare fare) {
		logger.info("Adding new fare: {}", fare);
		return fareService.saveFare(fare);
	}

	@PutMapping("/{flightNumber}")
	public Fare updateFare(@PathVariable String flightNumber, @Valid @RequestBody Fare fareDetails) {
		logger.info("Updating fare for flight number: {}", flightNumber);
		return fareService.updateFare(flightNumber, fareDetails);
	}

	@DeleteMapping("/{flightNumber}")
	public void deleteFare(@PathVariable String flightNumber) {
		logger.info("Deleting fare for flight number: {}", flightNumber);
		fareService.deleteFare(flightNumber);
	}
	@GetMapping
	public List<Fare> getAllFares() {
	    logger.info("Fetching all fares");
	    return fareService.getAllFares();
	}
}
