# Flight Management System

A full-stack Flight Booking System built using Spring Boot (Microservices Architecture) and React (Vite).

This project simulates a real-world airline management system where users can search and book flights, and owners can manage flights and fares.  
The backend is designed using Spring Cloud components with proper service communication and centralized routing.

---

## Architecture Overview

The backend follows a Microservices Architecture pattern.

### Core Services

- **Service Registry (Eureka)** – Handles service discovery  
- **API Gateway** – Centralized routing for all client requests  
- **Flight Search Service** – Search available flights  
- **Booking Service** – Book and manage flight reservations  
- **Fare Service** – Manage flight pricing  
- **Check-In Service** – Handle passenger check-in  
- **Authentication & Role-based Access** – User and Owner roles  

The frontend is built using React (Vite) and communicates with backend APIs via Axios.

---

## Tech Stack

### Backend
- Java  
- Spring Boot  
- Spring Cloud  
- Eureka Server  
- OpenFeign  
- MySQL  
- Maven  
- REST APIs  

### Frontend
- React (Vite)  
- React Router  
- Axios  
- CSS  

### Tools & Utilities
- Git & GitHub  
- Postman  
- IntelliJ IDEA  
- VS Code  

---

## Project Structure

flight-management-system
│
├── backend
│ ├── service-registry
│ ├── api-gateway
│ ├── search-service
│ ├── booking-service
│ ├── fare-service
│ └── checkin-service
│
└── frontend
├── src
├── public
└── package.json

---

## Features

- User Registration & Login  
- Role-based Dashboard (User / Owner)  
- Search Flights  
- Book Flights  
- Cancel Booking  
- Manage Flights (Owner)  
- Manage Fare (Owner)  
- Passenger Check-In  
- View Bookings  
- Inter-service communication using OpenFeign  

---

## Key Learnings

- Implemented Microservices Architecture using Spring Cloud  
- Service Discovery using Eureka  
- Centralized API routing using API Gateway  
- Inter-service communication using OpenFeign  
- Global Exception Handling and Validation  
- Role-based Access Control  
- Full-stack integration between Spring Boot and React  
