package com.booking_service.client;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.booking_service.dto.Fare;

//@FeignClient(name = "fare-service", url = "http://localhost:8085")
//@FeignClient(name = "fare-service", url = "http://localhost:8082")
@FeignClient(name = "fare-service")
public interface FareClient {
    @GetMapping("/api/fares/{flightNumber}")
    Fare getFare(@PathVariable("flightNumber") String flightNumber);
}


