import React, { useEffect, useState } from "react";
import logo from "../Img/logo-quiz.png";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import ModalLogin from "./ModalLogin";
import { Button, Modal } from "antd";

export default function Navbar() {
  const [token, setToken] = useState(false);
  const [img, setImg] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    setTimeout(function () {
      window.location.reload(1);
    }, 50);
  };
  const handleLogin = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const akses = localStorage.getItem("token");
    const img = localStorage.getItem("photoURL");
    if (akses && img) {
      setImg(img);
      setToken(akses);
    } else setToken(false);
    setImg(false);
  }, []);

  return (
    <div className="wrap-nav">
      <div className="container">
        <div className="wrap-content">
          <div className="logo">
            <img onClick={() => navigate("/")} src={logo} alt="" />
          </div>
          <div className="title">
            <h2> QUIZ CAK-TOLONG</h2>
          </div>
          {token ? (
            <div className="logout">
              <img
                src="https://lh3.googleusercontent.com/a/AEdFTp47kgY6hPqjZs_CERFDGaETW3nsznMXK_LXnRbp=s96-c"
                alt=""
              />
              <div onClick={handleLogOut} className="login">
                <p>LogOut</p>
              </div>
            </div>
          ) : (
            <div onClick={handleLogin} className="login">
              <p>Login</p>
            </div>
          )}
        </div>
      </div>
      <ModalLogin
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
}
