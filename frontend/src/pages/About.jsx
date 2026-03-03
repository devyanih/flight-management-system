// About.js
import React from "react";
import HomeNavbar from "../components/HomeNavbar";

function About() {
  return (
    <>
      <style>
        {`
          .about-container {
            min-height: 100vh;
            background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), 
                            url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80");
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            padding: 0 20px;
            display: flex;
            flex-direction: column;
          }

          .about-content {
            background-color: rgba(255, 255, 255, 0.42);
            padding: 40px;
            border-radius: 16px;
            max-width: 800px;
            text-align: center;
            margin: 100px auto 0;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }

          .about-heading {
            font-size: 36px;
            color: #003366;
            margin-bottom: 30px;
            font-weight: 700;
          }

          .about-paragraph {
            background-color: rgba(255, 255, 255, 0.48);
            padding: 20px;
            border-radius: 10px;
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
            line-height: 1.6;
          }
        `}
      </style>

      <div className="about-container">
        <HomeNavbar />
        <div className="about-content">
          <h1 className="about-heading">About Us</h1>
          <p className="about-paragraph">
            Welcome to our Flight Management System — your one-stop solution for managing all your air travel needs.
          </p>
          <p className="about-paragraph">
            Our platform offers seamless flight search, real-time booking, secure check-ins, and live fare updates. Whether you're a traveler or airline staff, this system is built to make your journey smoother.
          </p>
          <p className="about-paragraph">
            We believe in innovation, simplicity, and user satisfaction. With a clean user interface and robust backend, we ensure smart and secure travel for everyone.
          </p>
          <p className="about-paragraph">
            Built by passionate developers, our system combines modern tech and convenience to deliver a premium air travel experience.
          </p>
        </div>
      </div>
    </>
  );
}

export default About;