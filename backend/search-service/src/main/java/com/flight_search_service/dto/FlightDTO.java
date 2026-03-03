package com.flight_search_service.dto;

public class FlightDTO {
    private String flightNumber;
    private String travellingFrom;
    private String goingTo;
    private String date;
    private double fare; // include fare

    // Constructor
    public FlightDTO(String flightNumber, String travellingFrom, String goingTo, String date, double fare) {
        this.flightNumber = flightNumber;
        this.travellingFrom = travellingFrom;
        this.goingTo = goingTo;
        this.date = date;
        this.fare = fare;
    }

    // Getters and setters
    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getTravellingFrom() {
        return travellingFrom;
    }

    public void setTravellingFrom(String travellingFrom) {
        this.travellingFrom = travellingFrom;
    }

    public String getGoingTo() {
        return goingTo;
    }

    public void setGoingTo(String goingTo) {
        this.goingTo = goingTo;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getFare() {
        return fare;
    }

    public void setFare(double fare) {
        this.fare = fare;
    }

}
