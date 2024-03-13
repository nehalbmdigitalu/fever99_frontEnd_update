import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/Logo_Hospital.png";
import { useSelector } from "react-redux";
import EmergencyCall from "../../Home/EmergencyCall";
import "./index.scss";
import "./index.css";

function MainHeader() {
  const [showEmergency, setShowEmergency] = useState(false);
  const { isLogin, user } = useSelector((state) => state.login);
  const [open, setOpen] = useState(false);

  const toggleMobileMenu = () => {
    setOpen(!open);
  };
  return (
    <>
      {/* <TopHeader /> */}
      <header id="header" class={open ? `header d-flex align-items-center mobile-nav-active` : `header d-flex align-items-center`}>
        <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
          <Link to="/" className="logo d-flex align-items-center">
            <img src={logo} alt="" />
          </Link>

          <nav id="navbar" class="navbar">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/service">Services</Link></li>
              <li><Link to="/e-clinic-register">Franchise/E-Clinic Request</Link></li>
              <li>
                <Link to="/career">Career</Link>
              </li>
              <li>
                {isLogin ? (
                  <Link to="/dashboard">Hi {user.name}</Link>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
              <button
                style={{
                  borderRadius: "26px",
                  padding: "10px",
                  marginLeft: "40px",
                }}
                className="call-emergency-numbe"
              >
                <a
                  href="tel:6262808062"
                  style={{ color: "white" }}
                // onClick={(e) => setShowEmergency(true)}
                >
                  <i className="fa fa-phone"></i> &nbsp;6262-8080-62
                </a>
              </button>
            </ul>
          </nav>


          <i class={open ? "mobile-nav-toggle mobile-nav-show bi bi-list d-none" : "mobile-nav-toggle mobile-nav-show bi bi-list"} onClick={toggleMobileMenu}></i>
          <i class={open ? "mobile-nav-toggle mobile-nav-hide bi bi-x" : "mobile-nav-toggle mobile-nav-hide d-none bi bi-x"} onClick={toggleMobileMenu}></i>
        </div>
      </header>
      <EmergencyCall
        show={showEmergency}
        handleClose={(value) => setShowEmergency(value)}
      />
    </>
  );
}

export default MainHeader;