package com.flight_search_service;

import com.flight_search_service.client.FareClient;
import com.flight_search_service.dto.FareDTO;
import com.flight_search_service.dto.FlightDTO;
import com.flight_search_service.exception.FlightNotFoundException;
import com.flight_search_service.model.Flight;
import com.flight_search_service.repository.FlightRepository;
import com.flight_search_service.services.impl.FlightServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class FlightServiceImplTest {

    private FlightRepository flightRepository;
    private FareClient fareClient;
    private FlightServiceImpl flightService;

    @BeforeEach
    void setUp() {
        flightRepository = mock(FlightRepository.class);
        fareClient = mock(FareClient.class);
        flightService = new FlightServiceImpl(flightRepository, fareClient);
    }

    @Test
    void testSearchFlights_Success() {
        Flight flight = new Flight("AI101", "Delhi", "Mumbai", "2025-04-20");
        FareDTO fareDTO = new FareDTO("AI101", 3000.0);

        when(flightRepository.findByTravellingFromAndGoingToAndDate("Delhi", "Mumbai", "2025-04-20"))
                .thenReturn(List.of(flight));
        when(fareClient.getFare("AI101")).thenReturn(fareDTO);

        List<FlightDTO> result = flightService.searchFlights("Delhi", "Mumbai", "2025-04-20");

        assertEquals(1, result.size());
        assertEquals("AI101", result.get(0).getFlightNumber());
    }

    @Test
    void testSearchFlights_FlightNotFound() {
        when(flightRepository.findByTravellingFromAndGoingToAndDate("X", "Y", "2025-01-01"))
                .thenReturn(List.of());

        assertThrows(FlightNotFoundException.class, () ->
                flightService.searchFlights("X", "Y", "2025-01-01"));
    }
}
