import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import MainHeader from "../common/MainHeader";
import MainFooter from "../common/MainFooter";
import { addCareerItem } from "./dependencies/action";
import { Modal } from "react-bootstrap";

function Career() {
  const [form, setForm] = useState({})
  const dispatch = useDispatch()
  const [error, setError] = useState({});
  const [show, setShow] = useState(false)
  const navigate = useNavigate()




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
    if (!form.dob) {
      errors = { ...errors, dob: "This field is required!" };
    }
    if (!form.higherQualification) {
      errors = { ...errors, higherQualification: "This field is required!" };
    }
    if (!form.address) {
      errors = { ...errors, address: "This field is required!" };
    }
    if (!form.experience) {
      errors = { ...errors, experience: "This field is required!" };
    }
    setError(errors);
    return errors;
  };

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value })
  }

  const handleSubmitItem = (e) => {
    e.preventDefault()
    let vallidate = validator();

    if (!isEmpty(vallidate)) {
      return false;
    }

    let data = new FormData()

    for (const key in form) {
      data.append(key, form[key])
    }

    dispatch(addCareerItem(data)).then(res => {
      if (res.status) {
        setShow(true)
        setForm({})

      }
    })
  }

  const handleCloseModal = (value) => {
    setShow(false)
    navigate('/')
  }

  return (
    <>
      <MainHeader />
      <main id="main">
        <div className="breadcrumbs">
          <div className="wrapper" style={{ backgroundImage: `url("https://wordpress.themeholy.com/mediax/wp-content/uploads/2023/12/breadcumb-bg.jpg")` }}>
            <div className="page-header d-flex align-items-center">
              <div className="container position-relative">
                <div className="row d-flex justify-content-center">
                  <div className="col-lg-6 text-center">
                    <h2>Career</h2>
                    <p>Welcome to Fever99, where we are committed to transforming healthcare through innovative digital solutions. We're on a mission to make healthcare accessible, affordable, and convenient for everyone. If you're passionate about making a difference in the world of telemedicine and e-consultations, we'd love to have you on board.</p>
                    <nav>
                      <div className="container">
                        <ol>
                          <li>
                            <Link to="/">Home</Link>
                          </li>
                          <li>Career</li>
                        </ol>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section id="about" class="about py-5" style={{ backgroundImage: `url("https://wordpress.themeholy.com/mediax/wp-content/uploads/2023/12/process_bg_1.jpg")` }}>
          <div class="container bg-light shadow-sm rounded-3 p-5"  >
            <div class="section-header">
              <h2 style={{ color: "#1263AC" }}>Why Join Fever99?</h2>
              <p>
                At Fever99, we believe in providing the best healthcare solutions and services, and that starts with having a talented and dedicated team.
              </p>
            </div>
            <div class="row gy-4 container">
              <form onSubmit={(e) => handleSubmitItem(e)}>
                <div class="row gy-4">
                  <div className="form-group">
                    <label>Apply As</label>
                    <select className="form-select" name="applyAs" onChange={(e) => handleInputChange(e.target.name, e.target.value)}>
                      <option value="">--Select One--</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Nurse">Nurse</option>
                      <option value="Dietician">Dietician</option>
                      <option value="Psychologist">Psychologist</option>
                      <option value="physiotherapist">Physiotherapist</option>
                      <option value="Administrator">Administrator</option>
                      <option value="Manager">Manager</option>
                      <option value="Marketing">Marketing Executive</option>
                      <option value="others">Others</option>
                    </select>
                    {error && error.name && (
                      <span className="text-danger">{error.name}</span>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label>Name</label>
                    <input name="name" value={form.name} className="form-control" placeholder="Name" onChange={(e) => handleInputChange(e.target.name, e.target.value)} />
                    {error && error.name && (
                      <span className="text-danger">{error.name}</span>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label>Email</label>
                    <input name="email" value={form.email} className="form-control" placeholder="Email" onChange={(e) => handleInputChange(e.target.name, e.target.value)} />
                    {error && error.email && (
                      <span className="text-danger">{error.email}</span>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label>Mobile</label>
                    <input name="mobile" value={form.mobile} className="form-control" placeholder="Mobile" onChange={(e) => handleInputChange(e.target.name, e.target.value)} />
                    {error && error.mobile && (
                      <span className="text-danger">{error.mobile}</span>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label>Gender</label>
                    <select className="form-select" name="gender" onChange={(e) => handleInputChange(e.target.name, e.target.value)}>
                      <option value="">--Select One--</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Female">Other</option>
                    </select>
                    {error && error.gender && (
                      <span className="text-danger">{error.gender}</span>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label>Date Of Birth</label>
                    <input name="dob" className="form-control" placeholder="Date Of Birth" type="date" onChange={(e) => handleInputChange(e.target.name, e.target.value)} />
                    {error && error.dob && (
                      <span className="text-danger">{error.dob}</span>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label>Highest Qualification</label>
                    <input name="higherQualification" value={form.higherQualification} className="form-control" placeholder="Higher Qualification" onChange={(e) => handleInputChange(e.target.name, e.target.value)} />
                    {error && error.higherQualification && (
                      <span className="text-danger">{error.higherQualification}</span>
                    )}
                  </div>
                  <div className="form-group col-md-12">
                    <label>Addresss</label>
                    <textarea placeholder="address" value={form.address} name="address" className="form-control" onChange={(e) => handleInputChange(e.target.name, e.target.value)}></textarea>
                    {error && error.address && (
                      <span className="text-danger">{error.address}</span>
                    )}
                  </div>

                  <div className="form-group col-md-6">
                    <label>Experience (in Years)</label>
                    <select className="form-select" name="experience" value={form.experience} onChange={(e) => handleInputChange(e.target.name, e.target.value)}>
                      <option value="">--exprince--</option>
                      <option value="0-1">0-1</option>
                      <option value="1-2">1-2</option>
                      <option value="2-3">2-3</option>
                      <option value="3-4">3-4</option>
                      <option value="4-5">4-5</option>
                      <option value="5-6">5-6</option>
                      <option value="6-7">6-7</option>
                      <option value="7-8">7-8</option>
                      <option value="8+ above">8+ above</option>
                    </select>
                    {error && error.experience && (
                      <span className="text-danger">{error.experience}</span>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label>Attach Resume</label>
                    <input name="file" className="form-control" value={form.resume} type="file" onChange={(e) => handleInputChange(e.target.name, e.target.files[0])} />
                  </div>
                  <div className="form-group text-center">
                    <button onClick={(e) => handleSubmitItem(e)} className="btn btn-primary account-btn" >Submit</button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </section>

        {
          show && (
            <Modal show={show}>
              <Modal.Header>
                <h4 className="text-white">Success!</h4>
              </Modal.Header>
              <Modal.Body>
                <p>Thank you/ our team will contact you shortly.</p>
              </Modal.Body>
              <Modal.Footer>
                <button onClick={() => handleCloseModal(false)} className="btn btn-sm btn-danger">Close</button>
              </Modal.Footer>
            </Modal>
          )
        }

        <MainFooter />
      </main >
    </>
  );
}

export default Career;
