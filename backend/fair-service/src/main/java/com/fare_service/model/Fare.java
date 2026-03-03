package com.fare_service.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.DecimalMin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class Fare {
	@Id
	@NotBlank(message = "Flight number is mandatory")
	private String flightNumber;
	@NotNull(message = "Price cannot be null")
	@DecimalMin(value = "1.0", message = "Price must be at least 1.0")

	private double fare;

	public Fare() {
	}

	public Fare(String flightNumber, double fare) {
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
