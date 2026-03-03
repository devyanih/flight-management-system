package com.fare_service.services;

import java.util.List;

import com.fare_service.model.Fare;

public interface FareService {
    Fare getFareByFlightNumber(String flightNumber);
    Fare saveFare(Fare fare);

    Fare updateFare(String flightNumber, Fare fareDetails);
    void deleteFare(String flightNumber);
    List<Fare> getAllFares();
}
