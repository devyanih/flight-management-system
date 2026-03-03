package com.flight_search_service.services;

import java.util.List;

import com.flight_search_service.dto.FlightDTO;
import com.flight_search_service.model.Flight;

public interface FlightService {
    List<FlightDTO> searchFlights(String from, String to, String date);
    FlightDTO getFlightByNumber(String flightNumber);
    Flight saveFlight(Flight flight);
    Flight updateFlight(String flightNumber, Flight updatedFlight);
    void deleteFlight(String flightNumber);

}