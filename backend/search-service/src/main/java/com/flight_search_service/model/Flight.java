package com.flight_search_service.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Entity
public class Flight {

    @Id
    @NotBlank(message = "Flight number must not be blank")
    private String flightNumber;

    @NotBlank(message = "Travelling from field must not be blank")
    private String travellingFrom;
    
    @NotBlank(message = "Going to field must not be blank")
    private String goingTo;
    
    @NotBlank(message = "Date is required")
    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "Date must be in the format YYYY-MM-DD")
    private String date;

    // Constructors
    public Flight() {
    }

    public Flight(String flightNumber, String travellingFrom, String goingTo, String date) {
        this.flightNumber = flightNumber;
        this.travellingFrom = travellingFrom;
        this.goingTo = goingTo;
        this.date = date;
    }

    // Getters and Setters
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
}
