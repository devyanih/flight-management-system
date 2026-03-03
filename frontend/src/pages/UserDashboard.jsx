import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Airplane,
  Search,
  CheckCircle,
  TicketDetailed,
  PersonBadge,
  ClockHistory,
  Wallet,
  Headset,
} from "react-bootstrap-icons";
import {
  Container,
  Alert,
  Spinner,
  Card,
  Row,
  Col,
  Button,
  Badge,
} from "react-bootstrap";

function UserDashboard() {
  // State to store user information
  const [userInfo, setUserInfo] = useState(null);
   //  State for loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
// Fetch user data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/user/info");
        setUserInfo(response.data);

        // Fetch user stats
        const statsResponse = await axios.get("/user/stats");
        setStats(statsResponse.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load dashboard. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
// Checks if the user is on the default dashboard page
  const isDefaultPath = location.pathname === "/user/dashboard";
// Loading State: Show a spinner while data is being fetched
  if (loading) {
    return (
      <div>
        <Navbar />
        <Container className="mt-5 text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading your dashboard...</p>
        </Container>
      </div>
    );
  }

  //  Error State: Display an error message if fetching fails
  if (error) {
    return (
      <div>
        <Navbar />
        <Container className="mt-5">
          <Alert variant="danger" className="text-center">
            {error}
            <Button
              variant="outline-danger"
              className="ms-3"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Container className="mt-4">
        {userInfo && (
          <>
            <Row className="mb-4">
              <Col>
                <Card className="border-0 shadow-sm bg-primary bg-opacity-10">
                  <Card.Body className="py-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h2 className="mb-1">
                          <PersonBadge className="me-2" />
                          Welcome back! Ready for your next adventure?
                        </h2>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {isDefaultPath ? (
              <>
                <Row className="g-3 justify-content-center">
                  <Col xs={12} md={6} lg={4}>
                    <Button
                      variant="outline-primary"
                      className="w-100 py-3 d-flex flex-column align-items-center"
                      onClick={() => navigate("search-flight")}
                    >
                      <Search size={48} className="mb-2" />
                      <h5>Search Flights</h5>
                      <small className="text-muted">
                        Find your perfect flight
                      </small>
                    </Button>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    <Button
                      variant="outline-success"
                      className="w-100 py-3 d-flex flex-column align-items-center"
                      onClick={() => navigate("check-in")}
                    >
                      <CheckCircle size={48} className="mb-2" />
                      <h5>Online Check-In</h5>
                      <small className="text-muted">
                        Check in for your flight
                      </small>
                    </Button>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    <Button
                      variant="outline-info"
                      className="w-100 py-3 d-flex flex-column align-items-center"
                      onClick={() => navigate("cancel-booking")}
                    >
                      <TicketDetailed size={48} className="mb-2" />
                      <h5>Cancel Bookings</h5>
                      <small className="text-muted">
                         Cancel your bookings
                      </small>
                    </Button>
                  </Col>
                 
                  <Col xs={12} md={6} lg={4}>
                    <Button
                      variant="outline-warning"
                      className="w-100 py-3 d-flex flex-column align-items-center"
                      onClick={() => navigate("support")}
                    >
                      <Headset size={48} className="mb-2" />
                      <h5>Customer Support</h5>
                      <small className="text-muted">
                        Get help with your trip
                      </small>
                    </Button>
                  </Col>
                </Row>
              </>
            ) : (
              <Row className="mt-4">
                <Col>
                  <Card className="shadow-sm">
                    <Card.Body>
                      <Outlet />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default UserDashboard;
