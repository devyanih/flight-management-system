package com.booking_service.client;





import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.booking_service.dto.FlightDetails;

import java.util.List;

//@FeignClient(name = "flight-search-service", url = "http://localhost:8085")
//@FeignClient(name = "flight-search-service", url = "http://localhost:8081")
@FeignClient(name = "flight-search-service")

public interface FlightSearchClient  {
    @GetMapping("/flights/flights/{flightNumber}")
    FlightDetails getFlight(@PathVariable("flightNumber") String flightNumber);
}
