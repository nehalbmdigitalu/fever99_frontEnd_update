import React, { useCallback, useEffect, useState } from "react";
// import logo from "../../../assets/img/logo-dark.png";
import logo from "../../../assets/img/Logo_Hospital.png";
import { useSelector, useDispatch } from "react-redux";
import { doLogin } from "../dependencies/action";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";

function Login(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  useEffect(() => { }, []);

  const handleInput = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await dispatch(doLogin(form));
      if (loginResponse.status) {
        let rediret = sessionStorage.getItem("redirect_url");
        if (rediret) {
          sessionStorage.removeItem("redirect_url");
          navigate(rediret);
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(loginResponse.error);
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <div class="">
        <div class="bg order-md-2" style={{ backgroundImage: `url("/image/bg-image.avif")` }}>
          <div class="contents order-2 order-md-1">
            <div class="container py-5">
              <div class="row align-items-center justify-content-center">
                <div class="col-md-4 form-signin">
                  <form onSubmit={(e) => handleSubmit(e)} className="bg-white shadow-sm px-5 py-3">
                    <div className="account-logo">
                      <a href="#0">
                        <img src={logo} alt="Preadmin" />
                      </a>
                    </div>
                    <div class="mb-4">
                      <h3 className="text-center">Sign In</h3>
                    </div>
                    <div className="form-group">
                      <label className="py-2">Mobile or Email</label>
                      <input
                        type="text"
                        placeholder="Mobile or Email"
                        className="form-control p-2 bg-light"
                        name="email"
                        onChange={(e) => handleInput(e.target.name, e.target.value)}
                      />
                      {error ? (
                        <span className="text-danger">{error}</span>
                      ) : (
                        <span>&nbsp;</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="py-2">Password</label>
                      <input
                        type="password"
                        placeholder="Password"
                        className="form-control p-2 bg-light"
                        name="password"
                        onChange={(e) => handleInput(e.target.name, e.target.value)}
                      />
                    </div>
                    <div className="form-group text-right">
                      <Link to="/forgot-password" className="fs-">Forgot your password?</Link>
                    </div>
                    <div className="form-group text-center py-3">
                      <button type="submit" className="btn btn-primary account-btn">
                        Login
                      </button>
                    </div>
                    <div className="text-center register-link fs-6">
                      Don’t have an account? <Link to="/register" className="text-primary" style={{fontFamily:'sans-serif',display:'inline-block'}}>Register Now</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
