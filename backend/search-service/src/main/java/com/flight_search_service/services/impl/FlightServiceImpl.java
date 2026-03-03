package com.flight_search_service.services.impl;

import org.springframework.stereotype.Service;

import com.flight_search_service.client.FareClient;
import com.flight_search_service.dto.FareDTO;
import com.flight_search_service.dto.FlightDTO;
import com.flight_search_service.exception.FareNotFoundException;
import com.flight_search_service.exception.FlightNotFoundException;
import com.flight_search_service.model.Flight;
import com.flight_search_service.repository.FlightRepository;
import com.flight_search_service.services.FlightService;

import java.util.ArrayList;
import java.util.List;

@Service
public class FlightServiceImpl implements FlightService{

    private final FlightRepository flightRepository;
    private final FareClient fareClient;

    public FlightServiceImpl(FlightRepository flightRepository, FareClient fareClient) {
        this.flightRepository = flightRepository;
        this.fareClient = fareClient;
    }

    public List<FlightDTO> searchFlights(String from, String to, String date) {
        List<Flight> flights = flightRepository.findByTravellingFromAndGoingToAndDate(from, to, date);
        if (flights.isEmpty()) {
            throw new FlightNotFoundException("No flights found from " + from + " to " + to + " on " + date);
        }
        List<FlightDTO> flightDTOs = new ArrayList<>();

        for (Flight flight : flights) {
            FareDTO fare = fareClient.getFare(flight.getFlightNumber());
            
            FlightDTO dto = new FlightDTO(
                    flight.getFlightNumber(),
                    flight.getTravellingFrom(),
                    flight.getGoingTo(),
                    flight.getDate(),
                    fare.getFare()
            );
            flightDTOs.add(dto);
        }

        return flightDTOs;
    }

    public FlightDTO getFlightByNumber(String flightNumber) {
        Flight flight = flightRepository.findByFlightNumber(flightNumber);
        if (flight == null) {
            throw new FlightNotFoundException("Flight with number " + flightNumber + " not found.");
        }

        FareDTO fare = fareClient.getFare(flightNumber);
        if (fare == null) {
            throw new FareNotFoundException("Fare not found for flight " + flightNumber);
        }
        return new FlightDTO(
                flight.getFlightNumber(),
                flight.getTravellingFrom(),
                flight.getGoingTo(),
                flight.getDate(),
                fare.getFare()
        );
    }
    @Override
    public Flight updateFlight(String flightNumber, Flight updatedFlight) {
        Flight existingFlight = flightRepository.findByFlightNumber(flightNumber);
        if (existingFlight == null) {
            throw new FlightNotFoundException("Flight with number " + flightNumber + " not found.");
        }

        existingFlight.setTravellingFrom(updatedFlight.getTravellingFrom());
        existingFlight.setGoingTo(updatedFlight.getGoingTo());
        existingFlight.setDate(updatedFlight.getDate());

        return flightRepository.save(existingFlight);
    }

    @Override
    public void deleteFlight(String flightNumber) {
        Flight existingFlight = flightRepository.findByFlightNumber(flightNumber);
        if (existingFlight == null) {
            throw new FlightNotFoundException("Flight with number " + flightNumber + " not found.");
        }

        flightRepository.delete(existingFlight);
    }


    public Flight saveFlight(Flight flight) {
        return flightRepository.save(flight);
    }
}


