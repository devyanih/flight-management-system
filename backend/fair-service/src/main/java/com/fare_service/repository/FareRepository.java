package com.fare_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fare_service.model.Fare;

public interface FareRepository extends JpaRepository<Fare, String> {
    Fare findByFlightNumber(String flightNumber);
}

