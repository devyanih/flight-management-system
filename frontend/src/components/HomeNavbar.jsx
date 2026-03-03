import React from "react";
import { Link } from "react-router-dom";

function HomeNavbar() {
  const navbarStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.09)", // transparent dark glass
    color: "white",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backdropFilter: "blur(8px)", // glass effect
    boxShadow: "0 4px 20px rgba(47, 40, 40, 0.3)",
  };

  const brandStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    letterSpacing: "1px",
    color: "white",
  };

  const linksStyle = {
    display: "flex",
    gap: "25px",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "500",
    transition: "color 0.3s ease",
  };

  return (
    <nav style={navbarStyle}>
      <div style={brandStyle}>Flight Management System</div>
      <div style={linksStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/about" style={linkStyle}>About</Link>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/register" style={linkStyle}>Register</Link>
      </div>
    </nav>
  );
}

export default HomeNavbar;
