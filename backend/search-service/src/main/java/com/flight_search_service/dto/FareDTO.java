package com.flight_search_service.dto;




public class FareDTO {
    private String flightNumber;
    private double fare;

    public FareDTO() {}
    public FareDTO(String flightNumber, double fare) {
        this.flightNumber = flightNumber;
        this.fare = fare;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public double getFare() {
        return fare;
    }

    public void setFare(double fare) {
        this.fare = fare;
    }
}



