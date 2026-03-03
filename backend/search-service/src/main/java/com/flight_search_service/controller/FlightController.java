package com.flight_search_service.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import com.flight_search_service.dto.FlightDTO;
import com.flight_search_service.model.Flight;
import com.flight_search_service.services.FlightService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/flights")
@Tag(name = "Flight-Search API", description = "Operations related to flight search data")
public class FlightController {

	private static final Logger logger=LoggerFactory.getLogger(FlightController.class);
    private final FlightService flightService;

    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @GetMapping("/search")
    public List<FlightDTO> searchFlights(@RequestParam(name = "travellingFrom") String from, @RequestParam(name = "goingTo") String to, @RequestParam String date) {
    	logger.info("Searching flights from {} to {} on {}",from,to,date);
        return flightService.searchFlights(from, to, date);
    }

    @PostMapping
    public Flight addFlight(@Valid @RequestBody Flight flight) {
    	logger.info("Adding new flight: {}", flight);
        return flightService.saveFlight(flight);
    }

    @GetMapping("/flights/{flightNumber}")
    public FlightDTO getFlightByNumber(@PathVariable String flightNumber) {
    	logger.info("Fetching flight with flightNumber: {}", flightNumber);
        return flightService.getFlightByNumber(flightNumber);
    }
    @PutMapping("/{flightNumber}")
    public Flight updateFlight(@PathVariable String flightNumber, @Valid @RequestBody Flight updatedFlight) {
        logger.info("Updating flight with number: {}", flightNumber);
        return flightService.updateFlight(flightNumber, updatedFlight);
    }

    @DeleteMapping("/{flightNumber}")
    public void deleteFlight(@PathVariable String flightNumber) {
        logger.info("Deleting flight with number: {}", flightNumber);
        flightService.deleteFlight(flightNumber);
    }


}



