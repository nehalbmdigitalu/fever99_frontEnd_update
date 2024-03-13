import React, { useState } from "react";
// import DarkLogo from "../../../assets/img/logo-dark.png";
import logo from "../../../assets/img/Logo_Hospital.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  doRegisterDoctor,
  doRegisterUser,
  requestRegisterOTP,
} from "../dependencies/action";
import { isEmpty } from "lodash";
// import "./style.scss";
function FranchiseRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [form, setForm] = useState({});
  const [otpRequest, setOtpRequest] = useState(false);
  const mobileNumberPattern = /^[0-9]{10}$/;
  const [disableRegisterBtn, setDisableRegisterBtn] = useState(true);
  const [privacyCheck, setPrivacyCheck] = useState(false);

  const handleInput = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const validator = () => {
    let errors = {};
    if (!form.name) {
      errors = { ...errors, name: "This field is required!" };
    }
    if (!form.mobile) {
      errors = { ...errors, mobile: "This field is required!" };
    }
    if (!form.email) {
      errors = { ...errors, email: "This field is required!" };
    }
    if (!form.gender) {
      errors = { ...errors, gender: "This field is required!" };
    }

    if (!form.password) {
      errors = { ...errors, password: "This field is required!" };
    } else if (form.password !== form.rePassword) {
      errors = {
        ...errors,
        password: "Confirm Password not matching with Password",
      };
    }

    setError(errors);

    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let vallidate = validator();

    if (!isEmpty(vallidate)) {
      return false;
    }

    const register = dispatch(doRegisterUser(form));

    register.then((res) => {
      if (res.status) {
        navigate("/login");
      }
    });
  };

  const handleRequestOtp = (e) => {
    e.preventDefault();

    if (!form.mobile) {
      setError({ ...error, mobile: "Mobile is not valid!" });
      return false;
    }

    if (!mobileNumberPattern.test(form.mobile)) {
      setError({ ...error, mobile: "Mobile is not valid!" });
      return false;
    }

    dispatch(requestRegisterOTP({ mobile: form.mobile })).then((res) => {
      if (res) {
        setOtpRequest(true);
        setDisableRegisterBtn(false)
      }
    });
  };
  console.log(privacyCheck, disableRegisterBtn);
  return (
    <>
      <div className="main-wrapper  account-wrapper" style={{ backgroundImage: `url("/image/bg-image.avif")` }}>
        <div className="account-box register-wrapp">
          <div className="account-logo">
            <a href="#0">
              <img src={logo} alt="Preadmin" />
            </a>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="row">
              <div className="form-group col-lg-6">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                />
                {error && error.name && (
                  <span className="text-danger">{error.name}</span>
                )}
              </div>
              <div className="form-group col-lg-6">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Email id"
                  className="form-control"
                  name="email"
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                />
                {error && error.email && (
                  <span className="text-danger">{error.email}</span>
                )}
              </div>
              <div className="form-group col-lg-6">
                <label>Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mobile No."
                  name="mobile"
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                />

                {error && error.mobile && (
                  <span className="text-danger">{error.mobile}</span>
                )}
              </div>
              <div className="form-group col-lg-6">
                {otpRequest ? (
                  <>
                    <label>OTP</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="OTP"
                      name="otp"
                      onChange={(e) =>
                        handleInput(e.target.name, e.target.value)
                      }
                    />
                  </>
                ) : (
                  <Link
                    onClick={(e) => handleRequestOtp(e)}
                    style={{ marginTop: "22px" }}
                    className="btn btn-warning"
                  >
                    Request OTP
                  </Link>
                )}
              </div>
              <div className="form-group col-lg-6">
                <label>Gender</label>
                <select
                  name="gender"
                  className="form-control"
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                >
                  <option value="">--Select Gender--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {error && error.gender && (
                  <span className="text-danger">{error.gender}</span>
                )}
              </div>

              <div className="form-group col-lg-6">
                <label>Refral Code</label>
                <input
                  name="usedRefrel"
                  placeholder="Refral Code"
                  className="form-control"
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                />
              </div>

              <div className="form-group col-lg-6">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                />
                {error && error.password && (
                  <span className="text-danger">{error.password}</span>
                )}
              </div>
              <div className="form-group col-lg-6">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Conform Password"
                  name="rePassword"
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                />
                {error && error.rePassword && (
                  <span className="text-danger">{error.rePassword}</span>
                )}
              </div>
              <div className="form-group checkbox col-md-12">
                <label>
                  <input
                    type="checkbox"
                    name="privacy"
                    onChange={(e) => setPrivacyCheck(e.target.checked)}
                  />{" "}
                  I accept Fever99{" "}
                  <Link
                    to="/privacy"
                    target="_blank"
                    style={{ color: "#009ce7" }}
                  >
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/terms-condition"
                    target="_blank"
                    style={{ color: "#009ce7" }}
                  >
                    Terms & Conditions
                  </Link>
                </label>
              </div>
              <div className="form-group text-center">
                <button style={{ background: "#1263AC" }}
                  className={`btn btn-success account-btn ${privacyCheck ? `` : `disabled`} ${disableRegisterBtn ? `disabled` : ``}`}
                  type="submit">
                  Signup
                </button>
              </div>
              <div className="text-center login-link">
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FranchiseRegister;
