import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import HomeNavbar from "../components/HomeNavbar";

function Login() {
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8085/SpringSecurity/login",
        loginData
      );
      const token = response.data;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      const role = decoded.role.toUpperCase();
      if (role === "OWNER") navigate("/owner/dashboard");
      else if (role === "USER") navigate("/user/dashboard");
    } catch (err) {
      alert("Invalid credentials");
      console.error(err);
    }
  };

  return (
    <>
      <style>
        {`
          .login-container {
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

          .login-content {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 100px;
            flex-grow: 1;
          }

          .login-box {
            background: rgba(255, 255, 255, 0.9);
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 400px;
            text-align: center;
          }

          .login-heading {
            margin-bottom: 30px;
            color: #333;
            font-size: 28px;
            font-weight: 700;
          }

          .login-input {
            width: 100%;
            padding: 14px;
            margin-bottom: 20px;
            border-radius: 8px;
            border: 1px solid #ddd;
            font-size: 16px;
            transition: all 0.3s;
          }

          .login-input:focus {
            border-color: #0d6efd;
            box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
          }

          .login-button {
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

          .login-button:hover {
            background-color: #0b5ed7;
            transform: translateY(-2px);
          }

          .login-footer {
            margin-top: 20px;
            color: #666;
            font-size: 14px;
          }

          .login-link {
            color: #0d6efd;
            text-decoration: none;
            font-weight: 500;
          }

          .login-link:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <div className="login-container">
        <HomeNavbar />
        <div className="login-content">
          <div className="login-box">
            <h2 className="login-heading">Login to Your Account</h2>
            <form onSubmit={handleSubmit}>
              <input
                name="userName"
                type="text"
                placeholder="Username"
                value={loginData.userName}
                onChange={handleChange}
                required
                className="login-input"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleChange}
                required
                className="login-input"
              />
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
            <div className="login-footer">
              Don't have an account?{" "}
              <a href="/register" className="login-link">
                Register here
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;