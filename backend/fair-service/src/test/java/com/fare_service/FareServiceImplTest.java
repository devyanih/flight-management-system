package com.fare_service;

import com.fare_service.model.Fare;
import com.fare_service.repository.FareRepository;
import com.fare_service.services.impl.FareServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class FareServiceImplTest {

    private FareRepository fareRepository;
    private FareServiceImpl fareService;

    @BeforeEach
    void setUp() {
        fareRepository = mock(FareRepository.class);
        fareService = new FareServiceImpl(fareRepository);
    }

    @Test
    void testGetFareByFlightNumber() {
        Fare fare = new Fare("AI101", 3000.0);
        when(fareRepository.findByFlightNumber("AI101")).thenReturn(fare);

        Fare result = fareService.getFareByFlightNumber("AI101");

        assertNotNull(result);
        assertEquals("AI101", result.getFlightNumber());
    }

    @Test
    void testSaveFare() {
        Fare fare = new Fare("AI102", 3500.0);
        when(fareRepository.save(fare)).thenReturn(fare);

        Fare saved = fareService.saveFare(fare);

        assertNotNull(saved);
        assertEquals(3500.0, saved.getFare());
    }
}
