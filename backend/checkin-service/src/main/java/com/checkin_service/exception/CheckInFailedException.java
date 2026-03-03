package com.checkin_service.exception;

public class CheckInFailedException extends RuntimeException {
    public CheckInFailedException(String message) {
        super(message);
    }
}
