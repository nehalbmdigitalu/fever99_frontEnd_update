import React, { useEffect, useState } from "react";
// import DarkLogo from "../../../assets/img/logo-dark.png";
import logo from "../../../assets/img/Logo_Hospital.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EclinicRequest, doFranchiseRegister, doRegisterUser } from "../dependencies/action";
import { isEmpty } from "lodash";
// import "./style.scss";
import { getStateCity } from "../../Dashboard/dependencies/action";
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [cityList, setCity] = useState([])
  const [form, setForm] = useState({});
  const { stateList } = useSelector((state) => state.stateCity);

  const handleInput = (name, value) => {
    setForm({ ...form, [name]: value });
  };
  useEffect(() => {
    dispatch(getStateCity())
  }, [dispatch])

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
    if (!form.state) {
      errors = { ...errors, state: "This field is required!" };
    }
    if (!form.city) {
      errors = { ...errors, city: "This field is required!" };
    }
    if (!form.profession) {
      errors = { ...errors, profession: "This field is required!" };
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

    dispatch(EclinicRequest(form)).then(res => {
      if (res) {
        navigate('/')
      }
    })
  };

  const handleStateChange = (e) => {

    let id = e.target.value;

    let state = stateList.filter((e) => e._id == id);

    if (state && state.length > 0) {
      setCity(state[0].city);
    }


    handleInput(e.target.name, state[0].state)
  }


  return (
    <>
      <div className="main-wrapper  account-wrapper">
        <div className="account-box register-wrapp">
          <div className="account-logo">
            <a href="#0">
              <img src={logo} alt="Preadmin" />
            </a>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="">
              <div className="row">
                <div className="form-group col-lg-6">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
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
                    name="mobile"
                    onChange={(e) => handleInput(e.target.name, e.target.value)}
                  />
                  {error && error.mobile && (
                    <span className="text-danger">{error.mobile}</span>
                  )}
                </div>
                <div className="form-group col-lg-6">
                  <label>Genger</label>
                  <select
                    name="gender"
                    className="form-control"
                    onChange={(e) => handleInput(e.target.name, e.target.value)}
                  >
                    <option value="">--Select Gender--</option>
                    <option value="Male">Male</option>
                    <option value="Femake">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {error && error.gender && (
                    <span className="text-danger">{error.gender}</span>
                  )}
                </div>
                <div className="form-group col-lg-6">
                  <label>State</label>
                  <select className="form-control" name="state" onChange={(e) => handleStateChange(e)}>
                    <option>Select One</option>
                    {
                      stateList && stateList.map((state, index) => (
                        <option key={index} value={state._id}>{state.state}</option>
                      ))
                    }


                  </select>
                  {error && error.state && (
                    <span className="text-danger">{error.state}</span>
                  )}
                </div>
                <div className="form-group col-lg-6">
                  <label>City</label>
                  <select className="form-control" name="city" onChange={(e) => handleInput(e.target.name, e.target.value)}>
                    <option>Select One</option>
                    {
                      cityList && cityList.map((city, index) => (
                        <option value={city} key={index}>{city}</option>
                      ))
                    }



                  </select>
                  {error && error.city && (
                    <span className="text-danger">{error.city}</span>
                  )}
                </div>
                <div className="form-group col-md-12">
                  <label>Profession</label>
                  <select className="form-select" name="profession" onChange={(e) => handleInput(e.target.name, e.target.value)}>
                    <option value="">Select One</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Chemist">Chemist</option>
                    <option value="Lab technician">Lab technician</option>
                    <option value="Other">Other</option>
                  </select>
                  {error && error.profession && (
                    <span className="text-danger">{error.profession}</span>
                  )}
                </div>
              </div>
              <div className="form-group text-center">
                <button className="btn btn-primary account-btn" type="submit">
                  Request For E-clinic
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
