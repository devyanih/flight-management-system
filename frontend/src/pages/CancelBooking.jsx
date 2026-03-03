import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
const CancelBooking = () => {
  const [bookingReference, setBookingReference] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "danger"

  const handleCancelBooking = async () => {
    if (!bookingReference) {
      setMessage("Please enter a booking reference.");
      setMessageType("danger");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("You are not logged in.");
        setMessageType("danger");
        return;
      }

      const response = await axios.delete(
        `http://localhost:8085/bookings/cancel/${bookingReference}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data);
      setMessageType("success");
      setBookingReference(""); // Clear the input on success
    } catch (error) {
      console.error("Cancel booking error:", error);
      setMessage(
        error.response?.data || "Failed to cancel booking. Try again."
      );
      setMessageType("danger");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-danger text-white">
                <h2 className="mb-0">Cancel Booking</h2>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="bookingReference">Booking Reference</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bookingReference"
                    placeholder="Enter Booking Reference"
                    value={bookingReference}
                    onChange={(e) => setBookingReference(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleCancelBooking}
                  className="btn btn-danger mt-3"
                >
                  Cancel Booking
                </button>
                {message && (
                  <div className={`alert alert-${messageType} mt-3`}>
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancelBooking;
