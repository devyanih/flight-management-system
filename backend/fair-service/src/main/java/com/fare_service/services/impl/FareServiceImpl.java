package com.fare_service.services.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fare_service.model.Fare;
import com.fare_service.repository.FareRepository;
import com.fare_service.services.FareService;
import com.fare_service.exception.FareNotFoundException;

@Service
public class FareServiceImpl implements FareService {

    private final FareRepository fareRepository;

    public FareServiceImpl(FareRepository fareRepository) {
        this.fareRepository = fareRepository;
    }

    @Override
    public Fare getFareByFlightNumber(String flightNumber) {
        return fareRepository.findByFlightNumber(flightNumber);
    }

    @Override
    public Fare saveFare(Fare fare) {
        return fareRepository.save(fare);
    }

    @Override
    public Fare updateFare(String flightNumber, Fare fareDetails) {
        Fare existingFare = fareRepository.findByFlightNumber(flightNumber);
        if (existingFare == null) {
            throw new FareNotFoundException("Fare not found for flight number: " + flightNumber);
        }
        existingFare.setFare(fareDetails.getFare());  // update price only
        return fareRepository.save(existingFare);
    }


    @Override
    public void deleteFare(String flightNumber) {
        Fare existingFare = fareRepository.findByFlightNumber(flightNumber);
        if (existingFare == null) {
            throw new FareNotFoundException("Fare not found for flight number: " + flightNumber);
        }
        fareRepository.delete(existingFare);
    }
    @Override
    public List<Fare> getAllFares() {
        return fareRepository.findAll();
    }
}
