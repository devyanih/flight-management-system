import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import OwnerNavbar from "../components/OwnerNavbar";
import { Spinner, Alert, Card, Badge } from "react-bootstrap";

function OwnerDashboard() {
  const [ownerInfo, setOwnerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ flights: 0, bookings: 0, revenue: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const infoResponse = await axios.get("/owner/info");
        setOwnerInfo(infoResponse.data);

        const statsResponse = await axios.get("/owner/dashboard-stats");
        setStats(statsResponse.data);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNavigation = (path) => {
    navigate(`/owner/dashboard/${path}`);
  };

  if (loading) {
    return (
      <>
        <OwnerNavbar />
        <div className="container mt-4">
          <div className="d-flex justify-content-center my-5">
            <Spinner animation="border" variant="primary" />
            <span className="ms-3 align-self-center">Loading dashboard...</span>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <OwnerNavbar />
        <div className="container mt-4">
          <Alert variant="danger" className="text-center">
            {error}
            <button
              className="btn btn-sm btn-outline-danger ms-3"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </Alert>
        </div>
      </>
    );
  }

  return (
    <>
      <OwnerNavbar />
      <div className="container mt-4">
        <Card className="shadow-sm mb-4 border-0 bg-primary bg-opacity-10">
          <Card.Body className="py-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-1">Welcome back !</h4>
                <p className="mb-0 text-muted">
                  Last login: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-sm mb-4">
          <Card.Header className="bg-white">
            <h5 className="mb-0">Quick Actions</h5>
          </Card.Header>
          <Card.Body>
            <div className="row g-3">
              <div className="col-md-4">
                <button
                  className="btn btn-outline-primary w-100 py-3 d-flex flex-column align-items-center"
                  onClick={() => handleNavigation("manage-flights")}
                >
                  <span className="display-4 mb-2">✈️</span>
                  <span>Manage Flights</span>
                </button>
              </div>
              <div className="col-md-4">
                <button
                  className="btn btn-outline-success w-100 py-3 d-flex flex-column align-items-center"
                  onClick={() => handleNavigation("manage-fare")}
                >
                  <span className="display-4 mb-2">💵</span>
                  <span>Manage Fares</span>
                </button>
              </div>
              <div className="col-md-4">
                <button
                  className="btn btn-outline-info w-100 py-3 d-flex flex-column align-items-center"
                  onClick={() => handleNavigation("bookings")}
                >
                  <span className="display-4 mb-2">📈</span>
                  <span>View Bookings</span>
                </button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default OwnerDashboard;
