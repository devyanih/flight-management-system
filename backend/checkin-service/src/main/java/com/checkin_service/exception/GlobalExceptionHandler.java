package com.checkin_service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {
//handle CheckInFailedException
	@ExceptionHandler(CheckInFailedException.class)
	public ResponseEntity<ErrorResponse> handleCheckInFailed(CheckInFailedException ex, WebRequest request) {
		ErrorResponse error = new ErrorResponse(ex.getMessage(), request.getDescription(false));
		return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	 @ExceptionHandler(Exception.class)
	    public ResponseEntity<ErrorResponse> handleAll(Exception ex, WebRequest request) {
	        ErrorResponse error = new ErrorResponse(
	                "Unexpected error occurred",
	                request.getDescription(false)
	        );
	        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
}
