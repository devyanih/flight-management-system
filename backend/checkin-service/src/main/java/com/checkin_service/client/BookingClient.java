package com.checkin_service.client;



import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
//@FeignClient(name = "BOOKING-SERVICE", url = "http://localhost:8085" )
//@FeignClient(name = "BOOKING-SERVICE", url = "http://localhost:8083" )
@FeignClient(name = "BOOKING-SERVICE")

public interface BookingClient {

    @PutMapping("/bookings/updateCheckIn/{bookingReference}")
    void updateCheckInStatus(@PathVariable("bookingReference") String bookingReference);
}

