

import React, { useState } from "react";
import axios from "axios";
import OwnerNavbar from "../components/OwnerNavbar";

const ManageFlight = () => {
  const [flightNumber, setFlightNumber] = useState("");
  const [travellingFrom, setTravellingFrom] = useState("");
  const [goingTo, setGoingTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingFlight, setEditingFlight] = useState(null);
  const [editedFlightData, setEditedFlightData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch flights function
  const fetchFlights = async () => {
    if (!travellingFrom || !goingTo || !date) {
      setError("All fields are required to search flights");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8085/flights/search", {
        headers: { Authorization: `Bearer ${token}` },
        params: { travellingFrom, goingTo, date },
      });
      setFlights(response.data);
      setError("");
      setSuccess(`Found ${response.data.length} flights`);
    } catch (err) {
      setError(err.response?.data?.message || "No flights found");
      setFlights([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Add flight function
  const addFlight = async () => {
    if (!flightNumber || !travellingFrom || !goingTo || !date || !time) {
      setError("All fields are required to add flight");
      return;
    }

    setIsLoading(true);
    try {
      const newFlight = { flightNumber, travellingFrom, goingTo, date, time };
      await axios.post("http://localhost:8085/flights", newFlight, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFlights([...flights, newFlight]);
      setFlightNumber("");
      setTravellingFrom("");
      setGoingTo("");
      setDate("");
      setTime("");
      setError("");
      setSuccess("Flight added successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add flight");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete flight function
  const deleteFlight = async (flightNumber) => {
    if (!window.confirm("Are you sure you want to delete this flight?")) return;

    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:8085/flights/${flightNumber}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFlights(
        flights.filter((flight) => flight.flightNumber !== flightNumber)
      );
      setError("");
      setSuccess("Flight deleted successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete flight");
    } finally {
      setIsLoading(false);
    }
  };

  // Edit handlers
  const startEditing = (flight) => {
    setEditingFlight(flight.flightNumber);
    setEditedFlightData({ ...flight });
  };

  const cancelEditing = () => {
    setEditingFlight(null);
    setEditedFlightData({});
  };

  const saveEdit = async () => {
    setIsLoading(true);
    try {
      await axios.put(
        `http://localhost:8085/flights/${editingFlight}`,
        editedFlightData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFlights(
        flights.map((flight) =>
          flight.flightNumber === editingFlight ? editedFlightData : flight
        )
      );
      setEditingFlight(null);
      setEditedFlightData({});
      setError("");
      setSuccess("Flight updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update flight");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditChange = (field, value) => {
    setEditedFlightData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <OwnerNavbar />
      <div className="container mt-4">
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">
            <h2 className="mb-0">
              <i className="bi bi-airplane me-2"></i>Manage Flights
            </h2>
          </div>

          <div className="card-body">
            {/* Add Flight Form */}
            <div className="card mb-4">
              <div className="card-header bg-light">
                <h4 className="mb-0">
                  <i className="bi bi-plus-circle me-2"></i>Add New Flight
                </h4>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-2">
                    <label className="form-label">Flight Number*</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="FL123"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">From*</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Origin"
                      value={travellingFrom}
                      onChange={(e) => setTravellingFrom(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">To*</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Destination"
                      value={goingTo}
                      onChange={(e) => setGoingTo(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Date*</label>
                    <input
                      type="date"
                      className="form-control"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Time*</label>
                    <input
                      type="time"
                      className="form-control"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button
                    className="btn btn-primary"
                    onClick={addFlight}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="spinner-border spinner-border-sm me-2"></span>
                    ) : (
                      <i className="bi bi-save me-2"></i>
                    )}
                    Add Flight
                  </button>
                </div>
              </div>
            </div>

            {/* Search Flights */}
            <div className="card mb-4">
              <div className="card-header bg-light">
                <h4 className="mb-0">
                  <i className="bi bi-search me-2"></i>Search Flights
                </h4>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">From</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Origin"
                      value={travellingFrom}
                      onChange={(e) => setTravellingFrom(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">To</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Destination"
                      value={goingTo}
                      onChange={(e) => setGoingTo(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button
                    className="btn btn-outline-primary"
                    onClick={fetchFlights}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="spinner-border spinner-border-sm me-2"></span>
                    ) : (
                      <i className="bi bi-search me-2"></i>
                    )}
                    Search Flights
                  </button>
                </div>
              </div>
            </div>

            {/* Status Messages */}
            {error && (
              <div className="alert alert-danger">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success">
                <i className="bi bi-check-circle-fill me-2"></i>
                {success}
              </div>
            )}

            {/* Flights Table */}
            {flights.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Flight Number</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flights.map((flight) => (
                      <tr key={flight.flightNumber}>
                        <td className="fw-bold">{flight.flightNumber}</td>
                        <td>
                          {editingFlight === flight.flightNumber ? (
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={editedFlightData.travellingFrom}
                              onChange={(e) =>
                                handleEditChange(
                                  "travellingFrom",
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            flight.travellingFrom
                          )}
                        </td>
                        <td>
                          {editingFlight === flight.flightNumber ? (
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={editedFlightData.goingTo}
                              onChange={(e) =>
                                handleEditChange("goingTo", e.target.value)
                              }
                            />
                          ) : (
                            flight.goingTo
                          )}
                        </td>
                        <td>
                          {editingFlight === flight.flightNumber ? (
                            <input
                              type="date"
                              className="form-control form-control-sm"
                              value={editedFlightData.date}
                              onChange={(e) =>
                                handleEditChange("date", e.target.value)
                              }
                            />
                          ) : (
                            new Date(flight.date).toLocaleDateString()
                          )}
                        </td>
                        <td>
                          {editingFlight === flight.flightNumber ? (
                            <input
                              type="time"
                              className="form-control form-control-sm"
                              value={editedFlightData.time}
                              onChange={(e) =>
                                handleEditChange("time", e.target.value)
                              }
                            />
                          ) : (
                            flight.time
                          )}
                        </td>
                        <td>
                          {editingFlight === flight.flightNumber ? (
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-success"
                                onClick={saveEdit}
                                disabled={isLoading}
                              >
                                <i className="bi bi-check-lg"></i> Save
                              </button>
                              <button
                                className="btn btn-sm btn-secondary"
                                onClick={cancelEditing}
                              >
                                <i className="bi bi-x-lg"></i> Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => startEditing(flight)}
                              >
                                <i className="bi bi-pencil"></i> Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  deleteFlight(flight.flightNumber)
                                }
                                disabled={isLoading}
                              >
                                <i className="bi bi-trash"></i> Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              !error && (
                <div className="text-center py-5 bg-light rounded">
                  <i className="bi bi-airplane fs-1 text-muted"></i>
                  <h4 className="mt-3">No flights found</h4>
                  <p>Add a new flight or try a different search</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageFlight;
