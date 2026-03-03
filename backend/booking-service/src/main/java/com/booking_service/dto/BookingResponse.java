package com.booking_service.dto;


import java.util.Date;

public class BookingResponse {

    private String bookingReference;
    private String status;
    private String firstName;
    private String lastName;
    private String gender;
    private String flightNumber;
    private Date flightDate;
    private double fare;

    public BookingResponse() {}

    public BookingResponse(String bookingReference, String status, String firstName, String lastName,
                           String gender, String flightNumber, Date flightDate, double fare) {
        this.bookingReference = bookingReference;
        this.status = status;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.flightNumber = flightNumber;
        this.flightDate = flightDate;
        this.fare = fare;
    }

    // Getters and Setters
    // (generate them manually or with Lombok)

    public String getBookingReference() {
        return bookingReference;
    }

    public void setBookingReference(String bookingReference) {
        this.bookingReference = bookingReference;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public Date getFlightDate() {
        return flightDate;
    }

    public void setFlightDate(Date flightDate) {
        this.flightDate = flightDate;
    }

    public double getFare() {
        return fare;
    }

    public void setFare(double fare) {
        this.fare = fare;
    }
}

