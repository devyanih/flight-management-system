package com.checkin_service.model;




import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class CheckIn {

    @Id
    private String checkInId;


    private String seatNumber;

    // Getters and Setters

    public String getCheckInId() {
        return checkInId;
    }

    public void setCheckInId(String checkInId) {
        this.checkInId = checkInId;
    }



    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }
}

