import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#B2F0E8" }} // light cyan background
    >
      <div className="container-fluid">
        <span className="navbar-brand fw-bold fs-4 text-dark">
          ✈️ Explore, Book & Check-in
        </span>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav gap-3">
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/user/dashboard">
                🏠 Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-dark btn-sm" onClick={handleLogout}>
                🚪 Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
