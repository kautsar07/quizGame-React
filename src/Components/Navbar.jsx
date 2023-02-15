import React from "react";
import logo from "../Img/logo-quiz.png";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="wrap-nav">
      <div className="container">
        <div className="wrap-content">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="title">
            <h2> QUIZ CAK-TOLONG</h2>
          </div>
          <div className="login">
            <p>Login</p>
          </div>
        </div>
      </div>
    </div>
  );
}
