
// updated code
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const SearchFlight = () => {
  const navigate = useNavigate();
  const [travellingFrom, setTravellingFrom] = useState("");
  const [goingTo, setGoingTo] = useState("");
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to search for flights.");
      return;
    }

    if (!travellingFrom || !goingTo || !date) {
      setError("Please fill all search fields");
      return;
    }

    setIsSearching(true);
    setError("");

    try {
      const flightResponse = await axios.get(
        "http://localhost:8085/flights/search",
        {
          params: { travellingFrom, goingTo, date },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const flightsWithFare = await Promise.all(
        flightResponse.data.map(async (flight) => {
          try {
            const fareResponse = await axios.get(
              `http://localhost:8085/api/fares/${flight.flightNumber}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            return { ...flight, price: fareResponse.data.fare };
          } catch (err) {
            console.error(
              `Failed to fetch fare for ${flight.flightNumber}`,
              err
            );
            return { ...flight, price: "N/A" };
          }
        })
      );

      setFlights(flightsWithFare);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to search flights");
      setFlights([]);
    } finally {
      setIsSearching(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h2 className="mb-0">
              <i className="bi bi-search me-2"></i>Find Your Flight
            </h2>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">From</label>
                <input
                  type="text"
                  className="form-control"
                  value={travellingFrom}
                  onChange={(e) => setTravellingFrom(e.target.value)}
                  placeholder="City or Airport"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">To</label>
                <input
                  type="text"
                  className="form-control"
                  value={goingTo}
                  onChange={(e) => setGoingTo(e.target.value)}
                  placeholder="City or Airport"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  min={today}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            <div className="d-grid gap-2 mt-3">
              <button
                className="btn btn-primary"
                onClick={handleSearch}
                disabled={isSearching}
              >
                {isSearching ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Searching...
                  </>
                ) : (
                  "Search Flights"
                )}
              </button>
            </div>

            {error && (
              <div className="alert alert-danger mt-3">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            )}
          </div>
        </div>

        {flights.length > 0 && (
          <div className="card shadow-sm mt-4">
            <div className="card-header bg-light">
              <h4 className="mb-0">
                <i className="bi bi-airplane me-2"></i>Available Flights
              </h4>
            </div>
            <div className="card-body">
              <div className="row row-cols-1 row-cols-md-2 g-4">
                {flights.map((flight, index) => (
                  <div key={index} className="col">
                    <div className="card h-100 border-primary">
                      <div className="card-header bg-primary text-white">
                        <h5 className="card-title mb-0">
                          Flight {flight.flightNumber}
                        </h5>
                      </div>
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <div>
                            <h6 className="text-muted">From</h6>
                            <p className="h5">{flight.travellingFrom}</p>
                          </div>
                          <div className="text-center">
                            <i className="bi bi-arrow-right h4"></i>
                          </div>
                          <div>
                            <h6 className="text-muted">To</h6>
                            <p className="h5">{flight.goingTo}</p>
                          </div>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between">
                          <div>
                            <h6 className="text-muted">Date</h6>
                            <p>{flight.date}</p>
                          </div>
                          <div>
                            <h6 className="text-muted">Fare</h6>
                            <p className="h5 text-success">₹{flight.price}</p>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer bg-transparent">
                        <button
                          className="btn btn-primary w-100"
                          onClick={() =>
                            navigate(
                              `/user/dashboard/book-flight/${flight.flightNumber}`,
                              { state: { flight } }
                            )
                          }
                        >
                          <i className="bi bi-ticket-perforated me-2"></i>Book
                          Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchFlight;
