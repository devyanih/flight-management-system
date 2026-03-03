// Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HomeNavbar from "../components/HomeNavbar";

function Register() {
  const [registerData, setRegisterData] = useState({
    userName: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8085/SpringSecurity/register",
        registerData
      );
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
      console.error(err);
    }
  };

  return (
    <>
      <style>
        {`
          .register-container {
            min-height: 100vh;
            background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), 
                            url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80");
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            display: flex;
            flex-direction: column;
          }

          .register-content {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-grow: 1;
            padding-top: 80px;
          }

          .register-box {
            background: rgba(255, 255, 255, 0.95);
            padding: 40px;
            border-radius: 16px;
            width: 100%;
            max-width: 400px;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
            text-align: center;
          }

          .register-heading {
            margin-bottom: 30px;
            color: #333;
            font-size: 28px;
            font-weight: 700;
          }

          .register-input {
            width: 100%;
            padding: 14px;
            margin-bottom: 20px;
            border-radius: 8px;
            border: 1px solid #ddd;
            font-size: 16px;
            transition: all 0.3s;
          }

          .register-input:focus {
            border-color: #0d6efd;
            box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
          }

          .register-button {
            width: 100%;
            padding: 14px;
            background-color: #0d6efd;
            border: none;
            color: white;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s;
            margin-top: 10px;
          }

          .register-button:hover {
            background-color: #0b5ed7;
            transform: translateY(-2px);
          }

          .register-footer {
            margin-top: 20px;
            color: #666;
            font-size: 14px;
          }

          .register-link {
            color: #0d6efd;
            text-decoration: none;
            font-weight: 500;
          }

          .register-link:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <div className="register-container">
        <HomeNavbar />
        <div className="register-content">
          <div className="register-box">
            <h2 className="register-heading">Create Account</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="userName"
                placeholder="Username"
                value={registerData.userName}
                onChange={handleChange}
                required
                className="register-input"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerData.password}
                onChange={handleChange}
                required
                className="register-input"
              />
              <select
                name="role"
                value={registerData.role}
                onChange={handleChange}
                required
                className="register-input"
              >
                <option value="">Select Role</option>
                <option value="USER">User</option>
                <option value="OWNER">Owner</option>
              </select>
              <button type="submit" className="register-button">
                Register
              </button>
            </form>
            <div className="register-footer">
              Already have an account?{" "}
              <a href="/login" className="register-link">
                Login here
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;