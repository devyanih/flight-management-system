// // src/components/OwnerNavbar.jsx
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// function OwnerNavbar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/owner/dashboard">
//           ✈️ Owner Dashboard
//         </Link>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <button className="btn btn-outline-light" onClick={handleLogout}>
//                 Logout
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default OwnerNavbar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  Badge,
  Button,
} from "react-bootstrap";
import { BellFill, BoxArrowRight } from "react-bootstrap-icons";

function OwnerNavbar() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New booking received", time: "10 mins ago", read: false },
    { id: 2, text: "Flight schedule updated", time: "1 hour ago", read: false },
    {
      id: 3,
      text: "System maintenance scheduled",
      time: "Yesterday",
      read: true,
    },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to="/owner/dashboard"
          className="d-flex align-items-center"
        >
          <span className="me-2" style={{ fontSize: "1.5rem" }}>
            ✈️
          </span>
          <span className="fw-bold">Skyline Airways</span>
          <Badge bg="light" text="primary" className="ms-2">
            Owner Portal
          </Badge>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="align-items-center">
            <Dropdown
              align="end"
              onToggle={(isOpen) => setShowNotifications(isOpen)}
            >
              <Dropdown.Toggle
                as={Button}
                variant="link"
                className="position-relative text-white"
              >
                <BellFill size={20} />
                {unreadCount > 0 && (
                  <Badge
                    pill
                    bg="danger"
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu
                show={showNotifications}
                className="p-0"
                style={{ minWidth: "300px" }}
              >
                <Dropdown.Header className="d-flex justify-content-between bg-light">
                  <span>Notifications</span>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setNotifications([])}
                  >
                    Clear All
                  </Button>
                </Dropdown.Header>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <Dropdown.Item
                      key={notification.id}
                      className={`py-2 ${!notification.read ? "bg-light" : ""}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="d-flex justify-content-between">
                        <span>{notification.text}</span>
                        <small className="text-muted">
                          {notification.time}
                        </small>
                      </div>
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item
                    disabled
                    className="text-center py-3 text-muted"
                  >
                    No notifications
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>

            {/* Logout Button Only */}
            <Button
              variant="link"
              className="d-flex align-items-center text-white"
              onClick={handleLogout}
            >
              <BoxArrowRight size={20} className="me-1" />
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default OwnerNavbar;
