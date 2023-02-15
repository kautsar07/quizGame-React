import React from "react";
import logo from "../Img/logo-quiz.png";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate()
  return (
    <div className="wrap-nav">
      <div className="container">
        <div className="wrap-content">
          <div className="logo">
            <img onClick={()=>navigate('/')} src={logo} alt="" />
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
