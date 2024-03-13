import React, { useState } from "react";
import logo from "../../../assets/img/Logo_Hospital.png";
import { useDispatch } from "react-redux";
import { PasswordRequestOtp, ResetPassword } from "../dependencies/action";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [passError, setPasserror] = useState("");
  const dispatch = useDispatch();
  const mobileNumberPattern = /^[0-9]{10}$/;
  const [otpScreen, setOtpScreen] = useState(false);
  const navigate = useNavigate()

  const handleInput = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.mobile) {
      setError("Mobile Number is required!");
      return false;
    } else {
      setError(null);
    }

    if (!mobileNumberPattern.test(form.mobile)) {
      setError("Mobile is not valid!");
      return false;
    }

    if (!otpScreen) {
      dispatch(PasswordRequestOtp(form)).then((result) => {
        console.log(result);
        if (result) {
          setOtpScreen(true);
        }
      });
    } else {
      if (!form.otp) {
        setError("OTP is required!");
        return false;
      } else if (form.otp.length !== 6) {
        setError("OTP Must be 6 digit!");
        return false;
      } else {
        setError(null);
      }

      if (!form.password) {
        setPasserror("Password is required!");
        return false;
      } else if (form.password.length !== 6) {
        setPasserror("Password Must be 6 digit!");
        return false;
      } else if (!form.rePassword) {
        setPasserror("Re password is required!");
        return false;
      } else if (form.rePassword !== form.password) {
        setPasserror("Password and Re password is not same!");
        return false;
      } else {
        setPasserror(null);
      }

      dispatch(ResetPassword(form)).then(res => {
        navigate("/login");
      })
    }
  };
  return (
    <>
      <div className="main-wrapper account-wrapper">
        <div className="account-box login-wrapp">
          <form onSubmit={(e) => handleSubmit(e)} className="form-signin">
            <div className="account-logo">
              <a href="#0">
                <img src={logo} alt="Preadmin" />
              </a>
            </div>
            <div className="form-group">
              <label>Mobile</label>
              <input
                type="text"
                className="form-control"
                placeholder="Mobile"
                disabled={otpScreen}
                name="mobile"
                onChange={(e) => handleInput(e.target.name, e.target.value)}
              />
              {error && !otpScreen ? (
                <span className="text-danger">{error}</span>
              ) : (
                <span>&nbsp;</span>
              )}
            </div>
            {otpScreen && (
              <>
                <div className="form-group">
                  <label>OTP</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="OTP"
                    name="otp"
                    onChange={(e) => handleInput(e.target.name, e.target.value)}
                  />
                  {error ? (
                    <span className="text-danger">{error}</span>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={(e) => handleInput(e.target.name, e.target.value)}
                  />
                  {passError ? (
                    <span className="text-danger">{passError}</span>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </div>
                <div className="form-group">
                  <label>Re Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="rePassword"
                    onChange={(e) => handleInput(e.target.name, e.target.value)}
                  />
                </div>
              </>
            )}
            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary account-btn">
                {otpScreen ? "Reset Password" : "Request OTP"}
              </button>
            </div>
            <div className="text-center register-link">
              Go back to <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
