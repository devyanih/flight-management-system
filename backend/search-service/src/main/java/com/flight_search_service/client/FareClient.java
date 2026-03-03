package com.flight_search_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.flight_search_service.dto.FareDTO;

@FeignClient(name = "fare-service")

public interface FareClient {

	@GetMapping("/api/fares/{flightNumber}")
	FareDTO getFare(@PathVariable String flightNumber);
}
