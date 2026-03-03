import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; 
import Navbar from "../components/Navbar";

const BookFlight = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const flight = state?.flight;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "Male",
    passengers: 1,
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (bookingResponse) => {
    try {
      const name = `${formData.firstName} ${formData.lastName}`;
      const amount = flight.price * formData.passengers;

      const paymentResponse = await fetch(
        "http://localhost:8088/api/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ name, amount }),
        }
      );

      const paymentData = await paymentResponse.json();

      const options = {
        key: paymentData.razorpayKey,
        amount: paymentData.amount * 100,
        currency: "INR",
        name: "Flight Booking System",
        description: `Flight ${flight.flightNumber}`,
        order_id: paymentData.razorpayOrderId,
        handler: function (response) {
          setSuccessMsg(
            `Booking successful! Reference: ${bookingResponse.data.bookingReference}`
          );
        },
        modal: {
          ondismiss: () => setErrorMsg("Payment cancelled. Please try again."),
        },
        prefill: {
          name: name,
          email: localStorage.getItem("email") || "",
        },
        theme: { color: "#003366" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      setErrorMsg("Payment initialization failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName) {
      setErrorMsg("Please fill all required fields");
      return;
    }

    try {
      setIsProcessing(true);
      setErrorMsg("");
      setSuccessMsg("");

      const response = await axios.post(
        "http://localhost:8085/bookings",
        {
          ...formData,
          fare: flight.price * formData.passengers,
          flightDate: flight.date,
          flightNumber: flight.flightNumber,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      await handlePayment(response);
    } catch (error) {
      console.error(error);
      setErrorMsg(
        error.response?.data?.message || "Booking failed. Please try again."
      );
    }
  };

  if (!flight) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          No flight selected. Please go back and search again.
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">
              <i className="bi bi-ticket-perforated me-2"></i>
              Book Flight: {flight.flightNumber}
            </h3>
          </div>
          <div className="card-body">
            <div className="alert alert-info">
              <strong>Route:</strong> {flight.travellingFrom} → {flight.goingTo}{" "}
              |<strong> Date:</strong> {flight.date} |<strong> Fare:</strong> ₹
              {flight.price} per passenger
            </div>

            <form onSubmit={handleBooking}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">First Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Gender</label>
                  <select
                    className="form-select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="d-grid gap-2 mt-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-credit-card me-2"></i>
                      Confirm Booking & Pay ₹
                      {flight.price * formData.passengers}
                    </>
                  )}
                </button>
              </div>
            </form>

            {successMsg && (
              <div className="alert alert-success mt-3">
                <i className="bi bi-check-circle-fill me-2"></i>
                {successMsg}
                <div className="d-grid gap-2 mt-2">
                  <button
                    className="btn btn-outline-success"
                    onClick={() => navigate("/user/dashboard/check-in")}
                  >
                    <i className="bi bi-qr-code me-2"></i>Go to Check-In
                  </button>
                </div>
              </div>
            )}
            {errorMsg && (
              <div className="alert alert-danger mt-3">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {errorMsg}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookFlight;
