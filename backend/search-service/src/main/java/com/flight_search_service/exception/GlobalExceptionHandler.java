package com.flight_search_service.exception;

import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.MethodArgumentNotValidException;

@RestControllerAdvice
public class GlobalExceptionHandler {

	// for FlightNotFoundException
	 @ExceptionHandler(FlightNotFoundException.class)
	    public ResponseEntity<ErrorResponse> handleFlightNotFound(FlightNotFoundException ex) {
	        // Create error response object
	        ErrorResponse errorResponse = new ErrorResponse("FLIGHT_NOT_FOUND", ex.getMessage());
	        // Return error response with 404 status
	        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
	    }
	 
	 //for FareNotFoundException
	 @ExceptionHandler(FareNotFoundException.class)
	    public ResponseEntity<ErrorResponse> handleFareNotFound(FareNotFoundException ex) {
	        // Create error response object
	        ErrorResponse errorResponse = new ErrorResponse("FARE_NOT_FOUND", ex.getMessage());
	        // Return error response with 404 status
	        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
	    }
	 //for validation
	 @ExceptionHandler(MethodArgumentNotValidException.class)
	    public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
	        // Collect all field error messages into one string
	        String errors = ex.getBindingResult().getFieldErrors()
	                .stream()
	                .map(FieldError::getDefaultMessage)
	                .collect(Collectors.joining(", "));
	        ErrorResponse errorResponse = new ErrorResponse("VALIDATION_ERROR", errors);
	        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
	    }
	 
	 @ExceptionHandler(Exception.class)
	    public ResponseEntity<ErrorResponse> handleException(Exception ex) {
	        // Create error response object for generic exceptions
	        ErrorResponse errorResponse = new ErrorResponse("INTERNAL_SERVER_ERROR", ex.getMessage());
	        // Return error response with 500 status
	        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
}
