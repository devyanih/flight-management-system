package com.flight_search_service.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.flight_search_service.model.Flight;

import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, String> {
    List<Flight> findByTravellingFromAndGoingToAndDate(String travellingFrom, String goingTo, String date);
    Flight findByFlightNumber(String flightNumber);

}





