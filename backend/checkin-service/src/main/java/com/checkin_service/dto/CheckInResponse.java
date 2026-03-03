package com.checkin_service.dto;



public class CheckInResponse {
    private String message;
    private String seatNumber;
    private String checkInId;

    public CheckInResponse(String message, String seatNumber, String checkInId) {
        this.message = message;
        this.seatNumber = seatNumber;
        this.checkInId = checkInId;
    }

    // Getters and Setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public String getCheckInId() {
        return checkInId;
    }

    public void setCheckInId(String checkInId) {
        this.checkInId = checkInId;
    }
}
